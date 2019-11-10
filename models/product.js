const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    nameSlug: { type: String },
    status: { type: Number, default: 0 },
    code: { type: String },
    price: { type: Number },
    unitId: { type: String, required: true },
    images: { type: Array },
    description: { type: String },
    userId: { type: String, required: true },
    categoryId: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', schema);