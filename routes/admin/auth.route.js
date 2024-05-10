const express = require("express")
const route = express.Router()
const controller = require("../../controller/admin/AuthController")
const validate = require("../../validate/auth.validate")

route.get("/login",controller.login)
route.get("/logout",controller.logout)

route.post("/login",
validate.createPost,
controller.loginPost)



module.exports = route