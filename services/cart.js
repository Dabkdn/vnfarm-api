const mongoose = require('mongoose')
const Cart = mongoose.model('Cart')

const getAll = (option = {}) => {
    return Cart.find(option).populate('user').populate('product').populate('auction')
}

const update = (data) => {
    return Cart.updateOne({ _id: data.id }, data)
}

const get = (id) => {
    return Cart.findOne({ _id: id })
}

module.exports = {
    getAll,
    update,
    get
}