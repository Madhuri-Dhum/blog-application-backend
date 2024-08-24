const mongoose = require("mongoose");

const dbConnect = mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Db connected successfully");
  })
  .catch((error) => {
    console.log("Error occurs : ", error);
  });

module.exports = dbConnect;
