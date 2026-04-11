"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, ChevronRight } from "lucide-react";

// --- Helper Functions ---
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

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
      <div className="absolute w-2 h-2 bg-rose-500 rounded-full animate-ping opacity-40" />
      <div className="w-1.5 h-1.5 bg-gradient-to-r from-rose-400 to-orange-400 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.8)] z-10" />
    </div>
    <span className="text-[11px] font-semibold text-white/90 tracking-[0.2em] font-sans uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
      Book Talent
    </span>
  </motion.div>
);

const ExpandedContent = () => {
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center justify-between w-full gap-4 px-2.5"
    >
      {/* Left side: Premium info with badges */}
      <div className="flex flex-col justify-center pl-2 text-left">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="flex h-[18px] items-center rounded-full bg-rose-500/10 px-2.5 text-[8px] font-bold uppercase tracking-widest text-rose-400 ring-1 ring-inset ring-rose-500/20">
            Premium
          </span>
          <div className="flex items-center text-[10px] text-white/50 font-medium tracking-wide">
            <Star className="w-3 h-3 text-orange-400 fill-orange-400 mr-1 shadow-orange-500/50" /> 
            4.9/5
          </div>
        </div>
        <span className="text-[13px] sm:text-[15px] font-medium text-white tracking-tight leading-none mb-0.5">
          Curate your dream event
        </span>
        <span className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest font-medium">
          Access 100+ Elite Categories
        </span>
      </div>

      {/* Right side: Button with shimmer effect */}
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          console.log("Book Now clicked!"); 
        }}
        layout="position"
        className="group relative flex h-9 sm:h-10 items-center justify-center rounded-full pl-5 pr-4 text-[10px] font-bold text-white uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap overflow-hidden"
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
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);

    const initialTimer = setTimeout(() => {
      setActive("expanded");
    }, 1200);

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
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Global Style for the Shimmer Animation */}
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
              ? "min-w-[340px] sm:min-w-[380px] h-[68px] px-2"
              : "w-[160px] h-[40px]"
          )}
          style={{
            borderRadius: active === "expanded" ? "34px" : "24px",
            background: "rgba(10, 8, 12, 0.75)", 
            backdropFilter: "blur(24px) saturate(200%)",
            WebkitBackdropFilter: "blur(24px) saturate(200%)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 20px 40px -10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
          // Premium Apple-style spring physics
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
                <ExpandedContent />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}