const express = require("express")
const route = express.Router()
const controller = require("../../controller/admin/trashBinController")


route.get("/",controller.delete);

route.patch("/change-status/:status/:id",controller.changestatus)

route.patch("/change-multi",controller.changemulti)

route.delete("/delete/:id",controller.delete_real)

route.patch("/recover/:id",controller.recover)


module.exports = route;