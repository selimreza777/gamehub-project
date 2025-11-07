import React, { useState } from "react";
import { useAuth } from "../providers/AuthProvider.jsx";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase.config.js";

const MyProfile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">My Profile</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded bg-slate-800 text-white"
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="w-full px-4 py-2 rounded bg-slate-800 text-white"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition"
        >
          Update Info
        </button>
      </form>
      {message && <p className="text-green-500 mt-3">{message}</p>}
      <div className="mt-6">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Display Name:</strong> {user?.displayName}</p>
        {user?.photoURL && <img src={user.photoURL} alt="Profile" className="w-20 h-20 rounded mt-2" />}
      </div>
    </div>
  );
};

export default MyProfile;
