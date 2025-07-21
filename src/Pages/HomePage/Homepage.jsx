import HeroSection from "./components/HeroSection";
import SloganSection from "./components/SloganSection";
import FeaturesSection from "./components/FeaturesSection";
import AutoScroll from "./components/AutoScrollSec";
import ChatwithCSM from "./components/ChatwithCSM";
import FooterHome from "./components/FooterHome";
import NewsletterSectionTest from "./components/NewsletterSectionTest";
import { Helmet } from "react-helmet";
import CardsHome from "./components/CardsHome";
import About from "./components/About";
import Carousel from "./components/Carousel";
import ScrollToTop from "../ScrollToTop";
const Homepage = () => {
  return (
    <div>
      <ScrollToTop />
      <Helmet>
        <title>
          ChatChef - Boost your revenue with restaurant loyalty programs
        </title>
        <meta
          name="description"
          content="ChatChef specializes in creating custom restaurant loyalty programs . Boost revenue and customer loyalty with our data-driven solutions. Get a demo today!"
        />
        <meta
          name="keywords"
          content="chatchef, Chat chef, restaurant loyalty programs, loyalty program for restaurant, customer loyalty program"
        />
      </Helmet>
      <div className="flex flex-col gap-10">
        <div>
          <HeroSection />
        </div>
        <div>
          <AutoScroll />
        </div>
        <div>
          <CardsHome />
        </div>
        <div>
          <SloganSection />
        </div>
        <div>
          <FeaturesSection />
        </div>
        <div>
          <About />
        </div>
        <div>
          <Carousel />
        </div>
        <div>
          <ChatwithCSM />
        </div>
        {/* <div>
      <FreeDemoSection />
      </div> */}
        {/* <div>
        <NewsletterSection />
      </div> */}
        <div>
          <NewsletterSectionTest />
        </div>

        <div>
          <FooterHome />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
