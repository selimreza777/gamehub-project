import React from "react";

// ✅ Rating Badge with dynamic circular SVG progress
const RatingBadge = ({ rating }) => {
  const size = 44; // total badge size
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // rating scale mapping 4.3 → 4.9
  const minRating = 4.3;
  const maxRating = 4.9;
  const clamped = Math.min(Math.max(rating, minRating), maxRating);

  // Arc fraction: 4.3 → 0.4 of circle, 4.9 → 0.9 of circle
  const minArc = 0.4;
  const maxArc = 0.9;
  const arcFraction = minArc + ((clamped - minRating) / (maxRating - minRating)) * (maxArc - minArc);

  const dashoffset = circumference * (1 - arcFraction);

  return (
    <div
      className="absolute bottom-3 right-3 flex items-center justify-center group"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90 transition-all duration-500 ease-out group-hover:scale-110"
      >
        {/* background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2d2d2d"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#5dff98"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out group-hover:drop-shadow-[0_0_12px_rgba(93,255,152,0.8)]"
        />
      </svg>

      {/* inner circle with rating number (enforced white) */}
      <div
        className="absolute inset-0 flex items-center justify-center font-bold transition-transform duration-300 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        style={{
          fontSize: 14,
          color: "#ffffff",           // ✅ pure white
          WebkitTextFillColor: "#ffffff" // ✅ browser compatibility
        }}
      >
        {rating.toFixed(1)}
      </div>
    </div>
  );
};

// ✅ GameCard layout
const GameCard = ({ game }) => (
  <div className="relative rounded-xl overflow-hidden shadow-lg sm:shadow-2xl hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,0,0.5)] transition-transform duration-300 mb-4">
    {/* Game image */}
    <img
      src={game.coverPhoto}
      alt={game.title}
      className="w-full h-48 sm:h-56 md:h-64 object-cover brightness-90 hover:brightness-100 transition-all duration-300"
    />

    {/* ✅ Rating Badge for all cards */}
    <RatingBadge rating={game.rating} />

    {/* Card info */}
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-3 md:p-4">
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white drop-shadow-lg">
        {game.title}
      </h3>
      <p className="text-gray-300 text-xs sm:text-sm md:text-base italic drop-shadow-md">
        {game.genre}
      </p>
    </div>
  </div>
);

export default GameCard;
