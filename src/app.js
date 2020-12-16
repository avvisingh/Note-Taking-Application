const path = require('path');
const process = require('process');
const fs = require('fs').promises;
const express = require('express');
const nanoid = require('nanoid');


const app = express();

const dbPath = path.join(__dirname, '../db/db.json');
const publicDirPath = path.join(__dirname, '../public');
const notesPath = path.join(__dirname, '../public/notes.html');
const indexPath = path.join(__dirname, '../public/index.html');
const port = process.env.PORT || 3000;
const notes = require('../db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(publicDirPath));


app.get('/notes', (req, res) => {
    res.sendFile(notesPath);
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', async (req, res) => {
        const noteToAdd = {};
        noteToAdd.title = req.body.title;
        noteToAdd.text = req.body.text;
        noteToAdd.id = nanoid.nanoid();

        notes.push(noteToAdd);
        await fs.writeFile(dbPath, JSON.stringify(notes));

        return res.json({success: true, msg: `You have successfully added a note with title: ${noteToAdd.title} and text: ${noteToAdd.text}`});

})

app.get('*', (req, res) => {
    res.sendFile(indexPath);
});

app.listen(port, () => {
    let randomID = nanoid.nanoid();

    console.log(`server is now listening on port ${port}`);
    console.log(`random id generation test : ${randomID}`)
});