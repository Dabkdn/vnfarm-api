const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    productId: {type: String, required: true},
    businessId: {type: String, required: true},
    //check start < end
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Auction', schema);