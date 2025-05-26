import { useState } from 'react';
import { languages } from '../languages';

interface NoteFormProps {
    onAdd: (text: string, language: string) => void;
}

export default function NoteForm( { onAdd }: NoteFormProps){
    const [text, setText] = useState('');
    const [language, setLanguage] = useState("text");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(text.trim())
        {
            onAdd(text, language);
            setText('');
            setLanguage("text");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl p-4 bg-white rounded shadow space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Create a new note</h3>

            <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your note here..."
            className="w-full h-32 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end">
                <select
                    className="border rounded px-3 py-2"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    >
                    {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                        {lang.label}
                        </option>
                    ))}
                    </select>
                <button
                    type="submit"
                    className="bg-blue-500 text-white mx-4 px-4 py-2 rounded hover:bg-blue-600"
                >
                Add Note
                </button>
            </div>
        </form>

    );
}