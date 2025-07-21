import React from 'react';
import Chart from 'react-apexcharts';

const FinanceChart = () => {
    const chartOptions = {
        chart: {
            id: 'basic-bar'
        },
        xaxis: {
            categories: ['Total Revenue', 'Delivery Charges', 'Discount', 'Tax Withheld', 'Calculated Payment', 'Difference', 'Actual Payment']
        },
        yaxis: {
            min: 0,    // Set the minimum value for y-axis
            max: 100   // Set the maximum value for y-axis
        }
    };

    const chartSeries = [
        {
            name: 'series-1',
            data: [100, 10, 20, 20, 49, 20, 70]
        }
    ];

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={chartOptions}
                        series={chartSeries}
                        type="bar"
                        width="500"
                    />
                </div>
            </div>
        </div>
    );
};

export default FinanceChart;


