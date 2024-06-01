module.exports.createPost = async(req,res,next)=>{
    if(!req.body.fullname){
        req.flash("error","Vui lòng nhập họ tên")
        res.redirect("back")
        return;
    }
    if(!req.body.password){
        req.flash("error","Vui lòng nhập mật khẩu")
        res.redirect("back")
        return;
    }
    if(!req.body.email){
        req.flash("error","Vui lòng nhập email")
        res.redirect("back")
        return;
    }
    if(!req.body.phone){
        req.flash("error","Vui lòng nhập số điện thoại")
        res.redirect("back")
        return;
    }
    next()
}


module.exports.checkemail = (req,res,next) =>{
    if(!req.body.email){
        req.flash("error","Vui lòng nhập email")
        res.redirect("back")
        return;
    } 
    next() 
}


module.exports.checkOTP = (req,res,next) =>{
    if(!req.body.otp){
        req.flash("error","Vui lòng nhập mã OTP")
        res.redirect("back")
        return;
    } 
    next() 
}

module.exports.checkMK = (req,res,next) =>{
    if(!req.body.password){
        req.flash("error","Vui lòng nhập mật khẩu mới")
        res.redirect("back")
        return;
    }
    if(!req.body.re_password){
        req.flash("error","Vui lòng nhập lại mật khẩu")
        res.redirect("back")
        return;
    }

    if(req.body.password !== req.body.re_password){
        req.flash("error","Mật khẩu không khớp")
        res.redirect("back")
        return;
    }


}