const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    token: { type: String, required: true },
    userId: { type: String, required: true },
    period: { type: String, required: true },
    updatedDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Token', schema);