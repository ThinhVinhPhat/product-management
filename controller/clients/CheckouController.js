const Cart = require("../../model/cart.model");
const Product = require("../../model/product-model")
const priceDiscount= require("../../helper/priceDiscount");
const Order = require("../../model/checkout.model");



module.exports.index= async (req,res)=>{
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

    res.render("client/pages/checkout/index",{
        titlePage: 'Đạt hàng',
        product: cart.products,
        cart : cart
    })
}


module.exports.order = async(req,res)=>{
    const cart_id = req.cookies.cart_id
    const  user_info= {
        fullname: req.body.fullname,
        phone: req.body.phone,
        address: req.body.address
       }


    const cart  = await Cart.findOne({
        _id: cart_id
    })

    const products = []

    for(var product of cart.products)
        {
            const product_info  = await Product.findOne({
                _id : product.product_id
            })

            const object =  {
                product_id: product.product_id,
                price: product_info.price,
                discountPercentage: product_info.discountPercentage,
                quantity: product.quantity
            }

            products.push(object)

        }
    
    const order = {
        cart_id: cart_id,
        user_info: user_info,
        products: products
    }

    console.log(order)

    const orders = new Order(order)
    await orders.save()


    res.redirect(`/checkout/success/${orders.id}`)
}


module.exports.success = async (req,res)=>{
    const order= await Order.findOne({
        _id: req.params.orderid
    })

    for (const product of order.products) {
        const products = await Product.findOne({
            _id: product.product_id
        })

        const newProduct  = priceDiscount.oneprice(products)

        
        newProduct.totalPrice = newProduct.PriceNew * product.quantity;
        
        product.product = newProduct
    }

    order.totalPrice = order.products.reduce((sum,item) => sum + item.product.totalPrice , 0)


    res.render("client/pages/checkout/success",{
        titlePage: "Thanh Toán",
        product: order.products,
        order : order
    })
}