"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  { id: 0, title: "Singers", image: "/home/image1.webp" },
  { id: 1, title: "Dancers", image: "/home/image2.webp" },
  { id: 2, title: "Comedians", image: "/home/image3.webp" },
];

// 1. Magnetic Hover Wrapper Component
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
    >
      {children}
    </motion.div>
  );
}

export default function HeroCarousel() {
  // Store both the current index and the direction we are moving
  const [[currentIndex, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([
      (currentIndex + newDirection + categories.length) % categories.length,
      newDirection,
    ]);
  };

  // Variants for direction-aware sliding
  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
      rotate: direction > 0 ? 5 : -5,
      filter: "blur(8px)",
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
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
      rotate: direction < 0 ? 5 : -5,
      filter: "blur(8px)",
    }),
  };

  const textVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { y: "0%", opacity: 1 },
    exit: (direction: number) => ({
      y: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center overflow-hidden font-sans relative selection:bg-pink-500/30">
      {/* Dynamic Background Glow reacting to index */}
      <motion.div 
        key={`glow-${currentIndex}`}
        initial={{ opacity: 0.5, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" 
      />

      <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between w-full relative z-10 gap-12 md:gap-0">
        
        {/* Left Side: Masked Animated Text */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start order-2 md:order-1">
          <div className="h-[80px] md:h-[120px] overflow-hidden relative flex items-center w-full justify-center md:justify-start">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.h1
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl md:text-8xl font-medium tracking-tighter absolute text-gray-100"
              >
                {categories[currentIndex].title}
              </motion.h1>
            </AnimatePresence>
          </div>
        </div>

        {/* Center: Interactive Swipable Carousel */}
        <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[480px] lg:h-[480px] flex-shrink-0 order-1 md:order-2">
          
          {/* Ambient + Snapping Ring */}
          <motion.div
            animate={{ 
              rotate: currentIndex * 120, // Snaps to position
            }}
            transition={{ type: "spring", stiffness: 40, damping: 12 }}
            className="absolute inset-[-20px] sm:inset-[-30px] lg:inset-[-40px]"
          >
            {/* The infinite slow spin applied to the SVG itself */}
            <motion.svg 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="w-full h-full origin-center" 
              viewBox="0 0 100 100" 
              overflow="visible"
            >
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
                  <stop offset="30%" stopColor="#f97316" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#be185d" stopOpacity="1" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              <circle 
                cx="50" cy="50" r="48" 
                fill="none" 
                stroke="url(#ringGradient)" 
                strokeWidth="1.2" 
                strokeLinecap="round"
                strokeDasharray="120 220"
                className="drop-shadow-[0_0_12px_rgba(190,24,93,0.6)]"
              />
              <circle cx="85" cy="85" r="2.5" fill="#be185d" className="drop-shadow-[0_0_8px_#be185d]" />
            </motion.svg>
          </motion.div>

          {/* Draggable Image Container */}
          <div className="relative w-full h-full rounded-full overflow-hidden border border-white/5 shadow-2xl shadow-black/80 bg-neutral-950 cursor-grab active:cursor-grabbing">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -10000) paginate(1); // Swiped left
                  else if (swipe > 10000) paginate(-1); // Swiped right
                }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={categories[currentIndex].image}
                  alt={categories[currentIndex].title}
                  fill
                  priority
                  draggable={false} // Prevent default browser image drag
                  className="object-cover transform transition-transform duration-[2000ms] hover:scale-110"
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 350px, 480px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/20 pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Static Info & Magnetic Call to Action */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-end text-center md:text-right space-y-8 order-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-400 leading-tight">
            Choose <br className="hidden md:block" />
            from <span className="font-semibold text-white">100+</span> <br className="hidden md:block" />
            Categories
          </h2>
          
          {/* Magnetic Button Application */}
          <MagneticWrapper>
            <button 
              onClick={() => paginate(1)}
              className="group relative flex items-center space-x-4 text-sm md:text-base font-medium text-white bg-neutral-900/50 hover:bg-neutral-800/80 border border-white/10 px-8 py-4 rounded-full backdrop-blur-md transition-colors duration-500 overflow-hidden"
            >
              {/* Button Hover Glow Effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              
              <span className="relative z-10 tracking-wide">Explore all categories</span>
              
              <span className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0)] group-hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                <ArrowRight className="w-4 h-4 transform group-hover:rotate-[-45deg] transition-transform duration-300" />
              </span>
            </button>
          </MagneticWrapper>
        </div>

      </div>
    </div>
  );
}