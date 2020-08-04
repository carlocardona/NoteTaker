const express = require('express');
const path = require('path');
const fs = require('fs');
const assignID = require('uuid/v1');
const { json } = require('express');

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

    const newID = assignID();

    fs.readFile('./db/db.json', 'utf8', function (err, content) {
        notes = JSON.parse(content);
        notes.push({ newID, ...req.body });

        fs.writeFile('./db/db.json', JSON.stringify(notes), function (err) {
            console.log(err);
        });
        console.log('Notes Posted -> ' + newID + notes);
    })

    return res.json(req.body);

});

///Shows All Notes///
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', function (err, content) {
        console.log(content);
        res.json(JSON.parse(content));
    }, function (err) { console.log(err); }
    );
    console.log('Showing Notes.')
});

///Delete Notes///
app.delete('/api/notes/:id', (req, res) => {

    const userChoice = req.params.id; //user choice

    let toDelete = JSON.parse(dbNotes);//parse through json file

    fs.readFile('./db/db.json', 'utf8', function (content) {

        notes = JSON.parse(content);

        //iterate through array 
        //find by id
        //if notes === userchoice -> splice 
        //then write out all of left over notes

    });

    //write back out all
    console.log("userChoice Data " + userChoice);
    console.log('Note Deleted.');
})

/////Port Listener/////
app.listen(PORT, () => {
    console.log('App Listening.');
});