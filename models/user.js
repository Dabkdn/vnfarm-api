const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    status: { type: Number, default: 0 },
    birthDate: { type: Date },
    address: { type: String },
    phone: { type: String, unique: true, required: true },
    email: { type: String, lowercase: true, unique: true, required: true },
    roleId: { type: String },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);