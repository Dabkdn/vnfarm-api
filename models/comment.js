const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    ownerId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

schema.virtual('owner', {
    ref: 'User',
    localField: 'ownerId',
    foreignField: '_id',
    justOne: true
});

schema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

module.exports = mongoose.model('Comment', schema);