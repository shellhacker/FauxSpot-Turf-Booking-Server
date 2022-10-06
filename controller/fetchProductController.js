const asyncHandler = require("express-async-handler")
const Product = require("../schema/productModel")


module.exports = {

    getAllProducts: asyncHandler(async (req, res, next) => {
        Product.find((err, data) => {
            if (!err) {
                res.status(200).json({ "status": true, "data": data })
            } else {
                console.log('Failed to retrieve the Course List: ' + err);
            }
        });
    }),

    getNearbyProducts: asyncHandler(async (req, res, next) => {
        const turf_muncipality = req.params.place

        try {
            const findData = await Product.find({ turf_muncipality: turf_muncipality })
            if (findData.length > 0) {
                res.status(200).json({ "status": true, "data": findData })
            } else {
                res.status(200).json({ "status": false, "data": findData })
            }

        } catch (error) {
            res.status(401).json({ "status": false, "message": `invalid 401 ${error}` })
        }
    }),

    searchProducts: asyncHandler(async (req, res, next) => {
        const turf_name = req.params.name
        console.log(turf_name)
        try {
            const result = await Product.find({ $text: { $search: turf_name } })
            res.status(200).json({ "status": true, "data": result })
        } catch (error) {
            res.status(401).json({ "status": false, "message": `invalid 401 ${error}` })
        }
    }),

}