import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import Sunburst from "sunburst-chart";
import { SUNBRUST_DATA } from "./schema";
import SunburstChart from "src/features/common/graph/sunbrustChart";
import { Box, Grid, Typography } from "@mui/material";

let data = SUNBRUST_DATA;

let chart = Sunburst();

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
