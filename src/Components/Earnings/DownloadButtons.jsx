// components/DownloadButtons.js
import React from 'react';

const DownloadButtons = ({ invoice, orderDetails }) => {
	const downloadFile = (url, filename) => {
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', filename);
		document.body.appendChild(link);
		link.click();
		link.remove();
	};
	return (
		<div className='space-x-4 my-4'>
			<button
				onClick={() =>
					downloadFile(`${orderDetails}`, 'order-details.pdf')
				}
				className='btn btn-primary'
			>
				Download Order Details
			</button>
			<button
				onClick={() => downloadFile(`${invoice}`, 'transaction.pdf')}
				className='btn btn-primary'
			>
				Download Transactions
			</button>
		</div>
	);
};

export default DownloadButtons;
