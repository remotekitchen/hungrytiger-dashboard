import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const FunnelChart = ({ traffic }) => {
	const [series, setSeries] = useState([]);
	const [options, setOptions] = useState({
		chart: {
			type: 'bar',
			height: 350,
			dropShadow: {
				enabled: true,
				top: 2,
				left: 2,
				blur: 4,
				opacity: 0.5,
			},
		},
		plotOptions: {
			bar: {
				borderRadius: 0,
				horizontal: true,
				distributed: true,
				barHeight: '80%',
				isFunnel: true,
			},
		},
		colors: ['#AAD2E8', '#6DB1E3', '#3380B9', '#315C84'],
		dataLabels: {
			enabled: true,
			formatter: function (val, opt) {
				return `${opt.w.globals.labels[opt.dataPointIndex]}: ${val}`;
			},
			dropShadow: {
				enabled: true,
				top: 1,
				left: 1,
				blur: 2,
				opacity: 0.6,
			},
		},
		title: {
			text: 'Traffic Funnel Chart',
			align: 'center',
		},
		xaxis: {
			categories: [
				'Page Views (Unique)',
				'Cart Addition',
				'Order Confirmation',
				'Payment Confirmation',
			],
		},
		legend: {
			show: false,
		},
	});

	useEffect(() => {
		if (traffic) {
			setSeries([
				{
					name: 'Funnel Series',
					data: [
						traffic.do || 0,
						traffic.cart || 0,
						traffic.order_confirm || 0,
						traffic.payment_confirm || 0,
					],
				},
			]);
		}
	}, [traffic]);

	return (
		<div id='chart'>
			<ReactApexChart
				options={options}
				series={series}
				type='bar'
				height={350}
			/>
		</div>
	);
};

export default FunnelChart;
