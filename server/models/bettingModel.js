const mongoose = require('mongoose');

const bettingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // 'User'는 users 컬렉션의 모델명입니다.
        required: true,
    },
    game_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true,
    },
    team: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },

},{
    timestamps:true
});

const Betting = mongoose.model('Betting', bettingSchema);

module.exports = Betting;
