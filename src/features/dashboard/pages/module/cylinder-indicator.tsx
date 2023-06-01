import React from "react";
import "./styles.css";
import SunburstChart from "src/features/common/graph/sunbrustChart";
import { Grid } from "@mui/material";

function CylinderIndicator({ cylinderSpecificIndicators, fullScreen }: any) {
  return (
    <Grid container spacing={2} sx={{display: 'flex', flexDirection: 'row', marginTop: "15px", overflow: 'scroll'}}>
      {cylinderSpecificIndicators.map((val: any, index: any) => (
        <Grid key={`globalIndicator${index}`} item xs={fullScreen ? 6: 3}>
          <SunburstChart key={`cylinder${index}`} data={val} elementId={`sunbrust${index}`} fullScreen={fullScreen} />
        </Grid>
      ))}
    </Grid>
  );
}
export default React.memo(CylinderIndicator);
