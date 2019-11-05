const router = require('express').Router()
const {
    faqController,
    authenticationController,
    countController,
    userController,
    roleController
} = require('../controllers/index')

const {
    login
} = require('../middlewares')

//count routers
router.post('/delete/count', login.checkToken, countController.deleteCount)
router.post('/count', login.checkToken, countController.addCount)
router.get('/counts', countController.getCounts)
router.get('/count', countController.getCount)
router.put('/count', login.checkToken, countController.updateCount)

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

module.exports = router