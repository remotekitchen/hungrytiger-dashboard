import React from 'react';
import { Helmet } from "react-helmet";
import ScrollToTop from './ScrollToTop';
import FooterHome from './HomePage/components/FooterHome';
const Brochure = () => {
    return (
        <>
            <ScrollToTop />
            <Helmet>
                <title>ChatChef Brochure: Explore Our Digital Restaurant Solutions</title>
                <meta name="description" content="Dive into ChatChef's comprehensive brochure to discover the features and strategies that are revolutionizing the digital dining experience. Download now to uncover the full potential of our platform." />
                <meta name="keywords" content="ChatChef, Career, restaurants" />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-b from-sky-50 to-gray-100 p-4 md:p-10">

                {/* Header Section */}
                <header className="text-center space-y-8 mb-16">
                    <h1 className="text-5xl font-serif text-sky-600 tracking-wide">ChatChef Brochure Download</h1>
                </header>

                {/* Main Content Card */}
                <section className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg max-w-4xl mx-auto mb-16 space-y-6 transition-shadow duration-300">
                    <h2 className="text-4xl font-bold mb-4 text-sky-600">Explore the World of ChatChef</h2>
                    <p className="text-lg leading-relaxed">Delve deeper into the essence of ChatChef, the leading restaurant digital platform. Our detailed brochure offers insights, features, and strategies that have revolutionized the digital dining experience for countless restaurants.</p>
                </section>

                {/* Why Download Section */}
                <section className="bg-sky-50 p-8 rounded-xl shadow-md hover:shadow-lg max-w-4xl mx-auto mb-16 space-y-4 transition-shadow duration-300">
                    <h2 className="text-3xl font-semibold mb-6 text-sky-600">Why Download Our Brochure?</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li><span className='font-bold'>Comprehensive Overview:</span> Get an in-depth look at all our offerings, from online ordering systems to advanced analytics.</li>
                        <li><span className='font-bold'>Success Stories:</span> Uncover the transformation stories of restaurants leveraging ChatChef's capabilities.</li>
                        <li><span className='font-bold'>Exclusive Insights:</span> Stay informed about industry trends, best practices, and actionable tips to maximize your restaurant's digital potential.</li>
                    </ul>
                </section>

                {/* Download Button */}
                <div className="text-center mb-16">
                    <button className="bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-full px-12 py-3 hover:from-sky-600 hover:to-sky-700 transition-colors focus:outline-none shadow hover:shadow-md">Download Brochure</button>
                </div>

                {/* Privacy Matters Section */}
                <section className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg max-w-4xl mx-auto space-y-4 transition-shadow duration-300">
                    <h2 className="text-3xl font-semibold mb-6 text-sky-600">Your Privacy Matters</h2>
                    <p>We at ChatChef prioritize your privacy...</p>
                    <a href="/privacy-policy" className="underline text-sky-600 hover:text-sky-700">Learn more in our Privacy Policy</a>
                </section>

            </div>
            <FooterHome/>
        </>
    );
};

export default Brochure;
