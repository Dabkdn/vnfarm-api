const jwt = require('jsonwebtoken')
const config = require('@config')
const mongoose = require("mongoose")
const User = mongoose.model("User")
const Token = mongoose.model("Token")
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    req.session.destroy()
    let username = req.body.username;
    let password = req.body.password;
    let mockedUsername = '';
    let mockedPassword = '';
    let user = {};
    await User.findOne({ 'username': username, status: 1 }).populate('role')
        .then(result => {
            mockedUsername = result.username
            mockedPassword = result.password
            userId = result._id
            user = result
        })

    if (username && password) {
        console.log(username, mockedUsername, password, mockedPassword)
        if (username === mockedUsername && bcrypt.compareSync(password, mockedPassword) === true) {
            let period = 24 * 60 * 60
            let token = jwt.sign(
                { userId: userId },
                config.secret,
                { expiresIn: period }
            );
            //add token to db
            await Token.update(
                { userId: userId },
                {
                    userId: userId,
                    token: token,
                    period: period,
                    updatedDate: Date()
                },
                {
                    upsert: true,
                    setDefaultsOnInsert: true
                }
            );
            res.send({
                success: true,
                message: 'Authentication successful!',
                token: token,
                user: user
            });
        } else {
            res.status(403).send({
                success: false,
                message: 'Incorrect username or password'
            });
        }
    } else {
        res.status(401).send({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
}


module.exports = {
    login
}