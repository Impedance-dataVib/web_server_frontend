import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart({ data, max }: any) {
  const options = {
    responsive: true,
    indexAxis: "x" as const,
    maintainAspectRatio: false,

    scales: {
      y: {
        beginAtZero: true,
        max: max + 400,
        min: 0,
        ticks: {
          stepSize: max / 4,
        },
        gridLines: {
          display: false,
          drawBorder: false, //<- set this
        },
      },
      x: {
        beginAtZero: true,

        display: false,
        pointRadius: 0,
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        align: "center" as const,
        labels: {
          boxWidth: 12,
          useBorderRadius: true,
          borderRadius: 7,
        },
      },
    },
  };

  return (
    <Line
      options={options}
      data={data}
      style={{ height: "200px", width: "200px" }}
    />
  );
}
