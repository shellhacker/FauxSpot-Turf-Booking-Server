const express = require('express')
const router = express.Router()
const accountController = require("../controller/accountController")
const refreshController = require("../controller/refreshController")


router.post("/signup-email", accountController.emailSignup)

router.post("/login-email", accountController.emailLogin)

router.post("/verify-email-otp", accountController.emailVerifyOtp)

router.post("/verify-number-otp", accountController.verifyMobile)

router.post("/login-number", accountController.mobileSignup)

router.post("/refresh-token" , refreshController.refreshAccsessToken)

module.exports = router