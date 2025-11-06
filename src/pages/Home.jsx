import React, { useEffect, useState } from "react";

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("/games.json")
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Home Page</h1>
      {games.length === 0 ? (
        <p className="text-white">Loading games...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {games.map(game => (
            <div key={game.id} className="bg-slate-800 p-4 rounded shadow">
              <img src={game.coverPhoto} alt={game.title} className="w-full h-40 object-cover rounded mb-2" />
              <h3 className="text-xl font-semibold text-white">{game.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
