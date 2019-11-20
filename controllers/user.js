const { userService } = require('@services')

const addUser = async (req, res) => {
    try {
        await userService.add(req.body).then((user) => {
            res.status(200).send(user)
        })
    }
    catch (err) {
        res.status(400).send({
            message: 'failed to register. ' + err
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
        res.status(400).send({
            message: err
        })
    }
}
const updateUser = (req, res) => {
    userService.update(req.body, (result) => {
        res.status(200).send(result)
    }, (error) => {
        res.status(400).send(error)
    })
}
const deleteUser = (req, res) => {
    try {
        userService.remove(req.body).then(result => {
            res.status(200).send(result)
        })
    }
    catch (err) {
        res.status(400).send({
            message: err
        })
    }
}
const getUser = (req, res) => {
    try {
        if (req.query.id && req.query.id != null) {
            userService.get(req.query.id).then(result => {
                res.json(result)
            })
        }
        else {
            throw "id is required"
        }

    }
    catch (err) {
        res.status(400).send({
            message: err
        })
    }
}

const getMe = (req, res) => {
    const userId = req.decoded && req.decoded.userId
    try {
        userService.get(userId).then(result => {
            res.json(result)
        })
    }
    catch (err) {
        res.status(400).send({
            message: err
        })
    }
}

module.exports = {
    addUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getMe
}