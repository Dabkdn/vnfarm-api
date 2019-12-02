// const d1 = new Date("Nov 06 2019");

// console.log(d1)

// // const current = new Date(Date.now())
// // console.log(current.toString())

// const isoDate = d1.toISOString()

// console.log(isoDate);

// console.log(Date.parse(isoDate))

// console.log((new Date(Date.parse(isoDate))))

// console.log((new Date('2019-11-05T17:00:00.000Z')).toLocaleString())

const a = {
    "_id": "5dcf9380a1cfef2802e1696f",
    "winnerId": null,
    "ownerId": "5dc3eae4723e4d2f139fce26",
    "productId": "5dcbbe3032739d68b1af0892",
    "startTime": "2019-11-08T00:00:00.000Z",
    "endTime": "2019-11-20T00:00:00.000Z",
    "createdDate": "2019-11-16T06:13:20.926Z",
    "auctionDetail": {
        "5dd34d879e96d22435a2e666": {
            "userId": "5dd34d879e96d22435a2e666",
            "bidMoney": "4",
            "updatedDate": "2019-11-20T02:30:18.022Z"
        },
        "5dd2510c9e17e42fc11e596d": {
            "userId": "5dd2510c9e17e42fc11e596d",
            "bidMoney": "1",
            "updatedDate": "2019-11-20T03:59:58.158Z"
        },
        "abc": {
            "userId": "abc",
            "bidMoney": "5",
            "updatedDate": "2019-11-20T03:59:58.158Z"
        }
    }
}

if (a.auctionDetail) {
    const auctionDetail = Object.values(a.auctionDetail)
    const winner = auctionDetail && auctionDetail.reduce((maxItem, value) => value.bidMoney > maxItem.bidMoney ? value : maxItem, auctionDetail[0])
    console.log(winner)
}
