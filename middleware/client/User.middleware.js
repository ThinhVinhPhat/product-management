const User = require("../../model/user.model");

module.exports.checkUser = async(req,res,next)=>{
    const token  = req.cookies.token


    if(token){
        const user = await User.findOne({
            token: token,
            deleted: false
        }).select("-password")
        
           res.locals.user = user
    }


    next()
}