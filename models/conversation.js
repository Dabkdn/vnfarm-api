const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    tenderId: { type: Schema.Types.ObjectId, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Conversation', schema);