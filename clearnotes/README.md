# Dyslexia-Friendly Notes App

A note-taking application specifically designed for people with dyslexia, featuring customizable fonts, spacing, and color overlays to improve readability.

## Features

### Accessibility Features
- **OpenDyslexic Font**: Default dyslexia-friendly font with alternatives
- **Adjustable Font Size**: 14px to 28px range
- **Line Spacing Control**: 1.5x to 3x spacing
- **Letter Spacing**: Customizable character spacing
- **Color Overlays**: Yellow, blue, green, and pink tinted backgrounds
- **Custom Text Colors**: Full color picker for text
- **Clean, Distraction-Free Interface**

### Core Functionality
- Create, edit, and delete notes
- Auto-save timestamps
- Organized note list with previews
- Responsive design for mobile and desktop
- **SQLite database** - No external database server required!

## Project Structure

```
dyslexia-notes/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   ├── .env                 # Environment variables
│   └── notes.db            # SQLite database (created automatically)
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Tailwind CSS
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Python 3.9+
- Node.js 18+
- **No database installation needed!** (Uses SQLite)

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables (optional)**
```bash
cp .env.example .env
# SQLite will create notes.db automatically, no configuration needed!
```

5. **Run the backend**
```bash
python main.py
```

The database file `notes.db` will be created automatically in the backend directory on first run!

Backend will run on `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

### Building for Production

**Frontend**
```bash
cd frontend
npm run build
```

**Backend**
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

## API Endpoints

### Notes
- `GET /notes` - Get all notes
- `GET /notes/{id}` - Get specific note
- `POST /notes` - Create new note
- `PUT /notes/{id}` - Update note
- `DELETE /notes/{id}` - Delete note

### Request/Response Examples

**Create Note**
```json
POST /notes
{
  "title": "My First Note",
  "content": "This is the content of my note."
}
```

**Response**
```json
{
  "id": 1,
  "title": "My First Note",
  "content": "This is the content of my note.",
  "created_at": "2025-01-01T12:00:00",
  "updated_at": "2025-01-01T12:00:00"
}
```


## Technology Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Lucide React (icons)
- OpenDyslexic Font

### Backend
- FastAPI
- SQLAlchemy (ORM)
- **SQLite** (embedded database)
- Pydantic (validation)
- Uvicorn (ASGI server)

## Database Information

### Why SQLite?
- **Zero Configuration**: No separate database server to install or configure
- **Portable**: Single file database that's easy to backup and move
- **Perfect for Personal Use**: Ideal for single-user note-taking applications
- **Easy Docker Deployment**: Just mount a volume to persist data
- **Fast**: Great performance for this use case

### Database File
- Located at: `backend/notes.db`
- Created automatically on first run
- Can be backed up by simply copying the file
- To reset: just delete `notes.db` and restart the backend

### Migrating Data
To backup your notes:
```bash
cp backend/notes.db backend/notes.db.backup
```

To restore:
```bash
cp backend/notes.db.backup backend/notes.db
```

## Accessibility Design Principles

This app follows WCAG 2.1 guidelines and incorporates specific features for dyslexic users:

1. **Font Choice**: OpenDyslexic as default, with sans-serif alternatives
2. **Spacing**: Increased line and letter spacing options
3. **Color**: High contrast ratios and customizable overlays
4. **Simplicity**: Clean interface without visual clutter
5. **Consistency**: Predictable layout and navigation

## Troubleshooting

### Database Issues
If you encounter database errors:
```bash
# Delete the database file and let it recreate
rm backend/notes.db
python backend/main.py
```

### Port Already in Use
If port 8000 or 3000 is already in use, you can change them:
- Backend: Edit `main.py` or set `API_PORT` in `.env`
- Frontend: Edit `vite.config.js` port setting

## Contributing

When contributing to this project, please ensure:
- Accessibility features are maintained
- New features consider dyslexic users' needs
- Code follows existing style conventions
- Tests are added for new functionality

## License

MIT License

## Support

For issues or questions, please open an issue on the repository.

---

Built with ❤️ for improved accessibility