import React from "react";

const GameCard = ({ game }) => (
  <div className="relative rounded-xl overflow-hidden shadow-lg sm:shadow-2xl hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,0,0.5)] transition-transform duration-300 mb-4">
    <img
      src={game.coverPhoto}
      alt={game.title}
      className="w-full h-48 sm:h-56 md:h-64 object-cover brightness-90 hover:brightness-100 transition-all duration-300"
    />
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
);

export default GameCard;
