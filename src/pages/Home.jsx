import React, { useEffect, useState } from "react";
import BannerSlider from "../components/BannerSlider";

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("/games.json")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error(err));
  }, []);

  // Popular games sorted by rating (descending)
  const popularGames = [...games].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Banner Section */}
      <BannerSlider />

      {/* Popular Games Section */}
      <section>
        {/* Heading with gradient */}
        <h2 className="text-5xl font-bold mt-12 mb-6 text-center">
          🎮{" "}
          <span className="bg-gradient-to-r from-white to-red-600 bg-clip-text text-transparent">
            Popular Games
          </span>
        </h2>

        {popularGames.length === 0 ? (
          <p className="text-center text-white">Loading popular games...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {popularGames.map((game) => (
              <div
                key={game.id}
                className="bg-slate-800 p-4 rounded-xl shadow-lg hover:scale-105 transition duration-300"
              >
                <img
                  src={game.coverPhoto}
                  alt={game.title}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h3 className="text-xl font-semibold text-white mb-2">{game.title}</h3>
                <p className="text-gray-300 text-sm mb-2">{game.genre}</p>
                <p className="text-yellow-400 font-medium">⭐ {game.rating}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
