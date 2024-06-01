const Cart = require("../../model/cart.model");

module.exports.Cartmiddlewware = async(req,res,next)=>{
    const cart_cookie = req.cookies.cart_id;

    if(!cart_cookie){  
    const cart  = new Cart();
    await cart.save()

    const expiresTime  = 1000 * 60 * 60 * 24 * 365

    res.cookie('cart_id',cart.id, { expires: new Date(Date.now() + expiresTime ), httpOnly: true })
    }
    else{
        const cart  = await Cart.findOne({
            _id: cart_cookie
        })

        var count =0;
        for(var i of cart.products){
            if(i.product_id){
                count+=1;
            }
        }
        cart.totalProduct = count;


        res.locals.minicart = cart
    }
    next()
}