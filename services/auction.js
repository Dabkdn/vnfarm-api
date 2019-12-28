const mongoose = require('mongoose')
const Auction = mongoose.model('Auction')

const add = (data) => {
    return Auction.insertMany(data)
}
const getAll = () => {
    return Auction.find({})
}

const getUserAuctions = (userId) => {
    return Auction.find({
        ownerId: userId
    }).populate('product')
}
const update = (data) => {
    return Auction.updateOne({ _id: data.id }, data)
}
const remove = (data) => {
    return Auction.remove({ _id: { $in: data } })
}
const get = (id) => {
    return Auction.findOne({ _id: id })
}

module.exports = {
    add,
    getAll,
    update,
    remove,
    get,
    getUserAuctions
}