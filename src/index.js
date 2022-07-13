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
  const id = Number(_req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post("/api/notes", (_req, res) => {
  const note = _req.body;

  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);

  const noteAux = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== "undefined" ? note.important : false,
  };

  notes = [...notes, noteAux];
  //notes.push(noteAux)
  //notes = notes.concat(noteAux) different ways to do the same thing

  res.status(201).send(noteAux);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
