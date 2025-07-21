import React from 'react';
import { Helmet } from 'react-helmet';
import Image from '../Career/career.webp'; // Import your image
import FooterHome from '../HomePage/components/FooterHome';
import ScrollToTop from '../ScrollToTop';

const Career = () => {
	return (
		<div>
			<ScrollToTop />
			<Helmet>
				<title>
					Join ChatChef: Careers in Restaurant Tech & Digital
					Innovation
				</title>
				<meta
					name='description'
					content='Ready to redefine the restaurant industry? ChatChef is hiring! Explore open roles in software engineering, product management, and more. Apply now!'
				/>
				<meta name='keywords' content='ChatChef, Career, restaurants' />
			</Helmet>
			<div className='bg-gray-100 min-h-screen p-10'>
				<div className='container mx-auto bg-white rounded-lg p-10 shadow-lg'>
					<img
						src={Image}
						alt='ChatChef'
						className='w-full object-cover h-72 rounded-lg mb-8'
					/>
					<h1 className='text-4xl font-bold mb-5 text-center text-blue-600'>
						ChatChef Careers
					</h1>
					<hr className='mb-5 border-t-2 border-blue-200' />

					<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
						{/* Left Column */}
						<div className='bg-blue-50 p-5 rounded-lg'>
							<section className='mb-10'>
								<h2 className='text-2xl font-semibold mb-3 text-blue-700'>
									Join the Revolution in Restaurant Tech
								</h2>
								<p className='text-gray-700'>
									At ChatChef, we&apos;re on a mission to
									redefine the future of the restaurant
									industry through cutting-edge technology.
									We&apos;re looking for innovative minds who
									are as passionate as we are about empowering
									restaurants to succeed in a digital world.
								</p>
							</section>

							<section className='mb-10'>
								<h2 className='text-2xl font-semibold mb-3 text-blue-700'>
									Why Work With Us?
								</h2>
								<ul className='list-disc list-inside text-gray-700'>
									<li>
										Beyond Just Benefits: Sure, we offer
										competitive salaries and perks, but what
										sets us apart is our commitment to your
										personal and professional growth.
									</li>
									<li>
										Flexibility and Balance: We understand
										that work is just one part of your life.
										That&apos;s why we offer flexible
										working arrangements, including remote
										work options.
									</li>
									<li>
										Rapid Growth Opportunities: We&apos;ve
										doubled our team size in the last year
										and expanded globally. This growth
										translates into abundant opportunities
										for career advancement.
									</li>
								</ul>
							</section>

							<section className='mb-10'>
								<h2 className='text-2xl font-semibold mb-3 text-blue-700'>
									Our Values
								</h2>
								<ul className='list-disc list-inside text-gray-700'>
									<li>Innovation</li>
									<li>Transparency</li>
									<li>Collaboration</li>
									<li>Customer-Centricity</li>
									<li>Inclusivity</li>
								</ul>
							</section>
						</div>

						{/* Right Column */}
						<div className='bg-green-50 p-5 rounded-lg'>
							<section className='mb-10'>
								<h2 className='text-2xl font-semibold mb-3 text-green-700'>
									Open Positions
								</h2>
								<ul className='list-disc list-inside text-gray-700'>
									<li>Software Engineer</li>
									<li>Product Manager</li>
									<li>Customer Success Specialist</li>
									<li>Marketing Coordinator</li>
									<li>Sales Executive</li>
								</ul>
								{/* <button className="btn btn-primary mt-3 text-white"><a href="">View All Openings</a></button> */}
							</section>

							<section className='mb-10'>
								<h2 className='text-2xl font-semibold mb-3 text-green-700'>
									What Our Team Says
								</h2>
								<blockquote className='border-l-4 border-green-300 pl-4 text-gray-700'>
									<p>
										&quot;ChatChef has given me the autonomy
										and flexibility I&apos;ve always wanted
										in my career. Plus, it&apos;s rewarding
										to work for a company that&apos;s making
										a real impact on the restaurant
										industry.&quot;
									</p>
									<footer>- Jane, Product Manager</footer>
								</blockquote>
							</section>

							<section className='mb-10'>
								<h2 className='text-2xl font-semibold mb-3 text-green-700'>
									Diversity and Inclusion
								</h2>
								<p className='text-gray-700'>
									We believe that a diverse team brings
									diverse perspectives, and that&apos;s what
									makes us strong. We are committed to
									building an inclusive environment where
									everyone feels welcome.
								</p>
							</section>
						</div>
					</div>

					{/* Footer Sections */}
					<section className='mb-10 mt-10'>
						<h2 className='text-2xl font-semibold mb-3'>
							How to Apply
						</h2>
						<ol className='list-decimal list-inside text-gray-700'>
							<li>
								Submit Your Application: Find the job that suits
								you and send us your resume.
							</li>
							<li>
								Initial Screening: Our HR team will get in touch
								for a preliminary discussion.
							</li>
							<li>
								Interview Rounds: Meet with the hiring manager
								and team members for in-depth interviews.
							</li>
							<li>
								Offer: If it&apos;s a match, we&apos;ll extend
								an offer for you to join our amazing team!
							</li>
						</ol>
					</section>

					<section className='mb-10 text-center'>
						<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
							<a href='https://docs.google.com/forms/d/e/1FAIpQLSdHLqEBmUGEAm5Zt5lRm5aBvdzSqRr9RzM00sTXbcnYlJppcA/viewform?usp=sf_link'>
								Apply Now
							</a>
						</button>
					</section>

					<section className='mb-10'>
						<h2 className='text-2xl font-semibold mb-3'>
							Contact Us
						</h2>
						<p className='text-gray-700'>
							For any questions about career opportunities, please
							email us at hr001@heyremokitchen.com
						</p>
					</section>

					<section className='mb-10 text-center'>
						<h2 className='text-2xl font-semibold mb-3'>
							Stay Connected
						</h2>
						<div className='flex space-x-4 justify-center'>
							<a
								href='https://linkedin.com/company/chatchef'
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
							>
								LinkedIn
							</a>
							<a
								href='https://twitter.com/chatchefs'
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
							>
								Twitter
							</a>
							<a
								href='https://facebook.com/chatchefs'
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
							>
								Facebook
							</a>
						</div>
					</section>
				</div>
			</div>
			<FooterHome />
		</div>
	);
};

export default Career;
