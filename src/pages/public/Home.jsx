import Title from "../../components/Title";
import HeroSection from "../../containers/HomePage/Hero";
import LoremSection from "../../containers/HomePage/LoremSection";
import MonthlyRentals from "../../containers/HomePage/MonthlyRentals";
import PerfectSpace from "../../containers/HomePage/PerfectSpace";

export default function Home() {

  return (
    <>
      <Title>
        <title>Alive Paris | Home</title>
        <meta name="description" content="This is the home page" />
        <meta name="keywords" content="react, seo, helmet" />
      </Title>
      <div>
        <HeroSection />
        <MonthlyRentals />
        <PerfectSpace />
        <LoremSection />
      </div>
    </>
  )
}
