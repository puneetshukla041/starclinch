"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

// --- Helper Functions ---
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// --- Content Components ---

const CompactContent = () => (
  <motion.div
    layout // Crucial for smooth morphing
    initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
    transition={{ duration: 0.25, ease: "circOut" }}
    className="flex items-center justify-center w-full h-full gap-2 px-3 whitespace-nowrap"
  >
    <div className="w-1.5 h-1.5 bg-[#de4b6f] rounded-full animate-pulse shadow-[0_0_8px_rgba(222,75,111,0.5)] flex-shrink-0" />
    <Star className="w-3.5 h-3.5 text-white/60 flex-shrink-0" />
    <span className="text-[10px] font-bold text-white/90 tracking-widest font-sans uppercase mt-[1px]">
      Book Artist
    </span>
  </motion.div>
);

const ExpandedContent = () => {
  return (
    <motion.div
      layout // Crucial for smooth morphing
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(4px)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex items-center justify-between w-full gap-3 px-2"
    >
      <div className="flex flex-col justify-center pl-2 text-left">
        <span className="text-xs sm:text-sm font-semibold text-white tracking-wide leading-tight">
          Star-studded events
        </span>
        <span className="text-[8px] sm:text-[9px] text-white/50 uppercase tracking-widest mt-0.5 font-semibold">
          100+ Categories Available
        </span>
      </div>

      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // Prevents the island from collapsing
          // Add your modal open logic or booking action here
          console.log("Book Now clicked!"); 
        }}
        layout // Ensures the button slides into place smoothly
        className="flex h-8 sm:h-9 items-center justify-center rounded-full px-4 sm:px-5 text-[10px] font-bold text-white uppercase tracking-wider transition-transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
        style={{
          background: "linear-gradient(90deg, #de4b6f 0%, #be2e57 100%)",
          boxShadow:
            "0px 2px 10px rgba(222, 75, 111, 0.4), inset 0px 1px 0px rgba(255,255,255,0.2)",
          textShadow: "0px 1px 2px rgba(0,0,0,0.2)",
        }}
      >
        Book Now
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

    // Auto-expand after 1 second for attention
    const initialTimer = setTimeout(() => {
      setActive("expanded");
    }, 1000);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY.current) < 15) return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setActive("idle"); // Collapse on scroll down
      } else if (currentScrollY < lastScrollY.current) {
        setActive("expanded"); // Expand on scroll up
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] flex flex-col items-center">
      <motion.div
        layout
        onClick={() => setActive(active === "idle" ? "expanded" : "idle")}
        className={cn(
          "relative overflow-hidden flex items-center justify-center cursor-pointer select-none font-sans",
          active === "expanded"
            ? "min-w-[310px] sm:min-w-[340px] h-[56px] px-2"
            : "w-[140px] h-[36px]"
        )}
        style={{
          borderRadius: active === "expanded" ? "28px" : "20px",
          background: "rgba(14, 12, 17, 0.85)", // Deep dark theme matching Starclinch
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow:
            "0px 10px 40px -10px rgba(0, 0, 0, 0.8), inset 0px 1px 0px rgba(255, 255, 255, 0.05)",
        }}
        // BUTTER PHYSICS
        transition={{
          layout: {
            type: "spring",
            stiffness: 280,
            damping: 24,
            mass: 0.8,
          },
        }}
      >
        <AnimatePresence mode="popLayout">
          {active === "idle" ? (
            <motion.div
              key="idle"
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CompactContent />
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              className="w-full h-full flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ExpandedContent />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}