const express = require('express')
const router = express.Router()
const fetchController = require("../controller/fetchProductController")
const vendorController = require("../controller/vendorController")

router.get("/all-turf" , fetchController.getAllProducts)

router.get("/vendor-turf/:id", vendorController.vendorTurf)

module.exports = router 