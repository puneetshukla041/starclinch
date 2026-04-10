"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
// THE FIX: Imported 'Variants' to strictly type the animation objects
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Updated Starclinch-specific navigation
const NAV_LINKS = [
  {
    name: "Categories",
    href: "/categories",
    subLinks: [
      { name: "Singers & Vocalists", href: "/categories/singers" },
      { name: "Dancers & Troupes", href: "/categories/dancers" },
      { name: "Stand-up Comedians", href: "/categories/comedians" },
      { name: "Live Bands", href: "/categories/bands" },
    ]
  },
  {
    name: "How it Works",
    href: "/how-it-works",
  },
  { 
    name: "For Artists", 
    href: "/artists", 
    subLinks: [
      { name: "Join as an Artist", href: "/artists/join" },
      { name: "Artist Guidelines", href: "/artists/guidelines" },
      { name: "Success Stories", href: "/artists/success" },
    ]
  },
  { 
    name: "Corporate Events", 
    href: "/corporate", 
  },
  { 
    name: "About Us", 
    href: "/about", 
    subLinks: [
      { name: "Our Story", href: "/about/story" },
      { name: "Trust & Safety", href: "/about/safety" },
      { name: "Contact Support", href: "/contact" },
    ]
  }, 
];

const ANIMATION_SPRING = { type: "spring", stiffness: 300, damping: 30, mass: 1 } as const;
const SOFT_SPRING = { type: "spring", stiffness: 120, damping: 20, mass: 0.8 } as const;

