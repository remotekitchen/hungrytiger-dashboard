import React from 'react';
import { NavLink } from "react-router-dom";
import FooterHome from '../HomePage/components/FooterHome';
const Testimonials = () => {
    return (
        <>
            <div className="container mx-auto p-8 space-y-8 bg-gray-200">
                {/* Testimonials Section */}
                <section id="testimonials" className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">Testimonials</h2>
                    <blockquote className="border-l-4 border-indigo-500 pl-4 italic">
                        <p className="text-xl mb-4">
                            "ChatChef has revolutionized our delivery process. It's efficient,
                            easy to use, and has opened doors to customers we might have missed otherwise."
                        </p>
                        <cite className="block text-lg text-right text-gray-600">- Tom Salt, Executive Head Chef, Manicomio</cite>
                    </blockquote>
                </section>

                {/* Control of Deliveries Section */}
                <section id="control-of-deliveries" className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">Take Control of Your Deliveries</h2>
                    <p className="text-xl mb-4">
                        Don't let commissions eat into your profits. With ChatChef, enjoy a delivery system
                        that's designed with your business's growth in mind.
                    </p>
                    <button className="btn btn-primary text-xl p-3">              <NavLink
                        to="/getademo"
                    >
                        Get Started
                    </NavLink></button>
                </section>

                {/* Resources Section */}
                <section id="resources" className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">Resources</h2>
                    <ul className="list-disc pl-8 text-xl">
                        <li className="mb-2"><a href="#" className="text-indigo-500 hover:underline">              <NavLink
                            to="/getademo"
                        >
                            Get a Demo
                        </NavLink></a></li>
                        <li className="mb-2"><a href="#" className="text-indigo-500 hover:underline">              <NavLink
                            to="/pricing"
                        >
                            Pricing
                        </NavLink></a></li>
                        <li className="mb-2"><a href="#" className="text-indigo-500 hover:underline"><NavLink
                            to="/blogs"
                        >
                            Blogs
                        </NavLink></a></li>
                    </ul>
                </section>
                {/* Partnerships Section */}
                <section id="partnerships" className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">Partnerships</h2>
                    <p className="text-xl mb-4">
                        Looking for a delivery partner that aligns with your needs? ChatChef collaborates with
                        a wide range of delivery partners across the globe. Find the perfect match for your business.
                    </p>
                </section>
            </div>

            <FooterHome />
        </>

    );
};

export default Testimonials;