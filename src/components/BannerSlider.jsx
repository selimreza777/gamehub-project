import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import flykar from "../assets/flykar.png";
import kena from "../assets/kena.png";
import witcher from "../assets/witcher.png";

const images = [flykar, kena, witcher];

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Banner Section */}
      <div
        className={`relative flex justify-center items-center w-full ${isMobile ? "h-[70vh]" : "h-[550px]"
          } overflow-hidden`}
      >
        {images.map((img, index) => {
          let scale = 0.8,
            opacity = 0.4,
            zIndex = 5,
            x = 0;

          if (isMobile) {
            if (index === currentIndex) {
              scale = 1;
              opacity = 1;
              zIndex = 20;
              x = 0;
            } else {
              opacity = 0;
            }
          } else {
            if (index === currentIndex) {
              scale = 1.15;
              opacity = 1;
              zIndex = 20;
              x = 0;
            } else if (index === (currentIndex + 1) % images.length) {
              scale = 0.85;
              opacity = 0.6;
              zIndex = 10;
              x = 502;
            } else if (index === (currentIndex + 2) % images.length) {
              scale = 0.85;
              opacity = 0.6;
              zIndex = 10;
              x = -502;
            } else {
              opacity = 0;
            }
          }

          return (
            <motion.div
              key={index}
              animate={{ scale, opacity, x }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.4)] flex justify-center items-center"
              style={{ zIndex }}
            >
              <img
                src={img}
                alt={`Slide ${index}`}
                className={`object-cover rounded-2xl ${isMobile
                    ? "w-[90vw] h-auto max-h-[65vh]"
                    : "w-[430px] h-[520px] md:w-[480px] md:h-[550px]"
                  }`}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BannerSlider;
