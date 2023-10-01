const mongoose = require('mongoose');



const subBettingSchema = new mongoose.Schema({
    match_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true,
    },
    selected_team : {
        type:String,
        required: true,
        enum : ['home','away']
    }
})

const bettingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // 'User'는 users 컬렉션의 모델명입니다.
        required: true,
    },
    sub_bettings: [subBettingSchema]
    ,
    points: {
        type: Number,
        required: true,
    },

},{
    timestamps:true
});

const Betting = mongoose.model('Betting', bettingSchema);

module.exports = Betting;



// const mongoose = require('mongoose');

// const bettingSchema = new mongoose.Schema({
//     user_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User', // 'User'는 users 컬렉션의 모델명입니다.
//         required: true,
//     },
//     game_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Game',
//         required: true,
//     },
//     team: {
//         type: String,
//         required: true,
//     },
//     points: {
//         type: Number,
//         required: true,
//     },

// },{
//     timestamps:true
// });

// const Betting = mongoose.model('Betting', bettingSchema);

// module.exports = Betting;
