const mongoose = require('mongoose')
const Auction = mongoose.model('Auction')
const jwt = require('jsonwebtoken');
const config = require('@config')

const bidSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('A client connected')

        socket.emit('hello', 'NKH')

        socket.on("bidmoney", async (data) => {
            const decoded = jwt.verify(data.token, config.secret)

            const userId = decoded && decoded.userId

            await Auction.findById(data.auctionId).then(result => {
                const auctionDetail = result.auctionDetail && Object.values(result.auctionDetail)
                const tempWinner = auctionDetail && auctionDetail.reduce((maxItem, value) => value.bidMoney > maxItem.bidMoney ? value : maxItem, auctionDetail[0])
                let max = tempWinner ? tempWinner.bidMoney : 0
                if (data.bidMoney < max) {
                    socket.emit('invalid money', 'bid money is small')
                }
                else {
                    const oldAuctionDetail = result.auctionDetail
                    Auction.update(
                        { _id: data.auctionId },
                        {
                            auctionDetail: {
                                ...oldAuctionDetail,
                                [userId]: {
                                    userId: userId,
                                    bidMoney: data.bidMoney,
                                    updatedDate: (new Date)
                                }
                            }
                        },
                        (err, res) => {
                            if (err) socket.emit('error', err)
                        }
                    )
                }
            })
            await Auction.findById(data.auctionId).then(result => {
                io.sockets.emit("tenders", result)
            })
        })

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    })
}

module.exports = {
    bidSocket
}