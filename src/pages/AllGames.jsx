import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import GameCard from "../components/GameCard.jsx";

const AllGames = () => {
  const [games, setGames] = useState([]);
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  // Selected game state
  const [selectedGame, setSelectedGame] = useState(location.state?.selectedGame || null);

  useEffect(() => {
    fetch("/games.json")
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error(err));
  }, []);

  // Update selectedGame when URL changes
  useEffect(() => {
    if (id && games.length > 0) {
      const found = games.find(g => g.id === parseInt(id));
      setSelectedGame(found || null);
    }
  }, [id, games]);

  const handleSelectGame = (game) => {
    navigate(`/games/${game.id}`, { state: { selectedGame: game } });
  };

  const availableGames = selectedGame
    ? games.filter(game => game.id !== selectedGame.id)
    : games;

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {selectedGame && (
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
      )}

      <h1 className="text-5xl font-bold text-yellow-400 mb-6 text-center">
        Available Games
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {availableGames.map(game => (
          <div key={game.id} onClick={() => handleSelectGame(game)}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllGames;
