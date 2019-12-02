const mongoose = require('mongoose')
const Product = mongoose.model('Product')

const add = (data) => {
    console.log(data);
    
    return Product.insertMany(data)
}
const getAll = (option = {}) => {
    return Product.find(option).populate('auction').populate('unit')
}
const update = (data) => {
    return Product.update({ _id: data.id }, data)
}
const remove = (data) => {
    return Product.remove({ _id: { $in: data } })
}
const get = (id, populate = '') => {
    return Product.findOne({ _id: id }).populate('auction').populate('user').populate('unit')
}

module.exports = {
    add,
    getAll,
    update,
    remove,
    get
}