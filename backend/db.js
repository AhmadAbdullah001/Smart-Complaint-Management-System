const dotenv = require("dotenv");
dotenv.config();
const URL=process.env.MONGOURL;
const mongoose=require('mongoose')
const connectToDB=async()=>{
    try {
        mongoose.connect(URL)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}
module.exports=connectToDB;