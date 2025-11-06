import React from "react";
import { useParams } from "react-router-dom";

const GameDetails = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Game Details</h1>
      <p className="text-white">Details for game ID: {id}</p>
    </div>
  );
};

export default GameDetails;
