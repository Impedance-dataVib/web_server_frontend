import React from "react";
import { Box, Grid } from "@mui/material";
import BearingActivityMonitor from "./widgets/activityMonitor";
import BearingSignals from "./widgets/signals";
import BearingLatestReport from "./widgets/latestReport";
import BearingMonitor from "./widgets/bearing";
import BearingRecommendedActions from "./widgets/recommendedActions";
import CoreDigitalIO from "../core/digital-io";
import CoreSystem from "../core/system";
import ErrorBoundary from "../../../../app/components/error-boundary";

const BearingMonitoringPage = () => {
  return (
    <ErrorBoundary>
      <Box>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <ErrorBoundary>
              <Grid item xs={12} sm={6} md={4} lg={4} spacing={2}>
                <ErrorBoundary>
                  <Box sx={{ mt: 2 }}>
                    <BearingSignals />
                  </Box>
                </ErrorBoundary>

                <ErrorBoundary>
                  <Box sx={{ mt: 2 }}>
                    <BearingLatestReport />
                  </Box>
                </ErrorBoundary>

                <ErrorBoundary>
                  <Box sx={{ mt: 2 }}>
                    <CoreDigitalIO />
                  </Box>
                </ErrorBoundary>
              </Grid>
            </ErrorBoundary>

            <ErrorBoundary>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <ErrorBoundary>
                  <Box sx={{ mt: 2 }}>
                    <BearingActivityMonitor />
                  </Box>
                </ErrorBoundary>

                <ErrorBoundary>
                  <Box sx={{ mt: 2 }}>
                    <BearingMonitor />
                  </Box>
                </ErrorBoundary>
              </Grid>
            </ErrorBoundary>

            <ErrorBoundary>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <ErrorBoundary>
                  <Box sx={{ mt: 2 }}>
                    <BearingRecommendedActions />
                  </Box>
                </ErrorBoundary>

                <ErrorBoundary>
                  <Box sx={{ mt: 2 }}>
                    <CoreSystem />
                  </Box>
                </ErrorBoundary>
              </Grid>
            </ErrorBoundary>
          </Grid>
        </Box>
      </Box>
    </ErrorBoundary>
  );
};
export default BearingMonitoringPage;
