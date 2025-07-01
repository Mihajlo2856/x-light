// File: src/pages/Home.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Tweet {
  id: number;
  message: string;
  author: string;
  timestamp: string;
}

export default function Home() {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/tweets")
      .then(res => setTweets(res.data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">📃 Alle Tweets</h1>
      <Link to="/create" className="text-blue-600 underline">+ Neuer Tweet</Link>
      {tweets.map(tweet => (
        <div key={tweet.id} className="p-4 border rounded shadow">
          <p className="text-gray-500 text-sm">{new Date(tweet.timestamp).toLocaleString()}</p>
          <p className="text-lg">{tweet.message}</p>
          <p className="text-sm text-gray-700">von {tweet.author}</p>
        </div>
      ))}
    </div>
  );
}