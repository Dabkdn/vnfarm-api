const schedule = require('node-schedule')
const mongoose = require('mongoose')
const Auction = mongoose.model('Auction')
const Product = mongoose.model('Product')
const Cart = mongoose.model('Cart')

const bidSchedule = (date, productId) => {
    schedule.scheduleJob(date, () => {
        console.log(new Date(Date.now()))
        console.log('find the winner of product:', productId)
        //add id winner into auction and do something
        Auction.findOne(
            { productId: productId },
            (err, auction) => {
                if (err) {
                    console.log(err)
                }
                else {
                    if (auction.auctionDetail) {
                        const auctionDetail = Object.values(auction.auctionDetail)
                        const winner = auctionDetail && auctionDetail.reduce((maxItem, value) => value.bidMoney > maxItem.bidMoney ? value : maxItem, auctionDetail[0])
                        winner && Auction.update(
                            { productId: productId },
                            { winnerId: winner.userId },
                            (err, res) => {
                                console.log('update auction')
                                console.log(err)
                                console.log(res)
                            }
                        )
                        winner && Product.update(
                            { _id: productId },
                            { lastPrice: winner.bidMoney },
                            (err, res) => {
                                console.log('update product')
                                console.log(err)
                                console.log(res)
                            }
                        )
                        winner && Cart.insertMany(
                            {
                                auctionId: auction._id,
                                userId: winner.userId,
                                productId: productId
                            }
                        )
                    }
                }
            }
        )
    })
}

module.exports = {
    bidSchedule
}