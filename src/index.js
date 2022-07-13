require("dotenv").config({ path: "src/.env" });
const express = require("express");
const app = express();
const cors = require("cors");

require("./mongo");

const Note = require("./models/Note");

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("<h1>HELLO WORLD</h1>");
});

app.get("/api/notes", (_req, res) => {
  Note.find({}).then((result) => res.json(result));
});

app.get("/api/notes/:id", (_req, res, next) => {
  const id = _req.params.id;
  Note.findById(id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/notes/:id", (_req, res, next) => {
  const id = _req.params.id;
  Note.deleteOne({ _id: id })
    .then((result) => res.status(204).end())
    .catch((error) => {
      next(error);
    });
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

app.use((error, _req, res, next) => {
  console.error(error);
  if (error.name === "CastError") {
    res.status(400).send({ error: "id used is malformed" });
  } else {
    res.status(500).end();
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
