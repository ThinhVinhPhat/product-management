const express = require("express");
const router = express.Router()
const controller = require("../../controller/admin/DashbroadController")

router.get("/",controller.adminDashbroad);

module.exports = router;