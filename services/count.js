const mongoose = require('mongoose')
const Count = mongoose.model('Count')

const add = (data) => {
    return Count.insertMany(data)
}
const getAll = () => {
    return Count.find({})
}
const update = (data) => {
    return Count.updateOne({_id: data.id}, data)
}
const remove = (data) => {
    return Count.remove({_id: {$in: data}})
}
const get = (id) => {
    return Count.findOne({_id: id})
}

module.exports = {
    add,
    getAll,
    update,
    remove,
    get
}