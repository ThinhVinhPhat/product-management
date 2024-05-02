const dashbroadRoute = require("./dashbroad.route")
const productRoute = require("./product.route")
const trashbinRoute = require("./trashBin.router")
const systemconfig = require("../../config/system")



module.exports = (app) =>{
    const PATH_ADMIN = systemconfig.prefix_admin;


    app.use(PATH_ADMIN + "/dashbroad",dashbroadRoute);
    
    app.use(PATH_ADMIN + "/product",productRoute);

    app.use(PATH_ADMIN + "/trashbin",trashbinRoute);

}