const productRoute = require("./product.route")
const homeroute = require("./home.route")


module.exports = (app) =>{

    app.use("/",homeroute)
    
    app.use("/product",productRoute)
    
}