import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch("/games.json")
      .then(res => res.json())
      .then(data => {
        const found = data.find(g => g.id === parseInt(id));
        setGame(found || null);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!game) {
    return <p className="text-white text-center mt-10">Loading game details...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">{game.title}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Cover Photo */}
        <img
          src={game.coverPhoto}
          alt={game.title}
          className="w-full md:w-1/3 h-auto rounded-lg shadow-lg"
        />

        {/* Game Info */}
        <div className="text-white md:flex-1 space-y-4">
          <p><span className="font-bold">Genre:</span> {game.genre}</p>
          <p><span className="font-bold">Rating:</span> ⭐ {game.rating}</p>
          <p><span className="font-bold">Developer:</span> {game.developer}</p>
          <p className="mt-4">{game.description}</p>

          <a
            href={game.downloadLink}
            target="_blank"
            className="inline-block mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition-colors duration-300"
          >
            Download Now
          </a>

          <Link
            to="/games"
            className="inline-block mt-2 text-gray-300 underline hover:text-yellow-400"
          >
            ← Back to Games
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
