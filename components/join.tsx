import React from 'react';
import { Inter, Caveat } from 'next/font/google';

// Initialize fonts
const inter = Inter({ subsets: ['latin'] });
const caveat = Caveat({ subsets: ['latin'], weight: '700' });

const bottomTags = [
  { text: 'Focused', rotate: '-rotate-[10deg]', delay: 'delay-[0ms]' },
  { text: 'Collaborative', rotate: '-rotate-[5deg]', delay: 'delay-[75ms]' },
  { text: 'United', rotate: '-rotate-[2deg]', delay: 'delay-[150ms]' },
  { text: 'Vibrant', rotate: 'rotate-[2deg]', delay: 'delay-[225ms]' },
  { text: 'Dynamic', rotate: 'rotate-[5deg]', delay: 'delay-[300ms]' },
  { text: 'Motivated', rotate: 'rotate-[10deg]', delay: 'delay-[375ms]' },
];

export default function TeamSection() {
  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(var(--tw-rotate)); }
          50% { transform: translateY(-12px) rotate(var(--tw-rotate)); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 5s ease-in-out infinite 1.5s;
        }
      `}</style>

      <section 
        className={`relative min-h-screen bg-[#09070c] flex items-center justify-center overflow-hidden ${inter.className}`}
      >
        {/* Background Shapes */}
        {/* Only the bottom-left glow is kept. Top-right glow is removed for seamless blending. */}
        <div className="absolute -bottom-[20%] -left-[10%] w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tr from-[#160811] to-[#311326] pointer-events-none blur-[80px] md:blur-[120px]" />

        {/* Main Glassmorphism Container (Added 'group' for hover effects) */}
        <div className="group relative w-[92%] max-w-[1050px] aspect-auto min-h-[450px] md:min-h-[500px] my-10 rounded-[3rem] md:rounded-[250px] border border-white/[0.15] bg-white/[0.02] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-xl flex flex-col items-center justify-center text-center p-8 md:p-12 z-10 overflow-hidden">
          
          {/* Floating Top Tags */}
          <div className="absolute top-[30%] left-[8%] md:left-[15%] px-5 md:px-6 py-1.5 md:py-2 rounded-[20px] border border-white/10 bg-[#16161e]/90 backdrop-blur-md text-[#d1d1d6] text-xs md:text-sm -rotate-[12deg] shadow-lg z-20 animate-float">
            Fun
          </div>
          <div className="absolute top-[25%] md:top-[30%] right-[5%] md:right-[18%] px-5 md:px-6 py-1.5 md:py-2 rounded-[20px] border border-white/10 bg-[#16161e]/90 backdrop-blur-md text-[#d1d1d6] text-xs md:text-sm rotate-[8deg] shadow-lg z-20 animate-float-delayed">
            Inclusive
          </div>

          {/* Text Content Wrapper */}
          <div className="relative flex flex-col items-center justify-center mt-4 md:mt-0 z-30">
            
            {/* Handwritten Text and Arrow */}
            <div className="absolute -top-10 md:-top-14 left-0 md:-left-16 flex items-end -rotate-[12deg]">
              <span className={`${caveat.className} text-[#f0567e] text-2xl md:text-3xl mr-1 whitespace-nowrap`}>
                we are the team of
              </span>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 40 40" 
                fill="none" 
                stroke="#f0567e" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="translate-y-1 md:translate-y-3 -rotate-12"
              >
                <path d="M5 10 Q 25 5 30 25 M 20 20 L 30 25 L 25 35" />
              </svg>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-[64px] font-medium text-white tracking-tight leading-none z-10">
              20+Talented Folks
            </h1>
            
            {/* Description */}
            <p className="mt-6 text-[#9ea0a5] max-w-lg leading-relaxed text-sm md:text-[15px] z-10 px-4">
              From passion-driven dedication to impactful contribution,<br className="hidden md:block" />
              we do it all here. We are growing and will be excited to hear<br className="hidden md:block" />
              from you !
            </p>

            {/* Call to Action Button */}
            <button className="mt-8 px-6 py-2.5 md:px-8 md:py-3 rounded-full bg-gradient-to-r from-[#de4b6f] to-[#be2e57] text-white text-[15px] font-medium hover:scale-105 hover:shadow-[0_0_25px_rgba(222,75,111,0.5)] transition-all duration-300 z-20 flex items-center gap-2">
              Join our team
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Staggered Bottom Hover Tags */}
          <div className="absolute bottom-[-10px] left-0 w-full flex justify-center items-end gap-1 md:gap-3 px-4 md:px-12 pointer-events-none pb-4 md:pb-8 z-20">
            {bottomTags.map((tag, index) => (
              <div 
                key={index}
                className={`
                  px-4 md:px-6 py-1.5 md:py-2 rounded-[20px] border border-white/10 bg-[#121017]/95 text-gray-400 text-[10px] md:text-xs whitespace-nowrap shadow-lg
                  transform transition-all duration-500 ease-out
                  opacity-30 translate-y-8
                  group-hover:opacity-100 group-hover:translate-y-0
                  ${tag.rotate} ${tag.delay} -mx-2 md:-mx-0
                `}
              >
                {tag.text}
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}