import React from "react";
import { Typography, Box, Divider, Grid } from "@mui/material";
import GlobalIndicatorChart from "../dashboard/globalIndicator";
import SpeedoMeter from "../common/graph/speedo-meter";
import { webSocketData } from "../dashboard/schema";
import Auxiliarydata_speedometer from "./Auxiliarydata_speedometer";
const FileBrowserPage = () => {
  const globalIndicator = webSocketData.globalIndicator.slice(0, 3);
  const engineHealth = webSocketData.globalIndicator.slice(0, 4);
  return (
    <Box>
      <Typography
        variant="h5"
        padding={2}
        sx={{ fontWeight: 600, fontSize: "24px" }}
      >
        Auxiliary Data
      </Typography>
      <Box sx={{ bgcolor: "white" }}>
        <Typography
          variant="h5"
          padding={2}
          sx={{
            textAlign: "left",
            letterSpacing: "0.08px",
            color: "#434343",
            opacity: "1px",
            fontSize: "20px",
            fontWeight: 500,
          }}
        >
          Global Indicators
        </Typography>
        <Divider sx={{ mb: "10px" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            my: "30px",
          }}
        >
          {globalIndicator.map((val: any) => (
            <Auxiliarydata_speedometer val={val} />
          ))}
        </Box>

        <Typography
          variant="h5"
          padding={2}
          sx={{
            textAlign: "left",
            letterSpacing: "0.08px",
            color: "#434343",
            opacity: "1px",
            fontSize: "20px",
            fontWeight: 500,
            mt: "20px",
          }}
        >
          Engine Health
        </Typography>
        <Divider sx={{ mb: "10px" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            my: "30px",
          }}
        >
          {engineHealth.map((val: any) => (
            <Auxiliarydata_speedometer val={val} />
          ))}
        </Box>

        <Typography
          variant="h5"
          padding={2}
          sx={{
            textAlign: "left",
            letterSpacing: "0.08px",
            color: "#434343",
            opacity: "1px",
            fontSize: "20px",
            fontWeight: 500,
            mt: "20px",
          }}
        >
          Combustion Engine
        </Typography>
        <Divider sx={{ mb: "10px" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            my: "30px",
          }}
        >
          {engineHealth.map((val: any) => (
            <Auxiliarydata_speedometer val={val} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default FileBrowserPage;
