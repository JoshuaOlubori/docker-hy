from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from datetime import datetime
from typing import List
import os

# Database configuration - SQLite
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./notes.db")
API_PORT = int(os.getenv("API_PORT"))

# SQLite specific configuration
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # Needed for SQLite
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class Note(Base):
    __tablename__ = "notes"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Pydantic Models
class NoteCreate(BaseModel):
    title: str
    content: str

class NoteUpdate(BaseModel):
    title: str
    content: str

class NoteResponse(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Create tables
Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI(title="Dyslexia-Friendly Notes API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API Routes


@app.get("/notes", response_model=List[NoteResponse])
def get_notes(db: Session = Depends(get_db)):
    notes = db.query(Note).order_by(Note.updated_at.desc()).all()
    return notes

@app.get("/notes/{note_id}", response_model=NoteResponse)
def get_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(Note).filter(Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

@app.post("/notes", response_model=NoteResponse, status_code=201)
def create_note(note: NoteCreate, db: Session = Depends(get_db)):
    db_note = Note(
        title=note.title,
        content=note.content
    )
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

@app.put("/notes/{note_id}", response_model=NoteResponse)
def update_note(note_id: int, note: NoteUpdate, db: Session = Depends(get_db)):
    db_note = db.query(Note).filter(Note.id == note_id).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    db_note.title = note.title
    db_note.content = note.content
    db_note.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(db_note)
    return db_note

@app.delete("/notes/{note_id}", status_code=204)
def delete_note(note_id: int, db: Session = Depends(get_db)):
    db_note = db.query(Note).filter(Note.id == note_id).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    db.query(Note).filter(Note.id == note_id).delete()
    db.commit()
    return None

@app.get("/health")
def health_check():
    return {"message": "Dyslexia-Friendly Notes API", "status": "running", "database": "SQLite"}

app.mount("/", StaticFiles(directory="static_dist", html=True), name="static")

@app.exception_handler(404)
async def not_found_handler(request, exc):
    return FileResponse("static_dist/index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=API_PORT)