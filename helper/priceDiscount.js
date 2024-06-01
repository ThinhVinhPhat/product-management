

module.exports.priceDiscount = (products)=>{
    const newProduct = products.map((items => {
        items.PriceNew = (items.price * (100 - items.discountPercentage)/100).toFixed(0);
        return items;
    }) )

    return newProduct
}



module.exports.oneprice = (product)=>{
    product.PriceNew = (product.price * (100 - product.discountPercentage)/100).toFixed(0);

    return product;
}