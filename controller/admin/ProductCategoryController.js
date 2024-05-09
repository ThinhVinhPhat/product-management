const Product_category = require("../../model/product.category.model")
const filterStatuHelper = require("../../helper/filterStatus")
const findHelper = require("../../helper/find")
const paginationhelper = require("../../helper/pagination")
const createTree = require("../../helper/createTree")
// moudle display sản phẩm 
module.exports.product = async (req, res) => {
    const find = {
        deleted: false
    }


    // thanh lọc sản phẩm
    const filterStatus = filterStatuHelper(req.query);

    if (req.query.status) {
        find.status = req.query.status
    }
    // kết thúc lọc



    // thanh tìm kiếm
    const findObject = findHelper(req.query);

    if (findObject.keyword) {
        const regex_keyword = new RegExp(findObject.keyword, "i")
        find.title = regex_keyword;
        req.flash("find", "Đã tìm thấy");
    }
    // kết thúc tìm kiếm




    // thanh chuyển trang
    const countProduct = await Product_category.countDocuments(find)

    

    const pagination = paginationhelper(
        {
            currentPage: 1,
            limitofProduct: 4,
        },
        req.query,
        countProduct
    )


    // chức năng sort
    const sort = {}
    if(req.query.sort  && req.query.position) {
        sort[req.query.sort] = req.query.position
    }
    else{
        sort[req.query.sort] = "desc"

    }

    const records = await Product_category.find(
        find).sort(sort).limit(4).skip(pagination.skip)

    const sorted_categories = createTree.tree(records)

        res.render("admin/pages/product-category/index", {
        title: "Danh mục Sản Phẩm",
        records: sorted_categories,
        filterStatus: filterStatus,
        keyword: findObject.keyword,
        pagination: pagination
    })


  
}

// moudle tạo mới danh mục sản phẩm
module.exports.create = async (req, res) => {

    const find = {
        deleted: false
    }

    
    const categories = await Product_category.find(find);

    const sorted_categories = createTree.tree(categories)


    res.render("admin/pages/product-category/create", {
        title: "Tạo mới danh mục sản phẩm",
        categories: sorted_categories
    })
  
}

module.exports.createPost = async (req,res) =>{

    if (req.body.position == "") {
        const pro_count = await Product_category.countDocuments();

        req.body.position = pro_count + 1;
    }
    else {
        req.body.position = parseInt(req.body.position);
    }


    const product_category = new Product_category(req.body);
    await product_category.save()
    req.flash("create", "Tạo mới thành công");
    res.redirect("/admin/product-category")
}



/// hàm cho phép xóa tạm thời một sản phẩm 
module.exports.delete = async (req,res) =>{
    const id  = req.params.id

    await Product_category.deleteOne({_id: id})
    req.flash("delete", "Xóa thành công");
    res.redirect("back")
}



// hàm cho phép chỉnh sửa danh mục sản phẩm
module.exports.edit = async(req,res)=>{
    try{

        const id = req.params.id
       
        const category = await Product_category.findOne({
            _id: id,
            deleted: false
        })
    
        const categories = await Product_category.find({
            deleted: false
        });
    
        const sorted_categories = createTree.tree(categories)
    
      
        res.render("admin/pages/product-category/edit", {
            title: "Chỉnh sửa danh mục sản phẩm",
            category: category,
            categories: sorted_categories
        })
    }
    catch(error) {
        res.redirect("/admin/product-category")
    }
}

module.exports.editPatch = async(req,res)=>{
    const id = req.params.id

    req.body.position = parseInt(req.body.position)

    await Product_category.updateOne({_id: id},req.body)
    req.flash("edit", "Tạo mới thành công");
    res.redirect("back")
}




// hàm cho phép xem thông tin của sản phẩm
module.exports.detail = async (req,res)=>{
    const id  = req.params.id

    const find = {
        deleted: false,
        _id: id
    }

    const category = await Product_category.findOne(find)

    res.render("admin/pages/product-category/detail",{
        title: "Thông tin danh mục sản phẩm",
        product: category
    })

}