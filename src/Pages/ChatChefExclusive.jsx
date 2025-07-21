import React from 'react';
import NewsletterSectionTest from './HomePage/components/NewsletterSectionTest';
import { useState } from 'react';
import FooterHome from './HomePage/components/FooterHome';
import ScrollToTop from './ScrollToTop';
import { Helmet } from 'react-helmet';

const ChatChefExclusive = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setSubscribed(true);
      setEmail(""); // Clear the email field
    }
  };

  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>ChatChef Exclusive: Mastering the Culinary Digital Landscape</title>
        <meta name="description" content="Explore ChatChef's handpicked content, offering deep dives into digital restaurant strategies, success stories, and industry trends. Unlock the secrets to culinary digital mastery and drive your restaurant's success." />
        <meta name="keywords" content="ChatChef, Career, restaurants" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 md:px-0">

        {/* Page Header */}
        <header className="text-center space-y-8 mb-20">
          <h1 className="text-6xl font-extrabold text-sky-700 tracking-tight">ChatChef Exclusive Content</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">Your Portal to Culinary Digital Mastery</p>
        </header>

        {/* Exclusive Content Introduction */}
        <section className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl mx-auto mb-20 transform hover:scale-105 transition-transform duration-300 space-y-6">
          <h2 className="text-3xl font-bold mb-6">ChatChef Exclusive Content</h2>
          <p className="text-lg leading-relaxed font-light">
            Dive into a curated selection of articles, case studies, tutorials, and behind-the-scenes looks that encapsulate the essence of ChatChef. This section is dedicated to our partners and enthusiasts seeking to harness the full potential of the digital restaurant realm.
          </p>
          <button className="bg-sky-700 text-white rounded-full px-8 py-3 hover:bg-sky-600 transition-all duration-300"> <a href="https://drive.google.com/file/d/12MzWOkbZccsuAv9jt9vSNmH1niaci2Oz/view?usp=share_link">Download Now</a></button>
        </section>

        {/* Featured Content */}
        <section className="bg-indigo-100 p-8 rounded-xl shadow-2xl max-w-4xl mx-auto mb-20 space-y-6">
          <h3 className="text-2xl font-bold mb-4">Featured Content</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Success Stories: Celebrate with us...</li>
            <li>Tech Tutorials: From setting up...</li>
            <li>Industry News & Updates: Stay abreast...</li>
            <li>ChatChef Spotlights: Get to know the minds...</li>
          </ul>
        </section>

        {/* Deep Dive Workshops */}
        <section className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl mx-auto mb-20 transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-bold mb-6">Deep Dive Workshops</h3>
          <p className="text-lg leading-relaxed font-light">
            Exclusively for our partners, we host monthly workshops that delve into advanced features, marketing strategies, and best practices. Register today and elevate your restaurant's digital prowess.
          </p>

        </section>

        {/* Share Your Story */}
        <section className="bg-indigo-100 p-8 rounded-xl shadow-2xl max-w-4xl mx-auto mb-20">
          <h3 className="text-2xl font-bold mb-6">Share Your Story</h3>
          <p className="text-lg leading-relaxed font-light">
            Have a ChatChef success story or feedback? We're all ears! Join our community forum or reach out to our team. Your insights inspire us and many others in our community.
          </p>
        </section>



        <div className="mx-auto max-w-[1500px] p-8 max-w-4xl mx-auto bg-white">
          <section className="flex flex-col items-center p-20 bg-sky-100">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold mb-6">Stay Updated</h3>
              <h3 className="text-lg leading-relaxed font-light">
                Don't miss out on any exclusives! Subscribe to our newsletter and be the first to receive updates, special offers, and more.
              </h3>

              {/* Mailchimp form */}
              <div id="mc_embed_signup" className="mt-6 w-full max-w-md">
                <form
                  action="https://chatchefs.us10.list-manage.com/subscribe/post?u=abdc1ce4a2930ec88721980f7&amp;id=c79a42c9e4&amp;f_id=00acd5e5f0"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  className="validate flex items-center"
                  target="_blank"
                >
                  <input
                    type="email"
                    name="EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="required email flex-grow px-3 py-2 mr-2 text-gray-700 border rounded-lg focus:outline-none"
                    id="mce-EMAIL"
                    placeholder="Enter your email"
                    required
                  />
                  <input
                    type="submit"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="button hover:bg-sky-500  text-black bg-yellow-400  font-bold py-2 px-4 rounded"
                    value="Subscribe"
                  />
                  <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
                    <input type="text" name="b_abdc1ce4a2930ec88721980f7_c79a42c9e4" tabIndex="-1" />
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>

      </div>
      <FooterHome />
    </>
  );
};

export default ChatChefExclusive;
