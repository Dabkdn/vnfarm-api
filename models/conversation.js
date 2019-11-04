const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    ownerId: { type: String, required: true },
    tenderId: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Conversation', schema);