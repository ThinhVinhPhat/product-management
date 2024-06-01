const express = require("express")
const route = express.Router()
const controller = require("../../controller/clients/newController")



route.get("/",controller.index)


route.get("/detail/:slug",controller.detail)


route.get("/category/:slug",controller.category)


module.exports = route