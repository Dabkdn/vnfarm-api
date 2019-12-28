const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const auctionSchema = new Schema({
    ownerId: { type: Schema.Types.ObjectId, required: true },
    productId: { type: Schema.Types.ObjectId, required: true, unique: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    winnerId: { type: Schema.Types.ObjectId, default: null },
    createdDate: { type: Date, default: Date.now },
    auctionDetail: { type: Object, default: null }
});

auctionSchema.set('toJSON', { virtuals: true });

const auctionValidation = (auction) => {
    const schema = Joi.object().keys({
        startTime: Joi.date().required(),
        endTime: Joi.date().required().greater(Joi.ref('startTime')),
        ownerId: Joi.required(),
        productId: Joi.required()

    })
    return Joi.validate(auction, schema, { abortEarly: false });
}

auctionSchema.virtual('product', {
    ref: 'Product',
    localField: 'productId',
    foreignField: '_id',
    justOne: true
});

module.exports = {
    auction: mongoose.model('Auction', auctionSchema),
    auctionValidation
};