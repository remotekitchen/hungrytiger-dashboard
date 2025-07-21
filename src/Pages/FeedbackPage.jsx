import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, useLocation } from 'react-router-dom';
import FooterHome from './HomePage/components/FooterHome';
import ScrollToTop from './ScrollToTop';

const FeedbackPage = () => {
	const location = useLocation();
	const fullUrl = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;

	// State to store the value
	const [store, setStore] = useState('chatchef');

	useEffect(() => {
		if (fullUrl.includes('techchef')) {
			setStore('techchef');
		} else if (fullUrl.includes('chatchef')) {
			setStore('chatchef');
		} else if (fullUrl.includes('remokitchen')) {
			setStore('remokitchen');
		}
	}, [fullUrl]);

	return (
		<>
			<ScrollToTop />
			<Helmet>
				<title>
					ChatChef Feedback - Share Your Experience & Insights
				</title>
				<meta
					name='description'
					content='Help ChatChef revolutionize the restaurant industry! Share your thoughts on our digital solutions, explore customer testimonials, and be a part of our continuous journey towards excellence.'
				/>
				<meta name='keywords' content='ChatChef, Career, restaurants' />
			</Helmet>

			<div className='min-h-screen bg-gray-100 py-8'>
				<div className='container mx-auto px-4 md:px-8'>
					{/* Header */}
					<div className='text-center mb-16'>
						<h1 className='text-4xl font-bold'>
							We Value Your Feedback
						</h1>
						<p className='text-gray-600 mt-2'>
							Help us improve by sharing your experience.
						</p>
					</div>

					{/* Main Content */}
					<div className='bg-white p-8 rounded-lg shadow-md space-y-8'>
						{/* Your Voice Matters to Us */}
						<section>
							<h2 className='text-2xl font-semibold mb-4'>
								Your Voice Matters to Us!
							</h2>
							<p className='text-gray-700'>
								At ChatChef, we believe in the power of
								collaboration and value feedback from our
								esteemed partners and users. As we continuously
								strive to revolutionize the restaurant industry
								with cutting-edge digital solutions, your
								insights play a pivotal role in our journey
								towards excellence.
							</p>
						</section>

						{/* Share Your Experience */}
						<section>
							<h2 className='text-2xl font-semibold mb-4'>
								Share Your Experience
							</h2>
							<p className='text-gray-700'>
								Whether it's about our online ordering system,
								white-label restaurant apps, or any of our wide
								array of services, we'd love to hear your
								thoughts. By sharing your experiences,
								suggestions, or concerns, you help us refine our
								offerings and serve you better.
							</p>
						</section>

						{/* Feedback Form */}
						<section>
							<h2 className='text-2xl font-semibold mb-4'>
								Feedback Form
							</h2>
							<form className='space-y-4'>
								<div>
									<label className='block mb-2'>Name:</label>
									<input
										type='text'
										className='border w-full p-2 rounded'
									/>
								</div>
								<div>
									<label className='block mb-2'>
										Email Address:
									</label>
									<input
										type='email'
										className='border w-full p-2 rounded'
									/>
								</div>
								<div>
									<label className='block mb-2'>
										Restaurant Name (if applicable):
									</label>
									<input
										type='text'
										className='border w-full p-2 rounded'
									/>
								</div>
								<div>
									<label className='block mb-2'>
										Type of Feedback:
									</label>
									<select className='border w-full p-2 rounded'>
										<option>Compliment</option>
										<option>Suggestion</option>
										<option>Concern</option>
										<option>Inquiry</option>
									</select>
								</div>
								<div>
									<label className='block mb-2'>
										Your Feedback:
									</label>
									<textarea
										className='border w-full p-2 rounded'
										rows='5'
									></textarea>
								</div>
								<div className='flex items-center space-x-6'>
									<span>
										Would you recommend ChatChef to others?:
									</span>
									<label>
										<input
											type='radio'
											name='recommend'
											value='yes'
											className='mr-1'
										/>{' '}
										Yes
									</label>
									<label>
										<input
											type='radio'
											name='recommend'
											value='no'
											className='mr-1'
										/>{' '}
										No
									</label>
									<label>
										<input
											type='radio'
											name='recommend'
											value='maybe'
											className='mr-1'
										/>{' '}
										Maybe
									</label>
								</div>
								<div>
									<button
										type='submit'
										className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300'
									>
										Submit
									</button>
								</div>
							</form>
						</section>

						{/* What Happens Next? */}
						<section>
							<h2 className='text-2xl font-semibold mb-4'>
								What Happens Next?
							</h2>
							<p className='text-gray-700'>
								Upon receiving your feedback, our dedicated team
								will review your insights and reach out if any
								clarifications are needed. We take every piece
								of feedback seriously and are always eager to
								implement constructive suggestions.
							</p>
						</section>

						{/* Customer Testimonials */}
						<section>
							<h2 className='text-2xl font-semibold mb-4'>
								Customer Testimonials
							</h2>
							<blockquote className='mb-4 italic pl-4 border-l-4 border-blue-600'>
								"ChatChef has transformed our restaurant's
								digital presence, making online ordering a
								breeze for our customers."
								<footer className='text-gray-600 mt-2'>
									- Anna, Bistro Delights
								</footer>
							</blockquote>
							<blockquote className='mb-4 italic pl-4 border-l-4 border-blue-600'>
								"The loyalty program is a game-changer. We've
								seen a significant increase in repeat customers
								since its implementation."
								<footer className='text-gray-600 mt-2'>
									- Raj, Spicy Curry House
								</footer>
							</blockquote>
						</section>

						{/* Stay Connected */}
						<section>
							<h2 className='text-2xl font-semibold mb-4'>
								Stay Connected
							</h2>
							<p className='text-gray-700 mb-2'>
								For any urgent concerns or queries, please reach
								out to our support team directly:
							</p>
							<div className='flex flex-col space-y-2'>
								<p>
									📧 Email:{' '}
									{store === 'chatchef' && (
										<a
											href='mailto:sales@chatchefs.com'
											className='text-blue-600 underline'
										>
											sales@chatchefs.com
										</a>
									)}
									{store === 'techchef' && (
										<a
											href='mailto:sales@techchefs.ca'
											className='text-blue-600 underline'
										>
											sales@techchefs.ca
										</a>
									)}
								</p>
								<p>📞 Phone: +1-236-239-6628</p>
							</div>
						</section>

						{/* Thank You */}
						<section className='mb-8'>
							<h2 className='text-2xl font-semibold mb-4'>
								Thank You for Being a Part of ChatChef!
							</h2>
							<p className='text-gray-700'>
								Your feedback is the cornerstone of our growth.
								Together, let's make the dining experience more
								seamless and enjoyable for all.
							</p>
						</section>

						{/* Back to Home Button */}
						<div className='mt-8 text-center'>
							<NavLink
								to='/'
								className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300'
							>
								Back to Home Page
							</NavLink>
						</div>
					</div>
				</div>
			</div>
			<FooterHome />
		</>
	);
};

export default FeedbackPage;
