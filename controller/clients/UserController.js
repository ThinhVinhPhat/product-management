const User = require("../../model/user.model")
const md5 = require("md5")
const generate = require("../../helper/generateRandom")
const forgotPassword = require("../../model/forgotPassword.model")
const Mailer = require("../../helper/Client/Mailhelper")

module.exports.resigter = async (req, res) => {
    res.render("client/pages/user/resigter", {
        titlePage: "Đăng ký"
    })
}

module.exports.resigterPost = async (req, res) => {

    const emailExist = await User.findOne({
        deleted: false,
        email: req.body.email
    })

    if (emailExist) {
        req.flash("error", "Email đã tồn tại")
        res.redirect("back")
        return
    }
    else {
        req.body.password = md5(req.body.password)
        const user = new User(req.body)
        await user.save()

        const expiresTime  = 1000 * 60 * 60 * 1

        res.cookie('token',user.id, { expires: new Date(Date.now() + expiresTime ), httpOnly: true })

        req.flash("success", "Đăng ký thành công")
        res.redirect("back")
    }

}


module.exports.login = async (req, res) => {
    res.render("client/pages/user/login", {
        titlePage: "Đăng nhập"
    })
}

module.exports.loginPost = async(req,res)=>{
    const user = await User.findOne({
        email: req.body.email,
        password: md5(req.body.password),
        deleted: false,
        status: "active"
    })

    if(user){
        res.cookie('token',user.token, { expires: new Date(Date.now() + 900000), httpOnly: true })
        res.locals.user = user
        req.flash("success","Đăng nhập thành công")
        res.redirect("/")
    }
    else{
        req.flash("error","Sai tài khoản hoặc mật khẩu")
        res.redirect("back")
        return
    }

}

module.exports.logout = async(req,res)=>{

    res.clearCookie("token")
    res.redirect("/")
}

module.exports.forgotPassword = async(req,res)=>{
    res.render("client/pages/user/forgotpassword",{
        titlePage: "Quên mật khẩu"
    })
}


module.exports.forgotPasswordPost = async(req,res)=>{
   const email = req.body.email

    const user = await User.findOne({
        email: email,
        deleted: false
    })

    if(!user){
        req.flash("error","Email không tồn tại")
        res.redirect("back")
        return;
    }


    const otp = generate.RandomNum(6)

    const otpobj = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    }

    const forgot = new forgotPassword(otpobj)
    await forgot.save()

   const info  = {
    email: email,
    subject: "OTP Reset Password send",
    message: `Your OTP is <b>${otp}</b>.This code will disabled in 3 minutes so be sure to confirm it quickly
    . Be sure not to send this code to anybody`
   }

   await Mailer.sendMail(info)

    res.redirect(`/user/password/otp?email=${email}`)
}

module.exports.otp = async(req,res)=>{
    const email = req.query.email



    res.render("client/pages/user/otp",{
        titlePage: "Nhập mã OTP",
        email: email
    })
}


module.exports.otpPost = async(req,res)=>{
    const email = req.body.email
    const otp  = req.body.otp

    const user = await User.findOne({
        email: email,
        deleted: false
    })

    if(!user){
        req.flash("error","Email không tồn tại")
        res.redirect("/user/password/forgot")
        return;
    }


    const forgot = await forgotPassword.findOne({
        email: email,
        otp: otp
    })

    if(!forgot){
        req.flash("error","OTP không hợp lệ")
        res.redirect("back")
        return;
    }

    res.cookie('token',user.token, { expires: new Date(Date.now() + 900000), httpOnly: true })
    res.redirect(`/user/password/resetpassword?email=${email}`)
}

module.exports.resetpassword = async(req,res)=>{

    res.render("client/pages/user/resetpassword",{
        titlePage: "Đặt lại mật khẩu"
    })
}

module.exports.resetpasswordPost = async (req,res) =>{
    const password = req.body.password;
    const email = req.query.email;
    await User.updateOne({
        email: email
    },{
    password: password
    })

    req.flash("success","Đổi mật khẩu thành công")
    res.redirect("/")
}