"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  { id: 0, title: "Singers", image: "/home/image3.webp", description: "Soulful voices & chart-topping hits" },
  { id: 1, title: "Dancers", image: "/home/image2.webp", description: "Mesmerizing moves & choreography" },
  { id: 2, title: "Comedians", image: "/home/image1.webp", description: "Stand-up comedy & endless laughs" },
];

// Magnetic Hover Component
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
  const [[page, direction], setPage] = useState([0, 0]);
  const normalizedIndex = ((page % categories.length) + categories.length) % categories.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 3000);

    return () => clearInterval(timer);
  }, [page]);

  const textVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 120 : -120,
      x: 30, 
      rotate: dir > 0 ? -20 : 20,
      opacity: 0,
      scale: 0.7,
      filter: "blur(8px)",
    }),
    center: {
      y: 0,
      x: 0,
      rotate: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      zIndex: 50,
    },
    exit: (dir: number) => ({
      y: dir < 0 ? 120 : -120,
      x: 30,
      rotate: dir < 0 ? -20 : 20,
      opacity: 0,
      scale: 0.7,
      filter: "blur(8px)",
      zIndex: 10,
    }),
  };

  return (
    // UPDATED: Changed bg-[#0A0A0B] to bg-[#050505] to match the gradient's ending color perfectly
    <div className="min-h-[100svh] bg-[#050505] text-white flex items-center justify-center overflow-hidden font-sans relative selection:bg-rose-500/30 w-full">
      
      {/* Cinematic Background Gradient */}
      <motion.div 
        key={`bg-${normalizedIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-950/20 via-[#0A0A0B] to-[#050505] pointer-events-none"
      />

      {/* Premium Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Main Container */}
      <div className="container mx-auto px-5 sm:px-8 lg:px-16 py-16 md:py-0 flex flex-col md:flex-row items-center justify-between w-full relative z-10 gap-12 sm:gap-16 md:gap-4 lg:gap-8">
        
        {/* Left Side: Curved Text Animation */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start order-2 md:order-1 z-50 pointer-events-none">
          <div className="relative w-full h-[80px] sm:h-[120px] md:h-[200px] flex items-center justify-center md:justify-start">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.h1
                key={normalizedIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 text-[13vw] sm:text-[10vw] md:text-7xl lg:text-[5.5rem] xl:text-[7rem] font-medium tracking-tighter text-gray-100 whitespace-nowrap leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] origin-left"
              >
                {categories[normalizedIndex].title}
              </motion.h1>
            </AnimatePresence>
          </div>
        </div>

        {/* Center: Premium Carousel & Description Wrapper */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center flex-shrink-0 order-1 md:order-2 z-10 w-full md:w-auto"
        >
          {/* Circle Container */}
          <div className="relative aspect-square w-[70vw] sm:w-[55vw] md:w-[42vw] lg:w-[32vw] max-w-[300px] sm:max-w-[380px] lg:max-w-[460px]">
            {/* Dynamic Pulsating Halo */}
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1], 
                opacity: [0.4, 0.7, 0.4],
                rotate: [0, 90, 0] 
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-[-25%] rounded-full bg-gradient-to-tr from-orange-600/30 via-rose-600/40 to-purple-600/30 blur-[40px] sm:blur-[60px] md:blur-[80px] -z-10"
            />

            <motion.div
              animate={{ rotate: page * 120 }} 
              transition={{ type: "spring", stiffness: 45, damping: 14 }}
              className="absolute inset-[-12%] sm:inset-[-15%]"
            >
              <svg className="w-full h-full origin-center" viewBox="0 0 100 100" overflow="visible">
                <defs>
                  <linearGradient id="swooshGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e11d48" stopOpacity="0" />
                    <stop offset="30%" stopColor="#e11d48" stopOpacity="0.5" />
                    <stop offset="70%" stopColor="#f43f5e" stopOpacity="1" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path 
                  d="M 89.8 27 A 46 46 0 0 1 27 89.8" 
                  fill="none" 
                  stroke="url(#swooshGradient)" 
                  strokeWidth="1.2" 
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_12px_rgba(249,115,22,0.6)] origin-center"
                />
                <path 
                  d="M -6 -5 L 0 0 L -6 5" 
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(27, 89.8) rotate(210)"
                  className="drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                />
              </svg>
            </motion.div>

            {/* "Dip to Pink" Video Transition */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500 to-orange-500 shadow-[0_0_50px_rgba(0,0,0,0.8)]" />

            {/* Images Container */}
            <div className="absolute inset-0 rounded-full overflow-hidden cursor-grab active:cursor-grabbing border border-white/5 shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={normalizedIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full bg-[#0A0A0B]"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.8}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -4000) paginate(1); 
                    else if (swipe > 4000) paginate(-1); 
                  }}
                >
                  <Image
                    src={categories[normalizedIndex].image}
                    alt={categories[normalizedIndex].title}
                    fill
                    priority
                    draggable={false} 
                    className="object-cover transition-transform duration-[3000ms] hover:scale-105"
                    sizes="(max-width: 768px) 300px, (max-width: 1024px) 380px, 460px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Professional Editorial Description text placed safely outside the circle */}
          <div className="h-10 mt-8 sm:mt-12 flex items-center justify-center w-full relative z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={normalizedIndex}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(4px)", y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center space-x-3 sm:space-x-4"
              >
                <div className="w-4 sm:w-8 h-[1px] bg-gradient-to-r from-transparent to-rose-500/60" />
                <p className="text-rose-100/70 font-medium tracking-[0.15em] uppercase text-[10px] sm:text-xs whitespace-nowrap">
                  {categories[normalizedIndex].description}
                </p>
                <div className="w-4 sm:w-8 h-[1px] bg-gradient-to-l from-transparent to-rose-500/60" />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Side: Static Info & Magnetic Call to Action */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/3 flex flex-col items-center md:items-end text-center md:text-right space-y-6 sm:space-y-8 order-3 z-50 mt-4 md:mt-0"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-400 leading-tight">
            Choose <br className="hidden md:block" />
            from <span className="font-semibold text-white">100+</span> <br className="hidden md:block" />
            Categories
          </h2>
          
          <MagneticWrapper>
            <button 
              onClick={() => paginate(1)}
              className="cursor-pointer group relative flex items-center space-x-3 sm:space-x-5 text-xs sm:text-sm md:text-base font-medium text-white bg-neutral-900/60 hover:bg-neutral-800/80 border border-white/10 px-6 sm:px-8 py-3 sm:py-4 rounded-full backdrop-blur-xl transition-all duration-300 overflow-hidden active:scale-95 shadow-xl"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10 tracking-wider whitespace-nowrap text-rose-50 group-hover:text-white transition-colors">Explore all categories</span>
              <span className="relative z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(225,29,72,0)] group-hover:shadow-[0_0_25px_rgba(225,29,72,0.5)]">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-0.5 group-hover:-rotate-45 transition-transform duration-300" />
              </span>
            </button>
          </MagneticWrapper>
        </motion.div>

      </div>
    </div>
  );
}