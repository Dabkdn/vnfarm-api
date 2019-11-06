const {categoryService} = require('@services')

const addCategory = (req, res) => {
    try {
        categoryService.add(req.body)
        
        res.sendStatus(200)
    }
    catch(err) {
        res.render('error')
    }
}
const getCategories = (req, res) => {
    try {
        categoryService.getAll().then(result => {
            res.json(result)
        })
    }
    catch(err) {
        res.sendStatus(400)
    }
}
const getParentCategoryWithChilds = (req, res) => {
    try {
        categoryService.getParentWithChilds().then(result => {
            res.json(result)
        })
    }
    catch(err) {
        res.sendStatus(400)
    }
}
const updateCategory = (req, res) => {
    try {
        categoryService.update(req.body)
        .then(result=> {
            res.json(result)
        })
    }
    catch(err) {
        res.sendStatus(400)
    }
}
const deleteCategory = (req, res) => {
    try {
        categoryService.remove(req.body).then(result => {
            res.json(result)
        })
    }
    catch(err) {
        res.sendStatus(400)
    }
}
const getCategory = (req, res) => {
    try {
        categoryService.get(req.query.id).then(result => {
            res.json(result)
        })
    }
    catch(err) {
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