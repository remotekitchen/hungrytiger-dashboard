import React, { useEffect, useMemo, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import {
	useDeleteEarningsMutation,
	useGenerateStatementsMutation,
} from '../../redux/features/earnings/earningsApi';
import toast from 'react-hot-toast';

const StatementList = ({ statements, selectedStatement, onSelect }) => {
	const [deleteEarnings] = useDeleteEarningsMutation();
	const [generateStatements, { isLoading, isSuccess }] =
		useGenerateStatementsMutation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
	const [selectedStatementId, setSelectedStatementId] = useState(null);
	const [password, setPassword] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	// Filter and sort unique statements by period start date in descending order
	const uniqueStatements = useMemo(() => {
		const uniqueMap = new Map();
		statements?.forEach((statement) => {
			const key = `${statement.amount}-${statement.period}`;
			if (!uniqueMap.has(key)) {
				uniqueMap.set(key, statement);
			}
		});

		// Convert to array, sort by the start date in descending order
		const sortedStatements = Array.from(uniqueMap.values()).sort((a, b) => {
			const dateA = new Date(a.period.split(' - ')[0]); // Start date of period A
			const dateB = new Date(b.period.split(' - ')[0]); // Start date of period B
			return dateB - dateA; // Descending order
		});

		console.log('Sorted Statements: ', sortedStatements); // Debugging log

		return sortedStatements;
	}, [statements]);

	// useEffect to select the first statement by default
	useEffect(() => {
		if (uniqueStatements.length > 0 && !selectedStatement) {
			onSelect(uniqueStatements[0]);
		}
	}, [uniqueStatements, selectedStatement, onSelect]);

	// Delete statement handler
	const handleDelete = async () => {
		try {
			if (selectedStatementId) {
				await deleteEarnings(selectedStatementId).unwrap();
				console.log(
					`Statement with ID ${selectedStatementId} deleted successfully`
				);
				setIsModalOpen(false); // Close the modal
				toast.success('Statement deleted successfully');
			}
		} catch (error) {
			console.error('Failed to delete statement:', error);
		}
	};

	// Open the confirmation modal and set selected statement ID
	const openModal = (id) => {
		setSelectedStatementId(id);
		setIsModalOpen(true);
	};

	const envPassword = import.meta.env.VITE_REFUND_PASSWORD;

	const handleGenerateStatements = async () => {
		if (password !== envPassword) {
			toast.error('Incorrect password. Please try again.');
			return;
		}

		try {
			if (!startDate || !endDate) {
				toast.error('Please fill in both start and end dates');
				return;
			}

			await generateStatements({ startDate, endDate }).unwrap();
			toast.success('Statements generated successfully');
			setIsGenerateModalOpen(false);
		} catch (error) {
			console.error('Failed to generate statements:', error);
			toast.error('Failed to generate statements');
		}
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Statements generated successfully');
		}
	}, [isSuccess]);

	console.log(isLoading, isSuccess, 'isLoading'); // Debugging log

	return (
		<div className='bg-white h-[70vh] rounded-lg overflow-hidden overflow-y-auto shadow relative'>
			<div className='sticky top-0 left-0 right-0 bg-white'>
				<div className='flex items-center justify-between py-4 px-2'>
					<h1 className='text-2xl font-semibold'>Statements</h1>
					<button
						onClick={() => setIsGenerateModalOpen(true)}
						className='btn btn-sm btn-primary'
					>
						Generate statements
					</button>
				</div>
				<hr />
			</div>

			<div className='p-2'>
				<div className='statement-list space-y-2'>
					{uniqueStatements.map((statement, index) => (
						<div
							key={index}
							onClick={() => onSelect(statement)}
							className={`p-4 border rounded-lg cursor-pointer hover:bg-primary transition ease-in-out duration-300 ${
								selectedStatement?.id === statement.id
									? 'bg-primary text-white'
									: 'bg-base-100 text-base-content'
							}`}
						>
							<div className='flex items-center justify-between '>
								<div className='font-semibold'>{`${statement?.period?.slice(
									0,
									10
								)} - ${statement?.period?.slice(28, 38)}`}</div>
								<button
									onClick={(e) => {
										e.stopPropagation();
										openModal(statement.id);
									}}
									className='bg-red-600/20 rounded-full w-[30px] h-[30px] flex items-center justify-center'
								>
									<MdDeleteForever
										className='text-red-600 text-center'
										size={24}
									/>
								</button>
							</div>
							<div className='text-sm'>{statement.amount}</div>
							<div className='text-sm'>{statement.status}</div>
							<div className='text-sm'>{statement.address}</div>
						</div>
					))}
				</div>
			</div>

			{/* Confirmation Modal */}
			{isModalOpen && (
				<div className='modal modal-open'>
					<div className='modal-box'>
						<h3 className='font-bold text-lg'>
							Delete Confirmation
						</h3>
						<p className='py-4'>
							Are you sure you want to delete this statement?
						</p>
						<div className='modal-action'>
							<button
								onClick={() => setIsModalOpen(false)}
								className='btn btn-outline'
							>
								Cancel
							</button>
							<button
								onClick={handleDelete}
								className='btn btn-error'
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}
			{/* Generate Confirmation Modal */}
			{isGenerateModalOpen && (
				<div className='modal modal-open'>
					{isLoading ? (
						<div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
							<div className='text-center'>
								<div className='flex justify-center mb-4'>
									<span className='loading loading-spinner loading-lg'></span>
								</div>
								<p className='text-white text-lg'>
									Please wait while the invoice is generating.
									This might take a while.
								</p>
							</div>
						</div>
					) : (
						<div className='modal-box'>
							<h3 className='font-bold text-lg'>
								Generate Confirmation
							</h3>
							<p className='py-4'>
								Please enter the start and end dates, and your
								password to generate statements:
							</p>
							<div className='mb-4'>
								<label className='label'>
									<span className='label-text'>
										Start Date
									</span>
								</label>
								<input
									type='date'
									value={startDate}
									onChange={(e) =>
										setStartDate(e.target.value)
									}
									className='input input-bordered w-full'
								/>
							</div>
							<div className='mb-4'>
								<label className='label'>
									<span className='label-text'>End Date</span>
								</label>
								<input
									type='date'
									value={endDate}
									onChange={(e) => setEndDate(e.target.value)}
									className='input input-bordered w-full'
								/>
							</div>
							<div className='mb-4'>
								<label className='label'>
									<span className='label-text'>Password</span>
								</label>
								<input
									type='password'
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									placeholder='Enter password'
									className='input input-bordered w-full'
								/>
							</div>
							<div className='modal-action'>
								<button
									onClick={() =>
										setIsGenerateModalOpen(false)
									}
									className='btn btn-outline'
								>
									Cancel
								</button>
								<button
									onClick={handleGenerateStatements}
									className='btn btn-primary'
									disabled={
										!password || !startDate || !endDate
									}
								>
									Confirm
								</button>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default StatementList;
