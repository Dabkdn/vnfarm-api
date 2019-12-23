const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt');
const constants = require('@constants')
const config = require('@config')

const add = async (data) => {
    try {
        let hash = bcrypt.hashSync(data.password, constants.saltRounds);

        let userInstance = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            username: data.username,
            password: hash,
            phone: data.phone,
            email: data.email,
            address: data.address,
            birthday: data.birthday,
            avatar: data.avatar,
            roleId: config.commonRole
        })

        return await userInstance.save()
    }
    catch (err) {
        throw err
    }
}
const getAll = () => {
    return User.find({}).populate("role")
}
const update = (data) => {
    return User.updateOne({ _id: data.id }, data)
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