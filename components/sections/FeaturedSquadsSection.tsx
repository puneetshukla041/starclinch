"use client";

import Image from "next/image";
import { motion } from "framer-motion";


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


function RotateCard({ src, alt, rotationAmount }: { src: string; alt: string; rotationAmount: number }) {
  return (
    <div className="w-full max-w-[340px] md:max-w-[380px] aspect-[1/1.05] mx-auto">
      <motion.div
        
        whileHover={{ scale: 1.03, rotate: rotationAmount }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] cursor-pointer bg-[#0A0A0C]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 90vw, 400px"
          className="object-cover"
        />
        
        {}
        <div className="absolute inset-0 z-20 rounded-3xl border border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none" />
      </motion.div>
    </div>
  );
}

export default function SquadSection() {
  return (
    <section className="relative w-full bg-[#050505] py-24 md:py-32 overflow-hidden selection:bg-rose-500/30">
      
      {}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-center items-center">
        <div className="w-[150%] max-w-[1500px] h-[150%] absolute top-[5%] opacity-10 blur-[1px]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full stroke-[#ffffff] stroke-[0.5] fill-none">
             <path d="M-10,20 Q30,60 50,40 T110,70" />
             <path d="M-10,70 Q40,100 60,80 T110,110" />
          </svg>
        </div>
      </div>

      <div className="w-full max-w-[1000px] mx-auto px-6 relative z-10 flex flex-col gap-24 md:gap-32">
        
        {}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 md:mb-8"
        >
          <p className="text-rose-400 font-medium tracking-[0.2em] text-[10px] md:text-xs uppercase mb-3">Behind The Magic</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight">
            The Starclinch <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Experience</span>
          </h2>
        </motion.div>

        {SQUADS_DATA.map((item, index) => {
          
          const isEven = index % 2 === 0;

          return (
            <div 
              key={item.id} 
              
              className={`flex flex-col items-center justify-between gap-10 md:gap-16 ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              
              {}
              <motion.div 
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left`}
              >
                <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-rose-300/80 text-[10px] font-semibold tracking-widest uppercase mb-6 backdrop-blur-sm">
                  {item.tag}
                </span>
                
                <h3 className="text-2xl sm:text-3xl md:text-[2rem] font-light text-gray-100 leading-tight tracking-wide mb-4">
                  {item.title}
                </h3>
                
                <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed max-w-[320px] md:max-w-[380px]">
                  {item.description}
                </p>
              </motion.div>

              {}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="w-full md:w-1/2 flex justify-center"
              >
                {}
                <RotateCard 
                  src={item.image} 
                  alt={item.title} 
                  rotationAmount={isEven ? 4 : -4} 
                />
              </motion.div>

            </div>
          );
        })}
      </div>
    </section>
  );
}