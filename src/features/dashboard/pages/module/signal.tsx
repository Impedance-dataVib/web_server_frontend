import { Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import { LineChart } from "src/features/common/graph/line-chart";

const apiData = {
  steps: [
    {
      topText: ".",
      bottomText: "Idle",
    },
    {
      topText: "Step 1",
      bottomText: "Record",
    },
    {
      topText: "Step 2",
      bottomText: "Next",
    },
    {
      topText: "Step 3",
      bottomText: "Report",
    },
  ],
  currentMode: "Auto",
};

const Signal = ({ signals }: any) => {
  const labels = ["", ""];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        // alignItems: "center",
        height: "200px",
      }}
    >
      <Box sx={{ width: "50%" }}>
        <LineChart
          data={{
            labels,
            datasets: [
              {
                label: `Crank Shaft - ${signals?.crankShaft || 0}`,
                data: [signals?.crankShaft || 0, signals?.crankShaft || 0],
                borderColor: "#02B271",
                backgroundColor: "#02B271",
              },
            ],
          }}
        />
      </Box>
      <Box sx={{ width: "50%" }}>
        <LineChart
          data={{
            labels,
            datasets: [
              {
                label: `CDC - ${signals?.tdc || 0}`,
                data: [signals?.tdc || 0 , signals?.tdc || 0],
                borderColor: "#E18442",
                backgroundColor: "#E18442",
              },
            ],
          }}
        />
      </Box>
    </Box>
  );
};

export default Signal;
