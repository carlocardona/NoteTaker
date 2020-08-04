const express = require('express');
const path = require('path');
const fs = require("fs");
const dbNotes = require('./db/db.json');

const app = express();
const PORT = 3000;

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//////Basic Routes/////

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

///Post New Note///
app.post('/api/notes', (req, res) => {

    const currentID = dbNotes.length;
    const newID = currentID + 1;
    dbNotes.push({ newID, ...req.body });
    res.json(dbNotes);

});

///Shows All Notes///
app.get('/api/notes', (req, res) => {
    res.json(dbNotes);
});

///Delete Notes///

app.delete('/api/notes/:id', (req, res) => {

    const toDelete = req.params.id;
    console.log('Deleting Note...');
})

/////Port Listener/////

app.listen(PORT, () => {
    console.log('App Listening...');
});