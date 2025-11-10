import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider.jsx";
import logo from "../assets/gaming-hub-logo.png";
import hackerImg from "../assets/haker.png"; // fallback image
import { Menu, X } from "lucide-react";

const Navbar = ({ triggerLoading }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    triggerLoading(); // start overlay
    try {
      await logout();
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLinkClick = (path) => {
    triggerLoading();
    navigate(path);
    setIsOpen(false);
  };

  const handleGamesClick = () => {
    triggerLoading();
    if (user) navigate("/games");
    else navigate("/login");
    setIsOpen(false);
  };

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <button className="flex items-center gap-2" onClick={() => handleLinkClick("/home")}>
          <img src={logo} alt="Gamehub Logo" className="w-10 h-10 object-contain" />
          <span className="text-2xl font-bold hover:text-yellow-400">Gamehub</span>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <button onClick={() => handleLinkClick("/home")} className="hover:text-yellow-400 transition">Home</button>
          <button onClick={handleGamesClick} className="hover:text-yellow-400 transition">Games</button>

          {/* ✅ Conditional Render for User */}
          {!user ? (
            <>
              <button
                onClick={() => handleLinkClick("/login")}
                className="px-4 py-2 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-black transition"
              >
                Login
              </button>
              <button
                onClick={() => handleLinkClick("/register")}
                className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition"
              >
                Register
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {/* ✅ Profile Photo + Glow animation */}
              <img
                src={user.photoURL || hackerImg}
                alt="User"
                onClick={() => handleLinkClick("/myprofile")}
                className="w-10 h-10 rounded-full border-2 border-yellow-400 cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,215,0,0.7)]"
              />
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-black transition"
              >
                Logout
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-yellow-400">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ✅ Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 text-white px-6 py-4 space-y-3">
          <button onClick={() => handleLinkClick("/home")} className="block hover:text-yellow-400 transition">Home</button>
          <button onClick={handleGamesClick} className="block hover:text-yellow-400 transition">Games</button>

          {!user ? (
            <>
              <button onClick={() => handleLinkClick("/login")} className="block border border-yellow-500 rounded px-4 py-2 hover:bg-yellow-500 hover:text-black transition">Login</button>
              <button onClick={() => handleLinkClick("/register")} className="block bg-yellow-500 text-black rounded px-4 py-2 hover:bg-yellow-400 transition">Register</button>
            </>
          ) : (
            <>
              <button onClick={() => handleLinkClick("/myprofile")} className="block hover:text-yellow-400 transition">
                My Profile
              </button>
              <button onClick={handleLogout} className="w-full border border-yellow-500 rounded px-4 py-2 hover:bg-yellow-500 hover:text-black transition">Logout</button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
