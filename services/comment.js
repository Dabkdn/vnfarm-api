const mongoose = require('mongoose')
const Comment = mongoose.model('Comment')

const add = (data) => {
    console.log(data)
    return Comment.insertMany(data)
}
const getCommentsByUserId = (ownerId) => {
    return Comment.find({
        ownerId: ownerId
    }).populate('owner').populate('user')
}

module.exports = {
    add,
    getCommentsByUserId
}