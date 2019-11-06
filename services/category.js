const mongoose = require('mongoose')
const Category = mongoose.model('Category')

const add = (data) => {
    return Category.insertMany(data)
}
const getAll = () => {
    return Category.find({})
}
const getParentOnly = () => {
    return Category.find({parentId: null})
}

const getParentWithChilds = () => {
    return Category.find({parentId: null}).populate("categories")
}
const update = (data) => {
    return Category.updateOne({_id: data.id}, data)
}
const remove = (data) => {
    return Category.remove({_id: {$in: data}})
}
const get = (id) => {
    return Category.findOne({_id: id})
}

module.exports = {
    add,
    getAll,
    update,
    remove,
    get,
    getParentOnly,
    getParentWithChilds
}