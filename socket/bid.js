const mongoose = require('mongoose')
const Auction = mongoose.model('Auction')

const bidSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('A client connected')

        socket.emit('hello', 'NKH')

        socket.on("bidmoney", async (data, callback) => {
            console.log(JSON.stringify(data, 0, 2))
            //add auction detail to auction table
            console.log(data.auctionId)
            await Auction.findById(data.auctionId).then(result=> {
                const oldAuctionDetail = result.auctionDetail
                Auction.update(
                    { _id: data.auctionId },
                    {
                        auctionDetail: {
                            ...oldAuctionDetail,
                            [data.userId]: {
                                userId: data.userId,
                                bidMoney: data.bidMoney,
                                updatedDate: (new Date)
                            }
                        }
                    },
                    (err, res) => {
                        console.log(err, res)
                    }
                )
            })
            Auction.findById(data.auctionId).then(result => {
                socket.emit("tenders", result)
            })
            
            callback("successfuly")
        })

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    })
}

module.exports = {
    bidSocket
}