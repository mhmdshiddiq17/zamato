const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => { 
      console.log("Database connected successfully");
    })
    .catch((e) => {
      console.log("Database connection failed", e);
    })
}

module.exports = connectDB;