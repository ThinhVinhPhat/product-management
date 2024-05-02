const express = require("express");
const route = express.Router();
const controller = require("../../controller/clients/productController")

route.get("/",controller.product);


route.get("/:slug",controller.detail)


module.exports = route;