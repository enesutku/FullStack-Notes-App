const express = require('express');
const fs = require('fs');
const Notes = require('./models/note');
const Note = require('./models/note');

require('./db/mongoose');

const app = express();
app.use(express.json())

// CRUD

// Creating Notes

app.post('/notes', async (req, res) => {
    const note = new Note(req.body)

    try {
        await note.save()
        res.status(201).send(note)
    } catch (err) {
        res.status(400).send(err)
    }

});

// Reading Notes

app.get('/notes', async (req, res) => {

    try{
        const notes = await Note.find({})
        res.send(notes)
    } catch (err) {
        res.status(500).send(err)
    }

});

// Updating Notes

app.patch('/notes/:id', async (req, res) => {

    try {
        const note = await Note.findById(req.params.id)

        if(!note) {
            return res.status(404).send()
        }
        
        note.note = req.body.note

        await note.save()

        res.status(200).send(note)

    } catch(err) {
        res.status(404).send(err)
    }

})

// Deleting Notes

app.delete('/notes/:id', async (req, res) => {

    try {
        const note = await Note.findByIdAndDelete(req.params.id)

        if(!note) {
            return res.status(404).send()
        }

        res.status(200).send('The note has been deleted!')

    } catch(err) {
        res.status(500).send(err)
    }

})


// Listen Port

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});