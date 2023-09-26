const Game = require('../models/gameModel'); // Post 모델을 가져옵니다.



exports.createGame = async (req, res) => {
    try {
      const { game_type, memo, games } = req.body;
      const game = new Game({ game_type, memo, games });
      await game.save();
      res.status(201).json(game);
    } catch (error) {
      res.status(500).json({ error: '게시물을 생성하는 중에 오류가 발생했습니다.' });
    }
  };
  
  exports.updateGame = async (req, res) => {
    try {
      const { gameId } = req.params; // URL에서 게임 ID를 가져옵니다.
      const { game_type, memo, games } = req.body;
  
      // 게임 업데이트
      const updatedGame = await Game.findByIdAndUpdate(
        gameId, // 업데이트할 게임의 ID
        { game_type, memo, games },
        { new: true } // 업데이트된 게임 데이터를 반환하기 위해 new 옵션을 사용합니다.
      );
  
      if (!updatedGame) {
        return res.status(404).json({ error: '게임을 찾을 수 없습니다.' });
      }
  
      res.status(200).json(updatedGame);
    } catch (error) {
      res.status(500).json({ error: '게임을 업데이트하는 중에 오류가 발생했습니다.' });
    }
  };
  