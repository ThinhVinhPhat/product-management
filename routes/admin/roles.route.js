const express = require("express")
const route = express.Router()
const rolesController = require("../../controller/admin/RolesController")



route.get("/",rolesController.index)

route.get("/create",rolesController.create)


route.get("/edit/:id",rolesController.edit)

route.patch("/edit/:id",rolesController.editPost)


route.post("/create",rolesController.createPost)


route.get("/detail/:id",rolesController.detail);

route.get("/permission",rolesController.permission);


route.patch("/permission",rolesController.permissionPatch);

route.delete("/delete/:id",rolesController.delete);



module.exports = route;