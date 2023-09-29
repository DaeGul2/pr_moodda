
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');


// 게임 생성
router.post('/', gameController.createGame);
router.get('/', gameController.getGames);
router.put('/match',gameController.updateMatch);
router.put('/:gameId', gameController.updateGame);
router.delete('/:gameId',gameController.deleteGame);
router.delete('/',gameController.deleteMatch);



module.exports = router;
