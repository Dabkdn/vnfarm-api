const mongoose = require('mongoose')
const Role = mongoose.model('Role')

const getAll = () => {
    return Role.find({}).populate('users')
}
const get = (id) => {
    return Role.findOne({_id: id}).populate('users')
}

module.exports = {
    getAll,
    get
}