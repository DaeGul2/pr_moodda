const mongoose = require('mongoose');
const { playerSchema } = require('/playerModel');

const subGame = new mongoose.Schema({
    home: { playerSchema },
    away: { playerSchema },
    result: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})

// 선수 모델의 스키마 정의
const gameSchema = new mongoose.Schema({
    game_type: {
        type: String,
        required: true,
        enum: ['1v1', 'nvm']
    },
    memo: {
        type: String,
    },
    games: [subGame],



}, {
    timestamps: true
});

// Post 모델 생성
const Game = mongoose.model('Game', gameSchema, 'game');

module.exports = Game; 