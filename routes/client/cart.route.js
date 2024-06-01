const express = require("express");
const router = express.Router();
const controller = require("../../controller/clients/CartController")


router.get("/",controller.index)

router.post("/add/:id",controller.createPost);


router.get("/delete/:id",controller.delete);

router.get("/update/:id/:quantity",controller.update);

module.exports = router;