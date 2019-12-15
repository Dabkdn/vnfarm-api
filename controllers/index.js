const countController = require('./count')
const faqController = require('./faq')
const authenticationController = require('./authentication')
const userController = require('./user')
const roleController = require("./role")
const categoryController = require('./category')
const productController = require('./product')
const currencyUnitController = require('./currencyUnit')
const imageController = require('./image')
const auctionController = require('./auction')
const cartController = require('./cart')
const commentController = require('./comment')

module.exports = {
    faqController,
    countController,
    authenticationController,
    roleController,
    userController,
    categoryController,
    productController,
    currencyUnitController,
    imageController,
    auctionController,
    cartController,
    commentController
}