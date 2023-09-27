const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true, // 중복되지 않아야 함
    match: /^[a-zA-Z0-9]+$/, // 영어 또는 숫자로만 구성
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  point: {
    type: Number,
    default: 1000,
  },
  nickname: {
    type: String,
    required: true,
    unique: true, // 중복되지 않아야 함
  },
  email: {
    type: String,
    required: true,
    unique: true, // 중복되지 않아야 함
    match: /^\S+@\S+\.\S+$/, // 이메일 주소 형식
  },
  admin:{
    type:Number,
    default:0
  }
});

// 중복 검사를 수행하기 위한 플러그인 추가
userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;
