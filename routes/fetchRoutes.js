const express = require('express')
const router = express.Router()
const fetchController = require("../controller/fetchProductController")
const vendorController = require("../controller/vendorController")
const whishlistController = require("../controller/whishlistController")

router.get("/all-turf" , fetchController.getAllProducts)

router.get("/vendor-turf/:id", vendorController.vendorTurf)

router.post("/add-whishlist" , whishlistController.addWhishList)

router.get("/get-whishlist/:id" , whishlistController.getWhishList)

module.exports = router 