import React, { useContext } from "react";
import { Box, Paper } from "@mui/material";
import DashboardContext from "../../../context";
import ReportComponent from "../../../../../app/components/report";

const MotorLatestReport = () => {
  const { motorLatestReport } = useContext(DashboardContext);

  return (
    <Paper sx={{p: 2}}>
      <Box>
        <Box sx={{ fontWeight: "bold" }}>Latest Report</Box>
        <Box>
          <ReportComponent reportData={motorLatestReport} />
        </Box>
      </Box>
    </Paper>
  );
};
export default MotorLatestReport;
