const Game = require('../models/gameModel'); // Post 모델을 가져옵니다.


exports.getGames = async (req, res) => {
    try {
        const { page, perpage, type } = req.query; // 쿼리 파라미터에서 page와 perpage를 추출
        const currentPage = parseInt(page) || 1; // 현재 페이지 (기본값: 1)
        const itemsPerPage = parseInt(perpage) || 10; // 페이지당 항목 수 (기본값: 10)
        const skip = (currentPage - 1) * itemsPerPage; // 건너뛸 항목 수 계산

        // 총 게시물 수를 가져옴
        let totalGames
        totalGames = await Game.countDocuments();
        let games;
        // 현재 페이지의 게시물을 가져옴
        if (parseInt(type) === 1) {
            games = await Game.find({ games: { $elemMatch: { result: 1 } } })
                .sort({ 'games.createdAt': -1 })
                .skip(skip)
                .limit(itemsPerPage);

        }
        else {
            games = await Game.find({ games: { $elemMatch: { result: 0 } } })
                .sort({ 'games.createdAt': -1 })
                .skip(skip)
                .limit(itemsPerPage);
        }


        res.status(200).json({
            games,
            currentPage,
            totalPages: Math.ceil(totalGames / itemsPerPage),
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: '게시물을 조회하는 중에 오류가 발생했습니다.' });
    }
};

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

exports.deleteGame = async (req, res) => {
    try {
      const gameId = req.params.gameId;
      const deletedGame = await Game.findByIdAndDelete(gameId);
      if (!deletedGame) {
        return res.status(404).json({ error: '해당 ID의 대전을 찾을 수 없습니다.' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: '대전을 삭제하는 중에 오류가 발생했습니다.' });
    }
  };
  
