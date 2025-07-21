import React from 'react';
import { NavLink } from "react-router-dom";
import ScrollToTop from './ScrollToTop';
import { Helmet } from "react-helmet";
import FooterHome from './HomePage/components/FooterHome';

const Recap = () => {
    return (
        <>
            <ScrollToTop />
            <Helmet>
                <title>ChatChef Recap: A Comprehensive Overview of Our Culinary Digital Journey</title>
                <meta name="description" content="Discover the essence of ChatChef in a snapshot. Dive into our milestones, offerings, customer engagements, and more. Get a quick, comprehensive look at how we're revolutionizing the digital dining landscape." />
                <meta name="keywords" content="ChatChef, Career, restaurants" />
            </Helmet>
            <div className="min-h-screen bg-gradient-to-b from-sky-50 to-gray-100 p-4 md:p-8 lg:p-12">

                {/* Header */}
                {/* <header className="text-center space-y-6 mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-sky-600">ChatChef Recap: Your Culinary Digital Journey</h1>
                </header> */}

                {/* Introduction */}
                <section className="bg-white p-4 md:p-8 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold text-sky-600 mb-4">Introduction</h2>
                    <p>Welcome to the ChatChef recap, a one-stop overview of our digital offerings, innovations, and how we're reshaping the culinary digital landscape. Whether you're a newcomer or a seasoned partner, this page provides a quick snapshot of our journey together.</p>
                </section>

                {/* Milestones & Offerings */}
                <section className="bg-sky-50 p-4 md:p-8 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold text-sky-600 mb-4">Key Milestones & Offerings</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Digital Ordering System:</strong> Revolutionized online orders, making it a breeze for restaurants of all sizes.</li>
                        <li><strong>Tailored Packages:</strong> From our Basic to Complete packages, we offer customized solutions to match the unique needs of every restaurant.</li>
                        <li><strong>Virtual Brands:</strong> An innovative approach to boost sales and optimize delivery experiences.</li>
                        <li><strong>ChatChef Add-ons:</strong> Tablets, printers, and more to enhance and streamline your restaurant operations.</li>
                    </ul>
                </section>

                {/* Customer Engagement */}
                <section className="bg-white p-4 md:p-8 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold text-sky-600 mb-4">Customer Engagement</h2>
                    <p>Our commitment goes beyond just providing digital solutions. We're dedicated to ensuring each step of your journey with us is seamless:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Demo Bookings:</strong> Tailored sessions to dive deep into our platform's capabilities.</li>
                        <li><strong>Email Communications:</strong> From immediate booking confirmations to pre-demo reminders and post-demo follow-ups, we keep the lines of communication open and engaging.</li>
                    </ul>
                </section>

                {/* In the Spotlight */}
                <section className="bg-sky-50 p-4 md:p-8 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold text-sky-600 mb-4">In the Spotlight</h2>
                    <p>ChatChef isn't just about technology; it's about the stories we create together:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Success Stories:</strong> Witness how we've transformed digital dining experiences for numerous establishments. <NavLink to="/SuccessStories" className="text-sky-600 font-bold">Read more</NavLink></li>
                        <li><strong>Media Features:</strong> We're making waves in the culinary tech industry.</li>
                    </ul>
                </section>

                {/* Stay Updated */}
                <section className="bg-white p-4 md:p-8 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold text-sky-600 mb-4">Stay Updated</h2>
                    <p>The world of digital dining is ever-evolving, and so are we:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Latest Updates & Features:</strong> Dive into our recent innovations and platform enhancements. <NavLink to="/new-features" className="text-sky-600 font-bold">Discover</NavLink></li>
                        <li><strong>Community & Support:</strong> Join our community, engage in discussions, and get the support you need, whenever you need it. <NavLink to="/CommunityForum" className="text-sky-600 font-bold">Join the discussion</NavLink></li>
                    </ul>
                </section>

                {/* Wrapping Up */}
                <section className="bg-sky-50 p-4 md:p-8 rounded-lg shadow-md mb-10">
                    <h2 className="text-2xl font-semibold text-sky-600 mb-4">Wrapping Up</h2>
                    <p>As we continue to innovate and grow, we're excited to have you by our side. This recap serves as a testament to our journey, our commitment, and our vision for the future. Whether you're just starting or have been with us for years, we're here to serve your success.</p>
                </section>

            </div>
            <FooterHome/>

        </>
    );
};

export default Recap;
