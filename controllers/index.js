const countController = require('./count')
const faqController = require('./faq')
const authenticationController = require('./authentication')
const userController = require('./user')
const roleController = require("./role")
const categoryController = require('./category')

module.exports = {
    faqController,
    countController,
    authenticationController,
    roleController,
    userController,
    categoryController
}