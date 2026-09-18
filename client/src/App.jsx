import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

// Backend base URL — server runs on port 5000 per the lab spec.
const API_URL = 'http://localhost:8000/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- Lifecycle data ingestion: fetch all notes on initial mount ---
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get(API_URL);
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError('Could not load notes. Is the server running on port 5000?');
    } finally {
      setLoading(false);
    }
  };

  // --- Controlled submission form ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      const res = await axios.post(API_URL, { title, content });
      // Prepend the new note so the list stays newest-first without a refetch.
      setNotes((prevNotes) => [res.data, ...prevNotes]);
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Error creating note:', err);
      setError('Failed to create the note. Please try again.');
    }
  };

  // --- Interactive deletion, synced to local state ---
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.error('Error deleting note:', err);
      setError('Failed to delete the note. Please try again.');
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>📝 Notes</h1>
        <p className="subtitle">A minimal MERN CRUD micro-app</p>
      </header>

      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
        />
        <button type="submit">Add Note</button>
      </form>

      {error && <p className="error-banner">{error}</p>}

      {/* Loading state */}
      {loading && <p className="status-text">Loading notes...</p>}

      {/* Empty state */}
      {!loading && notes.length === 0 && (
        <p className="status-text">No notes yet — add one above!</p>
      )}

      {/* Notes list */}
      {!loading && notes.length > 0 && (
        <div className="notes-grid">
          {notes.map((note) => (
            <div className="note-card" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <div className="note-footer">
                <span className="note-date">
                  {new Date(note.createdAt).toLocaleString()}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(note._id)}
                  aria-label={`Delete note ${note.title}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
