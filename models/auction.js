const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    ownerId: { type: Schema.Types.ObjectId, required: true },
    productId: { type: Schema.Types.ObjectId, required: true, unique: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    winnerId: { type: Schema.Types.ObjectId, default: null },
    createdDate: { type: Date, default: Date.now },
    auctionDetail: { type: Object, default: null }
    //check start < end
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Auction', schema);