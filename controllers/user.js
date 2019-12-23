const { userService } = require('@services')
const { user } = require('@models')

const addUser = async (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        gender: req.body.gender,
        phone: req.body.phone,
        email: req.body.email
    }
    const { error } = user.userValidation(data)
    if (error) {
        res.status(400).send(error.details)
    }
    else {
        userService.add(req.body)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.status(400).send({
                    message: err
                })
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
    // userService.update(req.body, (result) => {
    //     res.status(200).send(result)
    // }, (error) => {
    //     res.status(400).send(error)
    // })
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        gender: req.body.gender,
        phone: req.body.phone,
        email: req.body.email
    }
    const { error } = user.updateUserValidation(data)
    if (error) {
        res.status(400).send(error.details)
    }
    else {
        userService.update(req.body)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.status(400).send({
                    message: err
                })
            })
    }
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
        userService.get(req.query.id).then(result => {
            res.json(result)
        })
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