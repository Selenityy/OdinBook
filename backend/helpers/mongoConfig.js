require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dev_db_url = "";
    mongoose.set("strictQuery", false);
    const mongoDb = process.env.MONGODB_URI_ODINBOOK || dev_db_url;
    mongoose.connect(mongoDb);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "mongo connection error"));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
