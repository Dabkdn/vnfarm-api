const { productService } = require('@services')

const addProduct = (req, res) => {
    try {
        productService.add(req.body)
        res.sendStatus(200)
    }
    catch (err) {
        res.render('error')
    }
}
const getProducts = (req, res) => {
    productService.getAll(req.params['pageSize'], req.params['pageIndex'], req.query.sort, req.query.search).then(result => {
        res.json(result)
    }).catch(err => {
        res.status(400).send({
            message: err
        })
    })
}
const updateProduct = (req, res) => {
    try {
        productService.update(req.body)
            .then(result => {
                res.json(result)
            })
    }
    catch (err) {
        res.status(400).send({
            message: err
        })
    }
}
const deleteProduct = (req, res) => {
    try {
        productService.remove(req.body).then(result => {
            res.json(result)
        })
    }
    catch (err) {
        res.status(400).send({
            message: err
        })
    }
}
const getProduct = (req, res) => {
    try {
        productService.get(req.query.id).then(result => {
            res.json(result)
        })
    }
    catch (err) {
        res.status(400).send({
            message: err
        })
    }
}

const getUserProducts = (req, res) => {
    try {
        productService.getAll({ userId: req.params['id'] }).then(result => {
            res.json(result)
        })
    }
    catch (err) {
        res.status(400).send({
            message: err
        })
    }
}

const getProductsByCategoryId = (req, res) => {
    productService.getProductsByCategoryId(req.params['categoryId'], req.params['pageSize'], req.params['pageIndex'], req.query.sort, req.query.search)
        .then(result => {
            res.json(result)
        }).catch(err => {
            res.status(400).send({
                message: err
            })
        })
}

const getMyProducts = (req, res) => {
    const userId = req.decoded && req.decoded.userId
    productService.getMyProducts(userId, req.params['pageSize'], req.params['pageIndex'], req.query.sort, req.query.search)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(400).send({
                message: err
            })
        })
}

module.exports = {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getUserProducts,
    getProductsByCategoryId,
    getMyProducts
}