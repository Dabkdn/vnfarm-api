const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    auctionId: {type: String, required: true},
    businessId: {type: String, required: true},
    bidMoney: { type: Number, required: true }
    //shipping infor
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Order', schema);