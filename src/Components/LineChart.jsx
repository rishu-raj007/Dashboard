// CityChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = ({makerData}) => {


    const chartData = {
        labels: Object.keys(makerData), // City names
        datasets: [
            {
                label: 'Vehicle Count',
                data: Object.values(makerData), // Population counts
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.2, // Smoothens the line
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Vehicle Count',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Makers',
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineChart;
