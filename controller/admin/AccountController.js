var md5 = require('md5');
const Account = require("../../model/account.model")
const Role = require("../../model/roles.model")

// module cho phép chuyển đổi status
module.exports.changestatus = async(req,res) =>{
    const id = req.params.id
    const status = req.params.status

    req.flash("success", "Cập nhật trạng thái thành công");

    await Account.updateOne({_id: id},{status: status})
        res.redirect("back")
    
}

// module trang chính
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }

    const records = await Account.find(find).select("-password -token")
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
        records: records
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
        
        await Account.updateOne({_id: id},req.body)
    
        req.flash("success","Cập nhật thành công")
        res.redirect("back")
        
    }

}