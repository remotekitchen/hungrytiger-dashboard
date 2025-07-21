// components/StatementDetails.js
import React from 'react';
import DownloadButtons from './DownloadButtons';
import PrintButton from './PrintButtons';
import SendMailToResButton from './SendMailToResButton';

const StatementDetails = ({
	statement,
	invoice,
	orderDetails,
	restaurantLocation,
	invoice_id,
}) => {
	console.log(restaurantLocation, 'Restaurant location');
	if (!statement)
		return (
			<div className='text-center py-4'>Please select a statement.</div>
		);

	return (
		<div className='p-4 bg-white shadow rounded-lg'>
			<div className='flex items-center justify-between'>
				<h2 className='text-2xl font-semibold mb-4'>
					Weekly Statement
				</h2>
				<div className='flex items-center justify-center gap-2'>
					<SendMailToResButton invoice_id={invoice_id} />
					<PrintButton orderDetails={orderDetails} />
				</div>
			</div>
			<div className='rounded-lg bg-gray-700 text-white p-3 my-3'>
				<p>
					<strong>Order Total =</strong> subtotal + Delivery Fee{' '}
					<span className='italic'>
						(applicable only for delivery orders)
					</span>
					+ Tax &amp; Other fees{' '}
					<span className='italic'>
						(which includes service fees)
					</span>
					+ Tips + Bag fees - Discount Expense
				</p>
			</div>

			<DownloadButtons invoice={invoice} orderDetails={orderDetails} />
			<div className='mb-2 font-semibold'>
				<p>{statement.restaurant}</p>
				<p>{restaurantLocation}</p>
			</div>
			<div className='mb-2'>
				<p className='font-bold'>Statement Period: </p>
				{`${statement?.period?.slice(
					0,
					10
				)} - ${statement?.period?.slice(28, 38)}`}
			</div>
		</div>
	);
};

export default StatementDetails;
