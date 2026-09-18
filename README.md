# Notes App — MERN CRUD Lab

A full-stack CRUD notes application built with MongoDB, Express, React (Vite), and Node.js.

## Candidate Details
- **Name:** _<K.Charan Simha Reddy>_
- **Student ID:** _<2026201034>_
- **GitHub Repository:** _https://github.com/charan18269/MERN-Lab-Notes-App.git_

## Tech Stack
- **Frontend:** React (Vite), Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB (via Mongoose)

## Prerequisites
- Node.js v18+
- npms
- A local MongoDB daemon running on `mongodb://localhost:27017`

## Setup & Run

### 1. Backend (Server)
```bash
cd server
npm install
npm start
```
The API will start on **http://localhost:5000**.

### 2. Frontend (Client)
In a new terminal:
```bash
cd client
npm install
npm run dev
```
The app will start on **http://localhost:5173**.

## API Endpoints
| Method | Endpoint            | Description                          |
|--------|----------------------|---------------------------------------|
| POST   | `/api/notes`         | Create a new note (201 Created)       |
| GET    | `/api/notes`         | Get all notes, newest first           |
| DELETE | `/api/notes/:id`     | Delete a note by ID (200 / 404)       |

## Project Structure
```
notes-app/
|-- .gitignore
|-- README.md
|-- screenshots/
|   |-- ui-preview.png
|   |-- delete-action.png
|-- server/
|   |-- config/db.js
|   |-- models/Note.js
|   |-- routes/noteRoutes.js
|   |-- package.json
|   |-- server.js
|-- client/
    |-- index.html
    |-- vite.config.js
    |-- package.json
    |-- src/
        |-- App.jsx
        |-- main.jsx
        |-- index.css
```

## Notes
- CORS is explicitly mounted in `server.js` before the routes to allow requests from the Vite dev server at port 5173.
- The database connects to `mongodb://localhost:27017/notes_db` by default — no custom secrets or non-standard ports required.
- Loading and empty states are handled in `App.jsx` ("Loading notes..." and "No notes yet — add one above!").

## Screenshots
Add the following before submission:
- `screenshots/ui-preview.png` — browser view with at least two notes rendered.
- `screenshots/delete-action.png` — browser view after a delete, with DevTools Network tab showing `200 OK` for `DELETE /api/notes/:id`.
