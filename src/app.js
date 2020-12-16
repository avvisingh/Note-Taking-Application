const path = require('path');
const process = require('process');
const express = require('express');
const nanoid = require('nanoid');


const app = express();

const notes = require('../db/db.json');
const publicDirPath = path.join(__dirname, '../public');
const notesPath = path.join(__dirname, '../public/notes.html');
const indexPath = path.join(__dirname, '../public/index.html');
const port = process.env.PORT || 3000


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(publicDirPath));


app.get('/notes', (req, res) => {
    res.sendFile(notesPath);
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('*', (req, res) => {
    res.sendFile(indexPath);
});

app.listen(port, () => {
    let randomID = nanoid.nanoid();

    console.log(`server is now listening on port ${port}`);
    console.log(`random id generation test : ${randomID}`)
});