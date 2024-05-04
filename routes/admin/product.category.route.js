const express = require("express")
const route = express.Router();
const product_category = require("../../controller/admin/ProductCategoryController")
const multer  = require('multer')
const Cloudinary_upload  = require("../../middleware/Cloudinary_upload")
const upload = multer()
const validate = require("../../validate/tilte_create.validate")

route.get("/",product_category.product)

route.get("/create",product_category.create)

route.post("/create",upload.single('thumbnail'),
Cloudinary_upload.upload,
validate.createPost,
product_category.createPost)


module.exports = route