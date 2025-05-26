import { useState, useEffect } from 'react'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import type { Note } from './types/note'
import { fetchNotes, createNote, deleteNote } from './services/noteService'

export default function App() {
  const [notes, setNotes] = useState<Note[]>([
    // Example notes for initial state
    { id: "1", note: 'const hello = "world";\nreturn 0;', datetime: new Date().toISOString(), language: 'javascript' },
    { id: "2", note: 'Sample note 2', datetime: new Date().toISOString(), language: 'text' },
    { id: "3", note: 'Hello World!\n---\n# Chapter 1\nThis is some text\n\n\n', datetime: new Date().toISOString(), language: 'markdown' },
  ]);

  const loadNotes = async () => {
    const notes = await fetchNotes();
    setNotes(notes);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  const emptyNotes = () =>{
    return(<div className=""><p>No notes available</p></div>);
  }

  // Handlers
  const createNoteHandler = async (note: string, language: string) => {
    await createNote({note: note, language: language});
    await loadNotes();
  };

  const deleteNoteHandler = async (id: string) => {
    await deleteNote(id);
    await loadNotes();
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <header className="bg-white shadow p-4 text-center text-3xl font-bold">Notes</header>
      <div className="bg-gray-200 p-2 text-center text-sm">
        Welcome to your notes app.
      </div>
      <div className="content-center flex flex-col items-center">
          {notes.length === 0 ? emptyNotes() : <NoteList notes={notes} onDelete={deleteNoteHandler} />}
          <NoteForm onAdd={createNoteHandler} />
      </div>
    </main>
  );

}
