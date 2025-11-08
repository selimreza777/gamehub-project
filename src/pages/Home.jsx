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
    // Navigate to games/:id with smooth scroll
    navigate(`/games/${game.id}`);
  };

  return (
    <div className="container mx-auto px-3 py-6 space-y-10">
      <BannerSlider />
      <section>
        <h2 className="text-5xl font-bold text-center mb-10">🎮 Popular Games</h2>
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
    </div>
  );
};

export default Home;
