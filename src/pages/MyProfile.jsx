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
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-6">
      <div className="bg-slate-900/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border border-slate-700">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">My Profile</h1>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full px-4 py-2 rounded bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="w-full px-6 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 transition"
          >
            Update Info
          </button>
        </form>

        {message && (
          <p
            className={`mt-3 ${
              message.includes("successfully")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mt-6 text-left text-gray-300 space-y-2">
          <p>
            <strong className="text-yellow-400">Email:</strong> {user?.email}
          </p>
          <p>
            <strong className="text-yellow-400">Display Name:</strong>{" "}
            {user?.displayName || "Not set"}
          </p>
          {user?.photoURL && (
            <div className="flex justify-center mt-4">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-yellow-400 shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
