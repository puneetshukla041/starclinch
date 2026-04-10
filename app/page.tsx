import Home from "@/components/home";
import Trending from "@/components/trending";
import Active from "@/components/active";
import Squad from "@/components/squad";
import Recent from "@/components/recent";

export default function Page() {
  return (
    <>
      <Home />
      <Trending />
      <Active/>
      <Squad />
      <Recent />
    </>
  );
}