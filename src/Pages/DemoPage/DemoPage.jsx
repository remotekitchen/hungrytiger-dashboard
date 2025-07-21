import React from "react";
import img1 from "./demopageimages/fullyinte.svg";
import img2 from "./demopageimages/customersup.svg";
import img3 from "./demopageimages/allinone.svg";
import { Helmet } from "react-helmet";
import FooterHome from "../HomePage/components/FooterHome";
import ScrollToTop from "../ScrollToTop";
const DemoPage = () => {
  const contactMethods = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
      contact: "200-13571 Commerce Parkway, Richmond, BC V6V2R2, CA.",
      title: "Our office",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      ),
      contact: "+1 236-239-6628",
      title: "Phone",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      ),
      contact: "+1 236-239-6988",
      title: "Customer Support",
    },
  ];

  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>
          Get a Demo: Experience ChatChef's All-in-One Restaurant Solutions
        </title>
        <meta
          name="description"
          content="Ready to elevate your restaurant's operations? Schedule a demo with ChatChef today to explore our fully integrated, customer-centric solutions. Rated 'Excellent' by Trustpilot and Capterra."
        />
        <meta name="keywords" content="ChatChef, about, restaurants" />
      </Helmet>
      <div className="flex flex-col items-top text-xl justify-center p-5 gap-10 sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row">
        <div>
          <iframe
            src="https://j8fgef9k0b.larksuite.com/scheduler/bf590664deb91d5c"
            title="Embedded Lark Suite Scheduler"
            width="500px"
            height="1000px"
          />
        </div>
        <div className="flex flex-col gap-10 max-w-[500px]">
          <div className="text-5xl font-bold text-left">
            OK, so, are we ready to get cooking?
          </div>
          <b className="text-left text-lg font-normal">
            We’re a friendly, flexible team offering fully customisable
            solutions to suit your needs. Get in touch with us today, we’d love
            to hear from you.
          </b>

          <div className="flex flex-col items-start justify-start">
            <div className="pb-5">
              <img
                className="h-[75px]"
                alt="chatchef demo fully intregrated"
                src={img1}
              />
            </div>
            <div className="flex flex-col gap-5">
              <div className="w-fit font-bold text-xl border-t-4 border-sky-400">
                Fully integrated
              </div>
              <div>
                Chatchef fully integrates with existing sales channels and
                hardware, so you don’t have to worry about juggling multiple
                devices and log-ins. It also accepts and process all payment
                types, lightning fast
              </div>
            </div>
            <div className="flex flex-col items-start justify-start">
              <div className="pb-5">
                <img
                  className="h-[75px]"
                  alt="chatchef demo Customer care"
                  src={img2}
                />
              </div>
              <div className="flex flex-col gap-5">
                <div className="w-fit font-bold text-xl border-t-4 border-sky-400">
                  Customer care (that really cares)
                </div>
                <div>
                  From set-up to ongoing assistance, our customer support is
                  excellent (no, really. We’re rated 'Excellent' by Trustpilot
                  and Capterra customers).
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start">
              <div className="pb-5">
                <img
                  className="h-[75px]"
                  alt="chatchef demo All-in-one"
                  src={img3}
                />
              </div>
              <div className="flex flex-col gap-5">
                <div className="w-fit font-bold text-xl border-t-4 border-sky-400">
                  All-in-one
                </div>
                <div>
                  Chatchef is an end-to-end solution, making your life easier
                  and your business more money through clear actionable
                  operational insight.
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="py-14">
          <div className="max-w-[1000px] mx-auto px-4 text-gray-600 md:px-8">
            <div className="max-w-xl space-y-3">
              <h3 className="text-sky-400 font-semibold">Contact</h3>
              <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                Let us know how we can help
              </p>
              <p>
                We’re here to help and answer any question you might have, We
                look forward to hearing from you .
              </p>
            </div>
            <div>
              <ul className="mt-12 flex flex-wrap gap-x-12 gap-y-6 items-center lg:gap-x-24">
                {contactMethods.map((item, idx) => (
                  <li key={idx}>
                    <h4 className="text-gray-800 text-lg font-medium">
                      {item.title}
                    </h4>
                    <div className="mt-3 flex items-center gap-x-3">
                      <div className="flex-none text-gray-400">{item.icon}</div>
                      <p>{item.contact}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
      <FooterHome />
    </>
  );
};
export default DemoPage;
