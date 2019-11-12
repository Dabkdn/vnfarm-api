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
    imageController
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
router.post('/faq', login.checkToken, login.checkPermission, faqController.addFAQ)
router.get('/faqs', login.checkToken, login.checkPermission, faqController.getFAQs)
router.get('/faq', faqController.getFAQ)
router.put('/faq', login.checkToken, login.checkPermission, faqController.updateFAQ)

//user routers
router.post('/delete/user', login.checkToken, login.checkPermission, userController.deleteUser)
router.post('/user', userController.addUser)
router.get('/users', login.checkToken, login.checkPermission, userController.getUsers)
router.get('/user', userController.getUser)
router.put('/user', login.checkToken, userController.updateUser)

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

//product routers
router.post('/delete/unit', currencyUnitController.deleteCurrencyUnit)
router.post('/unit', currencyUnitController.addCurrencyUnit)
router.get('/units', currencyUnitController.getCurrencyUnits)
router.get('/unit', currencyUnitController.getCurrencyUnit)
router.put('/unit', currencyUnitController.updateCurrencyUnit)


const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "./public/storage/product/",
    filename: function (req, file, cb) {
        cb(null, "product-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
})

router.post("/upload", upload.single("product"), imageController.addImage)

module.exports = router