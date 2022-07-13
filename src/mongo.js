const mongoose = require("mongoose");

const conString = process.env.MONGO_URI;

mongoose
  .connect(conString)
  .then(() => {
    console.log("Database CONNECTED");
  })
  .catch((error) => {
    console.error(error);
  });
