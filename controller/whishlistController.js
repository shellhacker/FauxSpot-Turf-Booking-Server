const asyncHandler = require("express-async-handler")
const Whishlist = require("../schema/whishlistModel")


module.exports = {
    addWhishList: asyncHandler(async (req, res) => {
        try {
            const dbObj = req.body

            const whishlist = Whishlist({
                turf_user_id: dbObj.turf_user_id,
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
                },
                turf_type: {
                    turf_sevens: dbObj.turf_sevens,
                    turf_sixes: dbObj.turf_sixes,
                }, turf_info: {
                    turf_isAvailale: dbObj.turf_isAvailale,
                    turf_rating: dbObj.turf_rating,
                    turf_map: dbObj.turf_map,
                },
                turf_amenities: {
                    turf_washroom: dbObj.turf_washroom,
                    turf_water: dbObj.turf_water,
                    turf_dressing: dbObj.turf_dressing,
                    turf_parking: dbObj.turf_parking,
                    turf_gallery: dbObj.turf_gallery,
                    turf_cafeteria: dbObj.turf_cafeteria
                },
                turf_images: {
                    turf_images1: dbObj.turf_images1,
                    turf_images2: dbObj.turf_images2,
                    turf_images3: dbObj.turf_images3
                },
                turf_time: {
                    time_morning: dbObj.time_morning,
                    time_afternoon: dbObj.time_afternoon,
                    time_evening: dbObj.time_evening
                }


            })

            await whishlist.save()

            res.status(200).json({ "status": true })

        } catch (error) {

            res.status(401).json({ "status": false, "message": error })

        }
    }),


    getWhishList: asyncHandler(async (req, res, next) => {
        const turf_user_id = req.params.id
        try {
            const findWhishList = await Whishlist.find({ turf_user_id: turf_user_id })

            res.status(200).json({ "status": true, "length": findWhishList.length, "data": findWhishList })

        } catch (error) {
            res.status(401).json({ "status": false, "length": 0, "data": `error ${error}` })
        }


    })
}