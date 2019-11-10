const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    unit: { type: String, required: true },
    description: { type: String }
});


schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('CurrencyUnit', schema);