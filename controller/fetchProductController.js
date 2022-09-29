const asyncHandler = require("express-async-handler")
const Product = require("../schema/productModel")


module.exports = {

    getAllProducts : asyncHandler(async (req,res,next) => {
        Product.find((err, data) => {
            if (!err) {
               res.status(200).json({"status" : true , "data" : data})
            } else {
                console.log('Failed to retrieve the Course List: ' + err);
            }
        });
    })

}