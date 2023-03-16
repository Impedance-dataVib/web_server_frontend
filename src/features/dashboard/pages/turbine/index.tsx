import React from "react";
import { Box, Grid } from "@mui/material";
import TurbineSignals from "./widgets/signals";
import TurbineActivityMonitor from "./widgets/activityMonitor";
import TurbineRecommendedActions from "./widgets/recommendedActions";
import TurbineLatestReport from "./widgets/latestReport";
import TurbineMonitor from "./widgets/turbine";
import CoreDigitalIO from "../core/digital-io";
import CoreSystem from "../core/system";

const TurbineMonitoringPage = () => {
  return (
    <Box>      
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={4} spacing={2}>
            <Box sx={{mt: 2}}>
              <TurbineSignals />
            </Box>
            <Box sx={{mt: 2}}>
              <TurbineLatestReport />
            </Box>
            <Box sx={{mt: 2}}>
              <CoreDigitalIO />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Box sx={{mt: 2}}>
              <TurbineActivityMonitor />
            </Box>
            <Box sx={{mt: 2}}>
              <TurbineMonitor />
            </Box>
            
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Box sx={{mt: 2}}>
              <TurbineRecommendedActions />
            </Box>
            
            <Box sx={{mt: 2}}>
              <CoreSystem />
            </Box>
            
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default TurbineMonitoringPage;
