const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug);

const NewsSchema = new mongoose.Schema({
    title: String,

    danhmuccha_id: {
        type: String,
        default: ""
    },

    description : String,

    short_description: String,

    featured: String,

    thumbnail:String,

    status: String,
    
    position: Number,

    slug: {type: String,slug:"title",unique: true},

    createdBy:{
        account_id: String,
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },

    deleted: {
        type: Boolean,
        default: false
    },
    
    deletedBy: {
        account_id: String,
        deletedAt: {
            type: Date,
            default: Date.now()
        }
    },
    UpdatedBy: 
        [
    {
        account_id: String,
        UpdateAt: {
            type: Date,
            default: Date.now()
        }
    } 
    ]
},{
    timestamps: true
})

const News = mongoose.model("News",NewsSchema,"news")

module.exports = News;