
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');


// 게임 생성
router.post('/', gameController.createGame);
router.get('/', gameController.getGames);
router.put('/:gameId', gameController.updateGame);
router.delete('/:gameId',gameController.deleteGame);


module.exports = router;
