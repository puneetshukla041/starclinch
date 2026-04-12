# Starclinch – Premium Talent Marketplace

[![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-black?style=flat&logo=framer)](https://www.framer.com/motion/)

A polished frontend experience for a premium talent marketplace. Built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

This repository is designed for maintainability, reusable page sections, and premium UI polish.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [App Flow](#app-flow)
4. [Features](#features)
5. [Tech Stack](#tech-stack)
6. [Folder Structure](#folder-structure)
7. [Getting Started](#getting-started)
8. [Scripts](#scripts)
9. [Contribution](#contribution)
10. [Notes](#notes)

---

## Overview

This repository contains the frontend implementation of a premium talent marketplace landing experience.
The app focuses on modern section composition, responsive interactions, and polished motion design.

---

## Architecture

The app is organized to separate global layout, reusable features, and homepage sections:

* `app/layout.tsx` manages global layout, metadata, fonts, and UI wrappers.
* `app/page.tsx` composes the homepage from dedicated section components.
* `components/layout/` contains layout-specific shared UI such as the header.
* `components/features/` contains reusable interactive feature components.
* `components/sections/` contains homepage section components.
* `components/index.ts` provides a centralized component barrel for cleaner imports.

This structure enables a scalable and maintainable frontend architecture.

---

## App Flow

```mermaid
flowchart TD
  A[app/layout.tsx] --> B[Header]
  A --> C[Popup]
  A --> D[app/page.tsx]
  D --> E[HeroSection]
  D --> F[TrendingSection]
  D --> G[FeaturedSquadsSection]
  D --> H[SquadCarouselSection]
  D --> I[RecentShowsSection]
  D --> J[TeamSection]
  B --> K[components/layout/Header.tsx]
  C --> L[components/features/Popup.tsx]
  E --> M[components/sections/HeroSection.tsx]
  F --> N[components/sections/TrendingSection.tsx]
  G --> O[components/sections/FeaturedSquadsSection.tsx]
  H --> P[components/sections/SquadCarouselSection.tsx]
  I --> Q[components/sections/RecentShowsSection.tsx]
  J --> R[components/sections/TeamSection.tsx]
```

---

## Features

* Responsive dark-theme homepage with premium motion design.
* Animated header with sticky behavior, mobile menu, and dropdown navigation items.
* Hero section with rotating text, animated backgrounds, and interactive image transitions.
* Artist grid section with modern card styles and responsive hover states.
* Squad carousel and feature cards for content-rich storytelling.
* Recent shows showcase with sliding carousel interactions.
* Team call-to-action section with glassmorphism styling.

---

## Tech Stack

* Next.js 16.2.3
* React 19.2.4
* TypeScript 5
* Tailwind CSS 4
* Framer Motion 12
* Lucide React
* nextjs-toploader

---

## Folder Structure

```text
starclinch/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   └── Header.tsx
│   ├── features/
│   │   ├── Popup.tsx
│   │   └── index.ts
│   ├── sections/
│   │   ├── FeaturedSquadsSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── RecentShowsSection.tsx
│   │   ├── SquadCarouselSection.tsx
│   │   ├── TeamSection.tsx
│   │   └── TrendingSection.tsx
│   └── index.ts
├── lib/
│   └── SmoothScroll.ts
├── public/
│   ├── home/
│   ├── perform/
│   └── trending/
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## Getting Started

### Prerequisites

* Node.js 20+ recommended
* pnpm, npm, or yarn installed

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Open the app at `http://localhost:3000`

---

## Run Commands

* `npm run dev` — start local development server
* `npm run build` — build the production app
* `npm run start` — run the production build locally
* `npm run lint` — run ESLint

---

## Contribution

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Open a pull request with a clear description.
4. Keep component logic isolated and reuse the section barrel when possible.

---

## Notes

* The project currently focuses on frontend experience and interface polish.
* Replace placeholder links in this README with actual demo or portfolio URLs.
* The `components/index.ts` barrel file simplifies imports across the application.
