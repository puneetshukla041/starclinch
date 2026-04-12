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
flowchart TB
  classDef layout fill:#111827,stroke:#9ca3af,color:#f8fafc;
  classDef page fill:#0f172a,stroke:#60a5fa,color:#e2e8f0;
  classDef component fill:#1f2937,stroke:#a5b4fc,color:#f8fafc;

  subgraph app[Application]
    L[app/layout.tsx]:::layout
    H[Header]:::component
    P[Popup]:::component
    M[app/page.tsx]:::page
  end

  subgraph sections[Homepage Sections]
    S1[HeroSection]:::component
    S2[TrendingSection]:::component
    S3[FeaturedSquadsSection]:::component
    S4[SquadCarouselSection]:::component
    S5[RecentShowsSection]:::component
    S6[TeamSection]:::component
  end

  L --> H
  L --> P
  L --> M
  M --> S1
  M --> S2
  M --> S3
  M --> S4
  M --> S5
  M --> S6

  H --> HL[components/layout/Header.tsx]
  P --> PF[components/features/Popup.tsx]
  S1 --> S1F[components/sections/HeroSection.tsx]
  S2 --> S2F[components/sections/TrendingSection.tsx]
  S3 --> S3F[components/sections/FeaturedSquadsSection.tsx]
  S4 --> S4F[components/sections/SquadCarouselSection.tsx]
  S5 --> S5F[components/sections/RecentShowsSection.tsx]
  S6 --> S6F[components/sections/TeamSection.tsx]
```

---

## Features

* Responsive premium homepage with a polished dark interface.
* Animated sticky header with desktop dropdowns and mobile menu.
* Hero section with motion-driven typography and image transitions.
* Trending artists gallery with elegant hover interactions.
* Featured squad and storytelling carousel sections.
* Recent shows slider with smooth transitions.
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

* Node.js 20+
* npm, yarn, or pnpm installed

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the app at `http://localhost:3000`.

---

## Scripts

* `npm run dev` — start the development server
* `npm run build` — build the production app
* `npm run start` — run the production build locally
* `npm run lint` — run the linter

---

## Contribution

1. Fork the repository.
2. Create a feature branch.
3. Keep changes isolated to components or page sections.
4. Submit a pull request with a clear summary.

---

## Notes

* This project is focused on frontend polish, animation, and responsive interaction.
* Use `components/index.ts` for centralized component exports.
* Replace placeholder links with actual deployment or demo URLs when available.
