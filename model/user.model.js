const mongoose = require("mongoose");
const generate = require("../helper/generateRandom")


const userSchema = new mongoose.Schema({
    
    fullname: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: generate.Random(20)
    },
    status: {
        type: String,
        default: "active"
    },
    avatar: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },

    deleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

const User = mongoose.model("User",userSchema,"user")

module.exports = User;