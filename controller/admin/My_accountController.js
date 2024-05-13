var md5 = require('md5');
const Account = require("../../model/account.model")
const Role = require("../../model/roles.model")
const filterStatuHelper = require("../../helper/filterStatus")
const findHelper = require("../../helper/find")


module.exports.index = (req,res)=>{
    res.render("admin/pages/myaccount/index",{
        title: "Thông tin tài khoản"
    })
}

module.exports.edit = (req,res)=>{
    res.render("admin/pages/myaccount/edit",{
        title: "Thông tin tài khoản"
    })
}

module.exports.editPatch = async (req,res)=>{
   const emailExist = await Account.findOne({
    _id: {$ne: res.locals.user.id},
    deleted: false,
    email: req.body.email
   })
   if(!emailExist){
        if(req.body.password){
            req.body.password = md5(req.body.password)
        }
        else{
            delete req.body.password
        }

    await Account.updateOne({_id: res.locals.user.id}, req.body)
    req.flash("success","Cập nhật thành công")
    res.redirect("/admin/account/my_account")
   }
   else{
    req.flash("error", "Email đã tồn tại");
    res.redirect("back")
    return;
   }
}


