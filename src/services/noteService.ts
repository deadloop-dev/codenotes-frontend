import type { Note } from '../types/note';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

console.log('API URL:', API_URL);

export async function fetchNotes() {
    const res = await fetch(`${API_URL}/notes`);
    if (!res.ok) {
        throw new Error('Failed to fetch notes');
    }
    return res.json();
}

export const createNote = async (note: Omit<Note, 'id' | 'datetime'>): Promise<Note> => {
    const res = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });
    return res.json();
}

export const deleteNote = async (id: string): Promise<void> => {
    const res = await fetch(`${API_URL}/notes/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error('Failed to delete note');
    }
}