import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import Sunburst from "sunburst-chart";
import { SUNBRUST_DATA } from "./schema";
import SunburstChart from "src/features/common/graph/sunbrustChart";
import { Box } from "@mui/material";

let data = SUNBRUST_DATA;

let chart = Sunburst();

function CylinderIndicator({ data = [0, 1] }: any) {
  return (
    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
      {data.map((val: any, index: any) => (
        <SunburstChart key={`cylinder${index}`} elementId={`sunbrust${index}`} />
      ))}
    </Box>
  );
}
export default CylinderIndicator;
