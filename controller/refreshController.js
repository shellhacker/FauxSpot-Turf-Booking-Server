const asyncHandler = require("express-async-handler")
const User = require("../schema/accountModel")
const { generateToken , verifyToken } = require('../utils/jwt')

module.exports = {
    refreshAccsessToken: asyncHandler(async (req, res) => {
        console.log(req.body);
        let token;
        if (refreshToken) {
            try {
                //Get token from header
                token = refreshToken;

                //Verify token
                const decoded = verifyToken(token);

                //Get user from the token
                let user = await User.findById(decoded.id).select("-user_password");

                if (user) {
                    res.status(200).json({ "success": true, token: generateToken(user.id, 30), refreshToken: generateToken(user.id, 60), })
                }
            } catch (error) {
                res.status(401).json({ "success": false, "message": error.message })

            }
        }
    })
}