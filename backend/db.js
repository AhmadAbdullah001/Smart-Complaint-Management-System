const dotenv = require("dotenv");
dotenv.config();
const URL = process.env.MONGOURL;
const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectToDB;