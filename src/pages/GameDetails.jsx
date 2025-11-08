import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameCard from "../components/GameCard.jsx";
import gamesData from "../data/games.json";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const found = gamesData.find((g) => g.id === parseInt(id));
    setSelectedGame(found || null);

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]); // dependency = id → jodi same page e id change hoy, useEffect run hobe

  if (!selectedGame) {
    return <div className="text-center text-white mt-20">Game not found!</div>;
  }

  const availableGames = gamesData.filter((g) => g.id !== selectedGame.id);

  const handleAvailableClick = (game) => {
    // Navigate to same page with new id
    navigate(`/games/${game.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Selected Game */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <img
          src={selectedGame.coverPhoto}
          alt={selectedGame.title}
          className="w-full md:w-1/3 rounded-2xl shadow-2xl"
        />
        <div className="flex-1 text-white space-y-4">
          <h1 className="text-5xl font-bold">{selectedGame.title}</h1>
          <p className="text-gray-300 italic">{selectedGame.genre}</p>
          <p className="text-yellow-400 font-bold">⭐ {selectedGame.rating}</p>
          <p className="text-gray-200">{selectedGame.description}</p>
          <p className="text-gray-400">Developer: {selectedGame.developer}</p>
          <a
            href={selectedGame.downloadLink}
            target="_blank"
            className="inline-block mt-2 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Download
          </a>
        </div>
      </div>

      {/* Available Games */}
      <h2 className="text-5xl font-bold text-yellow-400 mb-6 text-center">Available Games</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {availableGames.map((game) => (
          <div
            key={game.id}
            onClick={() => handleAvailableClick(game)}
            className="cursor-pointer"
          >
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameDetails;
