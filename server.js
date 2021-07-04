const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require(path.join(__dirname, "/db/db.json"));
const { nanoid } = require("nanoid");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.post("/api/notes", (req, res) => {
    req.body.id = nanoid(7);

    res.json(req.body);
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});



app.listen(PORT, () => {
    console.log(`Server active on port ${PORT}`);
});