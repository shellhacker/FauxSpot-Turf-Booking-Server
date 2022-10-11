const { verifyToken, generateToken } = require('../utils/jwt')
const asyncHandler = require('express-async-handler');
const User = require('../schema/accountModel');

//====================== PROTECT MIDDLE WERE =========================


const protect = asyncHandler(async (req, res, next) => {
    let token;
    console.log('mid');
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            //===================== TOKEN FROM HEADER ======================
            token = req.headers.authorization.split(" ")[1];

            //===================== VERIFY TOKEN ==========================
            const decoded = verifyToken(token)

            //=============== USER FROM THE TOKEN ======================
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            if (error.message == "jwt expired") {

                res.status(403);
                throw new Error(error);
            } else {
                console.log(error.message);
                res.status(401);
                throw new Error(error.message);
            }
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized,no token");
      }
})

module.exports={protect}