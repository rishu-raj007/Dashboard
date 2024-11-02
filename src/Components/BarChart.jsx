import { Bar, Chart, Scatter } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    PointElement,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip,PointElement, Legend);

const BarChart=({cityData})=>{
    const chartData = {
        labels: Object.keys(cityData),
        datasets: [
            {
                label: 'Vehicle Count',
                data: Object.values(cityData),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };


    return <Bar data={chartData} options={options} />;
}

export default BarChart