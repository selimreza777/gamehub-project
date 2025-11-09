import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import LoadingOverlay from "./components/LoadingOverlay.jsx";

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Loading trigger function
  const triggerLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500); // small delay
  };

  useEffect(() => {
    // route change detected
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <Navbar triggerLoading={triggerLoading} />
      <div className="min-h-screen bg-black text-white relative">
        <Outlet />
        {loading && <LoadingOverlay />}
      </div>
      <Footer />
    </>
  );
};

export default App;
