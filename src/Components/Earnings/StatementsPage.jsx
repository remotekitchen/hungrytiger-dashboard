// pages/StatementsPage.js
import React, { useEffect, useState } from 'react';
import { useGetEarningsQuery } from '../../redux/features/earnings/earningsApi';
import { useGetLocationsQuery } from '../../redux/features/menuCreation/menuCreationApi';
import { useGetAllRestaurantQuery } from '../../redux/features/restaurentCreation/restaurentCreationApi';
import BagPrice from './BagPrice';
import DirectDepositAmount from './DirectDepositAmount';
import GrossRevenue from './GrossRevenue';
import MakeAdjustment from './MakeAdjustment';
import NetRevenue from './NetRevenue';
import StatementDetails from './StatementDetails';
import StatementList from './StatementList';
import Tax from './Tax';
import WeekAtGlance from './WeekAtGlance';
import DeliveryFees from './DeliveryFees';
import Tips from './Tips';
import PromotionalDiscount from './PromotionalDiscount';
import StripeFees from './StripeFees';
import ServiceFees from './ServiceFees';
import OriginalDeliveryFees from './OriginalDeliveryFees';

const StatementsPage = () => {
	const [selectedStatement, setSelectedStatement] = useState(null);
	// console.log(selectedStatement?.id, "selectedStatementttt");
	const [activeTab, setActiveTab] = useState('weekly');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [filteredStatements, setFilteredStatements] = useState([]);

	const [selectedRestaurant, setSelectedRestaurant] = useState();

	const {
		data: locationList,
		isLoading: isLocationLoading,
		isError: isLocationError,
		error: locationError,
	} = useGetLocationsQuery(selectedRestaurant);

	const { data: allRestaurant } = useGetAllRestaurantQuery();
	useEffect(() => {
		setSelectedRestaurant(allRestaurant?.results[0]?.id);
	}, [allRestaurant]);

	const { data, error, isLoading } = useGetEarningsQuery(selectedRestaurant);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	console.log(data, 'data');

	const statements = data?.results?.map((statement) => ({
		id: statement.id,
		date: new Date(statement.statement_end_date).toLocaleDateString(),
		amount: `$${statement.payout_amount.toFixed(2)}`,
		status: statement.is_paid ? 'EFT Processed' : 'Unpaid',
		restaurant: statement.restaurant_name,
		address: statement.location_name,
		// period: `${new Date(
		//   statement.statement_start_date
		// ).toLocaleDateString()} - ${new Date(
		//   statement.statement_end_date
		// ).toLocaleDateString()}`,
		period: `${statement.statement_start_date} - ${statement.statement_end_date}`,

		directDeposit: `$${statement.payout_amount.toFixed(2)}`,
		orders: statement.orders.length,
		revenue: `$${statement.gross_revenue.toFixed(2)}`,
		netRevenue: `$${statement.net_revenue.toFixed(2)}`,
		bagPrice: `$${statement.bag_fees?.toFixed(2)}`,
		customer_PST: `$${statement.customer_tax_pst.toFixed(2)}`,
		customer_HST: `$${statement.customer_tax_gst.toFixed(2)}`,
		restaurant_PST: `$${statement.restaurant_tax_pst.toFixed(2)}`,
		restaurant_GST_HST: `$${statement.restaurant_tax_gst.toFixed(2)}`,
		orderDetails: statement?.pdf,
		invoice: statement.invoice,
		deliveryFees: `$${statement.delivery_fees.toFixed(2)}`,
		tips: `$${statement.tips.toFixed(2)}`,
		promotionalDiscounts: `$${statement.promotional_expenses.toFixed(2)}`,
		stripeFees: `$${statement.stripe_fees.toFixed(2)}`,
		serviceFees: `$${statement.service_fees_paid_to_chatchef.toFixed(2)}`,
		originalDeliveryFees: `$${statement.original_delivery_fees.toFixed(2)}`,
		serviceFeesPaidByCustomerToRestaurant: `$${statement.service_fees_paid_by_customer_to_restaurant.toFixed(2)}`,
		deliveryFeesBareByRestaurant: `$${statement.delivery_fees_bare_by_restaurant.toFixed(2)}`,
		// adjustment_amount: statement.adjustments,
		// adjustment_notes: statement.adjustment_notes,
	}));

	console.log(data, statements, 'statements');
	// Filter statements by custom date range
	const handleFilterStatements = () => {
		if (startDate && endDate) {
			const filtered = statements.filter((statement) => {
				const statementDate = new Date(statement.date);
				return (
					statementDate >= new Date(startDate) &&
					statementDate <= new Date(endDate)
				);
			});
			setFilteredStatements(filtered);
		}
	};

	const handleSelectStatement = (statement) => {
		setSelectedStatement(statement);
	};

	const restaurantLocation = locationList?.results?.map(
		(location) => location?.details
	);

	console.log(selectedStatement, 'selectedStatement');

	const renderTabContent = () => {
		switch (activeTab) {
			case 'weekly':
				return (
					<div className='flex'>
						<div className='w-1/3'>
							<StatementList
								statements={statements}
								selectedStatement={selectedStatement}
								onSelect={handleSelectStatement}
							/>
						</div>
						<div className='w-2/3 px-4'>
							<StatementDetails
								orderDetails={selectedStatement?.orderDetails}
								invoice={selectedStatement?.invoice}
								statement={selectedStatement}
								restaurantLocation={selectedStatement?.address}
								invoice_id={selectedStatement?.id}
							/>

							{selectedStatement && (
								<>
									<WeekAtGlance
										directDeposit={
											selectedStatement.directDeposit
										}
										orders={selectedStatement.orders}
									/>
									<GrossRevenue
										revenue={selectedStatement.revenue}
									/>

									<MakeAdjustment
										statementId={selectedStatement?.id}
									/>
									<DeliveryFees
										deliveryFees={
											selectedStatement.deliveryFees
										}
										originalDeliveryFees={
											selectedStatement.originalDeliveryFees
										}
										serviceFeesPaidByCustomerToRestaurant={
											selectedStatement.serviceFeesPaidByCustomerToRestaurant
										}
										deliveryFeesBareByRestaurant={
											selectedStatement.deliveryFeesBareByRestaurant
										}
									/>
									<Tax
										taxPaidByCustomers={
											selectedStatement.taxPaidByCustomers
										}
										customer_HST={
											selectedStatement.customer_HST
										}
										customer_PST={
											selectedStatement.customer_PST
										}
										restaurant_GST_HST={
											selectedStatement.restaurant_GST_HST
										}
										restaurant_PST={
											selectedStatement.restaurant_PST
										}
										restaurant={
											selectedStatement.restaurant
										}
									/>
									<Tips tips={selectedStatement.tips} />
									<BagPrice
										bagPrice={selectedStatement.bagPrice}
									/>
									<PromotionalDiscount
										promotionalDiscounts={
											selectedStatement.promotionalDiscounts
										}
									/>

									<NetRevenue
										netRevenue={
											selectedStatement.netRevenue
										}
									/>
									{/* <Adjustments /> */}
									<StripeFees
										stripeFees={
											selectedStatement.stripeFees
										}
									/>

									<ServiceFees
										serviceFees={
											selectedStatement.serviceFees
										}
									/>
									<OriginalDeliveryFees
										originalDeliveryFees={
											selectedStatement.originalDeliveryFees
										}
									/>

									<DirectDepositAmount
										invoice={selectedStatement.invoice}
										orderDetails={
											selectedStatement.orderDetails
										}
										netRevenue={selectedStatement.amount}
									/>
								</>
							)}
						</div>
					</div>
				);
			// case 'custom':
			// 	return (
			// 		<div className='flex'>
			// 			<div className='w-1/3'>
			// 				{/* Date Inputs for custom range */}
			// 				<div className='mb-4'>
			// 					<label>Start Date:</label>
			// 					<input
			// 						type='date'
			// 						value={startDate}
			// 						onChange={(e) =>
			// 							setStartDate(e.target.value)
			// 						}
			// 						className='input input-bordered'
			// 					/>
			// 				</div>
			// 				<div className='mb-4'>
			// 					<label>End Date:</label>
			// 					<input
			// 						type='date'
			// 						value={endDate}
			// 						onChange={(e) => setEndDate(e.target.value)}
			// 						className='input input-bordered'
			// 					/>
			// 				</div>
			// 				<button
			// 					onClick={handleFilterStatements}
			// 					className='btn btn-primary'
			// 				>
			// 					Filter
			// 				</button>
			// 			</div>
			// 			<div className='w-2/3 px-4'>
			// 				{selectedStatement && (
			// 					<StatementDetails
			// 						orderDetails={
			// 							selectedStatement?.orderDetails
			// 						}
			// 						invoice={selectedStatement?.invoice}
			// 						statement={selectedStatement}
			// 					/>
			// 				)}
			// 			</div>
			// 		</div>
			// 	);
			default:
				return null;
		}
	};

	return (
		<div className='p-4 bg-base-100 min-h-screen'>
			{/* Tabs */}
			<div className='tabs flex justify-start space-x-4 mb-4'>
				{/* <button
					onClick={() => setActiveTab('daily')}
					className={`tab tab-lifted ${
						activeTab === 'daily' ? 'tab-active border-b-2 ' : ''
					}`}
				>
					Daily
				</button> */}
				<button
					onClick={() => setActiveTab('weekly')}
					className={`tab tab-lifted ${
						activeTab === 'weekly' ? 'tab-active border-b-2 ' : ''
					}`}
				>
					Weekly
				</button>
				{/* <button
					onClick={() => setActiveTab('custom')}
					className={`tab tab-lifted ${
						activeTab === 'custom' ? 'tab-active border-b-2 ' : ''
					}`}
				>
					Custom
				</button> */}
			</div>

			{/* Tab Content */}
			{renderTabContent()}
		</div>
	);
};

export default StatementsPage;
