const express = require('express')
const router = express.Router()
const accountController = require("../controller/accountController")


router.post("/signup-email", accountController.emailSignup)

router.post("/login-email", accountController.emailLogin)

router.post("/verify-email-otp", accountController.emailVerifyOtp)

router.post("/verify-number-otp", accountController.verifyMobile)

router.post("/login-number", accountController.mobileSignup)

module.exports = router