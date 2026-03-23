import Title from "../../components/Title";
import About from "../../containers/HomePage/About";
import AboutSection from "../../containers/HomePage/AboutSection";
import CitiesSection from "../../containers/HomePage/CitiesSection";
import FAQSection from "../../containers/HomePage/FaqSection";
import FeedbackSection from "../../containers/HomePage/FeedbackSection";
import HeroSection from "../../containers/HomePage/Hero";
// import HeroSection from "../../containers/HomePage/Hero";
import Heroone from "../../containers/HomePage/Heroone";
import LoremSection from "../../containers/HomePage/LoremSection";
import MonthlyRentals from "../../containers/HomePage/MonthlyRentals";
import PerfectSpace from "../../containers/HomePage/PerfectSpace";
import PropertiesSection from "../../containers/HomePage/PropertiesSection";
import StickyWrapper from "../../gsap/StickyWrapper";

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
        <About />
        {/* <Heroone /> */}
        {/* <AboutSection/> */}
        <CitiesSection />
        <PropertiesSection />   {/* ← has its own 200vh wrapper + sticky inside */}
        <FeedbackSection />     {/* ← slides over PropertiesSection naturally */}
        <FAQSection />

        {/* <MonthlyRentals /> */}
        {/* <PerfectSpace /> */}
        {/* <LoremSection /> */}
      </div>
    </>
  )
}
