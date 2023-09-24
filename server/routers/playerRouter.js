const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');


// 모든 선수 조회 (Read)
router.get('/', playerController.getAllPlayers);


module.exports = router;
