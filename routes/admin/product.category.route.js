const express = require("express")
const route = express.Router();
const product_category = require("../../controller/admin/ProductCategoryController")
const multer  = require('multer')
const Cloudinary_upload  = require("../../middleware/Cloudinary_upload")
const upload = multer()
const validate = require("../../validate/tilte_create.validate")

route.get("/",product_category.product)

route.get("/create",product_category.create)


route.delete("/delete/:id",product_category.delete)

route.post("/create",upload.single('thumbnail'),
Cloudinary_upload.upload,
validate.createPost,
product_category.createPost)


route.get("/edit/:id",product_category.edit)


route.patch("/edit/:id",upload.single('thumbnail'),
Cloudinary_upload.upload,
validate.createPost,
product_category.editPatch)


route.get("/detail/:id",product_category.detail)

route.patch("/change-status/:id",product_category.detail)


module.exports = route