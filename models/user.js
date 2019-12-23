const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const userSchema = new Schema({
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

userSchema.virtual('role', {
    ref: 'Role',
    localField: 'roleId',
    foreignField: '_id',
    justOne: true
});

const userValidation = (user) => {
    const schema = Joi.object().keys({
        username: Joi.string().required().min(6),
        password: Joi.string().required().regex(/^[a-zA-Z0-9]{3,30}$/),
        lastName: Joi.string().required(),
        firstName: Joi.string().required(),
        birthday: Joi.date().required(),
        gender: Joi.boolean(),
        phone: Joi.string().required().regex(/^[0-9]{9,11}$/),
        email: Joi.string().email({ minDomainAtoms: 2 })

    })
    return Joi.validate(user, schema, { abortEarly: false });
}

const updateUserValidation = (user) => {
    const schema = Joi.object().keys({
        lastName: Joi.string().required(),
        firstName: Joi.string().required(),
        birthday: Joi.date().required(),
        gender: Joi.boolean(),
        phone: Joi.string().required().regex(/^[0-9]{9,11}$/),
        email: Joi.string().email({ minDomainAtoms: 2 })

    })
    return Joi.validate(user, schema, { abortEarly: false });
}

userSchema.set('toJSON', { virtuals: true });

module.exports = {
    User: mongoose.model('User', userSchema),
    userValidation,
    updateUserValidation
};