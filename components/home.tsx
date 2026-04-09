"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// The categories and corresponding image paths matching your public folder
const categories = [
  { id: 0, title: "Singers", image: "/home/image1.webp" },
  { id: 1, title: "Dancers", image: "/home/image2.webp" },
  { id: 2, title: "Comedians", image: "/home/image3.webp" },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center overflow-hidden font-sans relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between w-full relative z-10">
        
        {/* Left Side: Animated Category Text */}
        <div className="w-full md:w-1/3 h-[120px] relative flex items-center justify-start overflow-visible">
          <AnimatePresence mode="popLayout">
            <motion.h1
              key={categories[currentIndex].title}
              initial={{ y: 60, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -60, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="text-6xl md:text-8xl font-medium tracking-tight absolute text-gray-200"
            >
              {categories[currentIndex].title}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Center: Rotating Image & Ring */}
        <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] my-16 md:my-0 flex-shrink-0">
          {/* The Rotating Outer Ring */}
          <motion.div
            animate={{ rotate: currentIndex * 120 }}
            transition={{ duration: 0.8, ease: "anticipate" }}
            className="absolute inset-[-30px] rounded-full"
            style={{
              background: "conic-gradient(from 90deg, transparent 0%, transparent 40%, #f97316 80%, #be185d 100%)",
              WebkitMask: "radial-gradient(transparent 68%, black 69%)",
              mask: "radial-gradient(transparent 68%, black 69%)",
            }}
          >
            {/* Arrow on the ring */}
            <div className="absolute top-[8%] right-[15%] text-pink-600 rotate-[45deg]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </motion.div>

          {/* The Inner Crossfading Image */}
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl shadow-pink-900/20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={categories[currentIndex].image}
                  alt={categories[currentIndex].title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 300px, 450px"
                />
                {/* Subtle overlay to blend the image better with the dark theme */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Static Text & Trigger Button */}
        <div className="w-full md:w-1/3 flex flex-col items-start md:items-end text-left md:text-right space-y-6">
          <div className="text-3xl md:text-5xl font-light text-gray-400 leading-snug">
            Choose <br />
            from <span className="font-semibold text-white">100+</span> <br />
            Categories
          </div>
          
          <button 
            onClick={handleNext}
            className="group flex items-center space-x-2 text-sm md:text-base font-medium text-pink-500 hover:text-pink-400 transition-colors"
          >
            <span>Explore all categories</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}