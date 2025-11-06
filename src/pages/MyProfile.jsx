import React from "react";
import { useAuth } from "../providers/AuthProvider.jsx";

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">My Profile</h1>
      {user && (
        <div className="bg-slate-800 p-4 rounded shadow">
          <img src={user.photoURL || "/default-avatar.png"} alt={user.displayName} className="w-24 h-24 rounded-full mb-4"/>
          <h2 className="text-xl font-semibold text-white">{user.displayName}</h2>
          <p className="text-white">{user.email}</p>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
