const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt');
const constants = require('@constants')

const add = async (data) => {
    try {
        let hash = bcrypt.hashSync(data.password, constants.saltRounds);

        let userInstance = new User({
            firstName: data.firstname,
            lastName: data.lastname,
            username: data.username,
            password: hash,
            phone: data.phone,
            email: data.email,
            roleId: "5dbf7064e62cc872572265c8"
        })

        return await userInstance.save()
    }
    catch (err) {
        throw err
    }
}
const getAll = () => {
    return User.find({})
}
const update = (data) => {
    return User.update({ _id: data.id }, { value: data.value })
}
const remove = (data) => {
    return User.remove({ _id: { $in: data } })
}
const get = (id) => {
    return User.findOne({ _id: id })
}

module.exports = {
    add,
    getAll,
    update,
    remove,
    get
}