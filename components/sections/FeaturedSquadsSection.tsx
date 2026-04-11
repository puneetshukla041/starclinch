"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const SQUADS_DATA = [
  {
    id: 1,
    tag: "01 // BACKSTAGE",
    title: "The Artists' Lounge",
    description: "Unfiltered moments and raw energy before the curtain rises. This is where legends prep for the spotlight.",
    image: "/trending/image1.jpg",
  },
  {
    id: 2,
    tag: "02 // CURATION",
    title: "Handpicked Squads",
    description: "Discover specialized talent pools tailored for exclusive events, massive arenas, and intimate, soulful gigs.",
    image: "/trending/image2.jpg",
  },
  {
    id: 3,
    tag: "03 // INNOVATION",
    title: "Crafting the Vibe",
    description: "Brainstorming the next big stage feature. We merge cutting-edge technology with pure live entertainment.",
    image: "/trending/image3.jpg",
  },
  {
    id: 4,
    tag: "04 // COMMUNITY",
    title: "Celebrating Milestones",
    description: "Every sold-out show and standing ovation is a massive win we celebrate together as a creative family.",
    image: "/trending/image4.jpg",
  },
];

// --- Next-Level Parallax Card ---
function PremiumCard({ src, alt, rotationAmount }: { src: string; alt: string; rotationAmount: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Create a parallax effect for the image inside the card based on scroll
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  
  // Image moves slightly slower than the scroll for a deep 3D effect
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={cardRef} className="relative w-full max-w-[340px] md:max-w-[420px] aspect-[4/5] mx-auto group perspective-[1000px]">
      {/* Ambient background glow that intensifies on hover */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-rose-500/20 to-orange-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <motion.div
        whileHover={{ scale: 1.02, rotateY: rotationAmount, rotateX: -2 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] cursor-pointer bg-[#0A0A0C]"
      >
        <motion.div style={{ y: imageY }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 90vw, 420px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
        
        {/* Premium Inner Ring & Vignette */}
        <div className="absolute inset-0 z-20 rounded-3xl border border-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
      </motion.div>
    </div>
  );
}

export default function SquadSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress for the central timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#050505] pt-24 pb-32 md:pt-32 md:pb-48 overflow-hidden selection:bg-rose-500/30 font-sans"
    >
      {/* Background Noise Filter */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Abstract Background Topographic Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-center items-center opacity-20">
        <div className="w-[150%] max-w-[1500px] h-[150%] absolute top-[5%] blur-[2px]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full stroke-white/20 stroke-[0.2] fill-none">
             <path d="M-10,20 Q30,60 50,40 T110,70" />
             <path d="M-10,40 Q40,80 60,60 T110,90" />
             <path d="M-10,70 Q40,100 60,80 T110,110" />
          </svg>
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24 md:mb-40"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-rose-500" />
            <p className="text-rose-400 font-semibold tracking-[0.3em] text-[10px] md:text-xs uppercase">Behind The Magic</p>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-rose-500" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-white tracking-tighter leading-tight">
            The Starclinch <br className="hidden md:block" />
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400">Experience</span>
          </h2>
        </motion.div>

        {/* --- The Guided Timeline Container --- */}
        <div className="relative">
          
          {/* Static Background Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2 rounded-full" />
          
          {/* Animated Glowing Fill Line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-rose-500 via-orange-400 to-rose-500 -translate-x-1/2 rounded-full origin-top shadow-[0_0_15px_rgba(244,63,94,0.6)] z-20" 
          />

          <div className="flex flex-col gap-20 md:gap-32">
            {SQUADS_DATA.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={item.id} 
                  className={`relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20 ${
                    isEven ? "" : "md:flex-row-reverse"
                  }`}
                >
                  
                  {/* Timeline Node (The glowing dot on the line) */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, margin: "-50% 0px -50% 0px" }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-[28px] md:left-1/2 w-4 h-4 rounded-full border-[4px] border-[#050505] bg-rose-500 -translate-x-1/2 z-30 shadow-[0_0_20px_rgba(244,63,94,0.8)]"
                  />

                  {/* Text Content */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50, filter: "blur(5px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full md:w-[45%] flex flex-col items-start text-left pl-20 md:pl-0 ${
                      isEven ? "md:items-end md:text-right md:pr-16" : "md:items-start md:text-left md:pl-16"
                    }`}
                  >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/70 text-[10px] font-semibold tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg">
                      {item.tag}
                    </div>
                    
                    <h3 className="text-3xl sm:text-4xl md:text-[2.5rem] font-medium text-white leading-tight tracking-tight mb-6">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed max-w-[340px] md:max-w-[400px]">
                      {item.description}
                    </p>
                  </motion.div>

                  {/* Image Content */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className={`w-full md:w-[45%] flex justify-center pl-16 md:pl-0 ${
                      isEven ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    <PremiumCard 
                      src={item.image} 
                      alt={item.title} 
                      rotationAmount={isEven ? 5 : -5} 
                    />
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}