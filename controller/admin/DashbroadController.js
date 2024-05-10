module.exports.adminDashbroad = (req , res) =>{
    console.log(req.cookies)
    if(req.cookies){
        res.render("admin/pages/dashbroad/index", {
            title: "Trang Tổng Quát"
        })

    }else{
        res.redirect("admin/auth/login")
    }


}