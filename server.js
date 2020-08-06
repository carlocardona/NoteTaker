const express = require('express');
const path = require('path');
const assignID = require('uuid/v1');
const fs = require('fs');


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

///Shows All Notes///
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', function (err, content) {
        console.log(content);
        res.json(JSON.parse(content));
    }, function (err) { console.log(err); }
    );
    console.log('Showing Notes.')
});

///Post New Note///
app.post('/api/notes', (req, res) => {

    const id = assignID();

    fs.readFile('./db/db.json', 'utf8', function (err, content) {
        const notes = JSON.parse(content);
        notes.push({ id, ...req.body });

        fs.writeFile('./db/db.json', JSON.stringify(notes), function (err) {
            console.log(err);
        });
        console.log('Notes Posted -> ' + id + notes);
        res.json(notes);

    });


});

///Delete Notes///
app.delete('/api/notes/:id', (req, res) => {

    const userChoice = req.params.id;

    fs.readFile('./db/db.json', 'utf8', function (err, content) {

        let notes = JSON.parse(content);

        for (let i = 0; i < notes.length; i++) {

            if (notes[i].id === userChoice) {
                notes.splice(i, 1);

                fs.writeFile('./db/db.json', JSON.stringify(notes), function (err) {
                    if (err) throw err;
                    res.send(notes);
                });
            };
        };

    });

    console.log('userchoice-> ' + userChoice);
    console.log('Note Deleted.');
})

/////Port Listener/////
app.listen(PORT, () => {
    console.log('App Listening.');
});