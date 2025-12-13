import HeroSection from "../../containers/HomePage/Hero";
import LoremSection from "../../containers/HomePage/LoremSection";
import MonthlyRentals from "../../containers/HomePage/MonthlyRentals";
import PerfectSpace from "../../containers/HomePage/PerfectSpace";

export default function Home() {

  return (

    <div>
      <HeroSection />
      <MonthlyRentals />
      <PerfectSpace />
      <LoremSection />
    </div>
  )
}
