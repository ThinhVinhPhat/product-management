const express = require("express")
const controller = require("../../controller/clients/UserController")
const route  = express.Router()
const validate = require("../../validate/client/account.validate")
const authvalidate = require("../../validate/client/auth.validate")
const multer = require("multer")
const upload = multer()
const cloudinaryUpload = require("../../middleware/Cloudinary_upload")


route.get("/login",controller.login)

route.post("/login",authvalidate.createPost,controller.loginPost)

route.get("/resigter",controller.resigter)

route.get("/logout",controller.logout)


route.post("/resigter",upload.single("avatar"),cloudinaryUpload.upload,validate.createPost,controller.resigterPost)


route.get("/password/forgot",controller.forgotPassword)

route.post("/password/forgot",validate.checkemail,controller.forgotPasswordPost)

route.get("/password/otp",controller.otp)

route.post("/password/otp",controller.otpPost)

route.get("/password/resetpassword",controller.resetpassword)

route.post("/password/resetpassword",validate.checkMK,controller.resetpasswordPost)

module.exports = route