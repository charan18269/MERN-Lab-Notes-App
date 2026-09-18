const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// --- Database ---
connectDB();

// --- Middleware ---
// CORS must be mounted BEFORE route handlers so the browser doesn't block
// cross-origin requests from the Vite dev server at http://localhost:5173.
app.use(cors());
app.use(express.json());

// --- Routes ---
app.use('/api/notes', noteRoutes);

app.get('/', (req, res) => {
  res.send('Notes API is running. Try GET /api/notes');
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
