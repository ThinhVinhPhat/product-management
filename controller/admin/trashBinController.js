const Product = require("../../model/product-model")
const filterStatuHelper = require("../../helper/filterStatus")
const findHelper = require("../../helper/find")
const paginationhelper = require("../../helper/pagination")
const { default: mongoose } = require("mongoose")
const Account = require("../../model/account.model")


// moudle display sản phẩm 
module.exports.delete = async (req, res) => {

    const find = {
        deleted: true
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
    }
    // kết thúc tìm kiếm




    // thanh chuyển trang
    const countProduct = await Product.countDocuments(find)
    const pagination = paginationhelper(
        {
            currentPage: 1,
            limitofProduct: 4,
        },
        req.query,
        countProduct
    )

    const products = await Product.find(
        find).limit(4).skip(pagination.skip)
    
    for(const product of products){
        const user = await Account.findOne({
            deleted: false,
            _id: product.deletedBy.account_id
        })
        if(user){
            product.user_name = user.fullname
        }
    }

    res.render("admin/pages/trashbin/index", {
        title: "Thùng Rác",
        product: products,
        filterStatus: filterStatus,
        keyword: findObject.keyword,
        pagination: pagination
    })
}

// moudle cho phép thay đổi status của một thuộc tính
module.exports.changestatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { status: status })

    res.redirect("back")
}


// moudle cho phép thay đổi status của nhiều thuộc tính
module.exports.changemulti = async (req, res) => {
    const reqid = req.body.ids.split(", ");
    const reqstatus = req.body.type

    switch(reqstatus) {
        case "active":
        await Product.updateMany({_id: { $in : reqid}},{status: "active"})
        break;
        case "inactive":
        await Product.updateMany({_id: { $in : reqid}},{status: "inactive"})
        break;
        case "delete_all":
        await Product.deleteMany({_id: { $in: reqid}})
        break;
    }

    res.redirect("back")
}   

// hàm cho phép xóa một sản phẩm  vĩnh viễn
module.exports.delete_real = async (req,res) => {
    const id= req.params.id;

    await Product.deleteOne({_id: id})

    res.redirect("back")

}

// hàm cho phép phục hồi lại sản phẩm
module.exports.recover = async (req,res) => {
    const id= req.params.id;

    await Product.updateOne({_id: id},{deleted: false})

    res.redirect("back")

}