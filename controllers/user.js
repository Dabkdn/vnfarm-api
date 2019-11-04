const { userService } = require('@services')

const addUser = async (req, res) => {
    try {
        await userService.add(req.body)
        res.status(200).send({
            message: 'register successfullly'
        })
    }
    catch (err) {
        res.status(500).send({
            message: 'failed to register. '+err
        })
    }
}
const getUsers = (req, res) => {
    try {
        userService.getAll().then(result => {
            res.json(result)
        })
    }
    catch (err) {
        res.sendStatus(400)
    }
}
const updateUser = (req, res) => {
    try {
        userService.update(req.body)
            .then(result => {
                res.json(result)
            })
    }
    catch (err) {
        res.sendStatus(400)
    }
}
const deleteUser = (req, res) => {
    try {
        userService.remove(req.body).then(result => {
            res.json(result)
        })
    }
    catch (err) {
        res.sendStatus(400)
    }
}
const getUser = (req, res) => {
    try {
        userService.get(req.query.id).then(result => {
            res.json(result)
        })
    }
    catch (err) {
        res.sendStatus(400)
    }
}

module.exports = {
    addUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}