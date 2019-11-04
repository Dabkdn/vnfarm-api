const {countService} = require('@services')

const addCount = (req, res) => {
    try {
        countService.add(req.body)
        res.sendStatus(200)
    }
    catch(err) {
        res.render('error')
    }
}
const getCounts = (req, res) => {
    try {
        countService.getAll().then(result => {
            res.json(result)
        })
    }
    catch(err) {
        res.sendStatus(400)
    }
}
const updateCount = (req, res) => {
    try {
        countService.update(req.body)
        .then(result=> {
            res.json(result)
        })
    }
    catch(err) {
        res.sendStatus(400)
    }
}
const deleteCount = (req, res) => {
    try {
        countService.remove(req.body).then(result => {
            res.json(result)
        })
    }
    catch(err) {
        res.sendStatus(400)
    }
}
const getCount = (req, res) => {
    try {
        countService.get(req.query.id).then(result => {
            res.json(result)
        })
    }
    catch(err) {
        res.sendStatus(400)
    }
}

module.exports = {
    addCount,
    getCounts,
    getCount,
    updateCount,
    deleteCount
}