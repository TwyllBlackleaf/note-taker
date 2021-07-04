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

function validateNote(note) {
    if (!note.title || typeof note.title !== "string") {
        return false;
    }
    if (!note.text || typeof note.title !== "string") {
        return false;
    }
    return true;
}

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.post("/api/notes", (req, res) => {
    req.body.id = nanoid(7);

    if (!validateNote(req.body)) {
        res.status(400).send("Please include a title and text in your note.");
    } else {
        res.json(req.body);
    }


})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server active on port ${PORT}`);
});