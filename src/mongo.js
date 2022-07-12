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

// const note = new Note({
//   content: "MongoDB es increible, midu",
//   date: new Date().toISOString(),
//   important: true,
// });

// note
//   .save()
//   .then((result) => {
//     console.log(result);
//     mongoose.connection.close();
//   })
//   .catch((error) => {
//     console.error("Something went wrong..." + error);
//   });
