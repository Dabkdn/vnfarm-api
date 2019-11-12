const {currencyUnitService} = require('@services')

const addCurrencyUnit = (req, res) => {
    try {
        console.log(req.body)
        currencyUnitService.add(req.body)
        res.sendStatus(200)
    }
    catch(err) {
        res.render('error')
    }
}
const getCurrencyUnits = (req, res) => {
    try {
        currencyUnitService.getAll().then(result => {
            res.json(result)
        })
    }
    catch(err) {
        res.status(400).send({
            message: err
        })
    }
}
const updateCurrencyUnit = (req, res) => {
    try {
        currencyUnitService.update(req.body)
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
const deleteCurrencyUnit = (req, res) => {
    try {
        currencyUnitService.remove(req.body).then(result => {
            res.json(result)
        })
    }
    catch(err) {
        res.status(400).send({
            message: err
        })
    }
}
const getCurrencyUnit = (req, res) => {
    try {
        currencyUnitService.get(req.query.id).then(result => {
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
    addCurrencyUnit,
    getCurrencyUnits,
    getCurrencyUnit,
    updateCurrencyUnit,
    deleteCurrencyUnit
}