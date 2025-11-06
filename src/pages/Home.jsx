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
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-12 mb-8 sm:mb-10 text-center transition-all duration-300">
          🎮{" "}
          <span className="bg-gradient-to-r from-white to-red-600 bg-clip-text text-transparent">
            Popular Games
          </span>
        </h2>

        {popularGames.length === 0 ? (
          <p className="text-center text-white text-sm sm:text-base md:text-lg">Loading popular games...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
            {popularGames.map((game) => (
              <div
                key={game.id}
                className="relative rounded-xl overflow-hidden shadow-lg sm:shadow-2xl hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,0,0.5)] transition-transform duration-300"
              >
                {/* Image */}
                <img
                  src={game.coverPhoto}
                  alt={game.title}
                  className="w-full h-48 sm:h-56 md:h-72 object-cover brightness-90 hover:brightness-100 transition-all duration-300"
                />

                {/* Overlay for title, genre, rating */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-3 md:p-4">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white drop-shadow-lg">
                    {game.title}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm md:text-base italic drop-shadow-md">
                    {game.genre}
                  </p>
                  <p className="text-yellow-400 font-semibold text-xs sm:text-sm md:text-base animate-pulse">
                    ⭐ {game.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="py-12 px-4 sm:px-6 md:px-8 mx-auto max-w-3xl mt-12 text-center">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
          Join Our Gaming Newsletter
        </h3>
        <p className="text-gray-300 text-lg sm:text-xl mb-6">
          Get exclusive updates, early access to new games & special deals straight to your inbox.
        </p>


        <form className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full sm:flex-1 px-4 py-3 rounded-lg bg-white text-black placeholder-gray-500 shadow-md focus:outline-yellow-400 focus:shadow-yellow-300 transition-all duration-300"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-yellow-500 hover:bg-yellow-400 font-semibold rounded-lg transition-colors duration-300"
          >
            Subscribe
          </button>
        </form>


      </section>

    </div>
  );
};

export default Home;
