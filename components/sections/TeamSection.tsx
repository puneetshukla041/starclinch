"use client";

import React, { useState } from 'react';
import { Inter, Caveat } from 'next/font/google';
import { motion } from 'framer-motion';


const inter = Inter({ subsets: ['latin'] });
const caveat = Caveat({ subsets: ['latin'], weight: '700' });


const bottomTags = [
  { text: 'Focused', rotate: -10, yOffset: 10 },
  { text: 'Collaborative', rotate: -5, yOffset: 5 },
  { text: 'United', rotate: -2, yOffset: 8 },
  { text: 'Vibrant', rotate: 2, yOffset: 2 },
  { text: 'Dynamic', rotate: 5, yOffset: 6 },
  { text: 'Motivated', rotate: 10, yOffset: 12 },
];

export default function TeamSection() {
  
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <section className={`relative min-h-[90vh] bg-[#0a060d] flex items-center justify-center overflow-hidden ${inter.className} py-20`}>
      
      {}
      {}
      <div className="absolute -bottom-[10%] -left-[10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-[radial-gradient(circle,_rgba(102,28,68,0.4)_0%,_rgba(0,0,0,0)_70%)] pointer-events-none blur-[60px]" />
      {}
      <div className="absolute -top-[10%] -right-[5%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,_rgba(128,35,85,0.3)_0%,_rgba(0,0,0,0)_70%)] pointer-events-none blur-[60px]" />

      {}
      <div className="relative w-[92%] max-w-[1100px] aspect-auto min-h-[450px] md:min-h-[500px] my-10 rounded-[3rem] md:rounded-[120px] border border-white/10 bg-white/[0.03] shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] backdrop-blur-2xl flex flex-col items-center justify-center text-center px-4 pt-24 pb-32 sm:p-8 md:p-12 z-10">
        
        {}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] md:top-[30%] left-[8%] md:left-[18%] px-5 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-gray-300 text-xs md:text-sm -rotate-[12deg] shadow-xl z-20"
        >
          Fun
        </motion.div>

        {}
        <motion.div 
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] md:top-[25%] right-[8%] md:right-[20%] px-5 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-gray-300 text-xs md:text-sm rotate-[8deg] shadow-xl z-20"
        >
          Inclusive
        </motion.div>

        {}
        <div className="relative flex flex-col items-center justify-center mt-4 md:mt-0 z-30 w-full">
          
          {}
          <motion.div 
            animate={{ 
              rotate: isButtonHovered ? -14 : -10, 
              scale: isButtonHovered ? 1.08 : 1,
              y: isButtonHovered ? -4 : 0
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="absolute -top-12 md:-top-16 left-0 sm:left-4 md:left-8 flex items-end origin-bottom-left"
          >
            <span className={`${caveat.className} text-[#f0567e] text-2xl md:text-3xl lg:text-4xl mr-2 whitespace-nowrap tracking-wide`}>
              We are the team of
            </span>
            {}
            <svg 
              width="35" 
              height="35" 
              viewBox="0 0 40 40" 
              fill="none" 
              stroke="#f0567e" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="translate-y-2 md:translate-y-4 rotate-[20deg]"
            >
              <motion.path 
                d="M5 5 Q 30 5 35 25 M 25 20 L 35 25 L 28 35" 
                animate={{ pathLength: isButtonHovered ? [0, 1] : 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </svg>
          </motion.div>

          {}
          <h1 className="text-4xl sm:text-5xl md:text-[64px] font-medium text-white tracking-tight leading-tight md:leading-none z-10 w-full px-2">
            20+Talented Folks
          </h1>
          
          {}
          <p className="mt-5 md:mt-6 text-[#a1a1aa] max-w-[90%] md:max-w-lg leading-relaxed text-sm md:text-[15px] z-10 font-light">
            From passion-driven dedication to impactful contribution,<br className="hidden md:block" />
            we do it all here. We are growing and will be excited to hear<br className="hidden md:block" />
            from you !
          </p>

          {}
          <button 
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="group mt-10 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#e45a72] to-[#b32b53] text-white text-[15px] font-medium hover:scale-105 hover:shadow-[0_0_30px_rgba(228,90,114,0.4)] transition-all duration-300 z-20 flex items-center gap-2 cursor-pointer active:scale-95"
          >
            Join our team
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {}
        <div className="absolute bottom-6 md:bottom-8 left-0 right-0 mx-auto w-full max-w-[95%] md:max-w-[800px] flex justify-center items-end flex-wrap md:flex-nowrap gap-2 md:gap-4 px-4 z-20 pointer-events-none">
          {bottomTags.map((tag, index) => (
            <motion.div 
              key={index}
              animate={{ y: [tag.yOffset, tag.yOffset - 8, tag.yOffset] }}
              transition={{ 
                duration: 4 + (index % 3), 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: index * 0.2
              }}
              className="px-4 py-1.5 rounded-full border border-white/[0.08] bg-black/50 backdrop-blur-sm text-gray-400 text-[10px] md:text-[11px] font-medium shadow-xl tracking-wide"
              style={{ rotate: tag.rotate }}
            >
              {tag.text}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}