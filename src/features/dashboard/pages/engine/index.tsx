import React from "react";
import { Box, Grid } from "@mui/material";
import EngineSignals from "./widgets/signals";
import EngineActivityMonitor from "./widgets/activityMonitor";
import EngineRecommendedActions from "./widgets/recommendedActions";
import EngineLatestReport from "./widgets/latestReport";
import EngineCylinderIndicators from "./widgets/cylinderIndicators";
import GlobalEngineIndicators from "./widgets/globalEngineIndicators";
import EngineIndicators from "./widgets/engineIndicators";
import CoreDigitalIO from "../core/digital-io";
import CoreSystem from "../core/system";

const EngineMonitoringPage = () => {
  return (
    <Box>
      Engine Page
      {/* <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={4} spacing={2}>
            <Box sx={{ mt: 2 }}>
              <EngineSignals />
            </Box>
            <Box sx={{ mt: 2 }}>
              <EngineLatestReport />
            </Box>
            <Box sx={{ mt: 2 }}>
              <EngineIndicators />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Box sx={{ mt: 2 }}>
              <EngineActivityMonitor />
            </Box>
            <Box sx={{ mt: 2 }}>
              <EngineCylinderIndicators />
            </Box>
            <Box sx={{ mt: 2 }}>
              <CoreSystem />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Box sx={{ mt: 2 }}>
              <EngineRecommendedActions />
            </Box>
            <Box sx={{ mt: 2 }}>
              <GlobalEngineIndicators />
            </Box>
            <Box sx={{ mt: 2 }}>
              <CoreDigitalIO />
            </Box>
          </Grid>
        </Grid>
      </Box> */}
    </Box>
  );
};
export default EngineMonitoringPage;
