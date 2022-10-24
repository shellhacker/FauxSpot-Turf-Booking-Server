const express = require('express')
const router = express.Router()
const bookingController = require("../controller/bookingController")


router.post("/booking" , bookingController.addDetails)

module.exports = router

