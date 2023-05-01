import { Bar } from 'react-chartjs-2';

export const BarChart = ({ chartData }) => {
  return <Bar data={chartData} />;
};

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};
