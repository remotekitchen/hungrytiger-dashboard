import React from "react";
import { NavLink, useLocation } from "react-router-dom";
const About = () => {
  return (
    <section className="bg-gradient-to-b  text-white py-14 text-black ">
      <div className="container mx-auto text-center text-black">
        <header className="text-4xl font-bold mb-5">About ChatChef</header>
        <p className=" mb-8 text-black  text-xl">
          Welcome to ChatChef, the leading restaurant digital platform that
          specializes in creating authentic relationships between restaurants
          and their guests. <br /> We operate across web, mobile, and in-store
          channels to offer a seamless dining experience. From Los Angeles to
          Vancouver, <br />
          we are trusted by numerous restaurant chains across North America.
        </p>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg text-black w-50">
              <h2 className="text-2xl font-semibold">Our Mission</h2>
              <p className="mb-2 text-xl">
                Our mission is to empower restaurants to acquire new customers,
                boost visits and spending, and enhance customer loyalty and
                engagement. We aim to do this while optimizing operational costs
                and driving incremental revenue. We focus on delivering
                tailor-made solutions that perfectly align with your
                restaurant&apos;s unique needs and challenges.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-lg text-black w-50">
              <h2 className="text-2xl font-semibold">Our Vision</h2>
              <p className="mb-2 text-xl">
                Our vision is to revolutionize the restaurant industry by
                providing intelligent, data-driven solutions that not only
                improve customer engagement but also contribute to sustainable
                business growth. We envision a world where restaurants can
                effortlessly manage the guest journey through advanced
                technology, from online ordering to loyalty programs.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-12 mb-4">
          Our Recipe for Success
        </h2>
        <ul className="list-inside list-disc text-xl">
          <li>
            <b>Personalized Experience:</b> Offering fully white-labeled apps,
            websites, and kiosks to ensure your brand stands out.
          </li>
          <li>
            <b>Data-Driven Decisions:</b> Utilizing machine learning and CDP
            analytics to offer valuable insights about your customers.
          </li>
          <li>
            <b>Enhanced Customer Engagement:</b> Through loyalty programs, gift
            cards, and targeted campaigns, we help you turn guests into
            regulars.
          </li>
          <li>
            <b>Operational Efficiency:</b> Seamless integration with top-notch
            POS systems and payment processors for streamlined operations.
          </li>
        </ul>

        <NavLink
          to="/about-us"
          className="bg-blue-100 text-sky-400 py-3 px-8 rounded-full mt-12 inline-block hover:bg-blue-100 hover:text-blue-600 text-lg font-semibold transition duration-300 ease-in-out"
        >
          Learn More About Us
        </NavLink>
      </div>
    </section>
  );
};

export default About;
