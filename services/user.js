const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt');
const constants = require('@constants')

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
            roleId: "5dbf7064e62cc872572265c8"
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
const update = (data, resolve, reject) => {
    return User.updateOne({ _id: data.id }, data, (err, raw) => {
        if (err) {
            reject(err)
        }
        else {
            resolve(raw)
        }
    })
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