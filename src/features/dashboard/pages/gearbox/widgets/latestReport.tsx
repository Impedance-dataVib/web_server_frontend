import React, { useContext } from "react";
import { Box, Paper } from "@mui/material";
import DashboardContext from "../../../context";
import ReportComponent from "../../../../../app/components/report";

const GearboxLatestReport = () => {
  const { gearboxLatestReport } = useContext(DashboardContext);

  return (
    <Paper sx={{p: 2}}>
      <Box>
        <Box sx={{ fontWeight: "bold" }}>Latest Report</Box>
        <Box>
          <ReportComponent reportData={gearboxLatestReport} />
        </Box>
      </Box>
    </Paper>
  );
};
export default GearboxLatestReport;
