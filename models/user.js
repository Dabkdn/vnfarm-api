const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    status: { type: Number, default: 1 },
    birthday: { type: Date },
    gender: { type: Boolean },
    address: { type: String },
    phone: { type: String, unique: true, required: true },
    email: { type: String, lowercase: true, unique: true, required: true },
    avatar: { type: String, default: "/assets/images/avatar/default-user.png" },
    roleId: { type: Schema.Types.ObjectId },
    createdDate: { type: Date, default: Date.now }
});

schema.virtual('role',{
    ref: 'Role',
    localField: 'roleId',
    foreignField: '_id',
    justOne: true
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);