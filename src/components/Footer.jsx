import React from "react";
import logo from "../assets/gaming-hub-logo.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaReact } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-black to-slate-900 text-white py-6 sm:py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 space-y-4 md:space-y-0">

        {/* Logo with hover animation */}
        <div className="flex items-center space-x-3 transform transition-all duration-500 hover:translate-x-2 hover:-translate-y-1">
          <img
            src={logo}
            alt="Gamehub Logo"
            className="w-16 sm:w-20 md:w-24 h-auto animate-pulse"
          />
          <span className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide text-yellow-400 drop-shadow-lg">
            Gamehub
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="text-blue-600 hover:text-blue-400 transition-colors duration-300">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-200 transition-colors duration-300">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-pink-500 hover:text-pink-300 transition-colors duration-300">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>

      {/* Footer Center Bottom Text */}
      <div className="mt-6 text-center">
        <p className="text-gray-300 text-sm sm:text-base">
          &copy; 2025 Gamehub. All rights reserved.
        </p>
        <p className="text-gray-400 text-sm sm:text-base flex items-center justify-center mt-1 space-x-1">
          <span>Creator: Selim Reza</span>
          <FaReact className="text-blue-400 animate-spin" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
