const mongoose = require('mongoose');

// 선수 모델의 스키마 정의
const playerSchema = new mongoose.Schema({
    player_name: {
        type: String,
        required: true,
    },
    player_uni: {
        type: String,
        required: true,
    },
     player_tear: {
        type: String,
        required: true,
    },
     player_tpz: {
        type: String,
        required: true,
    },
     sex: {
        type: String,
        required: true,
    },
});

// Post 모델 생성
const Player = mongoose.model('Player', playerSchema,'players');

module.exports = Player; 