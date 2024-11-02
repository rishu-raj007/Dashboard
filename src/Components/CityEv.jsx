import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EVModelChart = ({ data }) => {
    // Extract cities and model data
    const cities = data.map(item => item.city);
    const modelNames = Array.from(new Set(data.flatMap(item => Object.keys(item.models))));

    // Prepare datasets for each model across cities
    const datasets = modelNames.map((model) => {
        return {
            label: model,
            data: data.map(cityData => cityData.models[model] || 0),
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
        };
    });

    const chartData = {
        labels: cities,
        datasets: datasets,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Electric Vehicle Model Distribution by City',
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default EVModelChart;
