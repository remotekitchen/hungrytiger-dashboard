// components/GrossRevenue.js
import React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';

const DeliveryFees = ({
	deliveryFees,
	originalDeliveryFees,
	serviceFeesPaidByCustomerToRestaurant,
	deliveryFeesBareByRestaurant,
}) => {
	console.log(deliveryFees, deliveryFeesBareByRestaurant, 'deliveryFees');
	return (
		<div className='p-4 bg-white shadow rounded-lg mt-4 space-y-2'>
			<div className='mt-4 space-y-3'>
				<div className='flex items-center gap-2'>
					<div className='collapse collapse-arrow border border-gray-200 rounded-box'>
						<input type='checkbox' />
						<div className='collapse-title text-md font-medium'>
							Delivery Fees
						</div>
						<div className='collapse-content'>
							<div className='p-4 bg-white rounded-lg shadow-md max-w-md'>
								<h2 className='text-xl font-semibold mb-4'>
									Delivery Fees Breakdown
								</h2>
								<ul className='space-y-3'>
									{/* <!-- Original Delivery Fees Amount --> */}
									<li>
										<p className='font-medium'>
											Original Delivery Fees Amount:{' '}
											<span className='text-gray-800'>
												{originalDeliveryFees}
											</span>
										</p>
										<p className='text-sm text-gray-600'>
											This represents the total amount
											that would have been charged
											initially as the delivery fee.
										</p>
									</li>

									{/* <!-- Delivery Fees Paid by Customer --> */}
									<li>
										<p className='font-medium'>
											Delivery Fees Paid by Customer:{' '}
											<span className='text-red-600'>
												{deliveryFees}
											</span>
										</p>
										<p className='text-sm text-gray-600'>
											This amount indicates what the
											customer has actually paid towards
											the delivery fee. The negative sign
											suggests that this amount is
											deducted or taken directly from the
											customer.
										</p>
									</li>

									{/* <!-- Service Fees Paid by Customer to Restaurant --> */}
									<li>
										<p className='font-medium'>
											Service Fees Paid by Customer to
											Restaurant:{' '}
											<span className='text-red-600'>
												{
													serviceFeesPaidByCustomerToRestaurant
												}
											</span>
										</p>
										<p className='text-sm text-gray-600'>
											This is an additional service fee
											that the customer has paid,
											specifically going to the
											restaurant. The negative sign
											implies that this amount is also a
											deduction from the customer’s side.
										</p>
									</li>

									{/* <!-- Delivery Fees Borne by the Restaurant --> */}
									<li>
										<p className='font-medium'>
											Delivery Fees Borne by the
											Restaurant:{' '}
											<span className='text-red-600'>
												{deliveryFeesBareByRestaurant}
											</span>
										</p>
										<p className='text-sm text-gray-600'>
											This amount shows the portion of the
											delivery fee that the restaurant has
											covered, instead of passing it on to
											the customer. The negative sign here
											suggests it’s subtracted from the
											restaurant’s revenue or profit.
										</p>
									</li>
								</ul>
							</div>
							<br />

							{/* <!-- Delivery Fees paid by customer --> */}
							<div className='flex justify-between items-center'>
								<span className='text-sm text-gray-600'>
									Original delivery fees amount
								</span>
								<span className='text-sm text-gray-800 font-medium'>
									{originalDeliveryFees}
								</span>
							</div>

							{/* <!-- Service Fees paid by customer to restaurant --> */}
							<div className='flex justify-between items-center'>
								<span className='text-sm text-gray-600'>
									Delivery fees paid by customer
								</span>
								<span className='text-sm text-gray-800 font-medium'>
									- {deliveryFees}
								</span>
							</div>

							{/* convenience fee*/}
							<div className='flex justify-between items-center'>
								<span className='text-sm text-gray-600'>
									service fees paid by customer to restaurant
								</span>
								<span className='text-sm text-gray-800 font-medium'>
									- {serviceFeesPaidByCustomerToRestaurant}
								</span>
							</div>

							{/* <!-- Divider Line --> */}
							<div className='border-t border-gray-200 my-2'></div>
							<div className='flex justify-between items-center'>
								<span className='text-sm text-gray-600'>
									Delivery fees bare by the restaurant
								</span>
								<span className='text-sm text-gray-800 font-medium'>
									{deliveryFeesBareByRestaurant}
								</span>
							</div>
						</div>
					</div>
					<h3 className='text-lg font-semibold'></h3>
					<div
						className='tooltip tooltip-left'
						data-tip='Delivery fees are the fees charged to the customer for delivery of the order.'
					>
						<BsExclamationCircle />
					</div>
				</div>
			</div>
			<hr />
			<div className='flex items-center justify-between mt-2'>
				<p>Delivery Fees</p>
				<p>{deliveryFeesBareByRestaurant}</p>
			</div>
		</div>
	);
};

export default DeliveryFees;
