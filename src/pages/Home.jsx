import React, { useEffect, useState } from "react";
import BannerSlider from "../components/BannerSlider";
import GameCard from "../components/GameCard"; // import the new component

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("/games.json")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error(err));
  }, []);

  const popularGames = [...games].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-10 sm:space-y-12">
      <BannerSlider />

      <section>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-12 mb-8 sm:mb-10 text-center transition-all duration-300">
          🎮{" "}
          <span className="bg-gradient-to-r from-white to-red-600 bg-clip-text text-transparent">
            Popular Games
          </span>
        </h2>

        {popularGames.length === 0 ? (
          <p className="text-center text-white text-sm sm:text-base md:text-lg">
            Loading popular games...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
            {popularGames.map((game) => (
              <GameCard key={game.id} game={game} /> // use GameCard
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
