const bcrypt = require('bcrypt');
const users = require('../models/usermodel.js');

module.exports.signup = async (req, res, next) => {
    try {
        const { username, password, email } = req.body
        const usernameCheck = await users.findOne({ username })
        if (usernameCheck)
            return res.json({ msg: 'username already used', status: false });
        const emailcheck = await users.findOne({ email })
        if(emailcheck)
        return res.json({ msg: "Email is already used", status: false });
        const hashpass = await bcrypt.hash(password, 10);
        const user = await users.create({
            email, username, password: hashpass
        });
        delete users.password;
        return res.json({ status: true, user });
    } catch (error) {
        next(error);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { password, email } = req.body
        const user = await users.findOne({ email })
        if (!user)
            return res.json({ msg: 'Email is not correct', status: false });
        const passwordValidation = await bcrypt.compare(password, user.password)
        if(!passwordValidation)
        return res.json({ msg: "Password is not correct", status: false });
        delete user.password;
        return res.json({ status: true, user });
    } catch (error) {
        next(error);
    }
};

module.exports.setavatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const  avatarimage  = req.body.image;
        const userData = await users.findByIdAndUpdate(userId,
            {
                isAvatarimageset:true,
                avatarimage
            })
            res.json({isSet:userData.isAvatarimageset, image:userData.avatarimage})
            
    } catch (error) {
        next(error)
    }
}

module.exports.contacts = async (req, res, next) => {
    try {
        const data = await users.find()
        res.send(data);
    } catch (error) {
        next(error);
    }
}