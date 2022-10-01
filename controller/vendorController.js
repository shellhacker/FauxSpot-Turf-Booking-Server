const asyncHandler = require("express-async-handler")
const Product = require("../schema/productModel")


module.exports = {
    vendorTurf: asyncHandler(async (req, res, next) => {
       
        const turf_creator_id  = req.params.id

        try {

            const respones = await Product.find({turf_creator_id : turf_creator_id})

            res.status(200).json({ "status": true, "data": respones })

        } catch (error) {

            res.status(401).json({ "status": false, "message": `invalid 401 ${error}` })

            
        }

       
    })
}