const {faqService} = require('@services')

const addFAQ = (req, res) => {
    try {
        faqService.add(req.body)
        res.sendStatus(200)
    }
    catch(err) {
        res.render('error')
    }
}
const getFAQs = (req, res) => {
    try {
        faqService.getAll().then(result => {
            res.json(result)
        })
    }
    catch(err) {
        res.status(400).send({
            message: err
        })
    }
}
const updateFAQ = (req, res) => {
    try {
        faqService.update(req.body)
        .then(result=> {
            res.json(result)
        })
    }
    catch(err) {
        res.status(400).send({
            message: err
        })
    }
}
const deleteFAQ = (req, res) => {
    try {
        faqService.remove(req.body).then(result => {
            res.json(result)
        })
    }
    catch(err) {
        res.status(400).send({
            message: err
        })
    }
}
const getFAQ = (req, res) => {
    try {
        faqService.get(req.query.id).then(result => {
            res.json(result)
        })
    }
    catch(err) {
        res.status(400).send({
            message: err
        })
    }
}

module.exports = {
    addFAQ,
    getFAQs,
    getFAQ,
    updateFAQ,
    deleteFAQ
}