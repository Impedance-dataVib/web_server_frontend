import { Box, rgbToHex } from '@mui/material';
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    TimeScale,
    TimeSeriesScale,
    LogarithmicScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from "chart.js";
  import { Chart, Line, Doughnut } from "react-chartjs-2";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    TimeScale,
    TimeSeriesScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  const customspeedometerplugin = {
    id: 'customspeedometerplugin',
    beforeDraw(chart: any, args: any, pluginOptions: any) {
      const {ctx, chartArea: {left, top, right, bottom}, scales: {x, y}} = chart;
    const midX = chart.getDatasetMeta(0).data[0].x;
    const midY = chart.getDatasetMeta(0).data[0].y;
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.save();
    // ctx.fillRect(xCoor, yCoor + 20, midX - left, midY - top);
    // ctx.fillStyle = pluginOptions.topLeft;
    // ctx.fillRect(left, top, midX - left, midY - top);
    // ctx.fillStyle = pluginOptions.topRight;
    // ctx.fillRect(midX, top, right - midX, midY - top);
    // ctx.fillStyle = pluginOptions.bottomRight;
    // ctx.fillRect(midX, midY, right - midX, bottom - midY);
    // ctx.fillStyle = pluginOptions.bottomLeft;
    // ctx.fillRect(left, midY, midX - left, bottom - midY);
    // ctx.restore();
      // console.log('customspeedometerplugin args = ', args, chart);
      // console.log('customspeedometerplugin plugin options = ', pluginOptions);

      // const { ctx, data, chartArea: {top, bottom, left, right, width, height}, scales: {r}} = chart;

      // ctx.save();

      // const xCoor = chart.getDatasetMeta(0).data[0].x;
      // const yCoor = chart.getDatasetMeta(0).data[0].y;

      // ctx.fillRect(xCoor, yCoor, 400, 1);

      const getTextLabel = (text: any, x: number, y: number, fontSize: any, textBaseLine: any, textAlign: any) => {
        // ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = "#666";
        // ctx.textBaseLine = `${textBaseLine}`;
        // ctx.textAlign = `${textAlign}`;
        ctx.fillText(`${text}`, x, y);
      }

      getTextLabel('0.0', xCoor, top, '20px', 'top', 'left');
      // getTextLabel('100', right - 20, yCoor + 20, '20px', 'top', 'left');


      ctx.restore();



    }
  }

const GlobalIndicatorChart = () => {

    return (
        <Box>
<Doughnut
              data={{
                labels: [],
                datasets: [
                  {
                    label: "",
                    data: [1],
                    // fill: "origin",
                    backgroundColor: "rgb(75, 192, 192)",
                    borderColor: "rgb(75, 192, 192)",
                    // tension: 0.1,
                  },
                ],
              }}
              options={{
                responsive: true,
                animation: false,
                maintainAspectRatio: false,
                aspectRatio: 1.5,
                cutout: '85%',
                circumference: 180,
                rotation: 270,
                // showLine: true,
                interaction: {
                  intersect: false,
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: false,
                  },
                  filler: {
                    propagate: true,
                  },
                  // customspeedometerplugin: {
                  //   x: true
                  // }
                },
                elements: {
                  point: {
                    radius: 0,
                  },
                },
                scales: {
                  x: {
                    type: "linear",
                    display: false,
                  },
                },
              }}
              plugins={[customspeedometerplugin]}
            />
        </Box>
    )
}
export default GlobalIndicatorChart;