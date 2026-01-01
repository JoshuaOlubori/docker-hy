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

## Project Structure

```
dyslexia-notes/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Environment variables
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
├── database/
│   └── init.sql            # Database initialization
└── README.md
```

## Setup Instructions

### Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL 14+

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

4. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

5. **Create PostgreSQL database**
```bash
psql -U postgres
CREATE DATABASE notesdb;
CREATE USER user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE notesdb TO user;
\q
```

6. **Initialize database schema**
```bash
psql -U user -d notesdb -f ../database/init.sql
```

7. **Run the backend**
```bash
python main.py
```

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

## Docker Setup (For Future Implementation)

The application is designed to be easily containerized. You can create Dockerfiles for both frontend and backend, and use docker-compose to orchestrate all services including PostgreSQL.

### Recommended Docker Structure
```yaml
version: '3.8'
services:
  db:
    image: postgres:14
    environment:
      POSTGRES_DB: notesdb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
  
  backend:
    build: ./backend
    depends_on:
      - db
    environment:
      DATABASE_URL: postgresql://user:password@db:5432/notesdb
  
  frontend:
    build: ./frontend
    depends_on:
      - backend
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/notesdb
API_HOST=0.0.0.0
API_PORT=8000
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
- PostgreSQL
- Pydantic (validation)
- Uvicorn (ASGI server)

## Accessibility Design Principles

This app follows WCAG 2.1 guidelines and incorporates specific features for dyslexic users:

1. **Font Choice**: OpenDyslexic as default, with sans-serif alternatives
2. **Spacing**: Increased line and letter spacing options
3. **Color**: High contrast ratios and customizable overlays
4. **Simplicity**: Clean interface without visual clutter
5. **Consistency**: Predictable layout and navigation

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