const Game = require('../models/gameModel'); // 게임 모델
const Bet = require('../models/bettingModel'); // 베팅 모델
const User = require('../models/userModel'); // 사용자 모델

exports.createBet = async (req,res)=>{
    try {
        // 사용자로부터 게임 ID, 베팅한 팀, 베팅 금액을 받아옵니다.
        const {user_id,points} = req.query;
        const {sub_bettings,predict} = req.body;
        console.log(sub_bettings);
        // 게임의 결과가 2 (진행 전)인지 확인
        
        const gamePromises = sub_bettings.map(async (sub_bettingId) => {
          const game = await Game.findOne({
            games: { $elemMatch: { _id: sub_bettingId.match_id, result: 2 } },
          });
          return game;
        });
        
        const games = await Promise.all(gamePromises);
        
        if (games.some((game) => !game)) {
          return res.status(400).json({ error: '게임을 베팅할 수 없습니다.' });
        }

        
    
        // 사용자의 포인트 확인
        
        const user = await User.findById(user_id);
    
        if (!user) {
          return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        }
    
        // 사용자의 현재 포인트 (실제로는 데이터베이스에서 가져와야 함)
        const userPoints = user.point;
    
        // 베팅 금액이 보유 포인트를 초과하는지 검사
        if (points > userPoints) {
          return res.status(400).json({ error: '베팅 금액이 보유 포인트를 초과합니다.' });
        }
    
        // 베팅 생성
        const bet = new Bet({
          user_id,
          sub_bettings,
          points,
          predict
        });
    
        // 베팅 정보를 저장하고 사용자의 포인트 차감
        await bet.save();
    
        // 사용자 포인트 차감
        user.point -= points;
        await user.save();
    
        res.status(201).json({ message: '베팅이 성공적으로 생성되었습니다.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: '베팅 생성 중에 오류가 발생했습니다.' });
      }
}
// const Game = require('../models/gameModel'); // 게임 모델
// const Bet = require('../models/bettingModel'); // 베팅 모델
// const User = require('../models/userModel'); // 사용자 모델

// exports.createBet = async (req,res)=>{
//     try {
//         // 사용자로부터 게임 ID, 베팅한 팀, 베팅 금액을 받아옵니다.
//         const {user_id, game_id,team, points} = req.query;
//         // 게임의 결과가 2 (진행 전)인지 확인
//         const game = await Game.findOne(
//           { games: { $elemMatch: { _id: game_id, result: 2 } } }
//         );
    
//         if (!game) {
//           return res.status(400).json({ error: '게임을 베팅할 수 없습니다.' });
//         }
    
//         // 사용자의 포인트 확인
        
//         const user = await User.findById(user_id);
    
//         if (!user) {
//           return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
//         }
    
//         // 사용자의 현재 포인트 (실제로는 데이터베이스에서 가져와야 함)
//         const userPoints = user.point;
    
//         // 베팅 금액이 보유 포인트를 초과하는지 검사
//         if (points > userPoints) {
//           return res.status(400).json({ error: '베팅 금액이 보유 포인트를 초과합니다.' });
//         }
    
//         // 베팅 생성
//         const bet = new Bet({
//           game_id,
//           user_id,
//           team,
//           points,
//         });
    
//         // 베팅 정보를 저장하고 사용자의 포인트 차감
//         await bet.save();
    
//         // 사용자 포인트 차감
//         user.point -= points;
//         await user.save();
    
//         res.status(201).json({ message: '베팅이 성공적으로 생성되었습니다.' });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: '베팅 생성 중에 오류가 발생했습니다.' });
//       }
// }