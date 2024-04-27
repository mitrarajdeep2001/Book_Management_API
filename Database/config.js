const mongoose = require("mongoose");
require("dotenv").config()

async function connectDB() {
  try {
    const username = encodeURIComponent(process.env.MONGODB_USERNAME);
    const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@cluster0.6vmr85a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/RESTAPI-1`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectDB;
