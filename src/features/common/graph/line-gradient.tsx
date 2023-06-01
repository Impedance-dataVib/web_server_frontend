import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function LineGradient({
  minValue,
  maxValue,
  avgValue,
  datapoints,
  labels,
}: any) {
  let width: any, height: any, gradient: any;
  function getGradient(ctx: any, chartArea: any) {
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
      gradient.addColorStop(0.8, "#02B271");
      gradient.addColorStop(0.2, "#d6a79f");
    }

    return gradient;
  }

  const DATA_COUNT = 12;

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Increase Fuel Consumption",
        data: datapoints,
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
          return getGradient(ctx, chartArea);
        },
        fill: true,
      },
    ],
  };

  const config = {
    responsive: true,
    maintainAspectRatio: false,
    type: "line" as const,
    plugins: {
      legend: {
        display: false,
      },
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          //   text: "Increase Fuel Consumption",
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          labelString: "probability",
          title: {
            display: true,
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Value",
          },
          suggestedMin: `${minValue}%`,
          suggestedMax: `${maxValue}%`,
        },
      },
    },
  };
  return <Line data={data} options={config} />;
}
