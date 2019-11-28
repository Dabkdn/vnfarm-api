const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    token: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    period: { type: String, required: true },
    updatedDate: { type: Date, default: Date.now }
});

schema.virtual('user',{
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Token', schema);