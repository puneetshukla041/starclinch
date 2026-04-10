import {
  HeroSection,
  TrendingSection,
  FeaturedSquadsSection,
  SquadCarouselSection,
  RecentShowsSection,
  TeamSection,
} from "@/components";

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