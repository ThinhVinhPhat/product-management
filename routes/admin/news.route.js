const express = require("express")
const router = express.Router()
const controller = require("../../controller/admin/NewsController")
const validate = require("../../validate/tilte_create.validate")
const multer  = require('multer')
const Cloudinary_upload  = require("../../middleware/Cloudinary_upload")
const upload = multer()
router.get("/",controller.index)


router.get("/create",controller.create)

router.post("/create",upload.single("thumbnail"),
Cloudinary_upload.upload,
validate.createPost,
controller.createPost)

router.get("/edit/:id",controller.edit)

router.patch("/edit/:id",upload.single("thumbnail"),
Cloudinary_upload.upload,
validate.createPost,
controller.editPatch)

router.patch("/change-status/:status/:id",controller.changestatus)
router.delete("/delete/:id",controller.delete)

router.get("/detail/:id",controller.detail)
module.exports = router