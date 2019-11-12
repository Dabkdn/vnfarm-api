const mongoose = require('mongoose')
const Image = mongoose.model('Image')

const add = (data) => {
    return Image.insertMany(data)
}
const getAll = () => {
    return Image.find({})
}
const update = (data) => {
    return Image.update({_id: data.id}, data)
}
const remove = (data) => {
    return Image.remove({_id: {$in: data}})
}
const get = (id) => {
    return Image.findOne({_id: id})
}

module.exports = {
    add,
    getAll,
    update,
    remove,
    get
}