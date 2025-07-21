import PaymentSec from "./components/PaymentSec";
import SloganPricing from "./components/SloganPricing";
import PricingFeatures from "./components/PricingFeatures";
import PricingSecTest from "./components/PricingSecTest";
import PaymentAddons from "./components/PaymentAddons";
import VirtualBrandPricing from "./components/VirtualBrandPricing";
import { Helmet } from "react-helmet";
import FooterHome from "../HomePage/components/FooterHome";
import ScrollToTop from "../ScrollToTop";

const PricingPage = () => {
  return (
    <div>
      <ScrollToTop />
      <Helmet>
        <title>
          ChatChef Pricing: Tailored Plans for Every Restaurant's Needs
        </title>
        <meta
          name="description"
          content="Explore ChatChef's flexible pricing options for restaurants. From essential packages to VIP plans, we offer features like order management, analytics, and loyalty programs to fit your budget and needs."
        />
        <meta name="keywords" content="ChatChef, pricing, restaurants" />
      </Helmet>
      <div className="flex flex-col gap-10">
        <div>
          <PricingSecTest />
        </div>
        <div>
          <VirtualBrandPricing />
        </div>
        <div>
          <PaymentAddons />
        </div>
        <div>
          <PaymentSec />
        </div>
        <div>
          <SloganPricing />
        </div>
        <div>
          <PricingFeatures />
        </div>
      </div>
      <FooterHome />
    </div>
  );
};

export default PricingPage;
