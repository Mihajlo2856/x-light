// File: src/pages/Create.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!author || !message) return alert("Alle Felder ausfüllen!");

    try {
      await axios.post("http://localhost:8000/tweets", { author, message });
      navigate("/");
    } catch (err) {
      alert("Fehler beim Senden des Tweets");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">📝 Neuer Tweet</h1>
      <input
        className="w-full border rounded p-2"
        placeholder="Name"
        value={author}
        onChange={e => setAuthor(e.target.value)}
      />
      <textarea
        className="w-full border rounded p-2"
        placeholder="Nachricht"
        value={message}
        onChange={e => setMessage(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Absenden
      </button>
    </div>
  );
}