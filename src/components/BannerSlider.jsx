// src/components/BannerSlider.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import flykar from "../assets/flykar.png";
import kena from "../assets/kena.png";
import witcher from "../assets/witcher.png";

const images = [flykar, kena, witcher];

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Position logic
  const getPosition = (index) => {
    if (index === currentIndex) return "center";
    if (index === (currentIndex + 1) % images.length) return "right";
    if (index === (currentIndex + 2) % images.length) return "left";
    return "hidden";
  };

  return (
    <div className="relative w-full bg-slate-900 flex justify-center items-center py-12 overflow-hidden">
      <div className="relative flex justify-center items-center w-full max-w-7xl h-[450px] md:h-[500px]">
        {images.map((img, index) => {
          const position = getPosition(index);
          let scale = 0.8;
          let opacity = 0.4;
          let zIndex = 5;
          let x = 0;

          if (position === "center") {
            scale = 1.15;
            opacity = 1;
            zIndex = 20;
            x = 0;
          } else if (position === "left") {
            x = -350;
            zIndex = 10;
          } else if (position === "right") {
            x = 350;
            zIndex = 10;
          }

          return (
            <motion.div
              key={index}
              animate={{ scale, opacity, x }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`absolute rounded-2xl overflow-hidden shadow-2xl border-4 ${
                position === "center"
                  ? "border-yellow-400"
                  : "border-transparent"
              }`}
              style={{ zIndex }}
            >
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-[300px] h-[420px] md:w-[380px] md:h-[500px] object-cover rounded-2xl"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BannerSlider;
