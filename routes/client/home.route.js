const express = require("express");
const router = express.Router();
const controller = require("../../controller/clients/homeController")

router.get("/",controller.home);

module.exports = router;