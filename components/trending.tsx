"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Exact imports as requested
const ARTISTS = [
  { id: 1, name: "Zakir Khan", category: "Stand-up Comedian", image: "/trending/image1.jpg" },
  { id: 2, name: "Arijit Singh", category: "Playback Singer", image: "/trending/image2.jpg" },
  { id: 3, name: "Nora Fatehi", category: "Dancer & Actor", image: "/trending/image3.jpg" },
  { id: 4, name: "Sunidhi Chauhan", category: "Vocalist", image: "/trending/image4.jpg" },
  { id: 5, name: "Anubhav Singh Bassi", category: "Comedian", image: "/trending/image5.jpg" },
  { id: 6, name: "Divine", category: "DJ & Producer", image: "/trending/image6.jpg" },
  { id: 7, name: "Badshah", category: "Rapper", image: "/trending/image7.jpg" },
  { id: 8, name: "Neeti Mohan", category: "Live Performer", image: "/trending/image8.jpg" },
];

export default function TrendingSection() {
  const [activeTab, setActiveTab] = useState("Photos");
  const [activePage, setActivePage] = useState(0);

  // Helper to match the exact alternating shapes seen in your screenshot
  const getShapeStyles = (index: number) => {
    // In your video/screenshot, the 1st and 3rd images (index 0 and 2) are circles
    if (index === 0 || index === 2) {
      return "rounded-full";
    }
    // The rest are rounded squares
    return "rounded-3xl";
  };

  return (
    <section className="relative w-full bg-[#050508] py-20 overflow-hidden min-h-screen flex flex-col items-center">
      
      {/* 1. The Faint Background Arc from the video */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[200vw] md:w-[120vw] lg:w-[90vw] aspect-square rounded-full border-[1px] border-white/5 pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* 2. "Photos / Videos" Pill Toggle */}
        <div className="flex bg-white/5 p-1.5 rounded-full mb-16 border border-white/10 backdrop-blur-md">
          <button 
            onClick={() => setActiveTab("Photos")}
            className={`px-8 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
              activeTab === "Photos" 
                ? "bg-white text-black shadow-md" 
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Photos
          </button>
          <button 
            onClick={() => setActiveTab("Videos")}
            className={`px-8 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
              activeTab === "Videos" 
                ? "bg-white text-black shadow-md" 
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Videos
          </button>
        </div>

        {/* 3. The 8-Image Grid Layout (No text) */}
        <motion.div 
          key={activePage} // Re-animates if you add more pages later
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-[1000px]"
        >
          {ARTISTS.map((artist, index) => (
            <div 
              key={artist.id} 
              className={`relative aspect-square w-full overflow-hidden bg-[#111] border border-white/5 group cursor-pointer ${getShapeStyles(index)}`}
            >
              <Image
                src={artist.image}
                alt={artist.name} // Keeps it accessible for screen readers, but no text is shown visually
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Optional: Subtle hover overlay just to make it feel interactive */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </motion.div>

        {/* 4. The Premium Pagination Dashes */}
        <div className="flex items-center justify-center gap-2.5 mt-16">
          {[0, 1, 2, 3].map((pageIdx) => (
            <button
              key={pageIdx}
              onClick={() => setActivePage(pageIdx)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                activePage === pageIdx 
                  ? "w-10 bg-white" // Active: Long & White
                  : "w-5 bg-white/20 hover:bg-white/40" // Inactive: Short & Gray
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}