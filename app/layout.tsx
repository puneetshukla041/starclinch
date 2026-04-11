import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import { Header } from "@/components";
import Timer from "@/components/features/Popup";

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
      {}
      <body className={`${inter.className} bg-[#0A0A0B] text-white antialiased`}>
        
        {}
        <NextTopLoader 
          color="#f43f5e" 
          initialPosition={0.08} 
          crawlSpeed={200} 
          height={3} 
          crawl={true} 
          showSpinner={false} 
          easing="ease" 
          speed={200} 
          shadow="0 0 10px #f43f5e,0 0 5px #f43f5e" 
        />

        {}
        <Header />
        <Timer />

        {}
        {children}
        
      </body>
    </html>
  );
}