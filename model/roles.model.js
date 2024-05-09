const mongoose = require("mongoose")



const roles_model = new mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    
    permission: {
        type: Array,
        default: []
    },
    
    description : {
        type: String,
        default: ""
    },
    
    deleted: {
        type: Boolean,
        default: false
    },
    
    deletedAt: Date,

},{
    timestamps: true
})


const role = mongoose.model("role",roles_model,"roles")

module.exports = role;