const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const notesFile = path.join(__dirname, '../data/notes.json');

const readNotes = () => {
    const notes = fs.readFileSync(notesFile, 'utf-8');
    return JSON.parse(notes);
}

const writeNotes = (notes) => {
    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
}

const checkId = (id) => {
    if (!id) return res.status(400).json({ message: "please provide an id" });
    return id;
}

const checkData = (title, content) => {
    if (!title || !content) return res.status(400).json({ message: 'Title and content required' });
    return { title, content };
}

router.get('/', (req, res) => {
    const notes = readNotes();
    res.json(notes);
});

router.get('/:id', (req, res) => {
    const note = readNotes()?.find(n => n.id === checkId(req.params.id));
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
});

router.post('/', (req, res) => {
    const { title, content } = checkData(req.body.title, req.body.content);

    const notes = readNotes();
    const newNote = { id: uuidv4(), title, content };
    notes.push(newNote);
    writeNotes(notes);

    res.status(201).json({ message: "New Note added successfully", note: newNote });
});


router.put('/:id', (req, res) => {
    const { title, content } = checkData(req.body.title, req.body.content);

    const notes = readNotes();
    const index = notes.findIndex(n => n.id === checkId(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Note not found' });

    notes[index] = { ...notes[index], title, content };
    writeNotes(notes);
    
    res.status(200).json({ message: `Note updation successfull` });
});

router.delete('/:id', (req, res) => {
    const notes = readNotes();
    const filteredNotes = notes.filter(n => n.id !== checkId(req.params.id));
    if (notes.length === filtered.length) return res.status(404).json({ message: 'Note not found' });

    writeNotes(filteredNotes);
    res.status(200).json({ message: `Note for the given id ${id} is deleted successfully` });
});

module.exports = router;
