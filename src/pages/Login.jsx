import React, { useState } from "react";
import { useAuth } from "../providers/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Login</h1>
      <button onClick={handleGoogleLogin} className="px-6 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition">Login with Google</button>
    </div>
  );
};

export default Login;
