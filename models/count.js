const mongoose = require('mongoose')

const Schema = mongoose.Schema

const countSchema = new Schema({
    value: {type: Number, default: 0}
});

const dataMigrate = [];

countSchema.statics.getMigrateData = function () {
    return dataMigrate;
}

module.exports = mongoose.model('Count', countSchema)