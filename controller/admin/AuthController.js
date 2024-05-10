const mde5 = require("md5")
const Account = require("../../model/account.model")



module.exports.login = async(req,res)=>{
    res.render("admin/pages/auth/login",{
        title: "Đăng nhập"
    })
}

module.exports.logout = async(req,res)=>{

    res.clearCookie("token")
    res.redirect("/admin/auth/login")
}

module.exports.loginPost = async(req,res)=>{
    const email = req.body.email
    const password = req.body.password

    const user = await Account.findOne({
        deleted: false,
        email: email
    })

    if(!user){
        req.flash("error","Email không tồn tại")
        res.redirect("back")
    }
    else{
        if(mde5(password) === user.password){
            res.cookie('token',user.token, { expires: new Date(Date.now() + 900000), httpOnly: true })
            req.flash("success","Đăng nhập thành công")
            res.redirect("/admin/dashbroad")
        }
        else{
            req.flash("error","Sai mật khẩu")
            res.redirect("back")
        }
    }

}