const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater")
mongoose.plugin(slug);


const productSchema = new mongoose.Schema({
    title: String,
    
    danhmuccha_id: {
        type: String,
        default: ""
    },
    description : String,

   
    thumbnail:String,
    
    position: Number,

    slug: {type: String,slug:"title",unique: true},

    deleted: {
        type: Boolean,
        default: false
    },
    
    deletedAt: Date,

},{
    timestamps: true
})

const Product_category = mongoose.model("Product_category",productSchema,"product-category")

module.exports = Product_category;