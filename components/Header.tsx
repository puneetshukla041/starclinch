"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

// Professional Marketplace Navigation
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

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const MOBILE_VARIANTS: { container: Variants; link: Variants } = {
  container: {
    initial: { opacity: 0 },
    open: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
    exit: { opacity: 0, transition: { staggerChildren: 0.02, staggerDirection: -1, when: "afterChildren" } }
  },
  link: {
    initial: { y: 15, opacity: 0 },
    open: { y: 0, opacity: 1, transition: { ease: PREMIUM_EASE, duration: 0.5 } },
    exit: { y: 10, opacity: 0, transition: { duration: 0.2 } }
  }
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Subtle header border on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  const preventRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {/* GLOBAL PURE BLACK BACKGROUND */}
      <div className="fixed inset-0 bg-[#000000] -z-50 pointer-events-none" />

      {/* SLEEK TOP LOADER (Self-contained) */}
      <motion.div 
        initial={{ width: "0%", opacity: 1 }}
        animate={{ width: "100%", opacity: [1, 1, 0] }}
        transition={{ duration: 1.5, ease: "circOut", times: [0, 0.8, 1] }}
        className="fixed top-0 left-0 h-[2px] bg-white z-[9999] origin-left"
      />

      {/* DESKTOP HEADER */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled 
            ? "bg-[#000000]/80 backdrop-blur-xl border-b border-white/10 py-4" 
            : "bg-transparent border-b border-transparent py-6"
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          
          {/* Logo Area */}
          <div className="flex-shrink-0 z-[120]">
            <Link href="#" onClick={preventRedirect} className="block group">
              <img 
                src="/logo.png" 
                alt="Starclinch" 
                className="h-6 md:h-7 w-auto object-contain transition-opacity duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              {/* Minimalist text fallback */}
              <span className="hidden text-xl font-semibold tracking-tight text-white">
                Starclinch.
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-x-10 flex-1 justify-center">
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
                  className="flex items-center gap-1.5 text-[13px] font-medium tracking-wide text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                  {link.subLinks && (
                    <ChevronDown 
                      size={14} 
                      strokeWidth={2}
                      className={`transition-transform duration-300 ${hoveredLink === link.name ? "rotate-180 text-white" : "text-neutral-500"}`} 
                    />
                  )}
                </Link>

                {/* Ultra-Minimalist Dropdown */}
                <AnimatePresence>
                  {link.subLinks && hoveredLink === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 5, filter: "blur(4px)" }}
                      transition={{ duration: 0.2, ease: "easeOut" }} 
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[220px]"
                    >
                      <div className="bg-[#0A0A0A] border border-white/10 rounded-lg p-1.5 shadow-2xl">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.name}
                            href={subLink.href}
                            onClick={preventRedirect}
                            className="block px-3.5 py-2.5 text-[13px] text-neutral-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-x-6 flex-shrink-0 z-[120]">
            <button onClick={preventRedirect} className="text-neutral-400 hover:text-white transition-colors">
              <Search size={18} strokeWidth={2} />
            </button>
            <div className="h-4 w-px bg-white/15" />
            <button 
              onClick={preventRedirect} 
              className="text-[13px] font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Log In
            </button>
            <button 
              onClick={preventRedirect} 
              className="bg-white text-black px-5 py-2.5 rounded-md text-[13px] font-semibold tracking-wide hover:bg-neutral-200 active:scale-95 transition-all"
            >
              Post a Requirement
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center z-[120]">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-white p-2"
            >
              {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* HIGH-END MOBILE NAVIGATION OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-[#000000] flex flex-col pt-24 px-6 pb-8 h-[100svh] overflow-hidden"
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
                        className="flex items-center justify-between py-5 cursor-pointer"
                        onClick={(e) => {
                          if (link.subLinks) {
                            setOpenMobileCategory(isOpen ? null : link.name);
                          } else {
                            preventRedirect(e as any);
                            setIsMenuOpen(false);
                          }
                        }}
                      >
                        {/* Premium large typography for mobile */}
                        <span className={`text-2xl md:text-3xl font-light tracking-tight transition-colors ${isOpen ? "text-white" : "text-neutral-400"}`}>
                          {link.name}
                        </span>
                        {link.subLinks && (
                          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-neutral-500">
                            <ChevronDown size={20} strokeWidth={1.5} />
                          </motion.span>
                        )}
                      </motion.div>
                      
                      {/* Smooth Mobile Submenu */}
                      <AnimatePresence>
                        {link.subLinks && isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: PREMIUM_EASE }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-4 pb-6 pl-4 border-l border-white/10 ml-1">
                              {link.subLinks.map((sub) => (
                                <div key={sub.name}>
                                  <Link
                                    href={sub.href}
                                    onClick={(e) => { preventRedirect(e); setIsMenuOpen(false); }}
                                    className="block text-base text-neutral-400 hover:text-white transition-colors"
                                  >
                                    {sub.name}
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Minimalist Mobile Footer Actions */}
              <motion.div 
                variants={MOBILE_VARIANTS.link}
                className="mt-auto pt-10 flex flex-col gap-3"
              >
                <button 
                  onClick={preventRedirect} 
                  className="w-full py-4 rounded-md bg-white text-black font-semibold text-sm tracking-wide active:scale-[0.98] transition-transform"
                >
                  Post a Requirement
                </button>
                <div className="flex gap-3">
                  <button 
                    onClick={preventRedirect} 
                    className="flex-1 py-4 rounded-md bg-[#111111] border border-white/10 text-white font-medium text-sm active:scale-[0.98] transition-transform"
                  >
                    Artist Login
                  </button>
                  <button 
                    onClick={preventRedirect} 
                    className="px-6 rounded-md bg-[#111111] border border-white/10 text-white flex items-center justify-center active:scale-[0.98] transition-transform"
                  >
                    <Search size={18} strokeWidth={2} />
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