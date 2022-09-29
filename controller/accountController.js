const asyncHandler = require("express-async-handler")
const User = require("../schema/accountModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { sendOtpEmail } = require("../otpHandler/nodemailer")
const twilio = require("../otpHandler/twilio")
const crypto = require("crypto")


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


module.exports = {

    // signup

    emailSignup: asyncHandler(async (req, res, next) => {

        try {

            const { user_mail, user_password, } = req.body

            const match = await User.findOne({ user_mail: user_mail })

            if (match) {
                res.status(404).json({ "status": false, "message": "user already registerd" })

            } else {

                const response = await sendOtpEmail(user.user_mail, user.user_name)

                const user = User({
                    user_mail,
                    user_number: 0000000000,
                    user_password,
                    user_isVerified: false,
                    user_otp: response
                })

                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(user.user_password, salt)
                user.user_password = hashPassword

                // send a verification mail to user



                if (response != null) {
                    await user.save()
                }

                if (response == null) {
                    res.status(401).json({ "status": false, "id": "invalid 401" })
                } else {
                    res.status(200).json({ "status": true, "id": user._id })
                }
            }

        } catch (error) {
            res.status(401).json({ "status": false, "id": `invalid 401 ${error}` })

        }

    }),


    //verify otp

    emailVerifyOtp: asyncHandler(async (req, res, next) => {
        const { user_otp, _id } = req.body

        await User.findById({ _id }).then(async (user) => {
            if (user_otp == user.user_otp) {
                await User.findOneAndUpdate({ _id: _id }, { $set: { user_isVerified: true } })
                res.status(200).json({ "status": true, "message": "login success" })
            }
        }).catch((err) => {
            res.status(401).json({ "status": false, "message": "please check otp" })
        })

    }),


    //login

    emailLogin: asyncHandler(async (req, res, next) => {


        try {

            const { user_mail, user_password } = req.body

            console.log(user_mail, user_password);

            const findUser = await User.findOne({ user_mail: user_mail })

            if (findUser) {

                const match = await bcrypt.compare(user_password, findUser.user_password)

                if (match) {

                    const token = createToken(findUser.id)

                    res.status(200).json({ "status": true, "message": "Loged in succsess", "token": token })
                } else {
                    res.status(401).json({ "status": false, "message": "Password Dosen't Match", "token": "token" })
                }

            } else {
                res.status(401).json({ "status": false, "message": "User n't registerd", "token": "token" })
            }

        } catch (error) {

            res.status(401).json({ "status": false, "message": "ClientError", "token": "token" })

        }

    }),


    // login with number

    mobileSignup: asyncHandler(async (req, res, next) => {
        const { user_number } = req.body
        const result = await twilio.sendOtp(user_number)

        if (result == "verification") {

            const findUser = await User.findOne({ user_number: user_number })

            if (findUser) {
                res.status(200).json({ "status": true, "_id": findUser._id })

            } else {
                const user = User({
                    user_mail: crypto.randomBytes(64).toString("hex"),
                    user_number,
                    user_password: crypto.randomBytes(64).toString("hex"),
                    user_isVerified: false,
                })

                await user.save()
                res.status(200).json({ "status": true, "_id": user._id })
            }

        } else {
            res.status(401).json({ "status": false, "_id": "user not found" })
        }

    }),

    // verify mobile number

    verifyMobile: asyncHandler(async (req, res, next) => {
        try {
            const { user_otp, user_number, _id } = req.body
            console.log(user_otp, user_number, _id);
            const response = await twilio.verifyOtp(user_number, user_otp)

            console.log(response);
            console.log("verification progress");
            if (response === 'approved') {
                console.log("account verified");
                const add = await User.findByIdAndUpdate({ _id: _id }, { $set: { user_isVerified: true } })
                const tokn = createToken(_id)
                res.status(200).json({ "status": true, "jwt": tokn })
            } else {
                console.log("error");
                res.status(401).json({ "status": false, "jwt": "tokn not found" })
            }
        } catch (error) {
            res.status(401).json({ "status": false, "jwt": "tokn not found" })
        }
    })
}