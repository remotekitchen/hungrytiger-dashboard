import React, { useState } from 'react';
import FooterHome from './HomePage/components/FooterHome';
import ScrollToTop from './ScrollToTop';
import { Helmet } from 'react-helmet';

const Survey = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsFormVisible(false);
        setIsFormSubmitted(true);
        // Handle the form submission logic here
    };

    return (
        <>
            <ScrollToTop />
            <Helmet>
                <title>ChatChef Survey: Share Your Feedback & Shape the Future of Dining</title>
                <meta name="description" content="Join the ChatChef survey and let your voice be heard. From refining features to introducing new innovations, your feedback is pivotal. Participate now and stand a chance to win exclusive rewards." />
                <meta name="keywords" content="ChatChef, Career, restaurants" />
            </Helmet>
            <div className="max-w-4xl mx-auto p-8 bg-blue-50 rounded-lg shadow-lg">

                {!isFormVisible && !isFormSubmitted && (
                    // Header
                    <>
                        <div className="text-center pb-6 border-b border-gray-300 mb-6">
                            <h1 className="text-4xl font-bold mb-4 text-blue-700">Survey at ChatChef</h1>
                            <p className="text-lg mb-6 text-gray-700 ">
                                At ChatChef, we believe in continuous improvement and value the feedback of our partners and users. Your insights help us refine our offerings, ensuring we remain the leading restaurant digital platform tailored to your needs. Whether you're a restaurant owner, chef, or a diner, we want to hear from you. Participate in our survey and help shape the future of dining experiences.
                            </p>
                            <p className="font-bold text-xl mb-4 text-blue-600">Why Participate?</p>
                            <ul className="list-disc pl-5 mb-6 text-gray-600">
                                <li>Your Voice Matters: Your feedback directly influences our product roadmap and features.</li>
                                <li>Exclusive Insights: Get a sneak peek into upcoming features and improvements.</li>
                                <li>Win Exciting Prizes: Every month, participants stand a chance to win exclusive ChatChef merchandise and discounts.</li>
                            </ul>
                            <button
                                className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 mb-6"
                                onClick={() => setIsFormVisible(true)}>
                                Start the Survey
                            </button>
                        </div>
                    </>
                )}

                {isFormVisible && (
                    // Survey Form
                    <form onSubmit={handleSubmit}>
                        {/* Section 1 */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Section 1: About You</h2>
                            {/* Question 1 */}
                            <div className="mb-4">
                                <label className="text-gray-700">1. Role:</label>
                                <select className="mt-2 form-select w-full">
                                    <option>Restaurant Owner/Manager</option>
                                    <option>Chef/Culinary Staff</option>
                                    <option>Diner/Customer</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            {/* Question 2 */}
                            <div className="mb-4">
                                <label className="text-gray-700">2. How long have you been using ChatChef?</label>
                                <select className="mt-2 form-select w-full">
                                    <option>Less than 6 months</option>
                                    <option>6 months to 1 year</option>
                                    <option>1-2 years</option>
                                    <option>More than 2 years</option>
                                </select>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Section 2: Product Experience</h2>
                            {/* Question 1 */}
                            <div className="mb-4">
                                <label className="text-gray-700">1. On a scale of 1-10, how satisfied are you with ChatChef's platform?</label>
                                <select className="mt-2 form-select w-full">
                                    {/* Populate the scale */}
                                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Question 2 */}
                            <div className="mb-4">
                                <label className="text-gray-700">2. Which feature of ChatChef do you find most valuable?</label>
                                <select className="mt-2 form-select w-full">
                                    <option>Online Ordering</option>
                                    <option>White-label Restaurant Apps</option>
                                    {/* ... other options ... */}
                                </select>
                            </div>
                            {/* Question 3 */}
                            <div className="mb-4">
                                <label className="text-gray-700">3. Is there a feature you wish ChatChef had?</label>
                                <textarea className="mt-2 form-textarea w-full"></textarea>
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Section 3: Overall Experience</h2>

                            {/* Question 1 */}
                            <div className="mb-4">
                                <label className="text-gray-700">1. Would you recommend ChatChef to a colleague or friend?</label>
                                <select className="mt-2 form-select w-full">
                                    <option>Definitely</option>
                                    <option>Probably</option>
                                    <option>Not Sure</option>
                                    <option>Probably Not</option>
                                    <option>Definitely Not</option>
                                </select>
                            </div>

                            {/* Question 2 */}
                            <div className="mb-4">
                                <label className="text-gray-700">2. What do you like most about ChatChef?</label>
                                <textarea className="mt-2 form-textarea w-full"></textarea>
                            </div>

                            {/* Question 3 */}
                            <div className="mb-4">
                                <label className="text-gray-700">3. What areas do you think ChatChef could improve in?</label>
                                <textarea className="mt-2 form-textarea w-full"></textarea>
                            </div>
                        </div>


                        {/* Section 4 */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Section 4: Final Thoughts</h2>
                            {/* Question 1 */}
                            <div className="mb-4">
                                <label className="text-gray-700">1. Any additional comments or suggestions for us?</label>
                                <textarea className="mt-2 form-textarea w-full"></textarea>
                            </div>
                        </div>



                        <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 mb-6">Submit Survey</button>
                    </form>
                )}

                {isFormSubmitted && (
                    // Thank you note
                    <div className="mt-8 text-center bg-blue-100 p-6 rounded shadow-inner">
                        <div className="mt-8 text-center bg-blue-100 p-6 rounded shadow-inner">
                            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Thank you for your feedback!</h2>
                            <p className="mb-6 text-gray-600">Your insights help us continuously improve and serve you better. Stay tuned for exciting updates and enhancements based on community feedback.</p>

                            <h3 className="font-bold text-xl mb-4 text-blue-600">Past Survey Highlights</h3>
                            <ul className="list-decimal pl-5 mb-6 text-gray-600">
                                <li>June 2023: 85% of respondents found our machine learning upsells to be highly effective.</li>
                                <li>May 2023: 78% of restaurant partners saw an increase in customer loyalty after implementing our program.</li>
                                <li>April 2023: 92% of users loved the user-friendly interface of our white-label restaurant apps.</li>
                            </ul>

                            <p className="font-semibold text-gray-700">Feedback Fuels Us</p>
                            <p className="text-gray-600">Your experiences, suggestions, and critiques drive us to innovate and enhance. At ChatChef, we're committed to serving your success, and your feedback is the key ingredient.</p>
                        </div>
                    </div>
                )}

            </div>
            <FooterHome/>
            </>
    );
};

export default Survey;

