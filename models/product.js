const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    nameSlug: { type: String },
    status: { type: Number, default: 0 },
    code: { type: String },
    price: { type: Number },
    unitId: { type: Schema.Types.ObjectId, required: true },
    images: { type: Array },
    description: { type: String },
    userId: { type: Schema.Types.ObjectId, required: true },
    categoryId: { type: Schema.Types.ObjectId, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.virtual('user',{
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

schema.virtual('auction',{
    ref: 'Auction',
    localField: '_id',
    foreignField: 'productId',
    justOne: true
});

schema.virtual('unit',{
    ref: 'CurrencyUnit',
    localField: 'unitId',
    foreignField: '_id',
    justOne: true
});
schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', schema);