"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  { id: 0, title: "Singers", image: "/home/image1.webp" },
  { id: 1, title: "Dancers", image: "/home/image2.webp" },
  { id: 2, title: "Comedians", image: "/home/image3.webp" },
];

// 1. Magnetic Hover Component (Unchanged, already perfect)
function MagneticWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

export default function HeroCarousel() {
  const [[currentIndex, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([
      (currentIndex + newDirection + categories.length) % categories.length,
      newDirection,
    ]);
  };

  // Advanced direction-aware variants
  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.85,
      rotate: direction > 0 ? 8 : -8,
      filter: "blur(12px)",
    }),
    center: {
      z: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      z: 0,
      x: direction < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.85,
      rotate: direction < 0 ? 8 : -8,
      filter: "blur(12px)",
    }),
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center overflow-hidden font-sans relative selection:bg-pink-500/30">
      
      {/* Editorial Pagination Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center space-x-3 font-mono text-xs tracking-widest z-50 uppercase text-gray-500"
      >
        <span className="w-8 h-[1px] bg-gray-600 block" />
        <div className="flex items-center space-x-2">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={currentIndex}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="text-white font-medium"
            >
              0{currentIndex + 1}
            </motion.span>
          </AnimatePresence>
          <span>/</span>
          <span>0{categories.length}</span>
        </div>
      </motion.div>

      {/* Dynamic Background Mesh Glow */}
      <motion.div 
        key={`glow-${currentIndex}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-gradient-to-tr from-orange-600/5 to-pink-600/10 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between w-full relative z-10 gap-12 md:gap-0">
        
        {/* Left Side: Masked Animated Text */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start order-2 md:order-1">
          <div className="h-[80px] md:h-[130px] overflow-hidden relative flex items-center w-full justify-center md:justify-start">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.h1
                key={currentIndex}
                custom={direction}
                initial={{ y: "100%", opacity: 0, rotateX: -30 }}
                animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                exit={{ y: "-100%", opacity: 0, rotateX: 30 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl md:text-[5.5rem] font-medium tracking-tighter absolute text-gray-100 origin-bottom"
              >
                {categories[currentIndex].title}
              </motion.h1>
            </AnimatePresence>
          </div>
        </div>

        {/* Center: Premium Carousel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[480px] lg:h-[480px] flex-shrink-0 order-1 md:order-2"
        >
          {/* Dual-Axis SVG Ring System */}
          <motion.div
            animate={{ rotate: currentIndex * 120 }}
            transition={{ type: "spring", stiffness: 45, damping: 14 }}
            className="absolute inset-[-25px] sm:inset-[-35px] lg:inset-[-45px]"
          >
            <svg className="w-full h-full origin-center" viewBox="0 0 100 100" overflow="visible">
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
                  <stop offset="50%" stopColor="#f97316" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#be185d" stopOpacity="1" />
                </linearGradient>
              </defs>
              
              {/* Inner Track (Counter-Clockwise Spin) */}
              <motion.circle 
                cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="4 4"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="origin-center"
              />

              {/* Main Glowing Track (Clockwise Spin) */}
              <motion.circle 
                cx="50" cy="50" r="49" 
                fill="none" 
                stroke="url(#ringGradient)" 
                strokeWidth="1.2" 
                strokeLinecap="round"
                strokeDasharray="140 200"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="drop-shadow-[0_0_12px_rgba(190,24,93,0.5)] origin-center"
              />
              
              {/* Orbital Dot */}
              <circle cx="99" cy="50" r="2.5" fill="#be185d" className="drop-shadow-[0_0_10px_#be185d]" />
            </svg>
          </motion.div>

          {/* Draggable Image Container */}
          <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-neutral-950 cursor-grab active:cursor-grabbing">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -8000) paginate(1); 
                  else if (swipe > 8000) paginate(-1); 
                }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={categories[currentIndex].image}
                  alt={categories[currentIndex].title}
                  fill
                  priority
                  draggable={false} 
                  className="object-cover transform transition-transform duration-[2000ms] hover:scale-105"
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 350px, 480px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/30 pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Side: Static Info & Magnetic Call to Action */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/3 flex flex-col items-center md:items-end text-center md:text-right space-y-8 order-3"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-400 leading-tight">
            Choose <br className="hidden md:block" />
            from <span className="font-semibold text-white">100+</span> <br className="hidden md:block" />
            Categories
          </h2>
          
          <MagneticWrapper>
            {/* Added cursor-pointer and active:scale-95 for premium tactile feel */}
            <button 
              onClick={() => paginate(1)}
              className="cursor-pointer group relative flex items-center space-x-5 text-sm md:text-base font-medium text-white bg-neutral-900/40 hover:bg-neutral-800/60 border border-white/10 px-8 py-4 rounded-full backdrop-blur-xl transition-all duration-300 overflow-hidden active:scale-95"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              
              <span className="relative z-10 tracking-wider">Explore all categories</span>
              
              <span className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0)] group-hover:shadow-[0_0_25px_rgba(236,72,153,0.5)]">
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-rotate-45 transition-transform duration-300" />
              </span>
            </button>
          </MagneticWrapper>
        </motion.div>

      </div>
    </div>
  );
}