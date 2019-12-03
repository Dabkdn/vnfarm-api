const { cartService } = require('@services')

const getCarts = (req, res) => {
    try {
        cartService.getAll().then(result => {
            res.json(result)
        })
    }
    catch (err) {
        res.sendStatus(400)
    }
}

const updateCart = (req, res) => {
    try {
        cartService.update(req.body)
            .then(result => {
                res.json(result)
            })
    }
    catch (err) {
        res.sendStatus(400)
    }
}

const getCart = (req, res) => {
    try {
        cartService.get(req.query.id).then(result => {
            res.json(result)
        })
    }
    catch (err) {
        res.sendStatus(400)
    }
}

const getUserCarts = (req, res) => {
    cartService.getAll({ userId: req.params['userId'] }).then(result => {
        res.json(result)
    }).catch(err => {
        res.status(400).send({
            err
        })
    })
}
module.exports = {
    getCarts,
    getCart,
    updateCart,
    getUserCarts
}