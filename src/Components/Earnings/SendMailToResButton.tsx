// components/PrintButton.js
import React from 'react';
import { useSendMailMutation } from '../../redux/features/earnings/earningsApi';
import toast from 'react-hot-toast';

const SendMailToResButton = ({ invoice_id }) => {
	const [sendMail, { isLoading, isSuccess }] = useSendMailMutation();

	const handleSendMail = async () => {
		try {
			await sendMail(invoice_id).unwrap();
			toast.success('Email sent successfully to the restaurant!');
		} catch (error) {
			toast.error('Failed to send email. Please try again.');
		}
	};

	return (
		<button
			className='btn btn-primary'
			onClick={handleSendMail}
			disabled={isLoading}
		>
			{isLoading ? 'Sending...' : 'Send mail to Restaurant'}
		</button>
	);
};

export default SendMailToResButton;
