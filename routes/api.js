const router = require('express').Router()
const {
    faqController,
    authenticationController,
    countController,
    userController,
    roleController,
    categoryController,
    productController,
    currencyUnitController,
    imageController,
    auctionController,
    cartController
} = require('../controllers/index')

const {
    login
} = require('../middlewares')

//count routers
router.post('/delete/count', countController.deleteCount)
router.post('/count', countController.addCount)
router.get('/counts', countController.getCounts)
router.get('/count', countController.getCount)
router.put('/count', countController.updateCount)

router.post('/login', authenticationController.login)

//faq routers
router.post('/delete/faq', login.checkToken, login.checkPermission, faqController.deleteFAQ)
router.post('/faq', faqController.addFAQ)
router.get('/faqs', faqController.getFAQs)
router.get('/faq', faqController.getFAQ)
router.put('/faq', faqController.updateFAQ)

//user routers
router.post('/delete/user', login.checkToken, login.checkPermission, userController.deleteUser)
router.post('/user', userController.addUser)
router.get('/users', userController.getUsers)
router.get('/user', userController.getUser)
router.get('/user/me', login.checkToken, userController.getMe)
router.put('/user', userController.updateUser)

//role routers //REMEMBER ADD PERMISSION LATER
router.get('/roles', roleController.getRoles)
router.get('/role', roleController.getRole)

//category routers
router.post('/delete/category', categoryController.deleteCategory)
router.post('/category', categoryController.addCategory)
router.get('/categories', categoryController.getCategories)
router.get('/category', categoryController.getCategory)
router.put('/category', categoryController.updateCategory)
router.get('/category/parentwithchild', categoryController.getParentCategoryWithChilds)

//product routers
router.post('/delete/product', productController.deleteProduct)
router.post('/product', productController.addProduct)
router.get('/products', productController.getProducts)
router.get('/product', productController.getProduct)
router.put('/product', productController.updateProduct)
router.get('/products/user/:id', productController.getUserProducts)
router.get('/myproducts', login.checkToken, productController.getMyProducts)
router.get('/products/category/:categoryId', productController.getProductsByCategoryId)

//unit routers
router.post('/delete/unit', currencyUnitController.deleteCurrencyUnit)
router.post('/unit', currencyUnitController.addCurrencyUnit)
router.get('/units', currencyUnitController.getCurrencyUnits)
router.get('/unit', currencyUnitController.getCurrencyUnit)
router.put('/unit', currencyUnitController.updateCurrencyUnit)


//auction routers
router.post('/delete/auction', auctionController.deleteAuction)
router.post('/auction', auctionController.addAuction)
router.get('/auctions', auctionController.getAuctions)
router.get('/auction', auctionController.getAuction)
router.put('/auction', auctionController.updateAuction)

//cart routers
router.get('/cart', cartController.getCart)
router.get('/carts', cartController.getCarts)
router.put('/cart', cartController.updateCart)
router.get('/carts/user/:userId', cartController.getUserCarts)

const mongoose = require('mongoose')
const Token = mongoose.model('Token')

const getTokens = (req, res) => {
    return Token.find({}).populate('user').then(tokens => {
        // const result = tokens[0] && tokens.map(item => ({
        //     _id: item._id,
        //     userId: item.userId,
        //     period: item.period,
        //     updatedDate: item.updatedDate,
        //     user: item.user
        // }))
        res.status(200).send(tokens)
    }).catch(err => {
        res.status(400).send(err)
    })
}

//token routers
router.get('/tokens', getTokens)

const path = require("path");
const multer = require("multer");

const prorductStorage = multer.diskStorage({
    destination: "./public/storage/product/",
    filename: function (req, file, cb) {
        cb(null, "product-" + Date.now() + path.extname(file.originalname));
    }
});

const uploadProductImage = multer({
    storage: prorductStorage,
    limits: { fileSize: 1000000 },
})

const avatarStorage = multer.diskStorage({
    destination: "./public/storage/avatar/",
    filename: function (req, file, cb) {
        cb(null, "avatar-" + Date.now() + path.extname(file.originalname));
    }
});

const uploadAvatar = multer({
    storage: avatarStorage,
    limits: { fileSize: 1000000 },
})

router.post("/upload/product", uploadProductImage.single("product"), imageController.addImage)
router.post("/upload/avatar", uploadAvatar.single("avatar"), imageController.addImage)

module.exports = router