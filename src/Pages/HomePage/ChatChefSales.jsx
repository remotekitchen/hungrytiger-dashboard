import React from "react";
import {
  FaRocket,
  FaGlobe,
  FaCog,
  FaUsers,
  FaChartLine,
  FaHeadset,
  FaMobileAlt,
  FaHammer,
  FaCommentDots,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import FooterHome from "./components/FooterHome";
import ScrollToTop from "../ScrollToTop";
import { Helmet } from "react-helmet";
const ChatChefSales = () => {
  return (
    <>
      <ScrollToTop />

      <Helmet>
        <title>ChatChef: Boost Your Sales</title>
        <meta
          name="description"
          content="Unlock the Power of Modern Sales with ChatChef. In today's fast-paced food industry, staying ahead means embracing innovative solutions. ChatChef is here to revolutionize your sales strategy, ensuring you not only meet but exceed your business goals.
"
        />
        <meta name="keywords" content="ChatChef, blog, restaurants" />
      </Helmet>
      <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen py-12 px-8">
        {/* Why Choose ChatChef Section */}
        <section className="bg-white p-8 rounded-xl shadow-lg border border-gray-300 mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-blue-500 text-center">
            Why Choose ChatChef?
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xl">
            <li className="flex items-start">
              <FaRocket className="text-blue-500 mr-4 mt-1 " size={28} />
              <div>
                <strong>Growth-Centric Approach:</strong> We believe in the
                future. With ChatChef, it&apos;s not just about the sales you
                make today, but the exponential growth you&apos;ll experience
                tomorrow.
              </div>
            </li>
            <li className="flex items-start">
              <FaGlobe className="text-blue-500 mr-4 mt-1" size={28} />
              <div>
                <strong>Global Trustworthiness:</strong> Join a community of
                global food industry leaders who have experienced transformative
                results with ChatChef. Brands like Base Pizza have already
                reaped the benefits; now it&apos;s your turn.
              </div>
            </li>
            <li className="flex items-start">
              <FaCog className="text-blue-500 mr-4 mt-1" size={28} />
              <div>
                <strong>Automated Marketing Excellence:</strong> Dive into the
                world of automated marketing with our built-in tools. From
                loyalty campaigns to reactivation strategies, ChatChef ensures
                you&apos;re always a step ahead in the marketing game.
              </div>
            </li>
            <li className="flex items-start">
              <FaUsers className="text-blue-500 mr-4 mt-1" size={28} />
              <div>
                <strong>Deep Customer Insights:</strong> Personalization is the
                key to modern sales. With ChatChef, know your customers on a
                first-name basis, tailor your services, and craft marketing
                campaigns that resonate on a personal level.
              </div>
            </li>
            <li className="flex items-start">
              <FaChartLine className="text-blue-500 mr-4 mt-1" size={28} />
              <div>
                <strong>Expert Marketing Assistance:</strong> Need a hand with
                your marketing strategy? Our team of experts is ready to assist,
                from SEO optimization to bespoke social media campaigns.
                Let&apos;s turn your restaurant into the talk of the town.
              </div>
            </li>
            <li className="flex items-start">
              <FaMobileAlt className="text-blue-500 mr-4 mt-1" size={28} />
              <div>
                <strong>Transition to Digital:</strong> In the digital age,
                online orders are the gold standard. Our tools ensure a seamless
                transition from phone to online, maximizing order values and
                enhancing customer experience.
              </div>
            </li>
            <li className="flex items-start">
              <FaHammer className="text-blue-500 mr-4 mt-1" size={28} />
              <div>
                <strong>Optimize for Success:</strong> Take control with
                ChatChef. Promote your best sellers, introduce tantalizing
                offers, and gain insights from comprehensive data analytics.
                Your menu, your rules.
              </div>
            </li>
            <li className="flex items-start">
              <FaCommentDots className="text-blue-500 mr-4 mt-1" size={28} />
              <div>
                <strong>Stay Connected:</strong> In the world of sales,
                communication is king. ChatChef offers a plethora of
                communication tools, ensuring your customers are always in the
                loop and fostering long-term loyalty.
              </div>
            </li>
          </ul>
        </section>

        {/* Elevate Your Sales Strategy Section */}
        <section className=" bg-sky-500 p-8 rounded-xl shadow-lg mb-12 text-center text-white">
          <h2 className="text-3xl font-semibold mb-6">
            Ready to Elevate Your Sales Strategy?
          </h2>
          <p className="text-xl mb-6">
            Dive into the world of ChatChef and experience sales like never
            before. With our suite of tools and dedicated support, your business
            is poised for unparalleled success.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 rounded-full px-6 py-2 hover:bg-gray-300 transition duration-300">
              <NavLink to="/pricing">Explore Pricing</NavLink>
            </button>
            <button className="bg-white text-blue-600 rounded-full px-6 py-2 hover:bg-gray-300 transition duration-300">
              <NavLink to="/blogs">Read Our Blogs</NavLink>
            </button>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="text-center">
          <p className="text-2xl text-gray-800 font-semibold">
            Let your sales soar with ChatChef. Your success story starts here.
          </p>
        </section>
      </div>
      <FooterHome />
    </>
  );
};

export default ChatChefSales;
