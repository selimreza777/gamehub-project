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
      setError("Invalid email or password. Try again.");
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
    <div className="flex justify-center items-center min-h-[80vh] bg-slate-900 text-white">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">Welcome Back</h1>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 transition"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="mt-4 w-full py-2 bg-yellow-500 text-black rounded font-semibold hover:bg-yellow-400 transition"
        >
          Continue with Google
        </button>

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

        <p className="mt-6 text-center text-gray-300">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow-400 underline hover:text-yellow-300">
            Register
          </Link>{" "}
          |{" "}
          <Link to="/forgot-password" className="text-yellow-400 underline hover:text-yellow-300">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
