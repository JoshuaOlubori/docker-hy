import { useState, useEffect } from 'react';
import { Plus, Save, Trash2, Settings, X } from 'lucide-react';

const API_URL = 'http://localhost:8000';

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    font: 'opendyslexic',
    fontSize: 18,
    lineSpacing: 2,
    letterSpacing: 0.12,
    colorOverlay: 'none',
    textColor: '#2c3e50'
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${API_URL}/notes`);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const saveNote = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      const noteData = { title, content };
      
      if (currentNote) {
        await fetch(`${API_URL}/notes/${currentNote.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(noteData)
        });
      } else {
        await fetch(`${API_URL}/notes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(noteData)
        });
      }
      
      setTitle('');
      setContent('');
      setCurrentNote(null);
      fetchNotes();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`${API_URL}/notes/${id}`, { method: 'DELETE' });
      fetchNotes();
      if (currentNote?.id === id) {
        setCurrentNote(null);
        setTitle('');
        setContent('');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const loadNote = (note) => {
    setCurrentNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const newNote = () => {
    setCurrentNote(null);
    setTitle('');
    setContent('');
  };

  const getOverlayColor = () => {
    const overlays = {
      none: 'transparent',
      yellow: 'rgba(255, 252, 127, 0.15)',
      blue: 'rgba(173, 216, 230, 0.15)',
      green: 'rgba(144, 238, 144, 0.15)',
      pink: 'rgba(255, 182, 193, 0.15)'
    };
    return overlays[settings.colorOverlay];
  };

  const fontOptions = {
    opendyslexic: 'OpenDyslexic, Arial, sans-serif',
    arial: 'Arial, sans-serif',
    verdana: 'Verdana, sans-serif',
    comic: 'Comic Sans MS, cursive'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <style>{`
        @import url('https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/open-dyslexic.min.css');
      `}</style>

      <div className="container mx-auto p-4 max-w-7xl">
        <header className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-indigo-600">Clear Notes</h1>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 transition"
            >
              <Settings className="w-6 h-6 text-indigo-600" />
            </button>
          </div>
        </header>

        {showSettings && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Accessibility Settings</h2>
              <button onClick={() => setShowSettings(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Font Style</label>
                <select
                  value={settings.font}
                  onChange={(e) => setSettings({...settings, font: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="opendyslexic">OpenDyslexic</option>
                  <option value="arial">Arial</option>
                  <option value="verdana">Verdana</option>
                  <option value="comic">Comic Sans</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Font Size: {settings.fontSize}px</label>
                <input
                  type="range"
                  min="14"
                  max="28"
                  value={settings.fontSize}
                  onChange={(e) => setSettings({...settings, fontSize: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Line Spacing: {settings.lineSpacing}</label>
                <input
                  type="range"
                  min="1.5"
                  max="3"
                  step="0.1"
                  value={settings.lineSpacing}
                  onChange={(e) => setSettings({...settings, lineSpacing: parseFloat(e.target.value)})}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Letter Spacing: {settings.letterSpacing}em</label>
                <input
                  type="range"
                  min="0"
                  max="0.3"
                  step="0.01"
                  value={settings.letterSpacing}
                  onChange={(e) => setSettings({...settings, letterSpacing: parseFloat(e.target.value)})}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Color Overlay</label>
                <select
                  value={settings.colorOverlay}
                  onChange={(e) => setSettings({...settings, colorOverlay: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="none">None</option>
                  <option value="yellow">Yellow</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="pink">Pink</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Text Color</label>
                <input
                  type="color"
                  value={settings.textColor}
                  onChange={(e) => setSettings({...settings, textColor: e.target.value})}
                  className="w-full h-10 rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">My Notes</h2>
              <button
                onClick={newNote}
                className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {notes.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No notes yet. Create your first note!</p>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-lg cursor-pointer transition ${
                      currentNote?.id === note.id
                        ? 'bg-indigo-100 border-2 border-indigo-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => loadNote(note)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-800 truncate">{note.title}</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNote(note.id);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">{note.content}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(note.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {currentNote ? 'Edit Note' : 'New Note'}
            </h2>
            
            <div className="space-y-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title..."
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                style={{
                  fontFamily: fontOptions[settings.font],
                  fontSize: `${settings.fontSize}px`,
                  letterSpacing: `${settings.letterSpacing}em`,
                  color: settings.textColor
                }}
              />
              
              <div
                style={{
                  backgroundColor: getOverlayColor(),
                  borderRadius: '0.5rem',
                  padding: '1px'
                }}
              >
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your note..."
                  rows="15"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                  style={{
                    fontFamily: fontOptions[settings.font],
                    fontSize: `${settings.fontSize}px`,
                    lineHeight: settings.lineSpacing,
                    letterSpacing: `${settings.letterSpacing}em`,
                    color: settings.textColor,
                    backgroundColor: 'transparent'
                  }}
                />
              </div>

              <button
                onClick={saveNote}
                disabled={!title.trim() || !content.trim()}
                className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {currentNote ? 'Update Note' : 'Save Note'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;