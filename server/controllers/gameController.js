const Game = require('../models/gameModel'); // Post 모델을 가져옵니다.



exports.createGame = async (req, res) => {
    try {
      const { game_type, memo, games } = req.body;
      const game = new Game({ game_type, memo, games });
      await game.save();
      console.log("createdGame");
      res.status(201).json(game);
    } catch (error) {
      res.status(500).json({ error: '게시물을 생성하는 중에 오류가 발생했습니다.' });
    }
  };
  

  