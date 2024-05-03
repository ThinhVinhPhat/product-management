const express = require("express");
const route  = express.Router()
const controller = require("../../controller/admin/ProductController")
const validate = require("../../validate/tilte_create.validate")
const storage = require("../../helper/multerStorage")
const multer  = require('multer')
const Cloudinary_upload  = require("../../middleware/Cloudinary_upload")
const upload = multer()

route.get("/",controller.product);

route.patch("/change-status/:status/:id",controller.changestatus)

route.patch("/change-multi",controller.changemulti)

route.delete("/delete/:id",controller.delete)

route.get("/create",controller.create)

route.post("/create",upload.single('thumbnail'),
Cloudinary_upload.upload,
validate.createPost,
controller.createPost)

route.get("/edit/:id",
controller.edit)

route.patch("/edit/:id"
,upload.single('thumbnail'),
Cloudinary_upload.upload,
validate.createPost,
controller.editPatch)

route.get("/detail/:id",controller.detail)



module.exports = route;