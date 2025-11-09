import React, { useState } from "react";
import { useAuth } from "../providers/AuthProvider.jsx";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config.js";

const Register = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!/[A-Z]/.test(password)) return setError("Password must have at least 1 uppercase letter.");
    if (!/[a-z]/.test(password)) return setError("Password must have at least 1 lowercase letter.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL });
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Try again.");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Google register failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-slate-900 text-white">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">Create an Account</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="text"
            placeholder="Photo URL (optional)"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
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
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 transition"
          >
            Register
          </button>
        </form>

        <button
          onClick={handleGoogleRegister}
          className="mt-4 w-full py-2 bg-yellow-500 text-black rounded font-semibold hover:bg-yellow-400 transition"
        >
          Continue with Google
        </button>

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

        <p className="mt-6 text-center text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 underline hover:text-yellow-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
