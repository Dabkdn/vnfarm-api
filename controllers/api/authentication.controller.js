const jwt = require('jsonwebtoken')
const config = require('@config')
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    req.session.destroy()
    let username = req.body.username;
    let password = req.body.password;
    let mockedUsername = '';
    let mockedPassword = '';
    let userId = '';
    await User.findOne({'username': username})
    .then(result => {
        mockedUsername = result.username
        mockedPassword = result.password
        userId = result._id
    })
    
    if (username && password) {
        if (username === mockedUsername && bcrypt.compareSync(password, mockedPassword) === true) {
            let token = jwt.sign(
                {userId: userId},
                config.secret,
                { expiresIn: 15*60 }
            );
            res.send({
                success: true,
                message: 'Authentication successful!',
                token: token
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