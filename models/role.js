const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String, required: true},
    createdDate: { type: Date, default: Date.now }
    // users: [{type: Schema.Types.ObjectId, ref: 'User', field: 'roleId'}]
});

//user ref
schema.virtual('users',{
    ref: 'User',
    localField: '_id',
    foreignField: 'roleId'
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Role', schema);