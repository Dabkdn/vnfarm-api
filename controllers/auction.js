const { auctionService, productService } = require('@services')
const schedule = require('../schedule')
const { auction } = require('@models')

const addAuction = (req, res) => {
    const { error } = auction.auctionValidation(req.body)
    if (error) {
        res.status(400).send(error.details)
    }
    else {
        schedule.bid.bidSchedule(req.body.endTime, req.body.productId)
        auctionService.add(req.body)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }
}
const getAuctions = (req, res) => {
    try {
        auctionService.getAll().then(result => {
            res.json(result)
        })
    }
    catch (err) {
        res.sendStatus(400)
    }
}
const updateAuction = (req, res) => {
    try {
        auctionService.update(req.body)
            .then(result => {
                res.json(result)
            })
    }
    catch (err) {
        res.sendStatus(400)
    }
}
const deleteAuction = (req, res) => {
    try {
        auctionService.remove(req.body).then(result => {
            res.json(result)
        })
    }
    catch (err) {
        res.sendStatus(400)
    }
}
const getAuction = (req, res) => {
    try {
        auctionService.get(req.query.id).then(result => {
            res.json(result)
        })
    }
    catch (err) {
        res.sendStatus(400)
    }
}

module.exports = {
    addAuction,
    getAuctions,
    getAuction,
    updateAuction,
    deleteAuction
}