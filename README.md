# Starclinch – Premium Talent Marketplace (Frontend Architecture)

[![Next.js](https://img.shields.io/badge/Next.js-14.x-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-black?style=flat&logo=framer)](https://www.framer.com/motion/)

A high-end, highly interactive frontend redesign for Starclinch, India's largest premium marketplace for booking live entertainers and celebrities. 

This project focuses on delivering an ultra-minimalist, editorial dark-mode aesthetic. It heavily leverages physics-based animations, custom mathematical SVG pathing, and native scroll-snapping to achieve a buttery-smooth 60fps experience that rivals native iOS applications.

**[View Live Demo](#) | [View Portfolio](#)** *(Replace with your actual links)*

---

## Key Features & Engineering Highlights

* **Physics-Based UI (Magnetic Elements):** Implemented custom React hooks utilizing `getBoundingClientRect` to calculate cursor proximity, creating premium magnetic button hover states that naturally pull toward the user's mouse.
* **Curved Typography Engine:** Engineered a custom layout algorithm using `Framer Motion` to render an overlapping, slot-machine-style text wheel. Inactive text seamlessly orbits and scales down along a hidden circular track.
* **Fluid Native Carousels:** Replaced heavy, JavaScript-blocking slider libraries with native CSS `snap-x snap-mandatory` scrolling. State is synchronized via scroll event listeners to dynamically update the active pagination indicators without sacrificing scroll performance.
* **Custom SVG Animation:** Built a mathematically precise SVG gradient swoosh (`<path>`) that rotates infinitely and dynamically tracks the user's active carousel index.
* **Glassmorphism & App-Like Navigation:** Designed a highly responsive, mobile-first navigation overlay utilizing `backdrop-blur` and staggered stagger-children animations for a highly polished reveal.

---

## Tech Stack

* **Framework:** [Next.js (App Router)](https://nextjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animation:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Routing/UX:** `nextjs-toploader` for seamless page transitions

---

## Project Structure

```text
├── app/
│   ├── layout.tsx         # Global layout (Dark theme & TopLoader setup)
│   └── page.tsx           # Main entry point mapping the components
├── components/
│   ├── Header.tsx         # Global navigation with mobile overlay & animations
│   ├── HeroCarousel.tsx   # Complex hero section with curved text & SVG tracking
│   └── TrendingSection.tsx# Native smooth-scroll carousel with custom pagination
├── public/                # Static assets (Artist images, SVG logos)
└── tailwind.config.ts     # Custom theme extensions and keyframes