// THE FIX: Added strict typing { container: Variants; link: Variants } 
// and cast the ease array to [number, number, number, number]
const MOBILE_VARIANTS: { container: Variants; link: Variants } = {
  container: {
    initial: { opacity: 0 },
    open: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren" } }
  },
  link: {
    initial: { y: 20, opacity: 0 },
    open: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], 
        duration: 0.6 
      } 
    },
    exit: { y: 20, opacity: 0, transition: { duration: 0.3 } }
  }
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  const toggleCategory = (name: string) => {
    setOpenCategory(openCategory === name ? null : name);
  };

  const isActiveLink = (href: string) => {
    if (!href) return false;
    const cleanHref = href.split('#')[0].split('?')[0];
    if (cleanHref === '/') return pathname === '/';
    return pathname?.startsWith(cleanHref);
  };

  const navTextStyle = "text-[14px] leading-[32px] font-medium tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap";

  return (
    <>
      {/* Fake UI Top Loader using Framer Motion */}
      <motion.div 
        initial={{ width: "0%", opacity: 1 }}
        animate={{ width: "100%", opacity: 0 }}
        transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-rose-500 to-orange-500 z-[200] origin-left"
      />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 w-full z-[110] flex flex-col items-center transition-all duration-500 bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5"
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 py-4 flex items-center justify-between">
          
          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="cursor-pointer block relative z-[120] flex items-center gap-2 group"
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={SOFT_SPRING}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-orange-500 flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.5)]"
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-rose-400 transition-colors">
                Starclinch
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-x-12 flex-1 justify-center h-full">
            {NAV_LINKS.map((link) => {
              const isActive = isActiveLink(link.href);
              const showLine = hoveredLink === link.name || (isActive && hoveredLink === null);

              return (
                <div 
                  key={link.name} 
                  className="relative h-full flex items-center py-2"
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link 
                    href={link.href}
                    className={`${navTextStyle} relative flex items-center gap-1 ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`}
                  >
                    {link.name}
                    
                    {/* Pink Gradient Underline */}
                    <AnimatePresence>
                      {showLine && (
                        <motion.span
                          layoutId="headerUnderline"
                          className="absolute left-1/2 -bottom-2 -translate-x-1/2"
                          style={{
                            height: '2px',
                            background: 'linear-gradient(90deg, rgba(225, 29, 72, 0) 0%, rgba(225, 29, 72, 1) 50%, rgba(225, 29, 72, 0) 100%)'
                          }}
                          initial={{ width: "0px", opacity: 0 }}
                          animate={{ width: "100%", opacity: 1 }}
                          exit={{ width: "0px", opacity: 0, transition: { duration: 0.2 } }}
                          transition={ANIMATION_SPRING} 
                        />
                      )}
                    </AnimatePresence>
                  </Link>

                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {link.subLinks && hoveredLink === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)", transition: { duration: 0.2 } }}
                        transition={{ duration: 0.25, ease: "easeOut" }} 
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-6 z-[150]"
                      >
                        <div className="bg-[#0A0A0B]/95 backdrop-blur-md border border-white/10 flex flex-col justify-center items-center gap-1 p-3 self-stretch rounded-2xl min-w-[240px] shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                          {link.subLinks.map((subLink, idx) => (
                            <motion.div
                              key={subLink.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }} 
                              className="w-full"
                            >
                              <Link
                                href={subLink.href}
                                className={`whitespace-nowrap text-sm w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 block ${pathname === subLink.href.split('#')[0] ? "text-rose-400 bg-rose-500/10 font-medium" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
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
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-x-6 flex-shrink-0">
            <Link href="/post-requirement" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/post-requirement">
              <div className="relative group flex items-center justify-center gap-2 rounded-full bg-white/5 border border-white/10 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-rose-500/50 overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="relative z-10">Post a Requirement</span>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-4 relative z-[120]">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-white cursor-pointer p-2 active:scale-95 transition-transform"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0B]/95 flex flex-col pt-28 px-6 pb-6"
          >
            <motion.nav 
              variants={MOBILE_VARIANTS.container}
              initial="initial"
              animate="open"
              exit="exit"
              className="flex flex-col h-full overflow-y-auto no-scrollbar"
            >
              <div className="flex flex-col gap-y-2">
                {NAV_LINKS.map((link) => {
                  const isActive = isActiveLink(link.href);
                  return (
                    <div key={link.name} className="flex flex-col border-b border-white/5 pb-2">
                      <motion.div 
                        variants={MOBILE_VARIANTS.link}
                        className="flex items-center justify-between py-3 group cursor-pointer"
                        onClick={() => link.subLinks ? toggleCategory(link.name) : setIsMenuOpen(false)}
                      >
                        <Link 
                          href={link.href} 
                          onClick={(e) => { if(link.subLinks) e.preventDefault(); }}
                          className={`text-3xl font-light tracking-tight transition-colors ${isActive || openCategory === link.name ? "text-rose-500" : "text-white"}`}
                        >
                          {link.name}
                        </Link>
                        {link.subLinks && (
                          <motion.span
                            animate={{ rotate: openCategory === link.name ? 180 : 0 }}
                            transition={SOFT_SPRING}
                            className={`p-2 rounded-full ${openCategory === link.name ? "text-rose-500 bg-rose-500/10" : "text-white/30"}`}
                          >
                            <ChevronDown size={24} />
                          </motion.span>
                        )}
                      </motion.div>
                      
                      {/* Mobile Submenu Expansion */}
                      <AnimatePresence>
                        {link.subLinks && openCategory === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-4 py-4 pl-2">
                              {link.subLinks.map((sub, subIdx) => (
                                <motion.div
                                  key={sub.name}
                                  initial={{ x: -10, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: subIdx * 0.05 }}
                                >
                                  <Link
                                    href={sub.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block text-lg pl-4 border-l-2 transition-all ${isActiveLink(sub.href) ? "text-rose-400 border-rose-500" : "text-gray-400 hover:text-white border-white/10"}`}
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

              {/* Mobile Footer Actions */}
              <motion.div 
                variants={MOBILE_VARIANTS.link}
                className="mt-8 flex flex-col gap-4"
              >
                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-medium text-lg shadow-[0_0_20px_rgba(225,29,72,0.3)]">
                  Post a Requirement
                </button>
                <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-lg">
                  Artist Login
                </button>
              </motion.div>

            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}