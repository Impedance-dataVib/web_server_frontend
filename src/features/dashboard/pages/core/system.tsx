import { useContext } from "react";
import { Box, LinearProgress, Paper, Typography } from "@mui/material";

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
} from "chart.js";
import { Chart, Line } from "react-chartjs-2";
import DashboardContext from "../../context";

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
  Legend
);

const CoreSystem = () => {
  const { systemData, cpuUsage } = useContext(DashboardContext);

  const errors = systemData?.errors;

  return (
    <Paper sx={{ p: 2 }}>
      <Box>
        <Box>System</Box>
        <Box sx={{ display: "flex", borderBottom: "1px solid lightgrey" }}>
          <Box sx={{ flex: 1 }}> Status </Box>

          <Box>
            {errors !== undefined &&
              Array.isArray(errors) &&
              errors?.length === 0 && (
                <Typography variant="caption">OK</Typography>
              )}
            {errors === undefined && (
              <Typography variant="caption">OK</Typography>
            )}
            {errors !== undefined &&
              Array.isArray(errors) &&
              errors?.length >= 0 && (
                <Typography variant="caption">There are errors</Typography>
              )}
          </Box>
        </Box>

        <Box
          sx={{ mt: 1, display: "flex", borderBottom: "1px solid lightgrey" }}
        >
          <Box sx={{ flex: 1 }}> Sample Rate </Box>

          <Box>
            {systemData?.sampleRate !== undefined && (
              <Typography variant="caption">
                {systemData?.sampleRate} KHz
              </Typography>
            )}
          </Box>
        </Box>

        <Box>
          <Box
            sx={{ mt: 1, display: "flex", borderBottom: "1px solid lightgrey" }}
          >
            <Box sx={{ flex: 1 }}> Disk Space </Box>

            <Box>
              {systemData?.disk?.capacity !== undefined && (
                <Typography variant="caption">
                  {  systemData?.disk?.used} / {systemData?.disk?.capacity}
                </Typography>
              )}
            </Box>
          </Box>
          <Box>
            <LinearProgress
              variant="determinate"
              value={
                (parseInt(systemData?.disk?.used) /
                  parseInt(systemData?.disk?.capacity)) *
                100
              }
            />
          </Box>
        </Box>

        <Box>
          <Box
            sx={{ mt: 1, display: "flex", borderBottom: "1px solid lightgrey" }}
          >
            <Box sx={{ flex: 1 }}> RAM </Box>

            <Box>
              {systemData?.ram?.capacity !== undefined && (
                <Typography variant="caption">
                  {systemData?.ram?.used} of {
                  systemData?.ram?.capacity 
                  } MB
                </Typography>
              )}
            </Box>
          </Box>
          <Box>
            <LinearProgress
              variant="determinate"
              value={
                (parseInt(systemData?.ram?.used) /
                  parseInt(systemData?.ram?.capacity)) *
                100
              }
            />
          </Box>
        </Box>

        <Box>
          <Box
            sx={{ mt: 1, display: "flex", borderBottom: "1px solid lightgrey" }}
          >
            <Box sx={{ flex: 1 }}> CPU Utilization </Box>

            <Box>
              {systemData?.[`^cpu[100]#`] !== undefined && (
                <Typography variant="caption">
                  {systemData?.[`^cpu[100]#`]}%
                </Typography>
              )}
            </Box>
          </Box>
          <Box sx={{ height: "150px", flex: 1 }}>
            <Line
              data={{
                labels: [],
                datasets: [
                  {
                    label: "",
                    data: [...cpuUsage].map((value, index) => {
                      return { y: value, x: index + 10 };
                    }),
                    fill: "origin",
                    backgroundColor: "rgb(75, 192, 192)",
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1,
                  },
                ],
              }}
              options={{
                responsive: true,
                animation: false,
                maintainAspectRatio: false,
                showLine: true,
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
            />
          </Box>
        </Box>

        <Box>
          <Box
            sx={{ mt: 1, display: "flex", borderBottom: "1px solid lightgrey" }}
          >
            <Box sx={{ flex: 1 }}> Queue </Box>
            <Box>{systemData?.queue?.length || 0}</Box>
          </Box>

          {systemData?.queue &&
            systemData?.queue?.length > 0 &&
            systemData?.queue?.map((q: any) => (
              <Box
                sx={{
                  display: "flex",
                  color: q?.active ? "orange" : "black",
                  lineHeight: "1.3rem",
                }}
              >
                <Box sx={{ flex: 1 }}>{q?.name} </Box>
                <Box>{q?.mode}</Box>
              </Box>
            ))}
        </Box>
      </Box>
    </Paper>
  );
};
export default CoreSystem;
