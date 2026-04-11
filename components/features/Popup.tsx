"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, MapPin, TrendingUp, Zap } from "lucide-react";

// --- Helper Functions ---
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// --- Live Data ---
const LIVE_ARTISTS = [
  {
    name: "Jasmine Sandlas",
    subtext: "Availability near you",
    icon: <MapPin className="w-2.5 h-2.5 text-rose-400" />,
  },
  {
    name: "Karan Aujla",
    subtext: "Trending this week",
    icon: <TrendingUp className="w-2.5 h-2.5 text-orange-400" />,
  },
  {
    name: "Samay Raina",
    subtext: "Filling up fast",
    icon: <Zap className="w-2.5 h-2.5 text-yellow-400" />,
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
    className="flex items-center justify-center w-full h-full gap-2.5 px-4 whitespace-nowrap group"
  >
    <div className="relative flex items-center justify-center">
      <div className="absolute w-2 h-2 bg-green-500 rounded-full animate-ping opacity-40" />
      <div className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.8)] z-10" />
    </div>
    <span className="text-[11px] font-semibold text-white/90 tracking-[0.2em] font-sans uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
      Live Availability
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
      className="flex items-center justify-between w-full gap-2 px-2.5"
    >
      {/* Left side: Premium info with Animated Ticker */}
      <div className="flex flex-col justify-center pl-2 text-left w-[180px] sm:w-[220px] overflow-hidden">
        
        <div className="flex items-center gap-2 mb-1.5">
          <span className="flex h-[18px] items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 text-[8px] font-bold uppercase tracking-widest text-green-400 ring-1 ring-inset ring-green-500/20">
            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
            LIVE
          </span>
        </div>

        {/* The 1.5s Rotating Ticker */}
        <div className="relative h-[28px] w-full">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeIndex}
              initial={{ y: 15, opacity: 0, filter: "blur(2px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -15, opacity: 0, filter: "blur(2px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <span className="text-[13px] sm:text-[15px] font-medium text-white tracking-tight leading-none mb-1 truncate">
                {LIVE_ARTISTS[activeIndex].name}
              </span>
              <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-white/50 uppercase tracking-widest font-medium truncate">
                {LIVE_ARTISTS[activeIndex].icon}
                {LIVE_ARTISTS[activeIndex].subtext}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right side: Button with shimmer effect */}
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          console.log(`Booking initiated for ${LIVE_ARTISTS[activeIndex].name}`); 
        }}
        layout="position"
        className="group relative flex h-9 sm:h-10 shrink-0 items-center justify-center rounded-full pl-5 pr-4 text-[10px] font-bold text-white uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #de4b6f 0%, #be2e57 100%)",
          boxShadow: "0px 4px 15px rgba(222, 75, 111, 0.4), inset 0px 1px 0px rgba(255,255,255,0.2)",
          textShadow: "0px 1px 2px rgba(0,0,0,0.2)",
        }}
      >
        {/* Animated Shimmer Sweep */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
        
        <span className="relative z-10 flex items-center gap-1.5">
          Book Now
          <ChevronRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
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

    // Setup 1.5 second rotation logic
    const rotationInterval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % LIVE_ARTISTS.length);
    }, 1500);

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
    <>
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center">
        <motion.div
          layout
          onClick={() => setActive(active === "idle" ? "expanded" : "idle")}
          className={cn(
            "relative overflow-hidden flex items-center justify-center cursor-pointer select-none font-sans group/island",
            active === "expanded"
              ? "w-[92vw] sm:w-auto sm:min-w-[400px] h-[72px] px-2"
              : "w-[180px] h-[40px]"
          )}
          style={{
            borderRadius: active === "expanded" ? "36px" : "24px",
            background: "rgba(10, 8, 12, 0.85)", 
            backdropFilter: "blur(24px) saturate(200%)",
            WebkitBackdropFilter: "blur(24px) saturate(200%)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 20px 40px -10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
          transition={{
            layout: {
              type: "spring",
              stiffness: 300,
              damping: 26,
              mass: 0.9,
            },
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Subtle Inner Glow on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-rose-500/5 to-transparent opacity-0 group-hover/island:opacity-100 transition-opacity duration-500 pointer-events-none" />

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
    </>
  );
}