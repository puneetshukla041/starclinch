"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- Helper Functions ---
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// --- Refined, Professional Data ---
const FEATURED_ARTISTS = [
  {
    name: "Jasmine Sandlas",
    subtext: "Currently viewing in your area",
  },
  {
    name: "Karan Aujla",
    subtext: "High booking demand this week",
  },
  {
    name: "Samay Raina",
    subtext: "Limited availability remaining",
  },
];

// --- Fluid Animation Curves ---
// FIXED: Added "as const" so TypeScript knows "spring" is the exact string literal, not a generic string.
const SPRING_CONFIG = { type: "spring", stiffness: 400, damping: 32, mass: 0.8 } as const;

// Explicitly typing this as a tuple so TypeScript and Framer Motion are happy
const EASE_CURVE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// --- Content Components ---

const CompactContent = () => (
  <motion.div
    layout="position"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
    transition={{ duration: 0.3, ease: EASE_CURVE }}
    className="flex items-center justify-center w-full h-full gap-3 px-4 whitespace-nowrap"
  >
    {/* Pulsing indicator to show it's active */}
    <div className="relative flex items-center justify-center w-1.5 h-1.5">
      <span className="absolute w-full h-full rounded-full bg-rose-400 opacity-75 animate-ping duration-1000" />
      <div className="relative w-1.5 h-1.5 bg-rose-400 rounded-full shadow-[0_0_8px_rgba(251,113,133,0.8)]" />
    </div>
    <span className="text-[11px] font-medium text-white/90 tracking-[0.15em] font-sans uppercase">
      Book Talent
    </span>
  </motion.div>
);

const ExpandedContent = ({ activeIndex }: { activeIndex: number }) => {
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.15 } }}
      transition={{ duration: 0.4, ease: EASE_CURVE }}
      className="flex items-center justify-between w-full gap-2 px-2"
    >
      {/* Left side: Elegant Animated Ticker */}
      <div className="flex flex-col justify-center pl-3 text-left w-[200px] sm:w-[240px] overflow-hidden">
        
        <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-rose-300/80 mb-1">
          Trending Artists
        </span>

        {/* The Rotating Ticker with Motion Blur */}
        <div className="relative h-[34px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ y: 12, opacity: 0, filter: "blur(2px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -12, opacity: 0, filter: "blur(2px)" }}
              transition={{ duration: 0.35, ease: EASE_CURVE }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <span className="text-[14px] sm:text-[15px] font-medium text-white tracking-tight leading-none mb-1 truncate drop-shadow-md">
                {FEATURED_ARTISTS[activeIndex].name}
              </span>
              <span className="text-[10px] text-white/50 tracking-wide truncate">
                {FEATURED_ARTISTS[activeIndex].subtext}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right side: Soft, premium button */}
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          console.log(`Booking initiated for ${FEATURED_ARTISTS[activeIndex].name}`); 
        }}
        layout="position"
        className="group relative flex h-10 shrink-0 items-center justify-center rounded-[20px] px-5 text-[11px] font-medium text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap bg-white/10 hover:bg-white/20 border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.2)] overflow-hidden"
      >
        {/* Subtle hover sweep effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
        
        <span className="relative z-10 flex items-center gap-2">
          Inquire
          <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      </motion.button>
    </motion.div>
  );
};

// --- Main Floating Island Component ---

export default function BookingIsland() {
  const [active, setActive] = useState<"idle" | "expanded">("idle");
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const lastScrollY = useRef(0);

  // Mount & Initial Expansion
  useEffect(() => {
    setMounted(true);
    const initialTimer = setTimeout(() => {
      setActive("expanded");
    }, 1200);
    return () => clearTimeout(initialTimer);
  }, []);

  // Intelligent Rotation Logic (Pauses on hover so users can click)
  useEffect(() => {
    if (active !== "expanded" || isHovered) return;
    
    // Increased to 3s for better reading time
    const rotationInterval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURED_ARTISTS.length);
    }, 3000); 

    return () => clearInterval(rotationInterval);
  }, [active, isHovered]);

  // Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) < 20) return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setActive("idle"); 
      } else if (currentScrollY < lastScrollY.current) {
        setActive("expanded"); 
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80] flex flex-col items-center">
      <motion.div
        layout
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setActive(active === "idle" ? "expanded" : "idle")}
        className={cn(
          "relative overflow-hidden flex items-center justify-center cursor-pointer select-none font-sans group/island",
          active === "expanded"
            ? "w-[92vw] sm:w-auto sm:min-w-[380px] h-[68px] px-2"
            : "w-[150px] h-[44px]"
        )}
        style={{
          borderRadius: active === "expanded" ? "34px" : "22px",
          // Upgraded Glass Material
          background: "rgba(10, 10, 12, 0.75)", 
          backdropFilter: "blur(32px) saturate(180%)",
          WebkitBackdropFilter: "blur(32px) saturate(180%)",
          // Added inner top highlight for 3D realism
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 0 0 1px rgba(255,255,255,0.05), 0 20px 40px -8px rgba(0,0,0,0.5)",
        }}
        transition={SPRING_CONFIG}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {active === "idle" ? (
            <motion.div
              key="idle"
              className="w-full h-full flex items-center justify-center"
            >
              <CompactContent />
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              className="w-full h-full flex items-center"
            >
              <ExpandedContent activeIndex={activeIndex} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}