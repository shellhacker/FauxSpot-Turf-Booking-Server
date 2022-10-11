const asyncHandler = require("express-async-handler")
const Product = require("../schema/productModel")


module.exports = {
 
        addProduct: asyncHandler(async (req, res) => {

            try {
              const dbObj = req.body

              const product = Product({
                turf_creator_id: dbObj.data[0].turf_creator_id,
                turf_name: dbObj.data[0].turf_name,
                turf_place: dbObj.data[0].turf_place,
                turf_muncipality: dbObj.data[0].turf_muncipality,
                turf_district: dbObj.data[0].turf_district,
                turf_catogery:
                {
                  turf_cricket: dbObj.data[0].turf_catogery.turf_cricket,
                  turf_football: dbObj.data[0].turf_catogery.turf_football,
                  turf_badminton: dbObj.data[0].turf_catogery.turf_badminton,
                  turf_yoga: dbObj.data[0].turf_catogery.turf_yoga,
                }
                ,
                turf_type:
                {
                  turf_sevens: dbObj.data[0].turf_type.turf_sevens,
                  turf_sixes: dbObj.data[0].turf_type.turf_sixes,
                },
                turf_info: {
                  turf_isAvailale: dbObj.data[0].turf_info.turf_isAvailale,
                  turf_rating: dbObj.data[0].turf_info.turf_rating,
                  turf_map: dbObj.data[0].turf_info.turf_map,
                },
                turf_amenities:
                {
                  turf_washroom: dbObj.data[0].turf_amenities.turf_washroom,
                  turf_water: dbObj.data[0].turf_amenities.turf_water,
                  turf_dressing: dbObj.data[0].turf_amenities.turf_dressing,
                  turf_parking: dbObj.data[0].turf_amenities.turf_parking,
                  turf_gallery: dbObj.data[0].turf_amenities.turf_gallery,
                  turf_cafeteria: dbObj.data[0].turf_amenities.turf_cafeteria
                }
                ,
                turf_images:
                {
                  turf_images1: dbObj.data[0].turf_images.turf_images1,
                  turf_images2: dbObj.data[0].turf_images.turf_images2,
                  turf_images3: dbObj.data[0].turf_images.turf_images3,
                }
                ,
                turf_time:
                {
                  time_morning: dbObj.data[0].turf_time.time_morning,
                  time_afternoon: dbObj.data[0].turf_time.time_afternoon,
                  time_evening: dbObj.data[0].turf_time.time_evening
                }
        
        
              })
        
              await product.save()
        
              res.status(200).json({ "status": true })
        
            } catch (error) {
        
              res.status(401).json({ "status": false, "message": error })
        
            }
        
          }),
   
}