const News = require("../../model/news.model")
const Product_category = require("../../model/product.category.model")
const Category_finder = require("../../helper/Client/Category_finder")

module.exports.index = async(req,res)=>{
    const find = {
        deleted: false,
        status: "active"
    }


  
    const news = await News.find(find)

    res.render("client/pages/news/index",{
        titlePage: "Tin tức",
        News: news
    })

}
module.exports.detail = async(req,res)=>{
    const slug = req.params.slug

    const find = {
        deleted: false,
        status: "active",
        slug: slug
    }

    const news = await News.findOne(find)

    res.render("client/pages/news/detail",{
        titlePage: "Tin tức",
        News: news
    })

}

module.exports.category = async(req,res)=>{
    const slug = req.params.slug;

    const find = {
        deleted: false,
        slug: slug
    }

    const category = await Product_category.findOne(find)
    
    var sub_Category = await Category_finder.Category_finder(category.id)
    
    sub_Category = sub_Category.map(item=> item.id)

    const news = await News.find({
        deleted: false,
        danhmuccha_id: {$in: [category.id,...sub_Category]}
    })

    res.render("client/pages/news/index",{
        titlePage: "Tin tức",
        News: news
    })
}