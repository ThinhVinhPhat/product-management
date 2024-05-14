const Product = require("../../model/product-model")
const priceDiscount = require("../../helper/priceDiscount")
module.exports.home = async (req,res) =>{
    const products = await Product.find({
        deleted: false,
        status: "active",
        featured: "yes"
    })

    const newProduct = priceDiscount.priceDiscount(products)

    res.render("client/pages/home/index" , {
        titlePage: "Trang chủ",
        products: products
    })
} 