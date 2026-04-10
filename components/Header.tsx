"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";


const NAV_LINKS = [
  {
    name: "Book Entertainers",
    href: "#",
    subLinks: [
      { name: "Singers & Live Bands", href: "#" },
      { name: "Stand-up Comedians", href: "#" },
      { name: "DJs & Producers", href: "#" },
      { name: "Anchors & Emcees", href: "#" },
      { name: "Dancers & Troupes", href: "#" },
    ]
  },
  { 
    name: "Hire Celebrities", 
    href: "#",
    subLinks: [
      { name: "Bollywood Actors", href: "#" },
      { name: "TV Personalities", href: "#" },
      { name: "Sports Stars", href: "#" },
    ]
  },
  { 
    name: "Event Types", 
    href: "#", 
    subLinks: [
      { name: "Corporate Events", href: "#" },
      { name: "Weddings & Sangeet", href: "#" },
      { name: "College Fests", href: "#" },
      { name: "Virtual Events", href: "#" },
    ]
  },
  { name: "For Artists", href: "#" },
];


const PREMIUM_EASE = [0.32, 0.72, 0, 1] as [number, number, number, number];

const MOBILE_VARIANTS: { container: Variants; link: Variants } = {
  container: {
    initial: { opacity: 0 },
    open: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
    exit: { opacity: 0, transition: { staggerChildren: 0.02, staggerDirection: -1, when: "afterChildren" } }
  },
  link: {
    initial: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1, transition: { ease: PREMIUM_EASE, duration: 0.6 } },
    exit: { y: 10, opacity: 0, transition: { duration: 0.3 } }
  }
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  const preventRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {}
      <div className="fixed inset-0 bg-[#000000] -z-50 pointer-events-none" />

      {}
      <motion.div 
        initial={{ width: "0%", opacity: 1 }}
        animate={{ width: "100%", opacity: [1, 1, 0] }}
        transition={{ duration: 1.5, ease: "circOut", times: [0, 0.8, 1] }}
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-pink-500 to-orange-500 z-[9999] origin-left shadow-[0_0_10px_rgba(236,72,153,0.8)]"
      />

      {}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled 
            ? "bg-[#000000]/80 backdrop-blur-xl border-b border-white/10 py-3" 
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          
          {}
          <div className="flex-shrink-0 z-[120]">
            <Link href="#" onClick={preventRedirect} className="flex items-center gap-2.5 group">
              <img 
                src="/logo.png" 
                alt="Starclinch Logo" 
                className="h-7 md:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
<span className="text-xl md:text-2xl font-bold tracking-tight text-white/80">
  Starclinch
