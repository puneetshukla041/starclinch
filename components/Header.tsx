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

// Refined Apple-style fluid easing curve
const FLUID_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const MOBILE_VARIANTS: { container: Variants; link: Variants } = {
  container: {
    initial: { opacity: 0 },
    open: { 
      opacity: 1, 
      transition: { staggerChildren: 0.08, delayChildren: 0.1 } 
    },
    exit: { 
      opacity: 0, 
      transition: { staggerChildren: 0.04, staggerDirection: -1, when: "afterChildren" } 
    }
  },
  link: {
    initial: { y: 30, opacity: 0, filter: "blur(4px)" },
    open: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { ease: FLUID_EASE, duration: 0.8 } 
    },
    exit: { 
      y: 15, 
      opacity: 0, 
      filter: "blur(4px)",
      transition: { ease: FLUID_EASE, duration: 0.4 } 
    }
  }
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  const preventRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Top Loading Bar Indicator */}
      <motion.div 
        initial={{ width: "0%", opacity: 1 }}
        animate={{ width: "100%", opacity: [1, 1, 0] }}
        transition={{ duration: 2, ease: "circOut", times: [0, 0.8, 1] }}
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 z-[9999] origin-left shadow-[0_0_12px_rgba(236,72,153,0.8)]"
      />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ ease: FLUID_EASE, duration: 0.8 }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled 
            ? "bg-[#0A0A0B]/70 backdrop-blur-2xl border-b border-white/5 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]" 
            : "bg-gradient-to-b from-black/60 to-transparent py-5 border-b border-transparent"
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 z-[120]">
            <Link href="#" onClick={preventRedirect} className="flex items-center gap-3 group">
              <img 
                src="/logo.png" 
                alt="Starclinch Logo" 
                className="h-7 md:h-8 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                Starclinch
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-x-2 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <div 
                key={link.name} 
                className="relative px-3 py-2"
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Link 
                  href={link.href}
                  onClick={preventRedirect}
                  className={`relative z-10 flex items-center gap-1.5 text-[14px] font-medium tracking-wide transition-colors duration-300 ${
                    hoveredLink === link.name ? "text-white" : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {link.name}
                  {link.subLinks && (
                    <ChevronDown 
                      size={14} 
                      strokeWidth={2.5}
                      className={`transition-transform duration-500 ease-[0.16,1,0.3,1] ${
                        hoveredLink === link.name ? "rotate-180 text-white" : "text-neutral-500"
                      }`} 
                    />
                  )}
                </Link>

                {/* Subtle hover background pill */}
                {hoveredLink === link.name && (
                  <motion.div 
                    layoutId="nav-hover"
                    className="absolute inset-0 bg-white/5 rounded-full -z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: FLUID_EASE, duration: 0.4 }}
                  />
                )}

                {/* Desktop Dropdown */}
                <AnimatePresence>
                  {link.subLinks && hoveredLink === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.96, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 10, scale: 0.96, filter: "blur(4px)", transition: { duration: 0.2 } }}
                      transition={{ duration: 0.4, ease: FLUID_EASE }} 
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[260px]"
                    >
                      <div className="bg-[#0A0A0B]/80 backdrop-blur-3xl border border-white/10 rounded-2xl p-2.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
                        {link.subLinks.map((subLink, idx) => (
                          <motion.div
                            key={subLink.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.04, ease: FLUID_EASE }}
                          >
                            <Link
                              href={subLink.href}
                              onClick={preventRedirect}
                              className="group flex items-center px-4 py-3 text-[14px] font-medium text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
                            >
                              <span className="relative">
                                {subLink.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-300 group-hover:w-full rounded-full opacity-0 group-hover:opacity-100" />
                              </span>
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

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-x-6 flex-shrink-0 z-[120]">
            <button onClick={preventRedirect} className="text-neutral-400 hover:text-white transition-colors duration-300">
              <Search size={18} strokeWidth={2.5} />
            </button>
            <div className="h-4 w-px bg-white/10" />
            <button 
              onClick={preventRedirect} 
              className="text-[14px] font-medium text-neutral-300 hover:text-white transition-colors duration-300"
            >
              Log In
            </button>
            <button 
              onClick={preventRedirect} 
              className="relative overflow-hidden group bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2.5 rounded-full text-[14px] font-semibold tracking-wide hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] active:scale-[0.96] transition-all duration-400 ease-[0.16,1,0.3,1]"
            >
              <span className="relative z-10">Post a Requirement</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[0.16,1,0.3,1]" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="xl:hidden flex items-center z-[120]">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="relative p-2 text-white/80 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md border border-white/5"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: FLUID_EASE }}
                >
                  {isMenuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="fixed inset-0 z-[90] bg-[#0A0A0B]/80 backdrop-blur-3xl flex flex-col pt-28 px-6 pb-10 h-[100svh] overflow-hidden"
          >
            <motion.nav 
              variants={MOBILE_VARIANTS.container}
              initial="initial"
              animate="open"
              exit="exit"
              className="flex flex-col h-full overflow-y-auto no-scrollbar"
            >
              <div className="flex flex-col mt-2">
                {NAV_LINKS.map((link) => {
                  const isOpen = openMobileCategory === link.name;
                  return (
                    <div key={link.name} className="flex flex-col border-b border-white/5">
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
                        <span className={`text-2xl md:text-3xl font-medium tracking-tight transition-colors duration-400 ${
                          isOpen ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"
                        }`}>
                          {link.name}
                        </span>
                        {link.subLinks && (
                          <motion.span 
                            animate={{ rotate: isOpen ? 180 : 0 }} 
                            transition={{ duration: 0.5, ease: FLUID_EASE }} 
                            className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                              isOpen ? "border-pink-500/50 text-pink-400 bg-pink-500/10" : "border-white/10 text-neutral-500"
                            }`}
                          >
                            <ChevronDown size={18} strokeWidth={2} />
                          </motion.span>
                        )}
                      </motion.div>
                      
                      <AnimatePresence>
                        {link.subLinks && isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                            animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                            exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                            transition={{ duration: 0.5, ease: FLUID_EASE }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-4 pb-6 pl-4 border-l-2 border-white/10 ml-2 mt-2">
                              {link.subLinks.map((sub, subIdx) => (
                                <motion.div
                                  key={sub.name}
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: subIdx * 0.05, ease: FLUID_EASE }}
                                >
                                  <Link
                                    href={sub.href}
                                    onClick={(e) => { preventRedirect(e); setIsMenuOpen(false); }}
                                    className="block text-[17px] font-medium text-neutral-400 hover:text-white transition-colors duration-300"
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

              {/* Mobile Bottom Actions */}
              <motion.div 
                variants={MOBILE_VARIANTS.link}
                className="mt-auto pt-10 flex flex-col gap-4"
              >
                <button 
                  onClick={preventRedirect} 
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold text-[15px] tracking-wide active:scale-[0.98] transition-transform shadow-[0_10px_30px_-10px_rgba(236,72,153,0.5)]"
                >
                  Post a Requirement
                </button>
                <div className="flex gap-3">
                  <button 
                    onClick={preventRedirect} 
                    className="flex-1 py-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 text-white hover:bg-white/10 font-medium text-[15px] active:scale-[0.98] transition-all"
                  >
                    Artist Login
                  </button>
                  <button 
                    onClick={preventRedirect} 
                    className="px-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 text-white hover:bg-white/10 flex items-center justify-center active:scale-[0.98] transition-all"
                  >
                    <Search size={20} strokeWidth={2.5} />
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