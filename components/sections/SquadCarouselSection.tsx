"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

// --- Next-Level Premium Copywriting ---
const SQUADS_DATA = [
  {
    id: 1,
    name: "Visual Architects",
    members: "05 Members",
    description: "Mastering the visual narrative. Our design collective crafts immersive, pixel-perfect experiences that blur the line between art and digital reality.",
    image: "/trending/image9.png",
    cta: "Explore Design Roles",
  },
  {
    id: 2,
    name: "Platform Engineering",
    members: "08 Members",
    description: "Building the engine of tomorrow. Our engineering elite architects the invisible, scalable frameworks that power seamless global experiences.",
    image: "/trending/image9.png",
    cta: "Explore Engineering Roles",
  },
  {
    id: 3,
    name: "Audience Strategists",
    members: "04 Members",
    description: "Translating vision into cultural impact. We engineer data-driven campaigns that amplify artist presence and dominate global markets.",
    image: "/trending/image9.png",
    cta: "Explore Strategy Roles",
  }
];

export default function SquadCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SQUADS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SQUADS_DATA.length) % SQUADS_DATA.length);
  };

  // Helper function to calculate position & 3D rotation on the curved path
  const getCardStyles = (index: number) => {
    const total = SQUADS_DATA.length;
    let relativeIndex = index - currentIndex;
    if (relativeIndex < -1) relativeIndex += total;
    if (relativeIndex > 1) relativeIndex -= total;

    // Center active card
    if (relativeIndex === 0) {
      return {
        x: "0%",
        y: 0,
        scale: 1,
        rotateY: 0, // Facing straight forward
        opacity: 1,
        zIndex: 30,
        borderRadius: "24px",
        filter: "brightness(1) grayscale(0%)",
      };
    } 
    // Left card
    else if (relativeIndex === -1 || (relativeIndex < 0 && total === 2)) {
      return {
        x: "-125%",
        y: 80, 
        scale: 0.65,
        rotateY: 35, // NEW: Rotates inward toward the center
        opacity: 0.5,
        zIndex: 20,
        borderRadius: "9999px",
        filter: "brightness(0.6) grayscale(40%)",
      };
    } 
    // Right card
    else if (relativeIndex === 1 || (relativeIndex > 0 && total === 2)) {
      return {
        x: "125%",
        y: 80, 
        scale: 0.65,
        rotateY: -35, // NEW: Rotates inward toward the center
        opacity: 0.5,
        zIndex: 20,
        borderRadius: "9999px",
        filter: "brightness(0.6) grayscale(40%)",
      };
    } 
    // Hidden cards
    else {
      return {
        x: relativeIndex < 0 ? "-200%" : "200%",
        y: 150,
        scale: 0.4,
        rotateY: relativeIndex < 0 ? 60 : -60, // Deep rotation for hidden items
        opacity: 0,
        zIndex: 10,
        borderRadius: "9999px",
        filter: "brightness(0)",
      };
    }
  };

  return (
    <section className="relative w-full bg-[#050505] py-24 md:py-32 overflow-hidden min-h-[90vh] flex flex-col items-center selection:bg-emerald-500/30">
      
      {/* Premium Noise Overlay for Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Elegant Faint Background Arc */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[180vw] md:w-[120vw] lg:w-[1400px] aspect-square rounded-full border-[1px] border-white/[0.04] pointer-events-none z-0" />

      {/* Header */}
      <div className="text-center mb-16 relative z-10 flex flex-col items-center">
        <p className="text-emerald-400/80 font-medium tracking-[0.2em] text-[10px] md:text-xs uppercase mb-3">The Collective</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight">
          Meet Our <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Squads</span>
        </h2>
      </div>

      {/* Carousel Container - NEW: Added perspective for 3D effect */}
      <div 
        className="relative w-full max-w-[1000px] mx-auto h-[320px] sm:h-[380px] flex justify-center mt-4 z-10"
        style={{ perspective: "1200px" }} // This enables the 3D depth illusion
      >
        
        {/* Navigation Arrows */}
        <div className="absolute top-[40%] sm:top-[35%] left-1/2 -translate-x-1/2 w-full max-w-[360px] sm:max-w-[440px] flex justify-between px-4 z-40 pointer-events-none">
          <button 
            onClick={handlePrev}
            className="cursor-pointer pointer-events-auto w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 hover:scale-105 hover:border-white/20 transition-all duration-300 backdrop-blur-md"
            aria-label="Previous Squad"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={handleNext}
            className="cursor-pointer pointer-events-auto w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 hover:scale-105 hover:border-white/20 transition-all duration-300 backdrop-blur-md"
            aria-label="Next Squad"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Image Cards */}
        {SQUADS_DATA.map((squad, index) => {
          const styles = getCardStyles(index);
          const isActive = index === currentIndex;

          return (
            <motion.div
              key={squad.id}
              initial={false}
              animate={styles}
              transition={{ type: "spring", stiffness: 180, damping: 25, mass: 1 }}
              className="absolute top-0 origin-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer group"
              style={{
                width: "280px",
                height: "280px",
                boxShadow: isActive ? "0 0 60px rgba(16,185,129,0.08), 0 20px 40px rgba(0,0,0,0.8)" : "none",
                transformStyle: "preserve-3d" // Preserves 3D children if needed
              }}
              onClick={() => {
                if (index !== currentIndex) setCurrentIndex(index);
              }}
            >
              <div className="relative w-full h-full overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors duration-500" style={{ borderRadius: 'inherit' }}>
                <Image
                  src={squad.image}
                  alt={squad.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 280px, 280px"
                  priority={isActive}
                />
                {isActive && (
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="relative w-full max-w-[500px] mx-auto text-center mt-8 px-6 z-20 min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Premium Members Badge */}
            <div className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5 backdrop-blur-md">
              <span className="text-emerald-300 font-medium tracking-widest uppercase text-[9px] sm:text-[10px]">
                {SQUADS_DATA[currentIndex].members}
              </span>
            </div>

            {/* Scaled-down Elegant Title */}
            <h3 className="text-2xl sm:text-3xl font-light text-white mb-3 tracking-tight">
              {SQUADS_DATA[currentIndex].name}
            </h3>

            {/* Refined Description */}
            <p className="text-neutral-400 text-[13px] sm:text-sm leading-relaxed mb-6 font-light max-w-[420px]">
              {SQUADS_DATA[currentIndex].description}
            </p>

            {/* Premium Call to Action */}
            <button className="cursor-pointer group flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
              {SQUADS_DATA[currentIndex].cta}
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                <ArrowUpRight className="w-3 h-3 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>

          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
}