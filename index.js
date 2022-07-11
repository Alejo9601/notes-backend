const { response } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "This is the first note",
    date: "30/06/2022",
    important: true,
  },
  {
    id: 2,
    content: "this is the second note",
    date: "30/06/2022",
    important: true,
  },
  {
    id: 3,
    content: "this is third the note",
    date: "30/06/2022",
    important: true,
  },
];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(notes));
// });

app.get("/", (_req, res) => {
  res.send("<h1>HELLO WORLD</h1>");
});

app.get("/api/notes", (_req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (_req, res) => {
  const id = Number(_req.params.id);
  const note = notes.find((note) => note.id === id);
  console.log(id);
  res.json(note);
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
