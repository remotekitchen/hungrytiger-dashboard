import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink

import FooterLogo from "../HomePageImages/Chatchef3dlogo.webp";

const FooterHome = () => {
  return (
    <div>
      <footer className="footer p-10 text-base-content bg-blue-200 text-xl">
        <nav>
          <header className="footer-title">CHATCHEF</header>
          <NavLink to="/" className="link link-hover">
            Home
          </NavLink>
          <NavLink to="/getademo" className="link link-hover">
            Get a Demo
          </NavLink>
          <NavLink to="/pricing" className="link link-hover">
            Pricing
          </NavLink>
          <NavLink to="/free-digital-menu" className="link link-hover">
            Digital Menu
          </NavLink>
          <NavLink to="/customer-support" className="link link-hover">
            Support
          </NavLink>
        </nav>
        <nav>
          <header className="footer-title">OTHERS</header>
          <NavLink to="/blogs" className="link link-hover">
            Blogs
          </NavLink>
          {/* <NavLink to="/sitemap" className="link link-hover">Sitemap</NavLink> */}
        </nav>
        <nav>
          <header className="footer-title">COMPANY</header>
          <NavLink to="/about-us" className="link link-hover">
            About Us
          </NavLink>
          <NavLink to="/customer-support" className="link link-hover">
            Contact Us
          </NavLink>
          <NavLink to="/careers" className="link link-hover">
            Careers
          </NavLink>
          <NavLink to="/privacy-policy" className="link link-hover">
            Privacy Policy
          </NavLink>
          <NavLink to="/terms-and-conditions" className="link link-hover">
            Terms & Conditions
          </NavLink>
        </nav>
        <nav>
          <header className="footer-title">FOLLOW US</header>
          <a href="https://twitter.com/chatchefs" className="link link-hover">
            Twitter
          </a>
          <a href="https://facebook.com/chatchefs" className="link link-hover">
            Facebook
          </a>
          <a
            href="https://linkedin.com/company/chatchef"
            className="link link-hover"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/chatchefs/"
            className="link link-hover"
          >
            Instagram
          </a>
          <a
            href="https://www.youtube.com/channel/UCQzDUvT6EFh8HtHU8c1RqtA"
            className="link link-hover"
          >
            Youtube
          </a>
        </nav>
      </footer>
      <footer className="footer px-10 py-4 border-t  text-base-content border-base-300  bg-blue-200">
        <aside className="items-center grid-flow-col ">
          <img className="w-[50px] h-[50px] object-fill" src={FooterLogo} alt="chatchef logo"/>
          <p>
            <b>ChatChef</b>
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
        &copy; {new Date().getFullYear()} Remote Kitchen Inc. All rights
          reserved.
        </nav>
      </footer>
    </div>
  );
};

export default FooterHome;
