import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import flykar from "../assets/flykar.png";
import kena from "../assets/kena.png";
import witcher from "../assets/witcher.png";

const images = [flykar, kena, witcher];

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getPosition = (index) => {
    if (index === currentIndex) return "center";
    if (index === (currentIndex + 1) % images.length) return "right";
    if (index === (currentIndex + 2) % images.length) return "left";
    return "hidden";
  };

  return (
    <div className="relative w-screen overflow-hidden">
      {/* 🔹 Image Slider */}
      <div className="relative flex justify-center items-center w-screen h-[450px] md:h-[500px] z-10">
        {images.map((img, index) => {
          const position = getPosition(index);
          let scale = 0.8;
          let opacity = 0.4;
          let zIndex = 5;
          let x = 0;

          // Set positions with proper gaps
          if (position === "center") {
            scale = 1.15;
            opacity = 1;
            zIndex = 20;
            x = 0;
          } else if (position === "left") {
            scale = 0.85;
            opacity = 0.6;
            zIndex = 10;
            x = -400; // bigger gap from center
          } else if (position === "right") {
            scale = 0.85;
            opacity = 0.6;
            zIndex = 10;
            x = 400; // bigger gap from center
          }

          return (
            <motion.div
              key={index}
              animate={{ scale, opacity, x }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute rounded-2xl overflow-hidden shadow-[0_0_35px_rgba(0,0,0,0.6)]"
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
