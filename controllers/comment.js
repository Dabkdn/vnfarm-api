const { commentService } = require('@services')

const addComment = (req, res) => {
    commentService.add(req.body)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(error => {
            res.status(400).send({
                message: error
            })
        })
}
const getComments = (req, res) => {
    commentService.getCommentsByUserId(req.params['ownerId'])
        .then(result => {
            res.status(200).send(result)
        })
        .catch(error => {
            res.status(400).send({
                message: error
            })
        })
}

module.exports = {
    addComment,
    getComments
}