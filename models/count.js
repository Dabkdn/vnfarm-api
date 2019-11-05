const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    value: { type: String, default: 0 },
    description: { type: String }
});


schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Count', schema);