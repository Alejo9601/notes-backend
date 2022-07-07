const express = require("express");
const app = express();

const notes = [
  {
    id: "1",
    content: "This is the first note",
    date: "30/06/2022",
    important: true,
  },
  {
    id: "2",
    content: "this is the second note",
    date: "30/06/2022",
    important: true,
  },
  {
    id: "3",
    content: "this is third the note",
    date: "30/06/2022",
    important: true,
  },
];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(notes));
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
