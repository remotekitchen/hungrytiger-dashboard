// components/PrintButton.js
import React from 'react';

const PrintButton = ({ orderDetails }) => {
	const printPDF = (pdfUrl) => {
		const printWindow = window.open(pdfUrl, '_blank');
		printWindow.onload = () => {
			printWindow.focus();
			printWindow.print(); // Trigger the print dialog once the PDF is loaded
		};
	};
	return (
		<button
			onClick={() => printPDF(`${orderDetails}`)}
			className='btn btn-warning'
		>
			Print Statement
		</button>
	);
};

export default PrintButton;
