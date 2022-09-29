const express = require('express')
const router = express.Router()
const fetchController = require("../controller/fetchProductController")

router.get("/all-turf" , fetchController.getAllProducts)

module.exports = router 