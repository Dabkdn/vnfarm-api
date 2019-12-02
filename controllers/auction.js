const { auctionService } = require('@services')
const schedule = require('../schedule')

const addAuction = (req, res) => {
    console.log(req.body)
    schedule.bid.bidSchedule(req.body.endTime, req.body.productId)
    try {
        auctionService.add(req.body)

        res.sendStatus(200)
    }
    catch (err) {
        res.render('error')
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