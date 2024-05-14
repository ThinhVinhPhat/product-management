const express = require("express")
const route = express.Router()
const validate = require("../../validate/account.validate")
const multer  = require('multer')
const Cloudinary_upload  = require("../../middleware/Cloudinary_upload")
const upload = multer()
const AccountController = require("../../controller/admin/AccountController")


route.get("/",AccountController.index)


route.get("/create",AccountController.create)

route.get("/detail/:id",AccountController.detail)

route.patch("/change-status/:status/:id",AccountController.changestatus)

route.post("/create",upload.single("avatar"),
Cloudinary_upload.upload,
validate.createPost,
AccountController.createPost)

route.get("/edit/:id",AccountController.edit)

route.delete("/delete/:id",AccountController.delete)


route.patch("/edit/:id",upload.single("avatar"),
Cloudinary_upload.upload,
validate.createPost,
AccountController.editPatch)

module.exports = route
