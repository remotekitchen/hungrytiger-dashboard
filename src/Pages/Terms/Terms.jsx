import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import FooterHome from "../HomePage/components/FooterHome";
import ScrollToTop from "../ScrollToTop";
const Terms = () => {
  const location = useLocation();
  const fullUrl = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;

  // State to store the value
  const [store, setStore] = useState("chatchef");

  useEffect(() => {
    if (fullUrl.includes("techchef")) {
      setStore("techchef");
    } else if (fullUrl.includes("chatchef")) {
      setStore("chatchef");
    }
  }, [fullUrl]);

  return (
    <div>
      <ScrollToTop />
      <Helmet>
        <title>
          ChatChef Terms and Conditions - Your Guide to Using Our Services
          Safely
        </title>
        <meta
          name="description"
          content="Read ChatChef' Terms and Conditions to understand the rules, policies, and guidelines for using our website and services. Stay informed and use our services responsibly."
        />
        <meta name="keywords" content="ChatChef, home, restaurants" />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
        <p className="text-sm mb-4">Last Updated: August 2023</p>

        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p className="mb-4">
          Welcome to ChatChef! These Terms and Conditions govern your use of our
          website located at{" "}
          {store === "chatchef"
            ? "sales@chatchefs.com"
            : store === "techchef"
            ? "techchefs.ca"
            : ""}{" "}
          and form a legally binding contract between you, the user of the
          website, and ChatChef, the owner of the website.
        </p>
        <p className="mb-4">
          By using our website, you agree to comply with and be bound by these
          Terms and Conditions. If you do not agree with these Terms and
          Conditions, you must cease usage of our website immediately.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Definitions</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Services refer to the offerings provided by ChatChef.</li>
          <li>
            Website refers to ChatChef, accessible from{" "}
            {store === "chatchef"
              ? "https://chatchefs.com"
              : store === "techchef"
              ? "https://techchefs.ca"
              : ""}
          </li>
          <li>
            You mean the individual accessing the Website, or the company, or
            other legal entity on behalf of which such individual is accessing
            or using the Website, as applicable.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">Access to the Website</h2>
        <p className="mb-4">
          Access to our website is permitted on a temporary basis, and we
          reserve the right to withdraw or amend the services we provide without
          notice.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          Changes to Terms and Conditions
        </h2>
        <p className="mb-4">
          We reserve the right to change, modify, or revise these Terms and
          Conditions at any time. Every time you use this website, the latest
          version of these Terms and Conditions will apply. We recommend that
          you check this page regularly to keep up-to-date.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Privacy Policy</h2>
        <p className="mb-4">
          For information about how we collect and use your personal
          information, please refer to our Privacy Policy available at
          {store === "chatchef"
            ? "https://chatchefs.com/privacy-policy"
            : store === "techchef"
            ? "https://techchefs.ca/privacy-policy"
            : ""}
          .
        </p>

        <h2 className="text-2xl font-semibold mb-2">Limitation of Liability</h2>
        <p className="mb-4">
          ChatChef will not be liable for any indirect, special, incidental, or
          consequential damages of any kind related to your use of the website.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Governing Law</h2>
        <p className="mb-4">
          These Terms and Conditions are governed by the laws of the
          jurisdiction where ChatChef is established.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="mb-4">
          For any questions about these Terms and Conditions, please contact us
          at{" "}
          {store === "chatchef"
            ? "sales@chatchefs.com"
            : store === "techchef"
            ? "techchefs.ca"
            : ""}
          .
        </p>
      </div>
      <FooterHome />
    </div>
  );
};

export default Terms;
