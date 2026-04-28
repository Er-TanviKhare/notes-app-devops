const express = require("express");
const app = express();

app.use(express.json());

let notes = [];

app.get("/", (req, res) => {
  res.send("Notes App Running 🚀");
});

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.send("Note added");
});

app.listen(3000, '0.0.0.0', () => {
  console.log("Server running on port 3000");
});