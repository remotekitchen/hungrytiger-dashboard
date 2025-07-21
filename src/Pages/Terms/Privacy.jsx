import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FooterHome from "../HomePage/components/FooterHome";
import ScrollToTop from "../ScrollToTop";

const Privacy = () => {
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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p className="mb-4">
          This Privacy Policy outlines the services provided by ChatChef
          (“ChatChef”, “we”, “us”, or “our”). ChatChef is committed to
          protecting your privacy and ensuring that your personal data is
          handled in a safe and responsible manner.
        </p>
        <p className="mb-4">
          This document explains how we comply with the General Data Protection
          Regulation (No. 2016/679) (“GDPR”), the Data Protection Act 2018, and
          other relevant laws (collectively referred to as “Data Protection
          Laws”). In this Privacy Policy, the terms “controller”, “personal
          data”, and “process” have the meanings given to them in Data
          Protection Laws.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          Personal Data We Collect
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            Contact Information: Such as your name, email address, and phone
            number.
          </li>
          <li>Order Information: Such as the services you purchase from us.</li>
          <li>
            Automatically Collected Information: Such as IP addresses, browser
            type, and other device-related information.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">
          How We Use Your Personal Data
        </h2>
        <p className="mb-4">
          We use your personal data for various purposes, including:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            To provide our services: Such as processing your orders and
            providing customer support.
          </li>
          <li>
            To communicate with you: Such as sending service-related
            announcements.
          </li>
          <li>
            For marketing purposes: If you have opted in to receive marketing
            communications.
          </li>
          <li>
            For analytics and improvement: To understand how you use our
            services and to make improvements.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">
          Legal Basis for Processing
        </h2>
        <p className="mb-4">
          We process your personal data on the following legal bases:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Contractual necessity: For providing the services you have
            requested.
          </li>
          <li>
            Legitimate interests: For purposes such as analytics, improving our
            services, and for marketing.
          </li>
          <li>
            Consent: Where you have explicitly given us permission to process
            your personal data for specific purposes.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">
          Data Sharing and Transfers
        </h2>
        <p className="mb-4">
          We may share your personal data with third-party service providers who
          perform services on our behalf, such as payment processors and email
          service providers. We may also share your personal data if required by
          law, or in the context of a business transfer like a merger or
          acquisition.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Data Retention</h2>
        <p className="mb-4">
          We retain your personal data for as long as necessary to fulfill the
          purposes for which it was collected, or as required by applicable
          laws.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal data.
          You also have the right to restrict and object to the processing of
          your data. To exercise these rights, you can contact us at
          {store === "chatchef"
            ? "sales@chatchefs.com"
            : store === "techchef"
            ? "techchefs.ca"
            : ""}
          .
        </p>

        <h2 className="text-2xl font-semibold mb-2">Third-Party Links</h2>
        <p className="mb-4">
          Our website may contain links to other websites. We are not
          responsible for the privacy practices of these websites.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by updating the “Last Modified” date at the end of
          this Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="mb-4">
          For any questions about this Privacy Policy or your personal data,
          please contact us at{" "}
          {store === "chatchef"
            ? "sales@chatchefs.com"
            : store === "techchef"
            ? "techchefs.ca"
            : ""}
          .
        </p>

        <p className="text-sm">
          Last Modified: This Privacy Policy was last updated in August 2023.
        </p>
      </div>
      <FooterHome />
    </div>
  );
};

export default Privacy;
