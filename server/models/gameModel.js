const mongoose = require('mongoose');
const {playerSchema} = require('/playerModel');

// 선수 모델의 스키마 정의
const gameSchema = new mongoose.Schema({
    game_type: {
        type: String,
        required: true,
        enum:['일대일','대학대전','PL','CK']
    },
    
});

// Post 모델 생성
const Game = mongoose.model('Game', gameSchema,'game');

module.exports = Game; 