import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 overflow-hidden">
      {/* Background glitch/neon effect */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 opacity-10 animate-pulse"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-8xl md:text-9xl font-extrabold text-red-500 mb-4 drop-shadow-[0_0_20px_red] animate-pulse">
          404
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400 drop-shadow-[0_0_15px_yellow]">
          Page Not Found
        </h2>
        <p className="text-gray-300 text-lg md:text-xl mb-8 italic max-w-xl drop-shadow-md">
          Maybe the server got hacked by a hacker, or you typed a wrong route... just kidding 😎
        </p>
        <button
          onClick={() => navigate("/home")}
          className="px-8 py-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-black font-bold rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 drop-shadow-lg"
        >
          Go to Home
        </button>
      </div>

      {/* Neon animated rings */}
      <div className="absolute w-96 h-96 border-4 border-pink-500 rounded-full opacity-20 animate-spin-slow"></div>
      <div className="absolute w-72 h-72 border-4 border-blue-500 rounded-full opacity-20 animate-spin-slow animation-delay-2000"></div>
    </div>
  );
};

export default NotFound;
