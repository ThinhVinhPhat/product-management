const express  = require("express")
const route = express.Router()
const controller = require("../../controller/clients/searchController")

route.get("/",controller.index)


module.exports = route