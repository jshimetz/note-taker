// Import required modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { Sequelize, Model, DataTypes } = require('sequelize');

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 3000;

// Define database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/db.sqlite',
});

// Define Note model
class Note extends Model {}
Note.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'note',
  }
);

// Sync the model with the database
sequelize.sync();

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/notes', async (req, res) => {
  try {
    const { title, text } = req.body;
    const note = await Note.create({ title, text });
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.delete('/api/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Note.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
