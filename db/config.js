const mongoose = require("mongoose");
// MongoDB connection

const databaseConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/bookStore");
    console.log("Connection established");
    mongoose.connection.on("error", (error) => {
      console.error("DB Connection error: ", error);
    });
  } catch (error) {
    console.log("Could not connect to db", error.toString());
  }
};
module.exports = databaseConnection;
