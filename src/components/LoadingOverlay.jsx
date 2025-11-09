// src/components/LoadingOverlay.jsx
import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="w-16 h-16 border-4 border-t-yellow-500 border-b-yellow-500 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingOverlay;
