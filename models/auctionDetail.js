const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    auctionId: {type: String, required: true},
    userId: {type: String, required: true},
    bidMoney: { type: Number, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('AuctionDetail', schema);