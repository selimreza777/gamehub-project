import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="min-h-screen bg-black text-white">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
