import React, { useEffect, useState } from "react";
import GameCard from "../components/GameCard";

const AllGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("/games.json")
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-6 text-center">All Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default AllGames;
