import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import {
	useGetReviewsQuery,
	useAddCommentMutation,
} from '../../../redux/features/reviews/reviewsApi';
import {
	useGetLocationsQuery,
	useGetRestaurentsQuery,
} from '../../../redux/features/menuCreation/menuCreationApi';
import { useGetMerchantOrdersQuery } from '../../../redux/features/orders/ordersApi';
import RestaurantLocationSelector from './RestaurantLocationSelector';

function StarRating({ rating }) {
	return (
		<div className='flex'>
			{[...Array(5)].map((_, index) => (
				<span key={index}>
					{index + 0.5 === rating ? (
						<div className='relative w-5'>
							<FaStar className='w-5 h-5 text-gray-200' />
							<div className='absolute inset-0 overflow-hidden w-[50%]'>
								<FaStar className='w-5 h-5 text-[#FFB800]' />
							</div>
						</div>
					) : (
						<FaStar
							className={`w-5 h-5 ${
								index + 1 <= rating
									? 'text-[#FFB800]'
									: 'text-gray-200'
							}`}
						/>
					)}
				</span>
			))}
		</div>
	);
}

export default function ReviewManagement() {
	const [searchQuery, setSearchQuery] = useState('');
	const [appliedFilter, setAppliedFilter] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedReview, setSelectedReview] = useState(null);
	const [replyText, setReplyText] = useState('');
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
	const [noOrders, setNoOrders] = useState(false);
	const [orderHistory, setOrderHistory] = useState([]);
	const [selectedRestaurant, setSelectedRestaurant] = useState(null);
	const [selectedLocation, setSelectedLocation] = useState(null);

	const { data: getReviews, isLoading: reviewsLoading } =
		useGetReviewsQuery(selectedRestaurant);
	const [addComment] = useAddCommentMutation();

	const userId = JSON.parse(localStorage.getItem('auth')).user.id;

	const { data: ordersData, isFetching: ordersLoading } =
		useGetMerchantOrdersQuery({
			restaurantId: selectedRestaurant,
			locationId: selectedLocation,
			page: 1,
		});

	useEffect(() => {
		if (getReviews && getReviews.length) {
			setAppliedFilter(getReviews);
		}
	}, [getReviews]);

	const handleSearch = () => {
		if (getReviews) {
			const filtered = getReviews.filter((review) =>
				review.user.first_name
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
			);
			setAppliedFilter(filtered);
		}
	};

	const openModal = (review) => {
		setSelectedReview(review);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedReview(null);
		setReplyText('');
	};

	console.log(userId, 'userId');

	const handleReply = async () => {
		if (selectedReview && replyText.trim()) {
			await addComment({
				reviewId: selectedReview.id,
				userId: userId,
				text: replyText,
			});
			closeModal();
		}
	};

	const openOrderModal = (review) => {
		if (ordersData && ordersData.results) {
			const userOrders = ordersData.results.filter(
				(order) => order.user === review.user.id
			);

			console.log(userOrders, selectedReview, review, 'userOrders');

			if (userOrders.length > 0) {
				setOrderHistory(userOrders);
				setNoOrders(false);
			} else {
				setOrderHistory([]);
				setNoOrders(true);
			}
		} else {
			setNoOrders(true);
		}

		setIsOrderModalOpen(true);
	};

	const closeOrderModal = () => {
		setIsOrderModalOpen(false);
		setOrderHistory([]);
		setNoOrders(false);
	};

	console.log(selectedLocation, selectedRestaurant, 'selected123');

	return (
		<div className='min-h-screen bg-[#F8F9FA] p-8'>
			<div className='max-w-[1200px] mx-auto'>
				<h1 className='text-2xl font-bold text-gray-900 mb-8'>
					Review Management
				</h1>
				<RestaurantLocationSelector
					selectedRestaurant={selectedRestaurant}
					selectedLocation={selectedLocation}
					setSelectedRestaurant={setSelectedRestaurant}
					setSelectedLocation={setSelectedLocation}
				/>

				<div className='flex gap-4 mb-8'>
					<div className='relative flex-1 max-w-md'>
						<input
							type='text'
							placeholder='Search'
							className='w-full h-11 pl-10 pr-4 rounded-lg bg-white border-none text-sm focus:outline-none focus:ring-1 focus:ring-gray-200'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<svg
							className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400'
							fill='none'
							strokeWidth='2'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
							/>
						</svg>
					</div>

					<button
						className='flex items-center gap-2 px-4 text-gray-600 hover:bg-gray-100 rounded-lg'
						onClick={handleSearch}
					>
						<svg
							className='w-5 h-5'
							fill='none'
							strokeWidth='2'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
							/>
						</svg>
						Apply Filter
					</button>
				</div>

				<div className='bg-white rounded-xl overflow-hidden'>
					<table className='w-full'>
						<thead className='bg-[#F8F9FA]'>
							<tr>
								<th className='text-left py-4 px-6 text-sm font-medium text-gray-500'>
									Photo
								</th>
								<th className='text-left py-4 px-6 text-sm font-medium text-gray-500'>
									Customer name
								</th>
								<th className='text-left py-4 px-6 text-sm font-medium text-gray-500'>
									Reply Comments
								</th>
								<th className='text-left py-4 px-6 text-sm font-medium text-gray-500'>
									Ratings
								</th>
								<th className='text-left py-4 px-6 text-sm font-medium text-gray-500'>
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{reviewsLoading ? (
								<tr>
									<td
										colSpan='5'
										className='text-center py-6'
									>
										Loading reviews...
									</td>
								</tr>
							) : (
								appliedFilter.map((review) => (
									<tr
										key={review.id}
										className='border-t border-gray-50'
									>
										<td className='py-4 px-6'>
											<img
												src='/placeholder.svg?height=40&width=40'
												alt=''
												className='w-10 h-10 rounded-full'
											/>
										</td>
										<td className='py-4 px-6 text-gray-900'>
											{review.user.first_name}
										</td>
										<td className='py-4 px-6'>
											<div className='flex items-center gap-2 text-gray-500'>
												<span className='text-sm'>
													{new Date(
														review.created_date
													).toLocaleString()}
												</span>
												<button
													className='text-gray-400 hover:text-gray-600'
													onClick={() =>
														openModal(review)
													}
												>
													<svg
														className='w-4 h-4'
														fill='none'
														viewBox='0 0 24 24'
														stroke='currentColor'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
														/>
													</svg>
												</button>
											</div>
										</td>
										<td className='py-4 px-6'>
											<StarRating
												rating={review.rating}
											/>
										</td>
										<td className='py-4 px-6'>
											<div className='flex gap-2'>
												<button
													className='px-4 py-1.5 bg-[#F4F1F9] hover:bg-[#EAE5F4] text-[#6E3DD9] text-sm rounded-lg transition-colors'
													onClick={() =>
														openOrderModal(review)
													}
												>
													Order History
												</button>
												<button className='px-4 py-1.5 bg-[#F4F1F9] hover:bg-[#EAE5F4] text-[#6E3DD9] text-sm rounded-lg transition-colors'>
													Pin on top
												</button>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{isModalOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20'>
					<div className='bg-white p-6 rounded-lg max-w-md w-full'>
						<h2 className='text-xl font-bold mb-4'>
							Reply to Review
						</h2>
						<p className='text-gray-700 mb-4'>
							{selectedReview.review}
						</p>
						<textarea
							className='w-full h-24 p-2 border rounded-lg mb-4'
							value={replyText}
							onChange={(e) => setReplyText(e.target.value)}
							placeholder='Write your reply here...'
						></textarea>
						<div className='flex justify-end gap-2'>
							<button
								className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg'
								onClick={closeModal}
							>
								Cancel
							</button>
							<button
								className='px-4 py-2 bg-blue-500 text-white rounded-lg'
								onClick={handleReply}
							>
								Submit Reply
							</button>
						</div>
					</div>
				</div>
			)}

			{isOrderModalOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20'>
					<div className='bg-white p-6 rounded-lg max-w-md w-full'>
						<h2 className='text-xl font-bold mb-4'>
							Order History
						</h2>
						{noOrders ? (
							<p className='text-gray-700'>
								No orders available for this user.
							</p>
						) : (
							<ul className='space-y-2'>
								{orderHistory.map((order) => (
									<li
										key={order.id}
										className='border p-2 rounded-lg text-gray-700'
									>
										<p>
											<strong>Order ID:</strong>{' '}
											{order.id}
										</p>
										<p>
											<strong>Date:</strong>{' '}
											{new Date(
												order.created_date
											).toLocaleString()}
										</p>
										<div>
											Ordered Items:
											<ul className='list-disc pl-4'>
												{order.orderitem_set.map(
													(item) => (
														<li key={item.id}>
															{
																item.menu_item
																	.name
															}{' '}
															x {item.quantity}
														</li>
													)
												)}
											</ul>
										</div>
										<p>
											<strong>Total:</strong> $
											{order.total}
										</p>
									</li>
								))}
							</ul>
						)}
						<div className='flex justify-end mt-4'>
							<button
								className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg'
								onClick={closeOrderModal}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
