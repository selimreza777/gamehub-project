import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase.config.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to send reset email. Try again.");
      setMessage("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Forgot Password</h1>
      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-slate-800 text-white"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="text-green-500 mt-3">{message}</p>}
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
