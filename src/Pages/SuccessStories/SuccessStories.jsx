import React from 'react';
import FooterHome from '../HomePage/components/FooterHome';
import ScrollToTop from '../ScrollToTop';
import { Helmet } from 'react-helmet';

const SuccessStories = () => {

    return (

<>
            <ScrollToTop />

            <Helmet>
                <title>ChatChef: Elevating Restaurant Experiences</title>
                <meta name="description" content="Discover the transformative journeys of restaurants that partnered with ChatChef. From boosting sales with intelligent upsells to fostering customer loyalty, read how our digital platform has been a game-changer for eateries worldwide." />
                <meta name="keywords" content="ChatChef, Career, restaurants" />
            </Helmet>
            <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-0">
                {/* Page Header */}
                <header className="text-center space-y-6 mb-20">
                    <h1 className="text-4xl font-bold  text-sky-600">Success Stories</h1>
                    {/* <p className="text-xl text-gray-600 max-w-2xl mx-auto">ChatChef: Elevating Restaurant Experiences</p> */}
                </header>
                {/* Intro */}
                <section className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto mb-20">
                    <p className="text-lg leading-relaxed">
                        Welcome to ChatChef, where the essence of our growth lies in fostering authentic relationships
                        and encouraging seamless collaboration within our teams. We are dedicated to assisting our valued
                        partners in cultivating stronger connections with their guests. Our foundation of community begins
                        with a consultative and tailor-made approach to sales, implementation, customer success, and support,
                        ensuring we deliver solutions that perfectly align with YOUR RESTAURANT experience! As the leading
                        restaurant digital platform, ChatChef stands out by operating seamlessly across web, mobile, and in-store channels.
                    </p>
                </section>

                {/* Success Stories Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto mb-20">
                    {[ /* Sample stories for better design visualization */
                        {
                            title: "Bella's Bistro: A Digital Transformation",
                            content: "When we first integrated with ChatChef, we were a small bistro struggling to keep up with the digital age. ChatChef's personalized white-label app and online ordering system not only boosted our online presence but also increased our in-store visits. The intelligent machine learning upsells were a game-changer, enhancing our average order value by 25%!"
                        },
                        {
                            title: "The Urban Eatery: Loyalty Rewarded",
                            content: "We've always had a loyal customer base, but ChatChef's loyalty program took it to the next level. Our regulars love the rewards, and we've seen a 40% increase in repeat visits since implementing the program. The data-driven CDP analytics also provide invaluable insights into our customers' preferences, helping us tailor our offerings."
                        },
                        {
                            title: "Riverside Café: Gifted Growth", 
                            content: "Introducing ChatChef's gift cards transformed our holiday sales. Not only did it provide an additional revenue stream, but it also introduced our café to a whole new set of customers. The advanced marketing suite also allowed us to effectively manage and nurture these new relationships."
                        },
                        {
                            title: "GreenLeaf Diner: Personalized Upselling Magic",
                            content: "With ChatChef's machine learning upsells, we were amazed at how our menu items were being recommended to customers. It felt like the system truly understood our diner's essence. Our sales saw a significant uptick, with customers often expressing delight at discovering new favorites."
                        },
                        {
                            title: "OceanView Seafood: Engaging the Digital Diner",
                            content: "We were initially hesitant about transitioning to a digital platform, but ChatChef made it seamless. Their white-label restaurant app gave us a professional edge, and data-driven analytics helped us understand our customers better. Our seafood specials, paired with ChatChef's intelligent recommendations, led to record-breaking sales last summer!"
                        },
                        {
                            title: "Sunset Grill: A Loyalty Like No Other",
                            content: "Before ChatChef, we had a rudimentary loyalty stamp card. Transitioning to ChatChef's digital loyalty program was a revelation. Not only could we offer more enticing rewards, but the program also gave us insights into our most loyal customers' dining habits. This allowed us to create special promotions that resonated deeply, strengthening our bond with the community."
                        },
                    ].map(story => (
                        <div key={story.title} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1.5">
                            <h3 className="text-2xl font-semibold mb-4 text-sky-600">{story.title}</h3>
                            <p className="text-gray-700">"{story.content}"</p>
                        </div>
                    ))}
                </section>

                {/* Share Your Success */}
                <section className="bg-sky-600 p-8 rounded-xl shadow-lg text-center max-w-4xl mx-auto mb-20 relative">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-white rounded-full -mt-12 -ml-12"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full -mb-16 -mr-16"></div>
                    <h3 className="text-3xl font-bold mb-6 text-white">Share Your Success with ChatChef</h3>
                    <p className="text-white mb-6">
                        Have you experienced success with ChatChef? We're eager to celebrate your achievements and share
                        your story. Reach out to us and let the world know how ChatChef has elevated your restaurant experience.
                    </p>o
                    <button className="btn btn-primary text-xl p-3 bg-white hover:bg-gray-200 transition">Share Your Story</button>
                </section>
                {/* Page Footer */}
                <footer className="text-center text-gray-600">
                    <p className="text-lg">At ChatChef, we're here to serve your success.</p>
                </footer>
            </div>
            <FooterHome />
        </>
    );
};

export default SuccessStories;