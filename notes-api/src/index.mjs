import express from 'express';
import mongoose from 'mongoose';
import Note from './models/note.js';
import './db/mongoose.js';

import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSMongoose from '@adminjs/mongoose';

// AdminJS Mongoose adapter registration
AdminJS.registerAdapter(AdminJSMongoose);

// AdminJS configuration
const adminJs = new AdminJS({
  resources: [{
    resource: Note,
    options: {
      properties: {
        _id: { isVisible: { list: true, edit: false, filter: true, show: true } },
        note: { isTitle: true },
      },
    },
  }],
  rootPath: '/admin',
});

// AdminJS route creation
const router = AdminJSExpress.buildRouter(adminJs);

const app = express();
app.use(express.json());
app.use(adminJs.options.rootPath, router);

// CRUD operations

// Create note
app.post('/notes', async (req, res) => {
  const note = new Note(req.body);

  try {
    await note.save();
    res.status(201).send(note);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Read notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find({});
    res.send(notes);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update note
app.patch('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send();
    }

    note.note = req.body.note;

    await note.save();

    res.status(200).send(note);
  } catch (err) {
    res.status(404).send(err);
  }
});

// Delete note
app.delete('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).send();
    }

    res.status(200).send('The note has been deleted!');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
