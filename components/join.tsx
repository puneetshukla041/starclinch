import React from 'react';
import { Inter, Caveat } from 'next/font/google';

// Initialize fonts
const inter = Inter({ subsets: ['latin'] });
const caveat = Caveat({ subsets: ['latin'], weight: '700' });

// Fixed delay values for inline styling to guarantee staggered animation
const bottomTags = [
  { text: 'Focused', rotate: '-rotate-[10deg]', delay: '0ms' },
  { text: 'Collaborative', rotate: '-rotate-[5deg]', delay: '75ms' },
  { text: 'United', rotate: '-rotate-[2deg]', delay: '150ms' },
  { text: 'Vibrant', rotate: 'rotate-[2deg]', delay: '225ms' },
  { text: 'Dynamic', rotate: 'rotate-[5deg]', delay: '300ms' },
  { text: 'Motivated', rotate: 'rotate-[10deg]', delay: '375ms' },
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
        className={`relative min-h-screen bg-[#09070c] flex items-center justify-center overflow-hidden ${inter.className} py-20`}
      >
        {/* Background Shapes */}
        {/* Removed the top-right glow for seamless blending, keeping only the bottom-left. */}
        <div className="absolute -bottom-[20%] -left-[10%] w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tr from-[#160811] to-[#311326] pointer-events-none blur-[80px] md:blur-[120px]" />

        {/* Main Glassmorphism Container */}
        <div className="group relative w-[92%] max-w-[1050px] aspect-auto min-h-[500px] md:min-h-[450px] my-10 rounded-[3rem] md:rounded-[250px] border border-white/[0.15] bg-white/[0.02] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-xl flex flex-col items-center justify-center text-center px-4 pt-20 pb-28 sm:p-8 md:p-12 z-10 overflow-hidden">
          
          {/* Floating Top Tags */}
          <div className="absolute top-[12%] sm:top-[20%] md:top-[30%] left-[5%] md:left-[15%] px-4 sm:px-5 md:px-6 py-1.5 md:py-2 rounded-[20px] border border-white/10 bg-[#16161e]/90 backdrop-blur-md text-[#d1d1d6] text-[10px] sm:text-xs md:text-sm -rotate-[12deg] shadow-lg z-20 animate-float">
            Fun
          </div>
          <div className="absolute top-[18%] sm:top-[22%] md:top-[30%] right-[5%] md:right-[18%] px-4 sm:px-5 md:px-6 py-1.5 md:py-2 rounded-[20px] border border-white/10 bg-[#16161e]/90 backdrop-blur-md text-[#d1d1d6] text-[10px] sm:text-xs md:text-sm rotate-[8deg] shadow-lg z-20 animate-float-delayed">
            Inclusive
          </div>

          {/* Text Content Wrapper */}
          <div className="relative flex flex-col items-center justify-center mt-4 md:mt-0 z-30 w-full">
            
            {/* Handwritten Text and Arrow */}
            <div className="absolute -top-12 md:-top-14 left-2 sm:-left-4 md:-left-16 flex items-end -rotate-[12deg] origin-bottom-left scale-75 sm:scale-90 md:scale-100">
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
            <h1 className="text-4xl sm:text-5xl md:text-[64px] font-medium text-white tracking-tight leading-tight md:leading-none z-10 w-full px-2">
              20+Talented Folks
            </h1>
            
            {/* Description */}
            <p className="mt-4 md:mt-6 text-[#9ea0a5] max-w-[90%] md:max-w-lg leading-relaxed text-sm md:text-[15px] z-10">
              From passion-driven dedication to impactful contribution,<br className="hidden md:block" />
              we do it all here. We are growing and will be excited to hear<br className="hidden md:block" />
              from you !
            </p>

            {/* Call to Action Button */}
            <button className="group/btn mt-8 md:mt-10 px-6 py-3 md:px-8 md:py-3 rounded-full bg-gradient-to-r from-[#de4b6f] to-[#be2e57] text-white text-[14px] md:text-[15px] font-medium hover:scale-105 hover:shadow-[0_0_25px_rgba(222,75,111,0.5)] transition-all duration-300 z-20 flex items-center gap-2">
              Join our team
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/btn:translate-x-1.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Staggered Bottom Hover Tags */}
          <div className="absolute bottom-4 md:bottom-[-10px] left-0 right-0 mx-auto w-full max-w-[90%] md:max-w-full flex justify-center items-end flex-wrap md:flex-nowrap gap-2 md:gap-3 px-2 md:px-12 pointer-events-none pb-2 md:pb-8 z-20">
            {bottomTags.map((tag, index) => (
              <div 
                key={index}
                style={{ transitionDelay: tag.delay }}
                className={`
                  px-3 md:px-6 py-1.5 md:py-2 rounded-[20px] border border-white/10 bg-[#121017]/95 text-gray-400 text-[10px] md:text-xs whitespace-nowrap shadow-lg
                  transform transition-all duration-500 ease-out
                  opacity-30 translate-y-8 md:translate-y-12
                  group-hover:opacity-100 group-hover:translate-y-0
                  ${tag.rotate}
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