import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider.jsx";
import logo from "../assets/gaming-hub-logo.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/home");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleGamesClick = () => {
    if (user) {
      navigate("/games"); // login thakle AllGames page
    } else {
      navigate("/login"); // login na thakle Login page
    }
  };

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        <Link to="/home" className="flex items-center gap-2">
          <img src={logo} alt="Gamehub Logo" className="w-10 h-10 object-contain" />
          <span className="text-2xl font-bold hover:text-yellow-400">Gamehub</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/home" className="hover:text-yellow-400 transition">Home</Link>
          <button onClick={handleGamesClick} className="hover:text-yellow-400 transition">
            Games
          </button>
          {user && <Link to="/myprofile" className="hover:text-yellow-400 transition">My Profile</Link>}
          {!user ? (
            <>
              <Link to="/login" className="px-4 py-2 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-black transition">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="px-4 py-2 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-black transition">Logout</button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-yellow-400">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 text-white px-6 py-4 space-y-3">
          <Link to="/home" className="block hover:text-yellow-400 transition">Home</Link>
          <button onClick={handleGamesClick} className="block hover:text-yellow-400 transition">Games</button>
          {user && <Link to="/myprofile" className="block hover:text-yellow-400 transition">My Profile</Link>}
          {!user ? (
            <>
              <Link to="/login" className="block border border-yellow-500 rounded px-4 py-2 hover:bg-yellow-500 hover:text-black transition">Login</Link>
              <Link to="/register" className="block bg-yellow-500 text-black rounded px-4 py-2 hover:bg-yellow-400 transition">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="w-full border border-yellow-500 rounded px-4 py-2 hover:bg-yellow-500 hover:text-black transition">Logout</button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
