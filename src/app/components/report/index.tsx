import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import ReportType from "./reportType";

export interface ReportComponentProps {
  reportData: any;
}

const ReportComponent = ({ reportData }: ReportComponentProps) => {
  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption"> Date of report </Typography>
        </Box>
        <Box sx={{ width: "120px" }}>
          <Typography variant="caption">{reportData?.time} </Typography>
        </Box>
      </Box>
      <Box>
        <Grid container>
          <Grid item xs={6}>
            <ReportType
              label="Graphical Report"
              downloadUrl={reportData?.files?.ind}
              viewUrl={reportData?.files?.png}
            ></ReportType>
          </Grid>
          <Grid item xs={6}>
            <ReportType label="Raw Data" downloadUrl=""></ReportType>
          </Grid>
          <Grid item xs={6}>
            <ReportType
              label="Spreadsheet Report"
              downloadUrl={reportData?.files?.xls}
            ></ReportType>
          </Grid>
          <Grid item xs={6}>
            <ReportType
              label="JSON Text Report"
              downloadUrl={reportData?.files?.ind}
            ></ReportType>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default ReportComponent;
