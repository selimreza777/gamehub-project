import React, { useState } from "react";
import { useAuth } from "../providers/AuthProvider.jsx";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config.js";

const Login = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Email/Password login failed. Try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Google login failed. Try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Login</h1>
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-slate-800 text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded bg-slate-800 text-white"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition"
        >
          Login
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        className="mt-4 px-6 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition"
      >
        Login with Google
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      <p className="mt-4 text-white">
        Don't have an account?{" "}
        <Link to="/register" className="text-yellow-400 underline">
          Register
        </Link>{" "}
        |{" "}
        <Link to="/forgot-password" className="text-yellow-400 underline">
          Forgot Password?
        </Link>
      </p>
    </div>
  );
};

export default Login;
