const { productService } = require('@services')
const { product } = require('@models')

const addProduct = (req, res) => {
    const data = {
        userId: req.body.userId,
        name: req.body.name,
        code: req.body.code,
        price: req.body.price,
        unitId: req.body.unitId,
        categoryId: req.body.categoryId,
        mass: req.body.mass,
        images: req.body.images,
        quantity: req.body.quantity
    }
    const { error } = product.productValidation(data)
    if (error) {
        res.status(400).send(error.details)
    }
    else {
        productService.add([req.body])
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
    const data = {
        name: req.body.name,
        code: req.body.code,
        price: req.body.price,
        unitId: req.body.unitId,
        categoryId: req.body.categoryId,
        mass: req.body.mass,
        quantity: req.body.quantity
    }
    const { error } = product.updateProductValidation(data)
    if (error) {
        res.status(400).send(error.details)
    }
    else {
        productService.update(req.body)
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
const deleteProduct = (req, res) => {
    console.log(req.body)
    productService.update(req.body)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(400).send({
                message: err
            })
        })
}
const getProduct = (req, res) => {
    productService.get(req.query.id)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(400).send({
                message: err
            })
        })
}

const getUserProducts = (req, res) => {
    productService.getUserProducts(req.params['id'], req.params['pageSize'], req.params['pageIndex'], req.query.sort, req.query.search)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(400).send({
                message: err
            })
        })
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