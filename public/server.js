const express = require('express');
const path = require('path');
const dbNotes = require('../db/db.json');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Basic Routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'))
})

//Post New Note
app.post('/api/notes', (req, res) => {

    dbNotes.push(req.body);
    res.json(dbNotes);

});

//Shows All Notes
app.get('/api/notes', (req, res) => {
    return res.json(dbNotes);
});

//Delete Notes

app.delete('/api/notes/:id', (req, res) => {
    console.log('Deleting Note...');
})

//Port Listener

app.listen(PORT, () => {
    console.log('App Listening...');
});