const Account = require("../model/account.model")
const Role = require("../model/roles.model")
module.exports.auth = async(req,res,next) =>{
   const token = req.cookies.token

   if(token){
    const user = await Account.findOne({
        deleted: false,
        token: token
    }).select("-password")


    if(!user){
        res.redirect("/admin/auth/login")
    }
    else{
        const role = await Role.findOne({
            deleted: false,
            _id: user.role_id
        }).select("title permission")
        res.locals.user = user
        res.locals.role = role
        next()
    }

   }
   else{
    res.redirect("/admin/auth/login")
   }

}