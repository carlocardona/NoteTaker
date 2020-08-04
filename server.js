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
    console.log('Notes Posted -> ' + newID + dbNotes);
    return res.json(dbNotes);

});

///Shows All Notes///
app.get('/api/notes', (req, res) => {
    res.json(dbNotes);
    console.log('Showing Notes.')
});

///Delete Notes///

app.delete('/api/notes/:id', (req, res) => {

    const userChoice = req.params.id; //user choice

    // let toDelete = JSON.parse(dbNotes);//parse through json file

    // if userChoice === toDelete{
    //     userChoice.splice(userChoice, 1);
    // }
    console.log("userChoice Data " + userChoice);
    console.log('Note Deleted.');
})

/////Port Listener/////

app.listen(PORT, () => {
    console.log('App Listening.');
});