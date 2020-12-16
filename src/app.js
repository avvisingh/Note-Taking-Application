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
const { networkInterfaces } = require('os');

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

    return res.json({ success: true, msg: `You have successfully added a note with title: ${noteToAdd.title} and text: ${noteToAdd.text}` });

});

app.delete('/api/notes/:id', async (req, res) => {
    let noteToDeleteId = req.params.id; 
    for (let i = 0; i < notes.length; i++ ) {
        if (notes[i].id === noteToDeleteId) {
            notes.splice(i, 1);
        }
    }

    await fs.writeFile(dbPath, JSON.stringify(notes));
    res.redirect('back');
})

app.get('*', (req, res) => {
    res.sendFile(indexPath);
});

app.listen(port, () => {
    console.log(`server is now listening on port ${port}`);
});