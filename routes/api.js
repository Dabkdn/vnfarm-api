const router = require('express').Router()
const {
    authenticationController,
    countController,
    userController
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

//user routers
router.post('./delete/user',login.checkToken, login.checkPermission, userController.deleteUser)
router.post('/user', userController.addUser)
router.get('/users', login.checkToken, login.checkPermission, userController.getUsers)
router.get('/user', userController.getUser)
router.put('./user', login.checkToken, userController.updateUser)


module.exports = router