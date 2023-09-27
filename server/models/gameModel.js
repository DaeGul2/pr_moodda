const mongoose = require('mongoose');
// const { playerSchema } = require('./playerModel');

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
    win:{type:String,default:'yet', enum:['home','away','yet']}

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