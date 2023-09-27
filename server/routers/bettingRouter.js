
const express = require('express');
const router = express.Router();
const bettingController = require('../controllers/bettingController');


// 게임 생성
router.post('/', bettingController.createBet);


module.exports = router;
