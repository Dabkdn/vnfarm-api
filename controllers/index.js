const countController = require('./count')
const faqController = require('./faq')
const authenticationController = require('./authentication')
const userController = require('./user')
const roleController = require("./role")

module.exports = {
    faqController,
    countController,
    authenticationController,
    roleController,
    userController
}