const Game = require('../models/gameModel'); // Post 모델을 가져옵니다.


exports.getGames = async (req, res) => {
    try {
        const { page, perpage } = req.query; // 쿼리 파라미터에서 page와 perpage를 추출
        const currentPage = parseInt(page) || 1; // 현재 페이지 (기본값: 1)
        const itemsPerPage = parseInt(perpage) || 10; // 페이지당 항목 수 (기본값: 10)
        const skip = (currentPage - 1) * itemsPerPage; // 건너뛸 항목 수 계산

        // 총 게시물 수를 가져옴
        let totalGames
        totalGames = await Game.countDocuments();
        let games;
        // 현재 페이지의 게시물을 가져옴
        // if (parseInt(type) === 2) {
        //     games = await Game.find({ games: { $elemMatch: { result: 2 } } })
        //         .sort({ 'games.createdAt': -1 })
        //         .skip(skip)
        //         .limit(itemsPerPage);

        // }
        // else if (parseInt(type) === 1) {
        //     games = await Game.find({ games: { $elemMatch: { result: 1 } } })
        //         .sort({ 'games.createdAt': -1 })
        //         .skip(skip)
        //         .limit(itemsPerPage);
        // }
        // else {
        //     games = await Game.find({ games: { $elemMatch: { result: 0 } } })
        //         .sort({ 'games.createdAt': -1 })
        //         .skip(skip)
        //         .limit(itemsPerPage);
        // }
        games = await Game.find()
                .sort({ 'games.createdAt': -1 })
                .skip(skip)
                .limit(itemsPerPage);


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

exports.deleteMatch = async (req, res) => {
    try {
        console.log("deleteMatch");
        const {matchId,gameId} = req.query;
        const deletedGame = await Game.updateOne(
            { _id: gameId }, // 컬렉션의 _id는 'games'로 가정합니다.
            { $pull: { games: { _id: matchId } } }
          );
        console.log(deletedGame);
        if (!deletedGame || !deletedGame.modifiedCount) {
            return res.status(404).json({ error: '해당 ID의 매치를 찾을 수 없습니다.' });
        }
        res.status(204).send({message:"삭제되었습니다.",deletedGame});

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: '매치를 삭제하는 중에 오류가 발생했습니다.' });
    }
}

exports.updateMatch = async (req, res) => {
    try {
        const { gameId, matchId } = req.query;
        const { home, away, result, _id, win, isPayed} = req.body;
        console.log(home,away,result,_id,win)
        // gameId로 해당 document를 찾습니다.
        const game = await Game.findById(gameId);
        
        if (!game) {
            return res.status(404).json({ error: '해당 ID의 게임을 찾을 수 없습니다.' });
        }

        // games 필드 요소 중 matchId와 일치하는 _id를 가진 요소를 찾습니다.
        const matchToUpdate = game.games.find(match => match._id.toString() === matchId);

        if (!matchToUpdate) {
            return res.status(404).json({ error: '해당 ID의 매치를 찾을 수 없습니다.' });
        }
        

        // body로 받아온 home, away, result 값을 사용하여 기존 필드 값을 업데이트합니다.
        if (home !== undefined) {
            matchToUpdate.home = home;
        }
        if (away !== undefined) {
            matchToUpdate.away = away;
        }
        if (result !== undefined) {
            matchToUpdate.result = result;
        }
        if (win !== undefined) {
            matchToUpdate.win = win;
        }
        if (_id !== undefined) {
            matchToUpdate._id = _id;
        }
        if (isPayed !== undefined) {
            matchToUpdate.isPayed = isPayed;
        }

        // 변경된 데이터를 저장합니다.
        await game.save();

        res.status(200).json({ message: '매치가 업데이트되었습니다.', updatedMatch: matchToUpdate });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: '매치를 업데이트하는 중에 오류가 발생했습니다.' });
    }
};

/**
 
자 나는 express로 백엔드 쪽 코드를 짤건데, 라우트쪽만 짜주면돼(contorller)
1. games라는 컬렉션에 접근해서
2. games 컬렉션 안에 있는 games라는 필드의 요소들 중
3. _id가 matchId인 것을 찾아서 지우는 로직을 짜줘
 */