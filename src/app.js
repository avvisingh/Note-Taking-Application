const path = require('path');
const express = require('express');
const process = require('process');

const app = express();
const notesPath = path.join(__dirname, '../public/notes.html');
const indexPath = path.join(__dirname, '../public/index.html');
const port = process.env.PORT || 3000

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(notesPath);
})

app.get('*', (req, res) => {
    res.sendFile(indexPath);
})

app.listen(port, () => {
    console.log(`server is now listening on port ${port}`);
})