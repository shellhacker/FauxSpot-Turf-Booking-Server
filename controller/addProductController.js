const asyncHandler = require("express-async-handler")
const Product = require("../schema/productModel")
require("dotenv").config()
const cloudinaryUploadImg = require("../uploads/cloudinary");

module.exports = {


  addProduct: asyncHandler(async (req, res) => {

    try {

      const turf_images1Obj = req.files.turf_images1[0].path
      const turf_images2Obj = req.files.turf_images2[0].path
      const turf_images3Obj = req.files.turf_images3[0].path

      const image1 = await cloudinaryUploadImg(turf_images1Obj);
      const image2 = await cloudinaryUploadImg(turf_images2Obj);
      const image3 = await cloudinaryUploadImg(turf_images3Obj);

      const dbObj = req.body
      console.log(dbObj.turf_map, dbObj.turf_rating , dbObj.turf_isAvailale);

      const product = Product({
        turf_creator_id: dbObj.turf_creator_id,
        turf_name: dbObj.turf_name,
        turf_place: dbObj.turf_place,
        turf_muncipality: dbObj.turf_muncipality,
        turf_district: dbObj.turf_district,
        turf_catogery:
        {
          turf_cricket: dbObj.turf_cricket,
          turf_football: dbObj.turf_football,
          turf_badminton: dbObj.turf_badminton,
          turf_yoga: dbObj.turf_yoga,
        }
        ,
        turf_type:
        {
          turf_sevens: dbObj.turf_sevens,
          turf_sixes: dbObj.turf_sixes,
        },
        turf_info:{
          turf_isAvailale: dbObj.turf_isAvailale,
          turf_rating: dbObj.turf_rating,
          turf_map: dbObj.turf_map,
        } ,
        turf_amenities:
        {
          turf_washroom: dbObj.turf_washroom,
          turf_water: dbObj.turf_water,
          turf_dressing: dbObj.turf_dressing,
          turf_parking: dbObj.turf_parking,
          turf_gallery: dbObj.turf_gallery,
          turf_cafeteria: dbObj.turf_cafeteria
        }
        ,
        turf_images:
        {
          turf_images1: image1.url,
          turf_images2: image2.url,
          turf_images3: image3.url
        }
        ,
        turf_time:
        {
          time_morning: dbObj.time_morning,
          time_afternoon: dbObj.time_afternoon,
          time_evening: dbObj.time_evening
        }


      })

      await product.save()

      res.status(200).json({ "status": true })

    } catch (error) {

      res.status(401).json({ "status": false, "message": error })

    }

  })

}