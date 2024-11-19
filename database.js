const mongoose = require("mongoose");

async function connectDB() {
    
    try {
        await mongoose.connect("mongodb://localhost:27017/gandyam");
        console.log("connection success");
    } catch (error) {
        console.error("Erreur de connection: ",error);
        process.exit(1);
    }
}

module.exports = connectDB;