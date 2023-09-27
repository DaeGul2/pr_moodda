const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const { email, password, nickname, user_id } = req.body;
        const hash = await bcrypt.hash(password, 12);//비밀번호로 해시, work factor : 숫자 클수
        const user = new User({
            email,//유저네임은 그대로
            password: hash, //비밀번호는 해시된거로
            nickname,
            user_id
        });
        await user.save();//데이터베이스에 저장
        res.status(201).json(user);
    } catch (e) {

        res.status(500).json(e);

    }
}


