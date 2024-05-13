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


const role = mongoose.model("role",roles_model,"roles")

module.exports = role;