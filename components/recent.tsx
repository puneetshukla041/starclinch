"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

// Exact data mapped to your local image paths and text styling
const SHOWS_DATA = [
  {
    id: 1,
    highlight1: "Nora Fatehi",
    grayText: "for an event hosted by XYZ performed",
    highlight2: "at Pune .",
    date: "14 March 2023",
    image: "/perform/nora.webp",
  },
  {
    id: 2,
    highlight1: "Kapil Sharma",
    grayText: "hosted by XYZ performed",
    highlight2: "at Pune.",
    date: "14 March 2023",
    image: "/perform/kapil.jpg",
  },
  {
    id: 3,
    highlight1: "Zakir Khan",
    grayText: "for an event hosted",
    highlight2: "at Pune for Meesho.",
    date: "14 March 2023",
    image: "/perform/zakhir.avif",
  }
];

// Premium slide animation variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.95,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    zIndex: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 120 : -120,
    opacity: 0,
    scale: 0.95,
    filter: "blur(8px)",
    zIndex: 0,
  }),
};

export default function RecentShowsSection() {
  const [[page, direction], setPage] = useState([0, 0]);

  // Wrap around the array securely
  const activeIndex = ((page % SHOWS_DATA.length) + SHOWS_DATA.length) % SHOWS_DATA.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section className="relative w-full min-h-[100svh] bg-[#050505] overflow-hidden flex flex-col items-center justify-center py-20 md:py-32 font-sans selection:bg-white/20">
      
      {/* --- Infinite Scrolling Corner Banners --- */}
      
      {/* Top Left Banner */}
      <div className="absolute top-[5%] sm:top-[10%] left-[-30%] sm:left-[-15%] w-[150vw] sm:w-[100vw] origin-center -rotate-[35deg] bg-[#0A0A0A] border-y border-white/10 py-2 sm:py-2.5 z-0 shadow-2xl">
        <motion.div 
          className="flex whitespace-nowrap text-[10px] sm:text-xs tracking-[0.25em] text-white/50 font-medium uppercase"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          {Array(20).fill("HEADLIGHTS OF TODAY ★ ").map((text, i) => (
            <span key={i} className="px-3">{text}</span>
          ))}
        </motion.div>
      </div>

      {/* Bottom Right Banner */}
      <div className="absolute bottom-[5%] sm:bottom-[10%] right-[-30%] sm:right-[-15%] w-[150vw] sm:w-[100vw] origin-center -rotate-[35deg] bg-[#0A0A0A] border-y border-white/10 py-2 sm:py-2.5 z-0 shadow-2xl">
        <motion.div 
          className="flex whitespace-nowrap text-[10px] sm:text-xs tracking-[0.25em] text-white/50 font-medium uppercase"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          {Array(20).fill("HEADLIGHTS OF TODAY ★ ").map((text, i) => (
            <span key={i} className="px-3">{text}</span>
          ))}
        </motion.div>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        
        {/* Main Header */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-normal text-white text-center leading-tight sm:leading-snug tracking-wide mb-16 md:mb-24 drop-shadow-2xl"
        >
          Recent shows made star- <br className="hidden sm:block" />
          studded via StarClinch
        </motion.h2>

        {/* Carousel Block */}
        <div className="relative w-full max-w-[950px] flex items-center justify-between gap-4 sm:gap-10">
          
          {/* Previous Button */}
          <button 
            onClick={() => paginate(-1)}
            className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1A1A1A]/80 backdrop-blur-md hover:bg-[#2A2A2A] border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 z-20 cursor-pointer shadow-2xl hover:scale-105 active:scale-95"
            aria-label="Previous Show"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 -ml-0.5" />
          </button>

          {/* Center Content Area */}
          <div className="relative w-full flex-1 flex justify-center items-center min-h-[400px] sm:min-h-[500px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.4, ease: "easeOut" },
                  filter: { duration: 0.3 }
                }}
                className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full"
              >
                
                {/* Left: Arched Image */}
                <div className="relative w-[240px] h-[300px] sm:w-[320px] sm:h-[400px] md:w-[380px] md:h-[480px] shrink-0 group">
                  {/* Subtle dynamic background glow */}
                  <div className="absolute inset-0 rounded-[200px_200px_24px_24px] bg-rose-500/10 blur-[60px] transform scale-110 transition-opacity duration-500 group-hover:opacity-70" />
                  
                  {/* Image container with the exact Arch shape */}
                  <div className="relative w-full h-full rounded-[200px_200px_24px_24px] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] bg-[#111]">
                    <Image
                      src={SHOWS_DATA[activeIndex].image}
                      alt={SHOWS_DATA[activeIndex].highlight1}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 320px, 380px"
                      priority
                    />
                    {/* Bottom gradient fade for premium feel */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-80" />
                  </div>
                </div>

                {/* Right: Text Content */}
                <div className="flex flex-col text-center md:text-left max-w-[300px] sm:max-w-[360px]">
                  <h3 className="text-2xl sm:text-3xl md:text-[32px] font-light leading-[1.3] md:leading-[1.4] text-[#777777]">
                    <span className="font-normal text-white">{SHOWS_DATA[activeIndex].highlight1}</span>{" "}
                    {SHOWS_DATA[activeIndex].grayText}{" "}
                    <span className="font-normal text-white">{SHOWS_DATA[activeIndex].highlight2}</span>
                  </h3>
                  
                  <div className="flex items-center justify-center md:justify-start gap-2.5 mt-6 sm:mt-8 text-[#777777] text-xs sm:text-sm font-medium">
                    <Calendar className="w-4 h-4" />
                    <span>{SHOWS_DATA[activeIndex].date}</span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <button 
            onClick={() => paginate(1)}
            className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1A1A1A]/80 backdrop-blur-md hover:bg-[#2A2A2A] border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 z-20 cursor-pointer shadow-2xl hover:scale-105 active:scale-95"
            aria-label="Next Show"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />
          </button>

        </div>
      </div>
    </section>
  );
}