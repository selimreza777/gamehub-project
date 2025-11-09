import React from "react";
import logo from "../assets/gaming-hub-logo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaReact,
  FaDiscord,
  FaTwitch,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-slate-900 to-black text-white py-6 sm:py-8 relative overflow-hidden">
      {/* Neon Glowing Background */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-700 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative z-10 space-y-5 md:space-y-0">
        {/* Left: Logo */}
        <div className="flex items-center space-x-3 transform transition-all duration-500 hover:scale-110">
          <img
            src={logo}
            alt="Gamehub Logo"
            className="w-12 sm:w-14 md:w-16 h-auto drop-shadow-2xl"
          />
          <span className="text-xl sm:text-2xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400">
            Gamehub
          </span>
        </div>

        {/* Middle: Menu */}
        <div className="flex flex-wrap justify-center gap-5 text-gray-300 text-base font-medium">
          <Link to="/" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <Link to="/games" className="hover:text-yellow-400 transition-colors">
            Games
          </Link>
          <Link to="/login" className="hover:text-yellow-400 transition-colors">
            Login
          </Link>
          <Link
            to="/register"
            className="hover:text-yellow-400 transition-colors"
          >
            Register
          </Link>
        </div>

        {/* Right: Social Icons */}
        <div className="flex space-x-3">
          <a
            href="#"
            className="text-blue-600 hover:text-blue-400 transition-transform duration-300 transform hover:scale-125"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="#"
            className="text-blue-400 hover:text-blue-200 transition-transform duration-300 transform hover:scale-125"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="#"
            className="text-pink-500 hover:text-pink-300 transition-transform duration-300 transform hover:scale-125"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="#"
            className="text-indigo-500 hover:text-indigo-300 transition-transform duration-300 transform hover:scale-125"
          >
            <FaDiscord size={20} />
          </a>
          <a
            href="#"
            className="text-purple-500 hover:text-purple-300 transition-transform duration-300 transform hover:scale-125"
          >
            <FaTwitch size={20} />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center z-10 relative">
        <p className="text-gray-400 text-sm sm:text-base">
          &copy; 2025 Gamehub. All rights reserved.
        </p>
        <p className="text-gray-300 text-sm flex items-center justify-center mt-1 space-x-2">
          <span>Created by Selim Reza</span>
          <FaReact className="text-blue-400 animate-spin" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
