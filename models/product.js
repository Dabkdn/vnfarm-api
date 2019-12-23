const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const productSchema = new Schema({
    name: { type: String, unique: true, required: true },
    nameSlug: { type: String },
    status: { type: Number, default: 1 },
    code: { type: String },
    price: { type: Number },
    lastPrice: { type: Number },
    unitId: { type: Schema.Types.ObjectId, required: true },
    quantity: { type: Number },
    mass: { type: Number },
    expiryDate: { type: Date, default: Date.now },
    images: { type: Array },
    description: { type: String, defaul: "" },
    userId: { type: Schema.Types.ObjectId, required: true },
    categoryId: { type: Schema.Types.ObjectId, required: true },
    createdDate: { type: Date, default: Date.now }
});

productSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

productSchema.virtual('auction', {
    ref: 'Auction',
    localField: '_id',
    foreignField: 'productId',
    justOne: true
});

productSchema.virtual('unit', {
    ref: 'CurrencyUnit',
    localField: 'unitId',
    foreignField: '_id',
    justOne: true
});

productSchema.set('toJSON', { virtuals: true });

const productValidation = (product) => {
    const schema = Joi.object().keys({
        name: Joi.string().required().min(5),
        code: Joi.string(),
        price: Joi.number().greater(0),
        quantity: Joi.number().greater(0),
        mass: Joi.number().greater(0),
        unitId: Joi.required(),
        userId: Joi.required(),
        images: Joi.array().required().items(Joi.string().required()),
        categoryId: Joi.required(),
        expiryDate: Joi.date().required()

    })
    return Joi.validate(product, schema, { abortEarly: false });
}

const updateProductValidation = (product) => {
    const schema = Joi.object().keys({
        name: Joi.string().required().min(5),
        code: Joi.string(),
        price: Joi.number().greater(0),
        quantity: Joi.number().greater(0),
        mass: Joi.number().greater(0),
        unitId: Joi.required(),
        // images: Joi.array().required().items(Joi.string().required()),
        categoryId: Joi.required()

    })
    return Joi.validate(product, schema, { abortEarly: false });
}

module.exports = {
    Product: mongoose.model('Product', productSchema),
    productValidation,
    updateProductValidation
}