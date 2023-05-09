import React from "react";
import { Box, Grid } from "@mui/material";
import AlertsAndInstructions from "src/features/common/alertsAndInstructions";
import CardWidget from "src/app/components/card";
import {
  CellTowerOutlined,
  SignpostOutlined,
  TrendingUp,
  VisibilityOutlined,
} from "@mui/icons-material";
import GlobalIndicatorChart from "../../globalIndicator";
import ReportsCard from "src/features/common/reports";

const EngineMonitoringPage = () => {
  return (
    <Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={5} md={6} sm={12}>
            <AlertsAndInstructions></AlertsAndInstructions>
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <CardWidget
              headerLabel="Global Indicators"
              headerIcon={<SignpostOutlined />}
              content={<GlobalIndicatorChart />}
              initiallyCollapsed={false}
            />
          </Grid>
          <Grid item xs={12}>
            <CardWidget
              headerLabel="Trends"
              headerIcon={<TrendingUp />}
              content={<div>PlaceHolder Content</div>}
              initiallyCollapsed={false}
            />
          </Grid>
          <Grid item xs={4}>
            <CardWidget
              headerLabel="Live Status"
              headerIcon={<VisibilityOutlined />}
              content={<div>PlaceHolder Content</div>}
              initiallyCollapsed={true}
            />
          </Grid>
          <Grid item xs={4}>
            <CardWidget
              headerLabel="Signals"
              headerIcon={<CellTowerOutlined />}
              content={<div>PlaceHolder Content</div>}
              initiallyCollapsed={true}
            />
          </Grid>
          <Grid item xs={4}>
            <ReportsCard />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default EngineMonitoringPage;
