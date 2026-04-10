"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ARTISTS = [
  { id: 1, name: "Sara Ali Khan", category: "Actor", stats: "Bollywood", image: "/trending/image1.jpg" },
  { id: 2, name: "Deepika Padukone", category: "Actor", stats: "Global Icon", image: "/trending/image2.jpg" },
  { id: 3, name: "Shahid Kapoor", category: "Actor", stats: "Critically Acclaimed", image: "/trending/image3.jpg" },
  { id: 4, name: "Madhuri Dixit", category: "Actor & Dancer", stats: "Legend", image: "/trending/image4.jpg" },
  { id: 5, name: "Shah Rukh Khan", category: "Actor", stats: "King of Bollywood", image: "/trending/image5.jpg" },
  { id: 6, name: "Nora Fatehi", category: "Dancer & Actor", stats: "Global Sensation", image: "/trending/image6.jpg" },
  { id: 7, name: "Ranbir Kapoor", category: "Actor", stats: "Superstar", image: "/trending/image7.jpg" },
  { id: 8, name: "Aishwarya Rai", category: "Actor", stats: "Miss World", image: "/trending/image8.jpg" },
];

export default function TrendingSection() {
  const [activeTab, setActiveTab] = useState("Photos");
  const [activePage, setActivePage] = useState(0);

  const getShapeStyles = (index: number) => {
    if (index === 0 || index === 2) {
      return "rounded-full border-white/10";
    }
    return "rounded-[2rem] border-white/5";
  };

  return (
    <section className="relative w-full bg-[#050505] py-20 sm:py-32 overflow-hidden min-h-screen flex flex-col items-center">
      
      {/* Cinematic Background Arc */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200vw] md:w-[120vw] lg:w-[90vw] aspect-square rounded-full border-[1px] border-rose-500/10 bg-gradient-to-b from-rose-950/5 to-transparent pointer-events-none z-0" />

      {/* Premium Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* UPDATED: Subtle Fading White Framing Arc - Adjusted position and mask */}
      <div 
        className="absolute top-[10%] sm:top-[5%] left-1/2 -translate-x-1/2 w-[160vw] md:w-[140vw] lg:w-[1600px] aspect-square rounded-full border-[1px] border-white/30 pointer-events-none z-0"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 35%)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 35%)",
        }}
      />

      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-6 relative z-10 flex flex-col items-center">
        
        {/* UI/UX Contextual Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 flex flex-col items-center"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
            Discover Top <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Artists</span>
          </h2>
        </motion.div>

        {/* Floating Pill Toggle */}
        <div className="relative flex bg-[#111113] p-1.5 rounded-full mb-12 sm:mb-16 border border-white/5 shadow-2xl">
          {["Photos", "Videos"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative cursor-pointer px-8 py-2.5 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-colors duration-300 z-10 ${
                activeTab === tab ? "text-black" : "text-neutral-400 hover:text-white"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-white rounded-full -z-10 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* Premium Image Grid */}
        <motion.div 
          key={activePage}
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full max-w-[1100px]"
        >
          {ARTISTS.map((artist, index) => {
            const isCircle = index === 0 || index === 2;

            return (
              <motion.div 
                key={artist.id} 
                whileHover="hover"
                initial="initial"
                className={`relative aspect-square w-full overflow-hidden bg-[#0A0A0C] border shadow-2xl group cursor-pointer ${
                  isCircle ? "rounded-full border-white/10" : "rounded-3xl sm:rounded-[2rem] border-white/5"
                }`}
              >
                {/* Image with smooth scale */}
                <motion.div 
                  className="w-full h-full relative"
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.08 }
                  }}
                  transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                >
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-top"
                  />
                </motion.div>
                
                {/* Permanent Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 ease-out z-10" />
                
                {/* Responsive Padding - Slightly reduced to match smaller text */}
                <div className={`absolute inset-x-0 bottom-0 flex flex-col justify-end z-20 transition-transform duration-500 ease-out group-hover:-translate-y-1 ${
                  isCircle 
                    ? "px-4 pb-5 sm:px-6 sm:pb-10 lg:pb-12 items-center text-center" 
                    : "p-4 sm:p-5 lg:p-6 items-start text-left"
                }`}>
                  
                  {/* Category & Icon Row */}
                  <div className={`flex items-center mb-1 sm:mb-1.5 ${isCircle ? "justify-center gap-1.5" : "justify-between w-full"}`}>
                    <p className="text-rose-400 font-semibold tracking-wide text-[8px] sm:text-[9px] md:text-[10px] uppercase">
                      {artist.category}
                    </p>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black shrink-0">
                      <ArrowUpRight className="w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3" />
                    </div>
                  </div>

                  {/* Name Text - Scaled down */}
                  <h3 className="text-white text-sm sm:text-base md:text-lg font-medium tracking-tight mb-0.5 line-clamp-1">
                    {artist.name}
                  </h3>
                  
                  {/* Stats Text - Scaled down */}
                  <p className="text-neutral-400 text-[8px] sm:text-[9px] md:text-xs font-light opacity-90 line-clamp-1">
                    {artist.stats}
                  </p>

                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Dynamic Pagination Dashes */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mt-16 sm:mt-20">
          {[0, 1, 2, 3].map((pageIdx) => (
            <button
              key={pageIdx}
              onClick={() => setActivePage(pageIdx)}
              className="relative group p-2 cursor-pointer"
              aria-label={`Go to page ${pageIdx + 1}`}
            >
              <div className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                activePage === pageIdx 
                  ? "w-10 sm:w-12 bg-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.5)]" 
                  : "w-5 sm:w-6 bg-white/20 group-hover:bg-white/40 group-hover:w-7 sm:group-hover:w-8"
              }`} />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}