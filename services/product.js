const mongoose = require('mongoose')
const Product = mongoose.model('Product')

const add = (data) => {
    return Product.insertMany(data)
}
const getAll = () => {
    return Product.find({})
}
const update = (data) => {
    return Product.update({_id: data.id}, data)
}
const remove = (data) => {
    return Product.remove({_id: {$in: data}})
}
const get = (id) => {
    return Product.findOne({_id: id})
}

module.exports = {
    add,
    getAll,
    update,
    remove,
    get
}