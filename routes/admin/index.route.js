const dashbroadRoute = require("./dashbroad.route")
const productRoute = require("./product.route")
const trashbinRoute = require("./trashBin.router")
const categoryRoute = require("./product.category.route")
const rolesRoute = require("./roles.route")
const accountRoute = require("./account.route")
const authRoute = require("./auth.route")
const MyaccountRoute = require("./my_account.route")
const systemconfig = require("../../config/system")
const auth = require("../../middleware/authentication")


module.exports = (app) => {
    const PATH_ADMIN = systemconfig.prefix_admin;


    app.use(PATH_ADMIN + "/dashbroad",
        auth.auth,
        dashbroadRoute);

    app.use(PATH_ADMIN + "/product",
        auth.auth, productRoute);

    app.use(PATH_ADMIN + "/product-category",
        auth.auth, categoryRoute);

    app.use(PATH_ADMIN + "/roles",
        auth.auth, rolesRoute)

    app.use(PATH_ADMIN + "/account",
        auth.auth, accountRoute)

    app.use(PATH_ADMIN + "/account",
        auth.auth,MyaccountRoute)

    app.use(PATH_ADMIN + "/trashbin",
        auth.auth, trashbinRoute);

    app.use(PATH_ADMIN + "/auth", authRoute)
}