const mongoose = require('mongoose');
require('dotenv').config(); 

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI; // Get the URI from environment variables
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

module.exports = connectDB;
