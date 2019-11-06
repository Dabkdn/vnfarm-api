const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    parentId: { type: String },
    logo: { type: String }
});

schema.virtual('categories',{
    ref: 'Category',
    localField: '_id',
    foreignField: 'parentId'
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Category', schema);