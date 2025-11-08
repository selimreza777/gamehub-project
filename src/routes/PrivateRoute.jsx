import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider.jsx";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 🌀 Show loading screen while Firebase checks user state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-yellow-400 text-xl">
        Checking authentication...
      </div>
    );
  }

  // 🚫 Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ Allow access
  return children;
};

export default PrivateRoute;
