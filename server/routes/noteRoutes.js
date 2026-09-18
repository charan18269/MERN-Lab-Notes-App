const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

/**
 * POST /api/notes
 * Parse the request payload, persist the new document,
 * and return HTTP 201 Created with the serialized note.
 */
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are both required.' });
    }

    const note = new Note({ title, content });
    const savedNote = await note.save();

    res.status(201).json(savedNote);
  } catch (err) {
    console.error('Error creating note:', err.message);
    res.status(500).json({ message: 'Server error while creating note.' });
  }
});

/**
 * GET /api/notes
 * Query and return all notes, ordered chronologically descending.
 */
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    console.error('Error fetching notes:', err.message);
    res.status(500).json({ message: 'Server error while fetching notes.' });
  }
});

/**
 * DELETE /api/notes/:id
 * Locate the document by its MongoDB _id and delete it.
 * Returns 200 OK on success or 404 Not Found if absent.
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    res.status(200).json({ message: 'Note deleted successfully.', note: deletedNote });
  } catch (err) {
    console.error('Error deleting note:', err.message);
    // Malformed ObjectId also lands here — treat as a server-side failure.
    res.status(500).json({ message: 'Server error while deleting note.' });
  }
});

module.exports = router;
