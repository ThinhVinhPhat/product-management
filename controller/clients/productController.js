const Product = require("../../model/product-model")

module.exports.product = async (req,res) =>{
    const products = await Product.find({
        status: "active",
        deleted: false
    })

    const newProduct = products.map((items => {
        items.PriceNew = (items.price * (100 - items.discountPercentage)/100).toFixed(0);
        return items;
    }) )



    res.render("client/pages/product/index" ,{
        titlePage: "Trang chủ sản phẩm",
        Products: newProduct
    });
}


module.exports.detail = async(req,res)=>{
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }

        const product = await Product.findOne(find);

        console.log(product)
       res.render("client/pages/product/detail", {
        titlePage: "Chi tiet san pham",
        product: product
       })
    } catch (error) {
        
    }

}