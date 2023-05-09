import React from "react";
import { Box, Grid } from "@mui/material";
import MotorSignals from "./widgets/signals";
import MotorActivityMonitor from "./widgets/activityMonitor";
import MotorRecommendedActions from "./widgets/recommendedActions";
import MotorLatestReport from "./widgets/latestReport";
import TractorMotor from "./widgets/tractorMotor";
import CoreDigitalIO from "../core/digital-io";
import CoreSystem from "../core/system";

const MotorMonitoringPage = () => {
  return (
    <Box>MotorMonitoringPage
      {/* <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={4} spacing={2}>
            <Box sx={{ mt: 2 }}>
              <MotorSignals />
            </Box>
            <Box sx={{ mt: 2 }}>
              <MotorLatestReport />
            </Box>
            <Box sx={{ mt: 2 }}>
              <CoreDigitalIO />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Box sx={{ mt: 2 }}>
              <MotorActivityMonitor />
            </Box>
            <Box sx={{ mt: 2 }}>
              <TractorMotor />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Box sx={{ mt: 2 }}>
              <MotorRecommendedActions />
            </Box>

            <Box sx={{ mt: 2 }}>
              <CoreSystem />
            </Box>
          </Grid>
        </Grid>
      </Box> */}
    </Box>
  );
};
export default MotorMonitoringPage;
