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
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-10 sm:space-y-12">
      {/* Banner Section */}
      <BannerSlider />

      {/* Popular Games Section */}
      <section>
        {/* Heading with gradient */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-12 mb-10 text-center transition-all duration-300">
          🎮{" "}
          <span className="bg-gradient-to-r from-white to-red-600 bg-clip-text text-transparent">
            Popular Games
          </span>
        </h2>

        {popularGames.length === 0 ? (
          <p className="text-center text-white text-base sm:text-lg">Loading popular games...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {popularGames.map((game) => (
              <div
                key={game.id}
                className="bg-slate-800 p-3 sm:p-4 rounded-xl shadow-lg hover:scale-105 transition duration-300"
              >
                <img
                  src={game.coverPhoto}
                  alt={game.title}
                  className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">
                  {game.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base mb-1 sm:mb-2">
                  {game.genre}
                </p>
                <p className="text-yellow-400 font-medium text-sm sm:text-base">
                  ⭐ {game.rating}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
