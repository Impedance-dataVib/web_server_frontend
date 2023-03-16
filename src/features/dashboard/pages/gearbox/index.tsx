import React from "react";
import { Box, Grid } from "@mui/material";
import GearboxSignals from "./widgets/signals";
import GearboxActivityMonitor from "./widgets/activityMonitor";
import GearboxRecommendedActions from "./widgets/recommendedActions";
import GearboxLatestReport from "./widgets/latestReport";
import GearboxMonitor from "./widgets/gearbox";
import CoreDigitalIO from "../core/digital-io";
import CoreSystem from "../core/system";

const GearBoxMonitoringPage = () => {
  return (
    <Box>      
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={4} spacing={2}>
            <Box sx={{mt: 2}}>
              <GearboxSignals />
            </Box>
            <Box sx={{mt: 2}}>
              <GearboxLatestReport />
            </Box>
            <Box sx={{mt: 2}}>
              <CoreDigitalIO />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Box sx={{mt: 2}}>
              <GearboxActivityMonitor />
            </Box>
            <Box sx={{mt: 2}}>
              <GearboxMonitor />
            </Box>
            
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Box sx={{mt: 2}}>
              <GearboxRecommendedActions />
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
export default GearBoxMonitoringPage;
