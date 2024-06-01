const Cart = require("../../model/cart.model");
const Product = require("../../model/product-model")
const priceDiscount= require("../../helper/priceDiscount")

module.exports.index = async(req,res) =>{
    const cart_id = req.cookies.cart_id

    const cart = await Cart.findOne({
        _id: cart_id
    })

    for(var item of cart.products){
        
            const cart_pro = await Product.findOne({
                _id: item.product_id 
            })

            const new_pro = priceDiscount.oneprice(cart_pro)


            item.product = new_pro

            item.product.total = item.product.PriceNew  * item.quantity
           var total = 0
           
           total += item.product.total

    }

    cart.totalPrice = cart.products.reduce((sum,item) => sum+ item.product.total,0)

    res.render("client/pages/cart/index",{
        titlePage: "Giỏ hàng",
        product: cart.products,
        cart : cart
    })
}






module.exports.createPost = async(req,res)=>{
    const cart_id = req.cookies.cart_id;    
    const product_id = req.params.id;
    const quantity = parseInt(req.body.quantity)
    
    if(product_id && quantity ){
        const cart = await Cart.findOne({_id: cart_id})

        const existProduct = cart.products.find(item => item.product_id == product_id)

        if(existProduct){
            const total_quantity = parseInt(existProduct.quantity)  + quantity;

            await   Cart.updateOne({
                _id: cart_id,
                'products.product_id': product_id
            },{
                'products.$.quantity': total_quantity
            })
            
            req.flash("success","thêm vào giỏ hàng thành công")
            res.redirect("back")
        }
        else{
            const product = {
                product_id: product_id,
                quantity: quantity
            }

        await   Cart.updateOne({_id: cart_id},{$push: {products: product} })

            req.flash("success","thêm vào giỏ hàng thành công")
            res.redirect("back")
        }

    }
}

module.exports.delete = async(req,res)=>{
    const id = req.params.id
    const cart_id = req.cookies.cart_id

    await Cart.updateOne({_id: cart_id},{$pull:{products: {"product_id": id}}})


    req.flash("success","Xóa thành công")

    res.redirect("back")
}


module.exports.update = async(req,res)=>{
    const id = req.params.id
    const quantity = req.params.quantity
    const cart_id = req.cookies.cart_id


    await Cart.updateOne({_id: cart_id,"products.product_id": id},
    {
        "products.$.quantity": quantity 
    })


    req.flash("success","Cập nhật số lượng thành công")

    res.redirect("back")
}