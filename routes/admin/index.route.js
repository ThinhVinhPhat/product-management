const dashbroadRoute = require("./dashbroad.route")
const productRoute = require("./product.route")
const trashbinRoute = require("./trashBin.router")
const categoryRoute = require("./product.category.route")
const rolesRoute = require("./roles.route")
const systemconfig = require("../../config/system")



module.exports = (app) =>{
    const PATH_ADMIN = systemconfig.prefix_admin;


    app.use(PATH_ADMIN + "/dashbroad",dashbroadRoute);
    
    app.use(PATH_ADMIN + "/product",productRoute);
    
    app.use(PATH_ADMIN + "/product-category",categoryRoute);

    app.use(PATH_ADMIN + "/roles",rolesRoute)
    

    app.use(PATH_ADMIN + "/trashbin",trashbinRoute);

}