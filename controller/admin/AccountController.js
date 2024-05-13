var md5 = require('md5');
const Account = require("../../model/account.model")
const Role = require("../../model/roles.model")
const filterStatuHelper = require("../../helper/filterStatus")
const findHelper = require("../../helper/find")
const paginationhelper = require("../../helper/pagination")

// module cho phép chuyển đổi status
module.exports.changestatus = async(req,res) =>{
    const id = req.params.id
    const status = req.params.status

   
    const UpdateAt = {
        account_id: res.locals.user.id,
        UpdateAt: Date.now()
    }    
    
    req.flash("success", "Cập nhật trạng thái thành công");

    await Account.updateOne({_id: id},{status: status,$push: {UpdatedBy: UpdateAt }})
        res.redirect("back")
    
}

// module trang chính
module.exports.index = async (req, res) => {
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
     const countProduct = await Account.countDocuments(find)
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
 

    const records = await Account.find(
        find).sort(sort).limit(4).skip(pagination.skip).select("-password -token")

    for(const record of records){
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false,
        })
        if(role){
            record.role = role
        }
    }


    res.render("admin/pages/account/index", {
        title: "Tài khoản",
        records: records,
        pagination: pagination,
        filterStatus: filterStatus,
        keyword: findObject.keyword
    })
}


// moudle trang tạo mới tài khoản
module.exports.create = async (req, res) => {

    const find = {
        deleted: false
    }

    const roles = await Role.find(find)


    res.render("admin/pages/account/create", {
        title: "Tài khoản",
        roles: roles

    })
}

// module tạo tài khoản
module.exports.createPost = async (req, res) => {
    if (req.body.password) {
        req.body.password = md5(req.body.password)
    }
    const emailExist = await Account.findOne({
        deleted: false,
        email: req.body.email
    })

    if (emailExist) {
        req.flash("error", "Email đã tồn tại");
        res.redirect("back")
        return;
    }
    else {
    req.body.createdBy = {
        account_id: res.locals.user.id,
        createdAt: Date.now()
    }
        const account = new Account(req.body)
        await account.save()

        req.flash("success", "Tạo thành công")
        res.redirect("back")

    }

}

// module trang chỉnh sửa trang 
module.exports.edit = async(req,res)=>{
    const id = req.params.id

    const account = await Account.findOne({
        deleted: false,
        _id: id
    })

    const find = {
        deleted: false
    }

    const roles = await Role.find(find)


    res.render("admin/pages/account/edit",{
        title: " Trang chỉnh sửa tài khoản",
        account: account,
        roles: roles
    })

}

module.exports.editPatch = async(req,res) =>{
    const id = req.params.id


   
    const UpdateAt = {
        account_id: res.locals.user.id,
        UpdateAt: Date.now()
    }    
    

    if(req.body.password){
        req.body.password = md5(req.body.password)
    }

    const emailExist = await Account.findOne({
        _id : {$ne: id},
        deleted: false,
        email: req.body.email
    })

    if (emailExist) {
        req.flash("error", "Email đã tồn tại");
        res.redirect("back")
        return;
    }
    else{
        
        await Account.updateOne({ _id: id }, {...req.body, $push: {UpdatedBy: UpdateAt }});
    
        req.flash("success","Cập nhật thành công")
        res.redirect("back")
        
    }

}


module.exports.detail = async(req,res)=>{
    const id = req.params.id

    const account = await Account.findOne({
        deleted: false,
        _id: id
    }).select("-password -token")

    const role = await Role.findOne({
        _id: account.role_id,
        deleted: false
    }).select("title")

    res.render("admin/pages/account/detail",{
        title: "Thông tin tài khoản",
        account: account,
        roles: role
    })
}