"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const SHOWS_DATA = [
  {
    id: 1,
    highlight1: "Nora Fatehi",
    grayText: "for an event hosted by XYZ performed",
    highlight2: "at Pune.",
    date: "14 March 2023",
    image: "/perform/nora.webp",
  },
  {
    id: 2,
    highlight1: "Kapil Sharma",
    grayText: "hosted by XYZ performed",
    highlight2: "at Pune.",
    date: "14 March 2023",
    image: "/perform/kapil.jpg",
  },
  {
    id: 3,
    highlight1: "Zakir Khan",
    grayText: "for an event hosted",
    highlight2: "at Pune for Meesho.",
    date: "14 March 2023",
    image: "/perform/zakhir.avif",
  }
];

export default function RecentShowsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();
  const trackRef = useRef<HTMLDivElement>(null);
  
  const slideTo = async (index: number) => {
    let newIndex = index;
    
    if (newIndex < 0) newIndex = SHOWS_DATA.length - 1;
    if (newIndex >= SHOWS_DATA.length) newIndex = 0;
    
    setActiveIndex(newIndex);
    
    await controls.start({
      x: `-${newIndex * 100}%`,
      transition: { 
        type: "spring", 
        stiffness: 250, 
        damping: 35,
        mass: 0.8
      }
    });
  };

  return (
    <section className="relative w-full min-h-[100svh] bg-[#030303] overflow-hidden flex flex-col items-center justify-center py-20 md:py-32 font-sans selection:bg-white/20">
      
      {/* Top Ticker */}
      <div className="absolute top-[5%] sm:top-[10%] left-[-30%] sm:left-[-15%] w-[150vw] sm:w-[100vw] origin-center -rotate-[35deg] bg-gradient-to-r from-transparent via-[#0f0f0f] to-transparent border-y border-white/5 py-2.5 z-0">
        <motion.div 
          className="flex whitespace-nowrap text-[10px] sm:text-[11px] tracking-[0.3em] text-white/30 font-medium uppercase"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {Array(20).fill("HEADLIGHTS OF TODAY ★ ").map((text, i) => (
            <span key={i} className="px-4">{text}</span>
          ))}
        </motion.div>
      </div>

      {/* Bottom Ticker */}
      <div className="absolute bottom-[5%] sm:bottom-[10%] right-[-30%] sm:right-[-15%] w-[150vw] sm:w-[100vw] origin-center -rotate-[35deg] bg-gradient-to-r from-transparent via-[#0f0f0f] to-transparent border-y border-white/5 py-2.5 z-0">
        <motion.div 
          className="flex whitespace-nowrap text-[10px] sm:text-[11px] tracking-[0.3em] text-white/30 font-medium uppercase"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {Array(20).fill("HEADLIGHTS OF TODAY ★ ").map((text, i) => (
            <span key={i} className="px-4">{text}</span>
          ))}
        </motion.div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-24 flex flex-col items-center"
        >
          <div className="w-12 h-[1px] bg-white/20 mb-6 hidden md:block" />
          <h2 className="text-3xl sm:text-4xl md:text-[3.25rem] font-light text-white leading-[1.2] md:leading-[1.1] tracking-tight drop-shadow-2xl">
            Recent shows made star- <br className="hidden sm:block" />
            studded via <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">StarClinch</span>
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-[900px]">
          
          {/* Main Slide Window */}
          <div className="relative w-full overflow-hidden rounded-3xl pb-4">
            <motion.div 
              ref={trackRef}
              animate={controls}
              initial={{ x: 0 }}
              className="flex w-full cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x > 100) slideTo(activeIndex - 1);
                else if (info.offset.x < -100) slideTo(activeIndex + 1);
                else slideTo(activeIndex); // Snap back if drag wasn't far enough
              }}
            >
              {SHOWS_DATA.map((show, index) => {
                const isCurrent = index === activeIndex;
                
                return (
                  <div 
                    key={show.id}
                    className="w-full flex-shrink-0 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 lg:gap-16 px-4"
                  >
                    
                    {/* Image Card */}
                    <motion.div 
                      animate={{ 
                        scale: isCurrent ? 1 : 0.9,
                        opacity: isCurrent ? 1 : 0.4 
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="relative w-[75vw] max-w-[280px] h-[340px] sm:max-w-[320px] sm:h-[400px] md:max-w-[360px] md:h-[460px] shrink-0 group"
                    >
                      <div className={`absolute inset-0 rounded-[140px_140px_24px_24px] md:rounded-[200px_200px_24px_24px] bg-white/5 blur-[40px] transform scale-110 transition-opacity duration-700 ${isCurrent ? 'opacity-100' : 'opacity-0'}`} />
                      
                      <div className="relative w-full h-full rounded-[140px_140px_24px_24px] md:rounded-[200px_200px_24px_24px] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] bg-[#111]">
                        <Image
                          src={show.image}
                          alt={show.highlight1}
                          fill
                          className="object-cover object-top transition-transform duration-[10s] group-hover:scale-110 pointer-events-none"
                          sizes="(max-width: 768px) 75vw, 360px"
                          priority={isCurrent}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/90 via-transparent to-transparent opacity-60" />
                      </div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div 
                      animate={{ 
                        x: isCurrent ? 0 : 30,
                        opacity: isCurrent ? 1 : 0
                      }}
                      transition={{ duration: 0.6, delay: isCurrent ? 0.1 : 0, ease: "easeOut" }}
                      className="flex flex-col text-center md:text-left max-w-[320px] sm:max-w-[360px]"
                    >
                      <h3 className="text-[22px] sm:text-3xl md:text-[34px] font-light leading-[1.3] md:leading-[1.4] text-[#666666] tracking-tight">
                        <span className="font-normal text-white">{show.highlight1}</span>{" "}
                        {show.grayText}{" "}
                        <span className="font-normal text-white">{show.highlight2}</span>
                      </h3>
                      
                      <div className="flex items-center justify-center md:justify-start gap-3 mt-5 sm:mt-8 text-[#888888] text-[10px] sm:text-[11px] font-medium uppercase tracking-widest">
                        <Calendar className="w-3.5 h-3.5 opacity-70" />
                        <span>{show.date}</span>
                      </div>
                    </motion.div>

                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Navigation Controls (Responsive Positioning) */}
          <div className="flex items-center justify-center gap-4 mt-8 md:mt-0 md:absolute md:top-1/2 md:-translate-y-1/2 md:w-[115%] md:left-[-7.5%] md:justify-between z-20 pointer-events-none">
            
            <button 
              onClick={() => slideTo(activeIndex - 1)}
              className="pointer-events-auto shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#111111]/90 backdrop-blur-xl hover:bg-white hover:text-black border border-white/10 flex items-center justify-center text-white/60 transition-all duration-400 cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 group"
              aria-label="Previous Show"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 -ml-0.5 transition-transform group-hover:-translate-x-0.5" />
            </button>

            <button 
              onClick={() => slideTo(activeIndex + 1)}
              className="pointer-events-auto shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#111111]/90 backdrop-blur-xl hover:bg-white hover:text-black border border-white/10 flex items-center justify-center text-white/60 transition-all duration-400 cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 group"
              aria-label="Next Show"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5 transition-transform group-hover:translate-x-0.5" />
            </button>
            
          </div>
        </div>
      </div>
    </section>
  );
}