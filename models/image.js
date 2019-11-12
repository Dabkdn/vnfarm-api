const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    fieldname: { type: String },
    originalname: { type: String },
    encoding: { type: String },
    mimetype: { type: String },
    destination: { type: String },
    filename: { type: String },
    path: { type: String },
    size: { type: Number }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Image', schema);