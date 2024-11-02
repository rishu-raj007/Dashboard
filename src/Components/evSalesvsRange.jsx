import React from 'react';
import { Line } from 'react-chartjs-2';
import _ from 'lodash';





const EvSalesvsRangeChart = ({carData}) => {
    // Prepare the data by filtering, grouping, counting, and sorting
const chartData = _(carData)
.filter(item => parseInt(item.range, 10) !== 0) // Filter items where range is not 0
.groupBy('name')
.map((items, name) => ({
    name: name,
    range: parseInt(items[0].range, 10), // Convert range to integer
    countOfName: items.length
}))
.orderBy('countOfName', 'desc') // Sort by countOfName in descending order
.take(10) // Take only the top 10 results
.value();
    const names = chartData.map(item => item.name);
    const ranges = chartData.map(item => item.range);
    const counts = chartData.map(item => item.countOfName);

    const data = {
        labels: names,
        datasets: [
            {
                label: 'Range',
                data: ranges,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
                tension: 0.1,
            },
            {
                label: 'Sales',
                data: counts,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Vehicle Name'
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Value'
                },
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default EvSalesvsRangeChart;
