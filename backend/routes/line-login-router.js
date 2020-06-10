const express = require('express')
const lineLoginCtrl = require('../controllers/line-login-ctrl')

const router = express.Router()

router.get('/loginAuth', lineLoginCtrl.getLineAuthorizationCode)
router.post('/tokenAuth', lineLoginCtrl.getLineAccessToken)

module.exports = router