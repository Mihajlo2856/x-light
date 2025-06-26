import React, { useState } from "react";

function App() {
  const [tweets, setTweets] = useState([
    { id: 1, date: new Date().toLocaleString(), message: "Hallo Welt!", author: "Max" },
  ]);
  const [newTweet, setNewTweet] = useState({ message: "", author: "" });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!newTweet.message || !newTweet.author) return;

    setTweets([
      {
        id: tweets.length + 1,
        date: new Date().toLocaleString(),
        message: newTweet.message,
        author: newTweet.author,
      },
      ...tweets,
    ]);
    setNewTweet({ message: "", author: "" });
  };

  return (
    <div className="max-w-xl mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Mini Twitter Clone</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="Dein Name"
          value={newTweet.author}
          onChange={(e) => setNewTweet({ ...newTweet, author: e.target.value })}
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Was möchtest du sagen?"
          value={newTweet.message}
          onChange={(e) => setNewTweet({ ...newTweet, message: e.target.value })}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Tweet erstellen
        </button>
      </form>

      <div className="space-y-4">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="border rounded p-3 shadow-sm">
            <p className="text-gray-600 text-sm">{tweet.date}</p>
            <p className="mt-1">{tweet.message}</p>
            <p className="text-right font-semibold mt-2">– {tweet.author}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
