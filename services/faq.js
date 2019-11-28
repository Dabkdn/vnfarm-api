const mongoose = require('mongoose')
const FAQ = mongoose.model('FAQ')

const add = (data) => {
    return FAQ.insertMany(data)
}
const getAll = () => {
    return FAQ.find({})
}
const update = (data) => {
    return FAQ.update({_id: data.id}, data)
}
const remove = (data) => {
    return FAQ.remove({_id: {$in: data}})
}
const get = (id) => {
    return FAQ.findOne({_id: id})
}

module.exports = {
    add,
    getAll,
    update,
    remove,
    get
}