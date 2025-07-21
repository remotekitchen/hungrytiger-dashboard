// import ReactApexChart from 'react-apexcharts';
import { useState } from 'react';
import SlotCounter from 'react-slot-counter';
import ChurnedUsersTableModal from './ChurnedCustomers';

const StatsCard = ({ title, stat, seriesData }) => {
	const images = {
		'Unique Page Views': '/unique_page_views.webp',
		'New registered users': '/new_users.webp',
		'Repeat Customers': '/repeat_customers.webp',
		'Churned Customers': '/churned_user.webp',
	};
	const options = {
		chart: {
			type: 'line',
			sparkline: {
				enabled: true,
			},
		},
		stroke: {
			curve: 'straight',
		},
		tooltip: {
			enabled: true,
		},
		colors: ['#1E90FF'],
		yaxis: {
			min: 0,
		},
	};

	const series = [
		{
			data: seriesData,
		},
	];

	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div className='bg-white shadow-md rounded-lg p-4 flex gap-10 items-center justify-between'>
			<div className='flex flex-col'>
				<h4 className='text-black text-sm font-bold'>{title}</h4>
				{/* <h2 className='text-3xl font-semibold text-gray-900'>{stat}</h2> */}
				<SlotCounter
					style={{ fontSize: '2rem', color: 'blue' }}
					speed={1}
					value={stat ? stat : 0}
				/>
				{title === 'Churned Customers' && (
					<>
						<button
							className='btn btn-xs btn-primary'
							onClick={() => setIsModalOpen(true)}
						>
							See more
						</button>
						<ChurnedUsersTableModal
							churnedUsers={seriesData}
							isModalOpen={isModalOpen}
							onClose={() => setIsModalOpen(false)}
						/>
					</>
				)}
			</div>
			<div className=''>
				{/* <ReactApexChart
					options={options}
					series={series}
					type='line'
					height={50}
				/> */}

				<img
					src={images[title]}
					alt={title}
					className='w-[100px] h-full object-contain rounded-lg'
				/>
			</div>
		</div>
	);
};

const ZoomableTimeAerieChart = ({
	uniquePageViews,
	repeatCustomers,
	churnedUsers,
	newRegistered,
}) => {
	const statsData = [
		{
			title: 'Unique Page Views',
			stat: uniquePageViews,
			seriesData: [uniquePageViews],
		},
		{
			title: 'New registered users',
			stat: newRegistered,
			seriesData: [newRegistered],
		},
		{
			title: 'Repeat Customers',
			stat: repeatCustomers,
			seriesData: [repeatCustomers],
		},
		{
			title: 'Churned Customers',
			stat: churnedUsers?.total_count,
			seriesData: [churnedUsers],
		},
	];

	return (
		<div className='flex flex-col gap-3 w-full'>
			{statsData.map((statItem, index) => (
				<StatsCard
					key={index}
					title={statItem.title}
					stat={statItem.stat}
					seriesData={statItem.seriesData}
				/>
			))}
		</div>
	);
};

export default ZoomableTimeAerieChart;
