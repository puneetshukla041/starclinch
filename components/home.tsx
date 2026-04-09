"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Categories mapping to your public folder
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
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center overflow-hidden font-sans relative selection:bg-pink-500/30">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between w-full relative z-10 gap-12 md:gap-0">
        
        {/* Left Side: Masked Animated Text */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start order-2 md:order-1">
          <div className="h-[80px] md:h-[120px] overflow-hidden relative flex items-center w-full justify-center md:justify-start">
            <AnimatePresence mode="popLayout">
              <motion.h1
                key={categories[currentIndex].title}
                initial={{ y: "100%", opacity: 0, rotateX: -20 }}
                animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                exit={{ y: "-100%", opacity: 0, rotateX: 20 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1] // Custom snappy spring-like curve
                }}
                className="text-5xl sm:text-6xl md:text-8xl font-medium tracking-tighter absolute text-gray-100 origin-bottom"
              >
                {categories[currentIndex].title}
              </motion.h1>
            </AnimatePresence>
          </div>
        </div>

        {/* Center: Premium Rotating Ring & Image */}
        <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[480px] lg:h-[480px] flex-shrink-0 order-1 md:order-2 group">
          
          {/* SVG Rotating Ring */}
          <motion.div
            animate={{ rotate: currentIndex * 120 }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            className="absolute inset-[-20px] sm:inset-[-30px] lg:inset-[-40px]"
          >
            <svg className="w-full h-full origin-center" viewBox="0 0 100 100" overflow="visible">
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
                  <stop offset="50%" stopColor="#f97316" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#be185d" stopOpacity="1" />
                </linearGradient>
              </defs>
              {/* Subtle background track */}
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              {/* Animated gradient stroke */}
              <circle 
                cx="50" cy="50" r="48" 
                fill="none" 
                stroke="url(#ringGradient)" 
                strokeWidth="1.5" 
                strokeLinecap="round"
                strokeDasharray="150 200"
                className="drop-shadow-[0_0_10px_rgba(190,24,93,0.5)]"
              />
              {/* Orbital Dot/Arrow Anchor */}
              <circle cx="85" cy="85" r="2" fill="#be185d" className="drop-shadow-[0_0_5px_#be185d]" />
            </svg>

            {/* Floating Arrow icon following the ring */}
            <div className="absolute bottom-[4%] right-[4%] text-pink-500 -rotate-45">
              <ArrowRight strokeWidth={2.5} className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </motion.div>

          {/* Inner Image Container with Parallax Scale */}
          <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-neutral-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.2, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={categories[currentIndex].image}
                  alt={categories[currentIndex].title}
                  fill
                  priority
                  className="object-cover transform transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 350px, 480px"
                />
                {/* Gradient vignette for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/20" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Static Info & Call to Action */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-end text-center md:text-right space-y-6 order-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-400 leading-tight">
            Choose <br className="hidden md:block" />
            from <span className="font-semibold text-white">100+</span> <br className="hidden md:block" />
            Categories
          </h2>
          
          <button 
            onClick={handleNext}
            className="group relative flex items-center space-x-3 text-sm md:text-base font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300"
          >
            <span>Explore all categories</span>
            <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-pink-500/20 text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300">
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}