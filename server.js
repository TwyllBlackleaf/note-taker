const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.listen(PORT, () => {
    console.log(`Server active on port ${PORT}`);
});