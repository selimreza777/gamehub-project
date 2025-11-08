import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx"; // import korlo

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      <Navbar />
      <ScrollToTop /> {/* add korlo */}
      <main className="grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
