import { Line } from "react-chartjs-2";
import { useRef } from "react";
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
    mode: "x" as "x"
  },
  zoom: {
    wheel: {
      enabled: true
    },
    pinch: {
      enabled: true
    },
    mode: "x" as "x"
  }
};

export default function LineGradient( {minValue,trendsName, isGradientOpposite, maxValue, avgValue, datapoints, dataPointsY1, labels}: any) {
  const chartRef = useRef<any>(null);
  let width: any, height: any, gradient: any;
  function getGradient(ctx: any, chartArea: any, isGradientOpposite:boolean) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      // Create the gradient because this is either the first render
      // or the size of the chart has changed
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );
      gradient.addColorStop(isGradientOpposite ? 1 : 0, "#02B271");
      gradient.addColorStop( 0.6, "#FFA326");
      gradient.addColorStop(isGradientOpposite ? 0 : 1, "#FF0000");
    }

    return gradient;
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: trendsName,
        data: datapoints,
        borderColor: "red",
        // cubicInterpolationMode: "monotone" as const,
        // tension: 1,
        pointBackgroundColor: "#1D4580",
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return;
          }
          return getGradient(ctx, chartArea, isGradientOpposite);
        },
        fill: true,
        yAxisID: 'y',
      },
      {
        label: trendsName,
        data: dataPointsY1,
        borderColor: "red",
        cubicInterpolationMode: "monotone" as const,
        tension: 1,
        pointBackgroundColor: "#1D4580",
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }
          return getGradient(ctx, chartArea, isGradientOpposite);
        },
        fill: true,
        yAxisID: 'y1',
        hidden: true,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      zoom: zoomOptions,
      
    },
    animation: {
      duration: 0
    },
    scales: {
      x: {
        ticks: {
            maxRotation: 60,
            minRotation: 60
        }
    },
      y: {
        beginAtZero: true,
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        max: maxValue || 100,
      },
      y1: {
        beginAtZero: true,
        type: 'linear' as const,
        display: true,
        max: round(Math.max(...dataPointsY1)),
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  return (<Line ref={chartRef} options={options} data={data} />);
}
