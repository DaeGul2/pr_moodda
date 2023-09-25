
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');


// 게임 생성
router.post('/', gameController.createGame);


module.exports = router;
