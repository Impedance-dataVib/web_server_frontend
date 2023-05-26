import React, { useEffect, useRef, useState } from "react";
import Sunburst from "sunburst-chart";
import * as d3 from "d3";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
// import { SUNBRUST_DATA } from "src/features/dashboard/pages/module/schema";
// let data = SUNBRUST_DATA;

export default function SunburstChart({ elementId, data, fullScreen }) {
  const color = d3.scaleOrdinal(d3.schemePaired);

  useEffect(() => {
    console.log(data, elementId, document.getElementById(elementId).innerHTML);
    if (data?.graphData) {
      document.getElementById(`${elementId}${fullScreen ? "full": ""}`).innerHTML = "";
      let chart = Sunburst();
      chart
        .data({
          children: data?.graphData || [],
        })
        .width(300)
        .height(300)
        .sort((a, b) => b.value - a.value)
        .tooltipContent((a) => {
          return `Health Value: ${a.showValue}`;
        })
        .centerRadius(0)
        .radiusScaleExponent(1)
        .labelOrientation("auto")
        .onClick(() => {
          console.log("ddd");
        })
        .color((d) => {
          return d.fill === "success" ? "#02B271"  : ( d.fill === "error" ? "#E21A00" : "#E18442")|| color(d.name);
        })
        .excludeRoot(true)(document.getElementById(`${elementId}${fullScreen ? "full": ""}`));
    }
  }, [data]);

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
      <div id={`${elementId}${fullScreen ? "full": ""}`}></div>
      <Typography variant="body1" component={"span"}>
        {data?.graphLabel}
      </Typography>
    </Box>
  );
}
