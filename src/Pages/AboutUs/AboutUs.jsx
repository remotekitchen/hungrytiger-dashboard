import React from "react";
import { NavLink } from "react-router-dom";
import Sec1Img from "../AboutUs/AboutUsImages/chatchef_who.jpg";
import Sec2Img from "../AboutUs/AboutUsImages/chatchef_mission.jpg";
import Sec3Img from "../AboutUs/AboutUsImages/chatchef_vision.jpg";
import Sec4Img from "../AboutUs/AboutUsImages/chatchef_why chose.jpg";
import Sec5Img from "../AboutUs/AboutUsImages/chatchef_service.jpg";
import Sec6Img from "../AboutUs/AboutUsImages/chatchef_gif.gif";
import { Helmet } from "react-helmet";
import Sec7Img from "../AboutUs/AboutUsImages/chatchef_datadriven.jpg";
import Sec8Img from "../AboutUs/AboutUsImages/chatchef_flex.jpg";
import Sec9Img from "../HomePage/HomePageImages/whitelabel.webp";
import FooterHome from "../HomePage/components/FooterHome";
import banner from "../HomePage/HomePageImages/banner.webp";
import ScrollToTop from "../ScrollToTop";
const AboutPage = () => {
  return (
    <>
      <ScrollToTop />

      <Helmet>
        <title>ChatChef: Tech-Driven Restaurant Loyalty & Engagement</title>
        <meta
          name="description"
          content="Discover ChatChef – the premier platform for tailor-made restaurant loyalty programs. Boost revenue, enhance customer connections, and drive digital growth."
        />
        <meta
          name="keywords"
          content="chatchef, Chat chef, restaurant loyalty programs, loyalty program for restaurant, customer loyalty program"
        />
      </Helmet>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 md:px-8"></div>

        {/* Banner */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold m-4">
            Redefining Restaurant Loyalty: Where Technology Meets Authentic
            Engagement
          </h1>
          <img src={banner} alt="Banner" className="mx-auto w-3/2" />
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full">
            <NavLink to="/getademo">Book Demo</NavLink>
          </button>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full">
            <NavLink to="/pricing">Pricing</NavLink>
          </button>
        </div>

        {/* Left Image, Right Text */}
        <div className="flex flex-col md:flex-row justify-center items-center mx-auto my-8">
          <img
            className="w-48 md:w-72 h-48 md:h-72 object-cover rounded-full mb-4 md:mb-0 md:mr-6"
            src={Sec1Img}
            alt="community"
          />
          <div className="bg-gray rounded-xl flex flex-col py-5 px-5 box-border items-start justify-start gap-[30px] max-w-[500px]">
            <h2 className="text-3xl">Who We Are</h2>
            <p className="text-xl leading-[20px] text-dimgray m-0 break-words">
              Welcome to ChatChef, the ultimate destination for restaurant
              owners looking to forge lifelong loyalty with their customers. We
              specialize in creating tailor-made loyalty programs for
              restaurants that not only enhance customer engagement but also
              drive incremental revenue.
            </p>
          </div>
        </div>

        {/* Right Text, Left Image */}
        <div className="flex flex-col-reverse md:flex-row justify-center items-center mx-auto my-8">
          <div className="bg-gray rounded-xl flex flex-col py-5 px-5 box-border items-start justify-start gap-[30px] max-w-[500px] mb-4 md:mb-0 md:mr-6">
            <h2 className="text-3xl">Our Mission</h2>
            <p className="text-xl leading-[20px] text-dimgray m-0 break-words">
              At ChatChef, our mission is to foster authentic relationships and
              encourage seamless collaboration between restaurants and their
              patrons. We believe that the essence of growth lies in strong,
              meaningful connections, and we&apos;re here to help you build
              them.
            </p>
          </div>
          <img
            className="w-48 md:w-72 h-48 md:h-72 object-cover rounded-full"
            src={Sec2Img}
            alt="community"
          />
        </div>

        {/* Left Image, Right Text */}
        <div className="flex flex-col md:flex-row justify-center items-center mx-auto my-8">
          <img
            className="w-48 md:w-72 h-48 md:h-72 object-cover rounded-full mb-4 md:mb-0 md:mr-6"
            src={Sec3Img}
            alt="community"
          />
          <div className="bg-gray rounded-xl flex flex-col py-5 px-5 box-border items-start justify-start gap-[30px] max-w-[500px]">
            <h2 className="text-3xl">Our Vision</h2>
            <p className="text-xl leading-[20px] text-dimgray m-0 break-words">
              Our vision is to be the leading digital platform for restaurant
              loyalty programs, operating seamlessly across web, mobile, and
              in-store channels. We aim to revolutionize the way restaurants
              engage with their customers, making every interaction a step
              towards a lasting relationship.
            </p>
          </div>
        </div>

        {/* Right Text, Left Image */}
        <div className="flex flex-col-reverse md:flex-row justify-center items-center mx-auto my-8">
          <div className="bg-gray rounded-xl flex flex-col py-5 px-5 box-border items-start justify-start gap-[30px] max-w-[500px] mb-4 md:mb-0 md:mr-6">
            <h2 className="text-3xl">Why Choose ChatChef</h2>
            <p className="text-xl leading-[20px] text-dimgray m-0 break-words">
              Choosing ChatChef means opting for a comprehensive, data-driven
              approach to customer engagement. Our platform is beloved and
              utilized by restaurant chains all over North America. With an
              average order value 20% higher than in-person or phone-in orders,
              we&apos;ve seen revenue boosts as high as 64%.
            </p>
          </div>
          <img
            className="w-48 md:w-72 h-48 md:h-72 object-cover rounded-full"
            src={Sec4Img}
            alt="community"
          />
        </div>

        {/* Services */}
        <div className="flex flex-col md:flex-row justify-center items-center mx-auto my-8">
          <img
            className="w-48 md:w-72 h-48 md:h-72 object-cover rounded-full mb-4 md:mb-0 md:mr-6"
            src={Sec5Img}
            alt="community"
          />
          <div className="bg-gray rounded-xl overflow-hidden flex flex-col py-5 px-5 box-border items-start justify-start gap-[30px] max-w-[500px]">
            <h2 className="text-3xl">Our Services</h2>
            <div className="text-sm leading-[20px] text-dimgray grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Online Ordering */}
              <div className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-4">
                <i className="fas fa-utensils text-blue-500 "></i>
                <div>
                  <h3 className="font-bold text-xl">Online Ordering</h3>
                  <p className=" text-xl">
                    {" "}
                    Simplify the dining experience with our intuitive online
                    ordering system.
                  </p>
                </div>
              </div>

              {/* Card 2: Personalized White-Label Apps */}
              <div className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-4">
                <i className="fas fa-mobile-alt text-blue-500"></i>
                <div>
                  <h3 className="font-bold  text-xl">
                    Personalized White-Label Apps
                  </h3>
                  <p className=" text-xl">
                    Customize your app to reflect your brand&apos;s unique
                    identity.
                  </p>
                </div>
              </div>

              {/* Card 3: Loyalty Programs */}
              <div className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-4">
                <i className="fas fa-star text-blue-500"></i>
                <div>
                  <h3 className="font-bold  text-xl">Loyalty Programs</h3>
                  <p className=" text-xl">
                    Transform one-time guests into regular patrons with our
                    engaging loyalty programs.
                  </p>
                </div>
              </div>

              {/* Card 4: Gift Cards and Upsells */}
              <div className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-4">
                <i className="fas fa-gift text-blue-500"></i>
                <div>
                  <h3 className="font-bold  text-xl">Gift Cards and Upsells</h3>
                  <p className=" text-xl">
                    Utilize intelligent machine learning to offer timely gift
                    cards and upsells.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="m-20 text-center">
          <h2 className="text-2xl font-bold mt-4 ">
            Ready to transform your restaurant&apos;s customer engagement
            strategy?
          </h2>
          <p className="text-gray-600 mt-2  text-xl">
            Get a{" "}
            <span className="text-blue-500 font-bold">
              <NavLink to="/getademo">Free Demo</NavLink>
            </span>{" "}
            today for a personalized demo and see how ChatChef can serve your
            success.
          </p>
        </div>

        <FooterHome />
      </div>
    </>
  );
};

export default AboutPage;
