"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation, useMotionValue } from "framer-motion";
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
        stiffness: 200, 
        damping: 30,
        mass: 0.8
      }
    });
  };

  return (
    <section className="relative w-full min-h-[100svh] bg-[#030303] overflow-hidden flex flex-col items-center justify-center py-20 md:py-32 font-sans selection:bg-white/20">
      
      {}
      
      {}
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

      {}
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

      {}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        
        {}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <div className="w-12 h-[1px] bg-white/20 mb-6 hidden md:block" />
          <h2 className="text-3xl sm:text-4xl md:text-[3.25rem] font-light text-white leading-[1.1] tracking-tight drop-shadow-2xl">
            Recent shows made star- <br className="hidden sm:block" />
            studded via <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">StarClinch</span>
          </h2>
        </motion.div>

        {}
        <div className="relative w-full max-w-[1000px] flex items-center justify-between gap-2 sm:gap-6 lg:gap-10">
          
          {}
          <button 
            onClick={() => slideTo(activeIndex - 1)}
            className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#111111]/90 backdrop-blur-xl hover:bg-white hover:text-black border border-white/10 flex items-center justify-center text-white/60 transition-all duration-400 z-20 cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 group"
            aria-label="Previous Show"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 -ml-0.5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {}
          <div className="relative w-full flex-1 overflow-hidden rounded-3xl min-h-[450px] sm:min-h-[500px]">
            {}
            <motion.div 
              ref={trackRef}
              animate={controls}
              initial={{ x: 0 }}
              className="absolute top-0 left-0 h-full w-full flex"
            >
              {SHOWS_DATA.map((show, index) => {
                const isCurrent = index === activeIndex;
                
                return (
                  <div 
                    key={show.id}
                    
                    className="w-full h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 px-2 sm:px-4"
                  >
                    
                    {}
                    <motion.div 
                      
                      animate={{ 
                        scale: isCurrent ? 1 : 0.9,
                        opacity: isCurrent ? 1 : 0.4 
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="relative w-[240px] h-[300px] sm:w-[320px] sm:h-[400px] md:w-[360px] md:h-[460px] shrink-0 group"
                    >
                      {}
                      <div className={`absolute inset-0 rounded-[200px_200px_24px_24px] bg-white/5 blur-[50px] transform scale-110 transition-opacity duration-700 ${isCurrent ? 'opacity-100' : 'opacity-0'}`} />
                      
                      {}
                      <div className="relative w-full h-full rounded-[200px_200px_24px_24px] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] bg-[#111]">
                        <Image
                          src={show.image}
                          alt={show.highlight1}
                          fill
                          className="object-cover object-top transition-transform duration-[10s] group-hover:scale-110"
                          sizes="(max-width: 768px) 320px, 380px"
                          priority={isCurrent}
                        />
                        {}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/90 via-transparent to-transparent opacity-60" />
                      </div>
                    </motion.div>

                    {}
                    <motion.div 
                      animate={{ 
                        x: isCurrent ? 0 : 40,
                        opacity: isCurrent ? 1 : 0
                      }}
                      transition={{ duration: 0.6, delay: isCurrent ? 0.1 : 0, ease: "easeOut" }}
                      className="flex flex-col text-center md:text-left max-w-[300px] sm:max-w-[360px]"
                    >
                      <h3 className="text-2xl sm:text-3xl md:text-[34px] font-light leading-[1.3] md:leading-[1.4] text-[#666666] tracking-tight">
                        <span className="font-normal text-white">{show.highlight1}</span>{" "}
                        {show.grayText}{" "}
                        <span className="font-normal text-white">{show.highlight2}</span>
                      </h3>
                      
                      <div className="flex items-center justify-center md:justify-start gap-3 mt-6 sm:mt-8 text-[#888888] text-[11px] sm:text-xs font-medium uppercase tracking-widest">
                        <Calendar className="w-3.5 h-3.5 opacity-70" />
                        <span>{show.date}</span>
                      </div>
                    </motion.div>

                  </div>
                );
              })}
            </motion.div>
          </div>

          {}
          <button 
            onClick={() => slideTo(activeIndex + 1)}
            className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#111111]/90 backdrop-blur-xl hover:bg-white hover:text-black border border-white/10 flex items-center justify-center text-white/60 transition-all duration-400 z-20 cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 group"
            aria-label="Next Show"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5 transition-transform group-hover:translate-x-0.5" />
          </button>

        </div>
      </div>
    </section>
  );
}