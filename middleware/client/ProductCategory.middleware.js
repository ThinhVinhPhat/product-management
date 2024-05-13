const Product_category = require("../../model/product.category.model")
const createTree = require("../../helper/createTree")


module.exports.productcategory = async(req,res,next) =>{

    const record = await Product_category.find({
        deleted: false
    })

    const sorted_record = createTree.tree(record)

    if(sorted_record){
        res.locals.Product_category = sorted_record
        next()
    }
}