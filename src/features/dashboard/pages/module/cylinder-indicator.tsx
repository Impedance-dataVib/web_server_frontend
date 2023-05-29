import React from "react";
import "./styles.css";
import SunburstChart from "src/features/common/graph/sunbrustChart";
import { Grid } from "@mui/material";

function CylinderIndicator({ cylinderSpecificIndicators, fullScreen }: any) {
  console.log(cylinderSpecificIndicators, 'cylinder_specific_indicators');
  return (
    <Grid container spacing={2} sx={{display: 'flex', flexDirection: 'row', overflow: 'scroll'}}>
      {cylinderSpecificIndicators.map((val: any, index: any) => (
        <Grid key={`globalIndicator${index}`} item>
          <SunburstChart key={`cylinder${index}`} data={val} elementId={`sunbrust${index}`} fullScreen={fullScreen} />
        </Grid>
      ))}
    </Grid>
  );
}
export default React.memo(CylinderIndicator);
