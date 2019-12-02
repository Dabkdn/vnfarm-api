const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    auctionId: { type: String, required: true },
    orderDate: { type: Date, required: true },
    shippingDate: { type: Date, required: true },
    shippingTo: { type: String, required: true },
    total: { type: Number, required: true },
    createdDate: { type: Date, default: Date.now }
    //shipping infor
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Cart', schema);