const mongoose = require("mongoose");

module.exports.connectDB = async () =>{
    try {
       await mongoose.connect(process.env.CONNECT_DB)
        console.log("Connect SuccessFully")
    } catch (error) {
        console.log("Connect Failed")
        console.log(error);
    }
}