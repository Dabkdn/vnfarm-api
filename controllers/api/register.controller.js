const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const constants = require('@constants')

const User = mongoose.model('User')

const register = async (req, res) => {
 
    try {
        let hash = bcrypt.hashSync(req.body.password, constants.saltRounds);

        let userInstance = new User({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            username: req.body.username,
            password: hash
        })
        
        await userInstance.save()

        res.status(200).send({
            message: 'register successfullly'
        })
    } catch(err) {
        res.status(500).send({
            message: 'failed to register'
        })
    }
}

module.exports = {
    register
}