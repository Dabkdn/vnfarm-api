const router = require('express').Router()
const apiController = require('../controllers/api/index')
const {
    login
} = require('../middlewares')

router.post('/delete/count', login.checkToken, apiController.countController.deleteCount)
router.post('/count', login.checkToken, apiController.countController.addCount)
router.get('/counts', apiController.countController.getCounts)
router.get('/count', apiController.countController.getCount)
router.put('/count', login.checkToken, apiController.countController.updateCount)

router.post('/login', apiController.authenticationController.login)
router.post('/register', apiController.registerController.register)
module.exports = router