import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider.jsx";
import BannerSlider from "../components/BannerSlider.jsx";
import GameCard from "../components/GameCard.jsx";

// Images
import pubg from "../assets/pubg.png";
import witcher from "../assets/witcher-1.png";
import godofwar from "../assets/godofwar.png";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const popularGames = [
    { id: 3, title: "The Witcher", coverPhoto: witcher, genre: "Action RPG", rating: 4.9 },
    { id: 5, title: "God of War: Ragnarok", coverPhoto: godofwar, genre: "Action Adventure", rating: 4.9 },
    { id: 1, title: "Player Unknowns Battle Ground: PUBG", coverPhoto: pubg, genre: "FPS", rating: 4.5 },
  ];

  const handleGameClick = (game) => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/games/${game.id}`);
  };

  return (
    <div className="container mx-auto px-3 py-6 space-y-10">

      {/* Banner */}
      <BannerSlider />

      {/* Popular Games */}
      <section className="pt-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10">🎮 Popular Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularGames.map((game) => (
            <div
              key={game.id}
              onClick={() => handleGameClick(game)}
              className="cursor-pointer"
            >
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-slate-900 rounded-2xl p-10 py-20 text-center text-white space-y-6 mt-16 mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Subscribe to our Newsletter</h2>
        <p className="text-gray-300 text-base sm:text-lg">
          Get exclusive updates, early access to new games & special deals straight to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg w-full sm:w-80 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
          >
            Subscribe
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-2">
          We respect your privacy. No spam, only awesome updates.
        </p>
      </section>

    </div>
  );
};

export default Home;
