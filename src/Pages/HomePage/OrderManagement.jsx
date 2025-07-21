import React from "react";
import { NavLink } from "react-router-dom";
import FooterHome from "./components/FooterHome";
import ScrollToTop from "../ScrollToTop";
const OrderManagement = () => {
  return (
    <>
      <ScrollToTop />
      <div className="bg-sky-100 min-h-screen py-10">
        <header className="bg-cover h-72 flex items-center justify-center bg-sky-500">
          <h1 className="text-4xl text-white font-bold">
            Order Management System
          </h1>
        </header>

        <div className="max-w-6xl mx-auto p-8 space-y-10">
          <section className="text-center mb-10">
            <p className="text-xl mb-4 text-sky-900">
              In the heart of every successful restaurant lies an efficient
              order management system. As the digital age propels us forward,
              the online food ordering system stands out as the cornerstone of
              modern dining. Simplify and streamline your ordering process with
              our state-of-the-art solutions.
            </p>
          </section>

          {/* Features */}
          <section className="bg-white p-6 rounded-xl shadow-lg border border-sky-300 space-y-4">
            <h2 className="text-2xl font-semibold mb-4 text-sky-600">
              Features of Our Online Food Ordering System:
            </h2>
            <ul className="list-decimal pl-5 text-sky-800">
              <li className="mb-4 text-xl">
                <strong>User-Friendly Interface:</strong>
                <ul className="list-disc pl-5">
                  <li>Easy-to-navigate website and app design</li>
                  <li>Clear, visually appealing menu displays</li>
                  <li>Quick and intuitive order customization</li>
                </ul>
              </li>
              <li className="mb-4 text-xl">
                <strong>Efficient Order Processing:</strong>
                <ul className="list-disc pl-5">
                  <li>Real-time order notifications</li>
                  <li>Direct integration with kitchen displays</li>
                  <li>Reduced wait times and increased order accuracy</li>
                </ul>
              </li>
              <li className="mb-4 text-xl">
                <strong>Multi-Platform Support:</strong>
                <ul className="list-disc pl-5">
                  <li>Mobile apps for both iOS and Android</li>
                  <li>Self-service kiosks for quick orders</li>
                  <li>Table-side ordering for a unique dine-in experience</li>
                </ul>
              </li>
              <li className="mb-4 text-xl">
                <strong>Data-Driven Insights:</strong>
                <ul className="list-disc pl-5">
                  <li>Track popular dishes and peak ordering times</li>
                  <li>Understand customer preferences and behavior</li>
                  <li>Predict future trends to stay ahead of the curve</li>
                </ul>
              </li>
              <li className="mb-4 text-xl">
                <strong>Seamless Integrations:</strong>
                <ul className="list-disc pl-5">
                  <li>Connect with POS systems for streamlined operations</li>
                  <li>Integrate with loyalty programs and CRM tools</li>
                  <li>Offer personalized deals and gather valuable feedback</li>
                </ul>
              </li>

              {/* ...Repeat the pattern for other feature points... */}
            </ul>
          </section>

          {/* Benefits */}
          <section className="bg-white p-6 rounded-xl shadow-lg border border-sky-300 space-y-4">
            <h2 className="text-2xl font-semibold mb-4 text-sky-600">
              Benefits for Your Business:
            </h2>
            <ul className="list-disc pl-5 text-sky-800  text-xl">
              <li className="mb-4">
                Boosted Revenues: Increase your sales with a system designed to
                drive conversions.
              </li>
              <li className="mb-4">
                Enhanced Customer Experience: Offer a seamless ordering process
                that keeps customers coming back.
              </li>
              <li className="mb-4">
                Operational Efficiency: Reduce manual errors and optimize
                kitchen operations.
              </li>
            </ul>
          </section>

          {/* Pricing */}
          <section className="bg-white p-6 rounded-xl shadow-lg border border-sky-300 space-y-4">
            <h2 className="text-2xl font-semibold mb-4 text-sky-600">
              Pricing
            </h2>
            <p className="text-xl text-sky-900">
              Investing in the right system is crucial. Discover our transparent
              pricing models.
            </p>
            <button className="bg-sky-500 text-white rounded-full px-8 py-2 mt-4 hover:bg-sky-600 text-2xl">
              <NavLink to="/pricing">View Pricing</NavLink>
            </button>
          </section>

          {/* Stay Updated */}
          <section className="bg-white p-6 rounded-xl shadow-lg border border-sky-300 space-y-4">
            <h2 className="text-2xl font-semibold mb-4 text-sky-600">
              Stay Updated
            </h2>
            <p className="text-xl text-sky-900">
              Stay informed of the latest trends from our experts. Dive into our
              blogs.
            </p>
            <button className="bg-sky-500 text-white rounded-full px-8 py-2 mt-4 hover:bg-sky-600 text-2xl">
              <NavLink to="/blogs">Read Blog</NavLink>
            </button>
          </section>

          {/* Testimonials */}
          {/* <section className="bg-white p-6 rounded-xl shadow-lg border border-sky-300 space-y-4"> */}
          {/* <h2 className="text-2xl font-semibold mb-4 text-sky-600">Testimonials</h2> */}
          {/* ...[content]... */}
          {/* </section> */}

          {/* Get Started Today */}
          <section className="bg-white p-6 rounded-xl shadow-lg border border-sky-300 space-y-4">
            <h2 className="text-2xl font-semibold mb-4 text-sky-600">
              Get Started Today
            </h2>
            <p className="text-xl text-sky-900">
              Ready to revolutionize your restaurant? Request a demo.
            </p>
            <button className="bg-sky-500 text-white rounded-full px-8 py-2 mt-4 hover:bg-sky-600 text-2xl">
              <NavLink to="/getademo">Request Demo</NavLink>
            </button>
          </section>
        </div>
      </div>

      <FooterHome />
    </>
  );
};

export default OrderManagement;
