const express = require('express');
const path = require('path');
const db = require('../db/db.json');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = [];

//Basic Routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'))
})

//Post New Note
app.post('/api/notes', (req, res) => {

    const newNote = req.body;

    notes.push(newNote);
    res.json(newNote);

});

//Shows All Notes
app.get('/api/notes', (req, res) => {
    return res.json(notes);
});

//Delete Notes

app.delete('/api/notes/:id', (req, res) => {
    console.log('Deleting Note...');
})

//Port Listener

app.listen(PORT, () => {
    console.log('App Listening...');
});