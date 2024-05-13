const express = require("express")
const route = express.Router()
const my_accountController = require("../../controller/admin/My_accountController")
const multer = require("multer")
const upload = multer()
const cloudinary = require("../../middleware/Cloudinary_upload")
const validate = require("../../validate/account.validate")
route.get("/my_account",my_accountController.index)

route.get("/my_account/edit",my_accountController.edit)


route.patch("/my_account/edit",
upload.single("avatar"),
cloudinary.upload,
my_accountController.editPatch)


module.exports = route