</span>
            </Link>
          </div>

          {}
          <nav className="hidden xl:flex items-center gap-x-10 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <div 
                key={link.name} 
                className="relative py-2"
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Link 
                  href={link.href}
                  onClick={preventRedirect}
                  className={`flex items-center gap-1.5 text-[13.5px] font-medium tracking-wide transition-colors duration-200 ${
                    hoveredLink === link.name ? "text-pink-400" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {link.name}
                  {link.subLinks && (
                    <ChevronDown 
                      size={14} 
                      strokeWidth={2.5}
                      className={`transition-transform duration-300 ${hoveredLink === link.name ? "rotate-180 text-pink-400" : "text-neutral-500"}`} 
                    />
                  )}
                </Link>

                {}
                <AnimatePresence>
                  {link.subLinks && hoveredLink === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)" }}
                      transition={{ duration: 0.3, ease: PREMIUM_EASE }} 
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-5 w-[240px]"
                    >
                      <div className="bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                        {link.subLinks.map((subLink, idx) => (
                          <motion.div
                            key={subLink.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.03, ease: PREMIUM_EASE }}
                          >
                            <Link
                              href={subLink.href}
                              onClick={preventRedirect}
                              className="block px-4 py-2.5 text-[13.5px] text-neutral-400 hover:text-pink-400 hover:bg-pink-500/10 rounded-lg transition-all duration-200"
                            >
                              {subLink.name}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {}
          <div className="hidden lg:flex items-center gap-x-6 flex-shrink-0 z-[120]">
            <button onClick={preventRedirect} className="text-neutral-400 hover:text-pink-400 transition-colors">
              <Search size={18} strokeWidth={2} />
            </button>
            <div className="h-4 w-px bg-white/15" />
            <button 
              onClick={preventRedirect} 
              className="text-[13px] font-medium text-neutral-300 hover:text-white transition-colors"
            >
              Log In
            </button>
            {}
            <button 
              onClick={preventRedirect} 
              className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2.5 rounded-lg text-[13px] font-semibold tracking-wide hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Post a Requirement
            </button>
          </div>

          {}
          <div className="xl:hidden flex items-center z-[120]">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-white p-2 hover:text-pink-400 transition-colors"
            >
              {isMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.header>

      {}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: PREMIUM_EASE }}
            className="fixed inset-0 z-[90] bg-[#000000]/95 flex flex-col pt-24 px-6 pb-8 h-[100svh] overflow-hidden"
          >
            <motion.nav 
              variants={MOBILE_VARIANTS.container}
              initial="initial"
              animate="open"
              exit="exit"
              className="flex flex-col h-full overflow-y-auto no-scrollbar"
            >
              <div className="flex flex-col mt-4">
                {NAV_LINKS.map((link) => {
                  const isOpen = openMobileCategory === link.name;
                  return (
                    <div key={link.name} className="flex flex-col border-b border-white/10">
                      <motion.div 
                        variants={MOBILE_VARIANTS.link}
                        className="flex items-center justify-between py-5 cursor-pointer group"
                        onClick={(e) => {
                          if (link.subLinks) {
                            setOpenMobileCategory(isOpen ? null : link.name);
                          } else {
                            preventRedirect(e as any);
                            setIsMenuOpen(false);
                          }
                        }}
                      >
                        {}
                        <span className={`text-2xl md:text-3xl font-light tracking-tight transition-colors duration-300 ${isOpen ? "text-pink-400" : "text-neutral-300 group-hover:text-white"}`}>
                          {link.name}
                        </span>
                        {link.subLinks && (
                          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.4, ease: PREMIUM_EASE }} className={isOpen ? "text-pink-400" : "text-neutral-500"}>
                            <ChevronDown size={22} strokeWidth={1.5} />
                          </motion.span>
                        )}
                      </motion.div>
                      
                      {}
                      <AnimatePresence>
                        {link.subLinks && isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                            animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                            exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                            transition={{ duration: 0.4, ease: PREMIUM_EASE }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-4 pb-6 pl-4 border-l border-pink-500/30 ml-1">
                              {link.subLinks.map((sub, subIdx) => (
                                <motion.div
                                  key={sub.name}
                                  initial={{ x: -10, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: subIdx * 0.04, ease: PREMIUM_EASE }}
                                >
                                  <Link
                                    href={sub.href}
                                    onClick={(e) => { preventRedirect(e); setIsMenuOpen(false); }}
                                    className="block text-base text-neutral-400 hover:text-pink-400 transition-colors"
                                  >
                                    {sub.name}
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {}
              <motion.div 
                variants={MOBILE_VARIANTS.link}
                className="mt-auto pt-10 flex flex-col gap-3"
              >
                <button 
                  onClick={preventRedirect} 
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold text-base tracking-wide active:scale-[0.98] transition-all shadow-[0_5px_20px_rgba(236,72,153,0.3)]"
                >
                  Post a Requirement
                </button>
                <div className="flex gap-3">
                  <button 
                    onClick={preventRedirect} 
                    className="flex-1 py-4 rounded-xl bg-[#111111] border border-white/10 text-white hover:border-pink-500/50 hover:text-pink-400 font-medium text-sm active:scale-[0.98] transition-all"
                  >
                    Artist Login
                  </button>
                  <button 
                    onClick={preventRedirect} 
                    className="px-6 rounded-xl bg-[#111111] border border-white/10 text-white hover:border-pink-500/50 hover:text-pink-400 flex items-center justify-center active:scale-[0.98] transition-all"
                  >
                    <Search size={20} strokeWidth={2} />
                  </button>
                </div>
              </motion.div>

            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}