const router = require('express').Router()
const {
    faqController,
    authenticationController,
    countController,
    userController,
    roleController,
    categoryController
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
router.post('./delete/faq', login.checkToken, login.checkPermission, faqController.deleteFAQ)
router.post('/faq', login.checkToken, login.checkPermission, faqController.addFAQ)
router.get('/faqs', login.checkToken, login.checkPermission, faqController.getFAQs)
router.get('/faq', faqController.getFAQ)
router.put('./faq', login.checkToken, login.checkPermission, faqController.updateFAQ)

//user routers
router.post('./delete/user', login.checkToken, login.checkPermission, userController.deleteUser)
router.post('/user', userController.addUser)
router.get('/users', login.checkToken, login.checkPermission, userController.getUsers)
router.get('/user', userController.getUser)
router.put('./user', login.checkToken, userController.updateUser)

//role routers //REMEMBER ADD PERMISSION LATER
router.get('/roles', roleController.getRoles)
router.get('/role', roleController.getRole)

//category routers
router.post('./delete/category', categoryController.deleteCategory)
router.post('/category', categoryController.addCategory)
router.get('/categories', categoryController.getCategories)
router.get('/category', categoryController.getCategory)
router.put('./category', categoryController.updateCategory)
router.get('/category/parentwithchild', categoryController.getParentCategoryWithChilds)

module.exports = router