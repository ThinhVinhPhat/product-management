const Product_category = require("../../model/product.category.model")
const filterStatuHelper = require("../../helper/filterStatus")
const findHelper = require("../../helper/find")
const paginationhelper = require("../../helper/pagination")

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


        res.render("admin/pages/product-category/index", {
        title: "Danh mục Sản Phẩm",
        records: records,
        filterStatus: filterStatus,
        keyword: findObject.keyword,
        pagination: pagination
    })


  
}

// moudle tạo mới danh mục sản phẩm
module.exports.create = async (req, res) => {

    res.render("admin/pages/product-category/create", {
        title: "Tạo mới danh mục sản phẩm"
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

/
    res.redirect("/admin/product-category")
}