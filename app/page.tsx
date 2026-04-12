import dynamic from "next/dynamic";
import { HeroSection } from "@/components";

const TrendingSection = dynamic(
  () => import("@/components/sections/TrendingSection"),
  { loading: () => <div className="min-h-[40vh]" /> }
);
const FeaturedSquadsSection = dynamic(
  () => import("@/components/sections/FeaturedSquadsSection"),
  { loading: () => <div className="min-h-[40vh]" /> }
);
const SquadCarouselSection = dynamic(
  () => import("@/components/sections/SquadCarouselSection"),
  { loading: () => <div className="min-h-[40vh]" /> }
);
const RecentShowsSection = dynamic(
  () => import("@/components/sections/RecentShowsSection"),
  { loading: () => <div className="min-h-[40vh]" /> }
);
const TeamSection = dynamic(
  () => import("@/components/sections/TeamSection"),
  { loading: () => <div className="min-h-[40vh]" /> }
);

export default function Page() {
  return (
    <main>
      <HeroSection />
      <TrendingSection />
      <FeaturedSquadsSection />
      <SquadCarouselSection />
      <RecentShowsSection />
      <TeamSection />
    </main>
  );
}