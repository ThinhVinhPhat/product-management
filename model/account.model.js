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

    deleted: {
        type: Boolean,
        default: false
    },
    
    deletedAt: Date,

},{
    timestamps: true
})

const Account = mongoose.model("Account",accountSchema,"account")

module.exports = Account;