import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = ({ sourceCustomer }) => {
	const totalQRSource =
		sourceCustomer?.banner +
		sourceCustomer?.business_card +
		sourceCustomer?.flyer +
		sourceCustomer?.poster +
		sourceCustomer?.table;
	const series = [
		{
			data: [
				sourceCustomer?.facebook,
				sourceCustomer?.google,
				totalQRSource,
				sourceCustomer?.instagram,
			],
		},
	];

	const colors = ['#b77ef3', '#235fe3', '#ef8c3a', '#20bc53'];

	const options = {
		chart: {
			height: 350,
			type: 'bar',
			events: {
				click: function (chart, w, e) {
					// console.log(chart, w, e)
				},
			},
		},
		colors: colors,
		plotOptions: {
			bar: {
				columnWidth: '45%',
				distributed: true,
			},
		},
		dataLabels: {
			enabled: false,
		},
		legend: {
			show: false,
		},
		xaxis: {
			categories: [
				['Facebook'],
				['Google', 'Search'],
				['QR', 'Code'],
				['Instagram'],
			],
			labels: {
				style: {
					colors: colors,
					fontSize: '12px',
				},
			},
		},
	};

	return (
		<div>
			<div id='chart'>
				<ReactApexChart
					options={options}
					series={series}
					type='bar'
					height={350}
				/>
			</div>
			<div id='html-dist'></div>
		</div>
	);
};

export default BarChart;
