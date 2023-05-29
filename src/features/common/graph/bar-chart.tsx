import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true
    },
    x: {
       
        ticks: {
            autoSkip: true,
            maxTicksLimit: 20
        }
    }
  },
};



export function BarChart({datapoints, labels}: any) {
    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: datapoints,
            backgroundColor: '#1D4580',
          },
        ],
      };
      
  return <Bar options={options} data={data} />;
}
