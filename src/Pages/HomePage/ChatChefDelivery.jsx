import React from "react";
import {
  FaTruck,
  FaDollarSign,
  FaGlobe,
  FaTools,
  FaQuoteLeft,
  FaRocket,
} from "react-icons/fa";
import FooterHome from "./components/FooterHome";
import { NavLink } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";

const ChatChefDelivery = () => {
  return (
    <>
      <ScrollToTop />
      <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-8">
        {/* Header Section */}
        <section className="bg-sky-500 text-white rounded-xl shadow-lg p-4 md:p-8 mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Hassle-Free Delivery with ChatChef
          </h1>
          <h2 className="text-xl md:text-3xl mb-6">
            Your Partner in Commission-Free Deliveries
          </h2>
          <p className="mb-6">
            Welcome to ChatChef, where we believe in empowering food businesses
            with hassle-free, commission-free delivery solutions. Dive into a
            world where every order is a step towards greater profitability and
            customer satisfaction.
          </p>
          <button className="bg-white text-blue-600 rounded-full px-4 md:px-6 py-2 hover:bg-gray-200 transition duration-300">
            <NavLink to="/getademo">Book a demo</NavLink>
          </button>
        </section>
        {/* Why Choose ChatChef */}
        <section className="bg-white p-4 md:p-8 rounded-xl shadow-lg mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-blue-500 text-center">
            Why Choose ChatChef?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xl">
            <div className="flex flex-col items-center">
              <FaTools className="mb-4 text-blue-500" size={48} />
              <strong>Truly Hassle-Free</strong>
              <p>Setting up your delivery system is a breeze with ChatChef.</p>
            </div>
            <div className="flex flex-col items-center">
              <FaDollarSign className="mb-4 text-blue-500" size={48} />
              <strong>No Hidden Commissions</strong>
              <p>
                Every penny you earn is yours. Transparent pricing ensures you
                get the full value of every order.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FaGlobe className="mb-4 text-blue-500" size={48} />
              <strong>Trusted Globally</strong>
              <p>
                Join thousands of food businesses worldwide that trust ChatChef
                for their delivery needs.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="p-4 md:p-8 mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-blue-500">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xl">
            <div>
              <strong>Integrated Delivery Solutions:</strong>
              <p>
                Whether you have your own fleet or need a partner, ChatChef
                integrates with various delivery partners ensuring timely
                deliveries every time.
              </p>
            </div>
            <div>
              <strong>Automated Order Management:</strong>
              <p>
                All orders flow directly into the ChatChef Point of Sale system,
                eliminating manual entries and reducing errors.
              </p>
            </div>
            <div>
              <strong>Customizable Delivery Zones:</strong>
              <p>
                Define zones, set minimum order amounts, and customize delivery
                charges as per your business needs.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-blue-50 p-4 md:p-8 rounded-xl shadow-lg mb-12 flex flex-col sm:flex-row items-center text-xl">
          <FaQuoteLeft
            className="text-blue-500 mb-4 sm:mb-0 sm:mr-4"
            size={28}
          />
          <blockquote className="flex-grow">
            &quot;ChatChef has revolutionized our delivery process. It&apos;s
            efficient, easy to use, and has opened doors to customers we might
            have missed otherwise.&quot;
            <cite className="block mt-2 font-semibold">
              - Tom Salt, Executive Head Chef, Manicomio
            </cite>
          </blockquote>
        </section>

        {/* Take Control */}
        <section className="bg-sky-500 text-white rounded-xl p-4 md:p-8 mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Take Control of Your Deliveries
          </h2>
          <p className="mb-6 text-xl">
            Don&apos;t let commissions eat into your profits. Experience a
            delivery system designed for your business&apos;s growth with
            ChatChef.
          </p>
          <button className="bg-white text-blue-600 rounded-full px-4 md:px-6 py-2 hover:bg-gray-200 transition duration-300">
            <NavLink to="/getademo">Get Started</NavLink>
          </button>
        </section>

        {/* Resources & Partnerships */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
          {/* Resources */}
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-blue-500">
              Resources
            </h2>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/pricing"
                  className="underline hover:text-blue-600"
                >
                  Pricing
                </NavLink>
              </li>
              <li>
                <NavLink to="/blogs" className="underline hover:text-blue-600">
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/support"
                  className="underline hover:text-blue-600"
                >
                  Support
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/documentation"
                  className="underline hover:text-blue-600"
                >
                  Documentation
                </NavLink>
              </li>
              <li>
                <NavLink to="/faqs" className="underline hover:text-blue-600">
                  FAQs
                </NavLink>
              </li>
            </ul>
          </div>
          {/* Partnerships */}
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-blue-500">
              Partnerships
            </h2>
            <p>
              Looking for a delivery partner that aligns with your needs?
              ChatChef collaborates with a wide range of delivery partners
              globally. Find the perfect match for your business.
            </p>
          </div>
        </section>
      </div>
      <FooterHome />
    </>
  );
};

export default ChatChefDelivery;
