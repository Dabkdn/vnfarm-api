const { categoryService } = require('@services')

const addCategory = (req, res) => {
    try {
        categoryService.add(req.body).then(category => {
            res.status(200).send(category)
        }).catch(err => {
            res.status(400).send({
                message: 'error: ' + err
            })
        })
    }
    catch (err) {
        res.status(400).send({
            message: 'error: ' + err
        })
    }
}
const getCategories = (req, res) => {
    try {
        categoryService.getAll().then(result => {
            res.json(result)
        })
    }
    catch (err) {
        res.sendStatus(400)
    }
}
const getParentCategoryWithChilds = (req, res) => {
    try {
        categoryService.getParentWithChilds().then(result => {
            res.json(result)
        })
    }
    catch (err) {
        res.sendStatus(400)
    }
}
const updateCategory = (req, res) => {
    try {
        categoryService.update(req.body)
            .then(result => {
                res.json(result)
            })
    }
    catch (err) {
        res.sendStatus(400)
    }
}
const deleteCategory = (req, res) => {
    try {
        categoryService.remove(req.body).then(result => {
            res.json(result)
        })
    }
    catch (err) {
        res.sendStatus(400)
    }
}
const getCategory = (req, res) => {
    try {
        categoryService.get(req.query.id).then(result => {
            res.json(result)
        })
    }
    catch (err) {
        res.sendStatus(400)
    }
}

module.exports = {
    addCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
    getParentCategoryWithChilds
}