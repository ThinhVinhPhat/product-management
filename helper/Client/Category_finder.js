const ProductCategory = require("../../model/product.category.model")


// hàm dùng đệ quy để lấy những danh mục con nằm trong những danh mục con
module.exports.Category_finder = async (parentID) =>{
    const find_Category = async (parentID)=>{
        const category = await ProductCategory.find({
            danhmuccha_id: parentID,
            deleted: false
        })

        if(category) {
            let allsub = [...category]

            for(var item of allsub) {
                let children = await find_Category(item.id)
                allsub = allsub.concat(children)
            }
            return allsub
        }
        return null;
    }

    const result = find_Category(parentID)
    return result
}