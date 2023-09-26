const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');


// 모든 선수 조회 (Read)
router.get('/', playerController.getAllPlayers);

// 선수 정보 변경(개개인 별로)
router.put('/:player_id', playerController.updatePlayer);

// 선수 정보 아예 싹 다 조회
router.get('/all', playerController.getEveryPlayers);


module.exports = router;
