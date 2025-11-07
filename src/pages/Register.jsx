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

    // Password validation
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
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded bg-slate-800 text-white"
          required
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="w-full px-4 py-2 rounded bg-slate-800 text-white"
        />
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
          Register
        </button>
      </form>

      <button
        onClick={handleGoogleRegister}
        className="mt-4 px-6 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition"
      >
        Register with Google
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      <p className="mt-4 text-white">
        Already have an account?{" "}
        <Link to="/login" className="text-yellow-400 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
