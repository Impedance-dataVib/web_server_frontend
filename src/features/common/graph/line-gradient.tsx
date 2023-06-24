import { Line } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import zoomPlugin from "chartjs-plugin-zoom";
import { round } from "src/app/utils/helper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

const zoomOptions = {
  pan: {
    enabled: true,
    mode: "x" as "x",
  },
  zoom: {
    wheel: {
      enabled: true,
    },
    pinch: {
      enabled: true,
    },
    mode: "x" as "x",
  },
};

export default function LineGradient({
  trendsName,
  speedName,
  isGradientOpposite,
  maxValue,
  datapoints,
  dataPointsY1,
  dataPointsY2,
  labels,
}: any) {
  const chartRef = useRef<any>(null);
  const datasetsName = trendsName.split(',');

  const data = {
    labels: labels,
    datasets: [
      {
        label: speedName,
        data: dataPointsY1,
        borderColor: "black",
        cubicInterpolationMode: "monotone" as const,
        tension: 1,
        pointBackgroundColor: "black",
        yAxisID: "y1",
        hidden: false,
        borderWidth: 1,
      },

      {
        label: datasetsName[0],
        data: datapoints,
        borderColor: "red",
        pointBackgroundColor: "#1D4580",
        yAxisID: "y",
        borderWidth: 1,
      },
     
    ],
  };
  if(dataPointsY2 && dataPointsY2.length) {
    data.datasets.push(
      {
        label: datasetsName[1] || datasetsName[0],
        data: dataPointsY2,
        borderColor: "yellow",
        pointBackgroundColor: "#1D4580",
        yAxisID: "y",
        borderWidth: 1,
      }
    )
  }
  const plugins = [
    {
      id: "custom_canvas_background_color",
      type: "line",
      beforeDraw: function (chart: any, args: any, options: any) {
        const ctx = chart.ctx;
        const canvas = chart.canvas;
        const chartArea = chart.chartArea;
        var gradientBack = canvas
          .getContext("2d")
          .createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

        if (!isGradientOpposite) {
          gradientBack.addColorStop(1, "#ffffff");
          gradientBack.addColorStop(0.41, "#ffffff");
          gradientBack.addColorStop(0.4, "#02B271");
          gradientBack.addColorStop(0, "#02B271");
        } else {
          gradientBack.addColorStop(1, "#02B271");
          gradientBack.addColorStop(0.61, "#02B271");
          gradientBack.addColorStop(0.6, "#ffbf00");
          gradientBack.addColorStop(0.31, "#ffbf00");
          gradientBack.addColorStop(0.3, "#ff0000b3");
          gradientBack.addColorStop(0, "#ff0000b3");
        }
        ctx.fillStyle = gradientBack;
        ctx.fillRect(
          chartArea.left,
          chartArea.bottom,
          chartArea.right - chartArea.left,
          chartArea.top - chartArea.bottom
        );
      },
    },
  ];
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            family: 'Poppins,Helvetica,"sans-serif',
            size: 14,
          },
        },
      },
      title: {
        display: false,
      },
      zoom: zoomOptions,
    },
    animation: {
      duration: 0,
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 60,
          minRotation: 60,
          font: {
            family: 'Poppins,Helvetica,"sans-serif',
            size: 12,
            whiteSpace: "normal",
          },
        },
        title: {
          text: "Time",
          display: true,
          font: {
            size: 14,
            family: 'Poppins,Helvetica,"sans-serif',
            weight: "bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        type: "linear" as const,
        display: true,
        position: "left" as const,
        max: maxValue || 100,
        ticks: {
          font: {
            family: 'Poppins,Helvetica,"sans-serif',
            size: 12,
          },
        },
        title: {
          text: trendsName,
          display: true,
          font: {
            size: 14,
            family: 'Poppins,Helvetica,"sans-serif',
            weight: "bold",
          },
        },
      },
      y1: {
        ticks: {
          font: {
            family: 'Poppins,Helvetica,"sans-serif',
            size: 12,
          },
          callback: (value: any) => {
            return value;
          },
        },
        beginAtZero: true,
        type: "linear" as const,
        display: true,
        max: round(Math.max(...dataPointsY1)),
        position: "right" as const,
        title: {
          text: speedName || trendsName,
          display: true,
          font: {
            size: 14,
            family: 'Poppins,Helvetica,"sans-serif',
            weight: "bold",
          },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  return (
    <Line ref={chartRef} options={options} data={data} plugins={plugins} />
  );
}
