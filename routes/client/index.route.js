const productRoute = require("./product.route")
const homeroute = require("./home.route")
const newroute = require("./new.route")
const searchroute = require("./search.route")
const cartroute = require("./cart.route")
const checkroute = require("./checkout.route")
const userroute = require("./user.route")
const category_middleware = require("../../middleware/client/ProductCategory.middleware")
const cart_middleware = require("../../middleware/client/Cart.middleware")
const user_middleware = require("../../middleware/client/User.middleware")

module.exports = (app) =>{
    app.use(category_middleware.productcategory)
    app.use(cart_middleware.Cartmiddlewware)
    app.use(user_middleware.checkUser)

    app.use("/",homeroute)
    
    app.use("/product",productRoute)

    app.use("/news",newroute)

    app.use("/search",searchroute)

    app.use("/cart",cartroute)

    app.use("/checkout",checkroute)

    app.use("/user",userroute)
    
}