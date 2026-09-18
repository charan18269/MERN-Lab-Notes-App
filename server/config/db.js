const mongoose = require('mongoose');

// Default connection string — no custom secrets or non-standard ports,
// per the "database portability" requirement.
const MONGO_URI = 'mongodb://localhost:27017/notes_db';

const connectDB = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log(`MongoDB connected successfully -> ${MONGO_URI}`);
    })
    .catch((err) => {
      // Resilient error handling: log clearly instead of crashing silently.
      console.error('MongoDB connection error:', err.message);
    });
};

module.exports = connectDB;
