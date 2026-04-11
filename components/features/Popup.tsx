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

// --- Content Components ---

const CompactContent = () => (
  <motion.div
    layout="position"
    initial={{ opacity: 0, scale: 0.8, y: 5 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.8, y: -5 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="flex items-center justify-center w-full h-full gap-3 px-4 whitespace-nowrap"
  >
    {/* Soft, elegant dot indicator */}
    <div className="w-1.5 h-1.5 bg-rose-400/80 rounded-full shadow-[0_0_8px_rgba(251,113,133,0.5)]" />
    <span className="text-[11px] font-medium text-white/80 tracking-[0.15em] font-sans uppercase">
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
      exit={{ opacity: 0, filter: "blur(4px)" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center justify-between w-full gap-2 px-2"
    >
      {/* Left side: Elegant Animated Ticker */}
      <div className="flex flex-col justify-center pl-3 text-left w-[200px] sm:w-[240px] overflow-hidden">
        
        {/* Soft "Trending" label instead of loud LIVE badge */}
        <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-rose-300/80 mb-1">
          Trending Artists
        </span>

        {/* The 2.0s Rotating Ticker */}
        <div className="relative h-[32px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <span className="text-[14px] sm:text-[15px] font-medium text-white tracking-tight leading-none mb-1 truncate">
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
        className="group relative flex h-10 shrink-0 items-center justify-center rounded-[20px] px-5 text-[11px] font-medium text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap bg-white/10 hover:bg-white/15 border border-white/5"
      >
        <span className="relative z-10 flex items-center gap-2">
          Inquire
          <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
  const lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);

    // Initial expansion
    const initialTimer = setTimeout(() => {
      setActive("expanded");
    }, 1200);

    // Setup 2.0 second rotation logic
    const rotationInterval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURED_ARTISTS.length);
    }, 2000);

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

    return () => {
      clearTimeout(initialTimer);
      clearInterval(rotationInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80] flex flex-col items-center">
      <motion.div
        layout
        onClick={() => setActive(active === "idle" ? "expanded" : "idle")}
        className={cn(
          "relative overflow-hidden flex items-center justify-center cursor-pointer select-none font-sans group/island",
          active === "expanded"
            ? "w-[92vw] sm:w-auto sm:min-w-[380px] h-[68px] px-2"
            : "w-[150px] h-[44px]"
        )}
        style={{
          borderRadius: active === "expanded" ? "34px" : "22px",
          background: "rgba(18, 16, 22, 0.65)", // Softer, more transparent dark glass
          backdropFilter: "blur(24px) saturate(150%)",
          WebkitBackdropFilter: "blur(24px) saturate(150%)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 16px 32px -8px rgba(0,0,0,0.4)",
        }}
        transition={{
          layout: {
            type: "spring",
            stiffness: 300,
            damping: 28, // Slightly softer damping for a gentler bounce
            mass: 0.9,
          },
        }}
        whileHover={{ scale: 1.01 }}
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