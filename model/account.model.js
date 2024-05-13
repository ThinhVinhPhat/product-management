const mongoose = require("mongoose");
const generate = require("../helper/generateRandom")


const accountSchema = new mongoose.Schema({
    
    fullname: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: generate.Random(20)
    },
    avatar: String,
    phone: String,
    role_id: String,
    status: String,

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

const Account = mongoose.model("Account",accountSchema,"account")

module.exports = Account;