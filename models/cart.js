const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    auctionId: { type: Schema.Types.ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    productId: { type: Schema.Types.ObjectId, required: true },
    shippingDate: { type: Date, default: null },
    shippingTo: { type: String, default: null },
    createdDate: { type: Date, default: Date.now },
    status: { type: String, default: 'created' }
    //shipping infor
});

schema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

schema.virtual('product', {
    ref: 'Product',
    localField: 'productId',
    foreignField: '_id',
    justOne: true
});

schema.virtual('auction', {
    ref: 'Auction',
    localField: 'auctionId',
    foreignField: '_id',
    justOne: true
});
schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Cart', schema);