import React from "react";
import Banner from "./Banner";
import RecentArticles from "./RecentArticles/RecentArticles";
import AllBlogs from "./AllBlogs/AllBlogs";
import { Helmet } from "react-helmet";
import FooterHome from "../HomePage/components/FooterHome";
import ScrollToTop from "../ScrollToTop";
const Blogs = () => {
  return (
    <div>
      <ScrollToTop />
      <Helmet>
        <title>
          ChatChef Blog: Mastering Restaurant Loyalty & Digital Tools
        </title>
        <meta
          name="description"
          content="Explore ChatChef's blog for expert insights on restaurant loyalty programs, branding, digital menus, QR code menus, and restaurant apps. Elevate your dining experience and business strategy today."
        />
        <meta name="keywords" content="ChatChef, blog, restaurants" />
      </Helmet>
      {/* banner */}
      <Banner />
      {/* recent */}
      <RecentArticles />
      {/* all */}
      <AllBlogs />
      <FooterHome />
    </div>
  );
};

export default Blogs;
