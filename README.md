![image](https://github.com/DaeGul2/pr_moodda/assets/122341071/385f5fd8-276c-45c4-a8c1-ecfccbfc0e88)# 무따닷컴(건전 배팅 사이트 - 개발중)



# 1. 개요
## 1) 목 적 :
- 1인 방송 플랫폼 '아프리카TV' 중 '스타크래프트' 카테고리 시청자들이 내가좋아하는 선수의 경기에 베팅을 할 수 있도록
## 2) 방 식 : 
- 아프리카tv에서 진행되고 있는 스타크래프트 경기들을 실시간으로 업데이트(공식 대회, bj간 개인 스폰, 대학대전)
- 배당의 경우 임의적으로 부여
- 사용자는 일일 출석첵크, 게시물 글 쓰기, 댓글 쓰기, 이벤트 참여 등의 활동을 통해 베팅에 사용할 수 있는 포인트 획득

## 3) 선수 pool :
- 등록 선수 : 2023년 10월 10일 기준 티어표에 소속된 선수들의 <b>티어, 대학, 종족</b>에 따름
- 기준 : https://www.fmkorea.com/3844139388

## 4) 경기 규칙 :
- 경기 유형 : 1 vs 1, 다대다
- 다대다의 경우 하나의 큰 대전 안에 여러 개의 매치들이 속해 있으며, 사용자는 각 매치별 독립적으로 선택 가능
- 복수의 매치 선택 가능
- 베팅은 매치가 시작되기 전까지 '베팅 가능' 표시가 되어 있는 매치에 한 해 가능
ex)
- ![image](https://github.com/DaeGul2/pr_moodda/assets/122341071/10e4f80b-7109-4cd3-9025-8b1315d815c2)
  (↑ 베팅 가능)
- ![image](https://github.com/DaeGul2/pr_moodda/assets/122341071/519c576b-4141-47f5-baed-088baca5e037)
  (↑ 베팅 불가)


- ![image](https://github.com/DaeGul2/pr_moodda/assets/122341071/64ca5f1d-7e5d-477e-845b-14e9865bc3ba)
↑ 베팅카트 : 현재 보유 중인 포인트 내에서만 베팅 가능. 최소 베팅액 1000points

# 2. 관리자 페이지

### 1. 선수 관리 페이지
![image](https://github.com/DaeGul2/pr_moodda/assets/122341071/fbe1c9f7-ea14-42f0-8a0d-70bbe6fbb0bb)
관리자는 선수 관리 페이지를 따로 두어 선수 pool의 변경이 필요할 때마다 업데이트 

### 2. 대전 관리 페이지
![image](https://github.com/DaeGul2/pr_moodda/assets/122341071/9498b547-c929-4497-9353-5966cabdbb00)
관리자는 실시간 매치 업데이트 가능, 매치의 진행 경과(경기 전, 경기 중, 경기 종료)를 업데이트

### 3. 베팅 관리 페이지 (개발중)
관리자는 실시간 경기 결과에 따른 베팅 금액 처리를 업데이

# 3. 개발 관련
### 1. 사용 프레임워크 및 기타 플랫폼
- mui 템플릿 사용, React, Node Express 
- 데이터베이스 : MongoDB 

### 2. 데이터베이스 
1) 전체 구조
![image](https://github.com/DaeGul2/pr_moodda/assets/122341071/e7a9d455-12cf-4df7-b4ad-d0e9d913ae6f)

2) 각 모델 스키마

<베팅 모델>
```
const mongoose = require('mongoose');



const subBettingSchema = new mongoose.Schema({
    match_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true,
    },
    selected_team : {
        type:String,
        required: true,
        enum : ['home','away']
    },
    rate:{
        type:Number,
        required : true
    },
    player_name:{
        type:String,
        required:true
    },
    opponent:{
        type:String,
        required:true
    }
})

const bettingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // 'User'는 users 컬렉션의 모델명입니다.
        required: true,
    },
    sub_bettings: [subBettingSchema]
    ,
    points: {
        type: Number,
        required: true,
    },
    predict:{
        type:Number,
        required: true
    }

},{
    timestamps:true
});

const Betting = mongoose.model('Betting', bettingSchema);

module.exports = Betting;
```


<게임 모델>
```
const mongoose = require('mongoose');


const playerSchema = new mongoose.Schema({
    player_name: {
        type: String,
        required: true,
    },
    player_uni: {
        type: String,
        required: true,
    },
     player_tear: {
        type: String,
        required: true,
    },
     player_tpz: {
        type: String,
        required: true,
    },
     sex: {
        type: String,
        required: true,
    },
    
    rate:{type:Number}
});

const subGame = new mongoose.Schema({
    home: { type:playerSchema},
    away: { type:playerSchema},
    result: {
        type: Number,
        default: 2 // 0 종료 1 진행중 2 진행 전
    },
    isPayed:{
        type:Boolean,
        default:false
    },
    win:{type:String,default:'yet', enum:['home','away','yet','draw']}

}, {
    timestamps: true
})

// 선수 모델의 스키마 정의
const gameSchema = new mongoose.Schema({
    game_type: {
        type: String,   
        required: true,
        enum: ['1v1', 'nvm']
    },
    memo: {
        type: String,
    },
    games: [subGame],



});

// Post 모델 생성
const Game = mongoose.model('Game', gameSchema, 'games');

module.exports = Game;
```

<선수 모델>
```
const mongoose = require('mongoose');

// 선수 모델의 스키마 정의
const playerSchema = new mongoose.Schema({
    player_name: {
        type: String,
        required: true,
    },
    player_uni: {
        type: String,
        required: true,
    },
     player_tear: {
        type: String,
        required: true,
    },
     player_tpz: {
        type: String,
        required: true,
    },
     sex: {
        type: String,
        required: true,
    },
});


const Player = mongoose.model('Player', playerSchema,'players');

module.exports = Player;
```

<유저 모델>
```
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true, // 중복되지 않아야 함
    match: /^[a-zA-Z0-9]+$/, // 영어 또는 숫자로만 구성
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  point: {
    type: Number,
    default: 1000,
  },
  nickname: {
    type: String,
    required: true,
    unique: true, // 중복되지 않아야 함
  },
  email: {
    type: String,
    required: true,
    unique: true, // 중복되지 않아야 함
    match: /^\S+@\S+\.\S+$/, // 이메일 주소 형식
  },
  admin:{
    type:Number,
    default:0
  }
});

// 중복 검사를 수행하기 위한 플러그인 추가
userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;
```



