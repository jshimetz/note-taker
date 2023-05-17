const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Note = require('../models/Note');

const dbPath = path.resolve(__dirname, '../db/db.json');

function getNotes() {
  const dbData = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(dbData);
}

function saveNotes(notes) {
  fs.writeFileSync(dbPath, JSON.stringify(notes));
}

module.exports = function (app) {
  app.get('/api/notes', (req, res) => {
    const notes = getNotes();
    res.json(notes);
  });

  app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    const newNote = new Note(title, text);
    newNote.id = uuidv4();

    const notes = getNotes();
    notes.push(newNote);
    saveNotes(notes);

    res.json(newNote);
  });

  app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const notes = getNotes();
    const updatedNotes = notes.filter((note) => note.id !== id);
    saveNotes(updatedNotes);

    res.sendStatus(204);
  });
};
