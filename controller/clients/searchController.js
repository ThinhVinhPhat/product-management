const priceDiscounts = require("../../helper/priceDiscount")
const Product = require("../../model/product-model");

module.exports.index = async (req,res)=>{
    const keyword = req.query.keyword;

    var newproduct = []
    const search_title = new RegExp(keyword,"i")
    const products = await Product.find({
        deleted: false,
        status: "active",
        title: search_title
    })

    newproduct = priceDiscounts.priceDiscount(products)

    res.render("client/pages/search/index",{
        title: "Kết quả tìm kiếm",
        products: newproduct,
        keyword: keyword

    })
}