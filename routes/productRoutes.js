const express = require('express')
const router = express.Router()
const productController = require("../controller/addProductController")
const { upload } = require("../uploads/multer")


router.post("/addturf", upload.fields([
    { name: "turf_images1", maxCount: 1 },
    { name: "turf_images2", maxCount: 1 },
    { name: "turf_images3", maxCount: 1 }
]), productController.addProduct)

router.patch("/updateturf/:id", productController.updateProduct)

module.exports = router   