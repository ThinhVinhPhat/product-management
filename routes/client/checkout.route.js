const express = require("express");
const router = express.Router();
const controller = require("../../controller/clients/CheckouController")


router.get("/",controller.index)

router.post("/order",controller.order)

router.get("/success/:orderid",controller.success)

module.exports = router;