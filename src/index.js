require("dotenv").config({ path: "src/.env" });
const express = require("express");
const app = express();
const cors = require("cors");

require("./mongo");

const Note = require("./models/Note");

app.use(cors());
app.use(express.json());

let notes = [];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(notes));
// });

app.get("/", (_req, res) => {
  res.send("<h1>HELLO WORLD</h1>");
});

app.get("/api/notes", (_req, res) => {
  Note.find({}).then((result) => res.json(result));
});

app.get("/api/notes/:id", (_req, res) => {
  const id = _req.params.id;
  Note.findById(id).then((note) => res.json(note));
});

app.delete("/api/notes/:id", (_req, res) => {
  const id = _req.params.id;
  Note.deleteOne({ _id: id }).then(res.status(204).end());
});

app.post("/api/notes", (_req, res) => {
  const note = _req.body;

  const noteAux = new Note({
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== "undefined" ? note.important : false,
  });

  noteAux.save().then((noteSaved) => res.status(201).send(noteSaved));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
