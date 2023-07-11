import { Line } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";
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
import CircleIcon from "@mui/icons-material/Circle";

import zoomPlugin from "chartjs-plugin-zoom";
import { round } from "src/app/utils/helper";
import { Grid, Typography } from "@mui/material";

type ObjectDataSet = {
  title: string;
  data: any[];
  label: string;
  borderColor: string;
  pointBackgroundColor: string;
  backgroundColor: string;
  fill: boolean;
  yAxisID: string;
  hidden: boolean;
  minVal: any;
  maxValue: any;
  avgValue: any;
};

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

export default function LineGradientTrends({
  labels,
  dataPoints,
  maxRpm,
  selectedValue,
  yLabel,
}: any) {
  const chartRef = useRef<any>(null);
  const [graphData, setGraphData] = useState<any>({ labels: [], datasets: [] });

  const handlegraphData = (labels: [], dataSets: any, selectedValue: []) => {
    const grData = dataSets.filter((x: ObjectDataSet) =>
      selectedValue.some((val: any) => val === x.title)
    );
    dataSets.filter((val: any) => {
      return {
        ...val,
      };
    });
    setGraphData({ labels: labels, datasets: grData });
  };

  useEffect(() => {
    handlegraphData(labels, dataPoints, selectedValue);
  }, [labels, dataPoints, selectedValue]);

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
        display: false,
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
          font: {
            weight: "bold",
            size: 14,
            whiteSpace: "normal",
          },
          maxRotation: 0,
          minRotation: 0,
          maxTicksLimit: 7,
        },
        title: {
          text: "Time (UTC)",
          display: true,
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        type: "linear" as const,
        display: true,
        position: "left" as const,
        max: 110,
        font: {
          family: 'Poppins,Helvetica,"sans-serif',
          size: 12,
        },
        ticks: {
          font: {
            weight: "bold",
            size: 14,
            whiteSpace: "normal",
          },
          callback: (value: any) => {
            return parseInt(value);
          },
        },
        title: {
          text: yLabel,
          display: true,
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      y1: {
        beginAtZero: true,
        type: "linear" as const,
        display: true,
        max: round(maxRpm),
        position: "right" as const,
        ticks: {
          font: {
            weight: "bold",
            size: 14,
            whiteSpace: "normal",
          },
          callback: (value: any) => {
            return parseInt(value);
          },
        },
        title: {
          text: "Speed",
          display: true,
          font: {
            size: 14,
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
    <>
      <div style={{ width: "80vw", height: "70vh" }}>
        {graphData.datasets && (
          <Line ref={chartRef} options={options} data={graphData} />
        )}
      </div>
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        {graphData.datasets.map((val: ObjectDataSet) => (
          <Grid
            key={val?.title}
            spacing={2}
            container
            sx={{ width: "80vw", marginBottom: "10px" }}
          >
            <Grid item lg={4}>
              <Typography
                component="span"
                textAlign={"left"}
                alignItems="center"
                display={"flex"}
                sx={{
                  cursor: "pointer",
                  textDecoration: val.hidden ? "line-through" : "none",
                }}
                onClick={() => {
                  let data = graphData.datasets.map((v: any) => {
                    if (val?.title === v.title) {
                      v.hidden = !v.hidden;
                    }
                    return v;
                  });
                  setGraphData({ labels: labels, datasets: data });
                }}
              >
                <CircleIcon sx={{ color: val.borderColor, mr: 1 }} />
                {val?.title}
              </Typography>
            </Grid>
            <Grid item lg={3}>
              <Typography
                component="span"
                textAlign={"left"}
                alignItems="center"
                display={"flex"}
              >
                Min. {val?.minVal}
              </Typography>
            </Grid>
            <Grid item lg={3}>
              <Typography
                component="span"
                textAlign={"left"}
                alignItems="center"
                display={"flex"}
              >
                Max. {val?.maxValue}
              </Typography>
            </Grid>
            <Grid item lg={2}>
              <Typography
                component="span"
                textAlign={"left"}
                alignItems="center"
                display={"flex"}
              >
                Avg. {val?.avgValue}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </div>
    </>
  );
}
