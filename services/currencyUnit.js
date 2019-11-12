const mongoose = require('mongoose')
const CurrencyUnit = mongoose.model('CurrencyUnit')

const add = (data) => {
    console.log(data)
    return CurrencyUnit.insertMany(data)
}
const getAll = () => {
    return CurrencyUnit.find({})
}
const update = (data) => {
    return CurrencyUnit.update({_id: data.id}, data)
}
const remove = (data) => {
    return CurrencyUnit.remove({_id: {$in: data}})
}
const get = (id) => {
    return CurrencyUnit.findOne({_id: id})
}

module.exports = {
    add,
    getAll,
    update,
    remove,
    get
}