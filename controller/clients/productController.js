
const Product = require("../../model/product-model")
const ProductCategory = require("../../model/product.category.model")
const priceDiscount = require("../../helper/priceDiscount")
const Category_finder = require("../../helper/Client/Category_finder")
module.exports.product = async (req,res) =>{
    const products = await Product.find({
        status: "active",
        deleted: false
    })

    const newProduct = priceDiscount.priceDiscount(products)


    res.render("client/pages/product/index" ,{
        titlePage: "Trang chủ sản phẩm",
        Products: newProduct
    });
}


module.exports.detail = async(req,res)=>{
    try {
        const id = req.params.id

        const find = {
            _id: id,
            deleted: false, 
            status: "active"
        }

        const product = await Product.findOne(find);

        const category = await ProductCategory.findOne({
            deleted: false,
            _id: product.danhmuccha_id
        })

        const related_product = await Product.find({
            deleted: false,
            danhmuccha_id: category.id
        })

        product.category = category.title

        product.category_slug = category.slug

        priceDiscount.oneprice(product)
        priceDiscount.oneprice(related_product)

        res.render("client/pages/product/detail", {
            titlePage: "Chi tiet san pham",
            product: product,
            related: related_product
           })
      
    } catch (error) {
        
    }

}

module.exports.category = async(req,res)=>{
    const slug = req.params.slug

    const category = await ProductCategory.findOne({
        deleted: false,
        slug: slug
    })

    var sub_category = await Category_finder.Category_finder(category.id)

    sub_category = sub_category.map(item => item.id)

    console.log(sub_category)

    
    const product = await Product.find({
        deleted: false,
        danhmuccha_id: {$in: [category.id, ...sub_category]}
    })

    const newProduct = priceDiscount.priceDiscount(product)

    res.render("client/pages/product/index" ,{
        titlePage: category.title,
        Products: newProduct
    });
}