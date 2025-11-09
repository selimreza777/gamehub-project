import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameCard from "../components/GameCard.jsx";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState(null);
  const [availableGames, setAvailableGames] = useState([]);

  useEffect(() => {
    // Fetch the JSON from public folder
    fetch("/games.json")
      .then((res) => res.json())
      .then((gamesData) => {
        const found = gamesData.find((g) => g.id === parseInt(id));
        if (found) {
          found.coverPhoto = `/images/${found.coverPhoto}`;
        }
        setSelectedGame(found || null);

        const others = gamesData
          .filter((g) => g.id !== parseInt(id))
          .map((g) => ({ ...g, coverPhoto: `/images/${g.coverPhoto}` }));
        setAvailableGames(others);
      });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!selectedGame) {
    return <div className="text-center text-white mt-20">Game not found!</div>;
  }

  const handleAvailableClick = (game) => {
    navigate(`/games/${game.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Selected Game */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <img
          src={selectedGame.coverPhoto}
          alt={selectedGame.title}
          className="w-full md:w-1/3 rounded-2xl shadow-2xl object-cover"
        />
        <div className="flex-1 text-white space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">{selectedGame.title}</h1>
          <p className="text-gray-300 italic text-xs sm:text-sm md:text-base">{selectedGame.genre}</p>
          <p className="text-yellow-400 font-bold text-xs sm:text-sm md:text-base">⭐ {selectedGame.rating}</p>
          <p className="text-gray-200 text-xs sm:text-sm md:text-base">{selectedGame.description}</p>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base">Developer: {selectedGame.developer}</p>
          <a
            href={selectedGame.downloadLink}
            target="_blank"
            className="inline-block mt-2 px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors text-xs sm:text-sm md:text-base"
          >
            Download
          </a>
        </div>
      </div>

      {/* Available Games */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-6 text-center">
        Available Games
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
