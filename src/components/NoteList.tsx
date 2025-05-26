import type { Note } from "../types/note";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface NoteListProps {
    notes: Note[];
    onDelete: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
    return (
        <div className="w-full max-w-xl">
            {notes.map((note) => (
                <div key={note.id} className="w-full max-w-xl my-4 p-4 bg-white rounded shadow space-y-4">
                    <p className="text-sm text-gray-500">{new Date(note.datetime).toLocaleString()}</p>
                    <SyntaxHighlighter language={note.language} style={oneDark} customStyle={{ padding: '1rem' }}>
                        {note.note}
                    </SyntaxHighlighter>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 break-all">{note.id} - {note.language}</p>
                        <button
                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
                            onClick={() => {
                                console.log(`Delete note with id: ${note.id}`);
                                onDelete(note.id);
                            }}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}