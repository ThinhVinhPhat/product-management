const productRoute = require("./product.route")
const homeroute = require("./home.route")
const middleware = require("../../middleware/client/ProductCategory.middleware")

module.exports = (app) =>{
    app.use(middleware.productcategory)

    app.use("/",homeroute)
    
    app.use("/product",productRoute)
    
}