import React from 'react';
import FooterHome from './HomePage/components/FooterHome';
import ScrollToTop from './ScrollToTop';
import { Helmet } from 'react-helmet';

const ChatChefFeatures = () => {
    return (
 <>
           <ScrollToTop/>
      <Helmet>
        <title>ChatChef New Features: Elevating the Digital Dining Experience</title>
        <meta name="description" content="Discover the latest innovations from ChatChef. From AI-powered insights to interactive menus, explore features designed to enhance your restaurant's digital journey." />
        <meta name="keywords" content="ChatChef, Career, restaurants" />
      </Helmet>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 sm:py-12 md:py-16 px-4 md:px-0">

{/* Page Header */}
<header className="text-center space-y-4 sm:space-y-8 mb-10 sm:mb-20">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-sky-700 tracking-tight">ChatChef New Features</h1>
    <p className="text-md sm:text-lg md:text-xl text-gray-700 max-w-xs sm:max-w-xl md:max-w-3xl mx-auto">Elevating the Digital Dining Experience</p>
</header>

{/* Introduction */}
<section className="bg-white p-4 sm:p-8 md:p-10 rounded-xl shadow-2xl max-w-sm sm:max-w-md md:max-w-4xl mx-auto mb-10 sm:mb-20 transform hover:scale-105 transition-transform duration-300">
    <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-4">New Features at ChatChef</h2>
    <p className="text-md sm:text-lg md:text-lg leading-relaxed font-light">
        Welcome to the latest innovations from ChatChef! We're always pushing boundaries to offer our partners the best in restaurant digital solutions. Dive into our newest features designed to enhance your restaurant's digital experience and drive success.
    </p>
</section>

{/* Features List */}
<section className="bg-indigo-100 p-4 sm:p-8 md:p-10 rounded-xl shadow-2xl max-w-sm sm:max-w-md md:max-w-4xl mx-auto mb-10 sm:mb-12 md:mb-20 space-y-6">

    {/* Feature 1: AI-Powered Customer Insights */}
    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <span className="flex-shrink-0 bg-sky-300 text-white p-2 sm:p-3 rounded-full">
            🤖
        </span>
        <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">AI-Powered Customer Insights</h3>
            <p>Harness the power of artificial intelligence to gain deeper insights into your customers' preferences...</p>
        </div>
    </div>

    {/* Feature 2: Personalized Recommendations */}
    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <span className="flex-shrink-0 bg-sky-300 text-white p-2 sm:p-3 rounded-full">
            🌟
        </span>
        <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Personalized Recommendations</h3>
            <p>Using data analytics, our platform now offers personalized dish recommendations to diners based on their past preferences...</p>
        </div>
    </div>

    {/* Feature 3: Digital Feedback Collection */}
    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <span className="flex-shrink-0 bg-sky-300 text-white p-2 sm:p-3 rounded-full">
            ✍️
        </span>
        <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Digital Feedback Collection</h3>
            <p>Gather feedback seamlessly post dining with our integrated digital feedback forms, ensuring you constantly improve upon the dining experience...</p>
        </div>
    </div>

    {/* Feature 4: Augmented Reality Menu Previews */}
    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <span className="flex-shrink-0 bg-sky-300 text-white p-2 sm:p-3 rounded-full">
            🕶️
        </span>
        <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Augmented Reality Menu Previews</h3>
            <p>Allow diners to preview dishes in 3D using Augmented Reality before placing an order, providing a more interactive and engaging menu selection process...</p>
        </div>
    </div>

    {/* Feature 5: Integrated Loyalty Programs */}
    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <span className="flex-shrink-0 bg-sky-300 text-white p-2 sm:p-3 rounded-full">
            💳
        </span>
        <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Integrated Loyalty Programs</h3>
            <p>Boost customer retention with our integrated loyalty programs. Offer rewards, discounts, and incentives to frequent diners...</p>
        </div>
    </div>

</section>


{/* Coming Soon */}
<section className="bg-white p-4 sm:p-8 md:p-10 rounded-xl shadow-2xl max-w-sm sm:max-w-md md:max-w-4xl mx-auto mb-10 sm:mb-20 transform hover:scale-105 transition-transform duration-300">
    <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-4">Coming Soon</h2>
    <p className="text-md sm:text-lg md:text-lg leading-relaxed font-light">
        We're in the final stages of testing some groundbreaking features that promise to revolutionize the restaurant's digital landscape. Stay tuned for more updates!
    </p>
</section>

{/* Feedback */}
<section className="bg-indigo-200 p-4 sm:p-8 md:p-10 rounded-xl shadow-2xl max-w-sm sm:max-w-md md:max-w-4xl mx-auto transform hover:scale-105 transition-transform duration-300">
    <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-4">Feedback Welcomed</h2>
    <p className="text-md sm:text-lg md:text-lg leading-relaxed font-light">
        Your feedback drives our innovation. If you have suggestions or comments about our new features, please reach out. We're always looking to improve and value your input.
    </p>
</section>

</div>
<FooterHome/>
 </>
    );
};

export default ChatChefFeatures;
