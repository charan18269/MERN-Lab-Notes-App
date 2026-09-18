const mongoose = require('mongoose');

// Strictly follows the schema specification in the lab brief:
// title (String, required), content (String, required), createdAt (Date, default Date.now)
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Note', noteSchema);
