const mongoose = require('mongoose');

// 게시판 글(Post) 모델의 스키마 정의
const postSchema = new mongoose.Schema({
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
const Player = mongoose.model('Player', postSchema,'players');

module.exports = Player; 