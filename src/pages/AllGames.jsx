import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import GameCard from "../components/GameCard.jsx";

const AllGames = () => {
  const [games, setGames] = useState([]);
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedGame, setSelectedGame] = useState(location.state?.selectedGame || null);

  useEffect(() => {
    fetch("/games.json")
      .then(res => res.json())
      .then(data => {
        const updatedData = data.map(game => ({
          ...game,
          // ✅ Correct coverPhoto path
          coverPhoto: game.coverPhoto.startsWith("/images/") ? game.coverPhoto : `/images/${game.coverPhoto}`
        }));
        setGames(updatedData);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (id && games.length > 0) {
      const found = games.find(g => g.id === parseInt(id));
      if (!found) {
        navigate("/notfound", { replace: true });
      } else {
        setSelectedGame(found);
      }
    } else {
      setSelectedGame(null);
    }
  }, [id, games, navigate]);

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
      )}

      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-6 text-center">
        Available Games
      </h1>

      <div className="overflow-x-auto md:overflow-x-hidden">
        <div className="flex md:grid md:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-6">
          {availableGames.map(game => (
            <div
              key={game.id}
              onClick={() => handleSelectGame(game)}
              className="cursor-pointer flex-shrink-0 md:flex-shrink md:transform hover:scale-105 transition-transform duration-300"
              style={{ minWidth: '250px' }}
            >
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllGames;
