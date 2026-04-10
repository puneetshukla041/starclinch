import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Or whatever font you are using
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Starclinch - Book Entertainers",
  description: "India's premium talent marketplace",
    icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 1. Added bg-[#0A0A0B] and text-white to the body.
        Now your ENTIRE website has the premium dark background.
      */}
      <body className={`${inter.className} bg-[#0A0A0B] text-white antialiased`}>
        
        {/* 2. The REAL Top Loader.
          It will show a sleek rose/orange gradient bar at the top 
          whenever a user clicks a link and a new page is loading.
        */}
        <NextTopLoader 
          color="#f43f5e" // Rose-500 to match your theme
          initialPosition={0.08} 
          crawlSpeed={200} 
          height={3} 
          crawl={true} 
          showSpinner={false} 
          easing="ease" 
          speed={200} 
          shadow="0 0 10px #f43f5e,0 0 5px #f43f5e" 
        />

        {/* Your perfectly designed Header sits on top */}
        <Header />

        {/* Your Page Content (like the HeroCarousel) renders here */}
        {children}
        
      </body>
    </html>
  );
}