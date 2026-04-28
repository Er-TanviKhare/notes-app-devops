const express = require("express");
const app = express();

app.use(express.json());

let notes = [];

// UI
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Notes App</title>
      </head>
      <body style="font-family: Arial; text-align:center; margin-top:50px;">
        <h2>📝 Test Demo Notes App</h2>

        <input id="note" placeholder="Write a note..." />
        <button onclick="addNote()">Add</button>

        <ul id="list" style="list-style:none; padding:0;"></ul>

        <script>
          async function addNote() {
            const value = document.getElementById("note").value;

            await fetch("/notes", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: value })
            });

            document.getElementById("note").value = "";
            loadNotes();
          }

          async function loadNotes() {
            const res = await fetch("/notes");
            const data = await res.json();

            const list = document.getElementById("list");
            list.innerHTML = "";

            data.forEach(n => {
              const li = document.createElement("li");
              li.innerText = "• " + n.text;
              li.style.margin = "10px";
              list.appendChild(li);
            });
          }

          loadNotes();
        </script>
      </body>
    </html>
  `);
});

// API
app.get("/notes", (req, res) => {
  res.json(notes);
});

app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.send("Added");
});

app.listen(3000, '0.0.0.0', () => {
  console.log("Server running on port 3000");
});