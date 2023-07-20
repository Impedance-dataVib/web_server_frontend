import React, { useEffect } from "react";
import Sunburst from "sunburst-chart";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function SunburstChart({ elementId, data, fullScreen }) {
  const getColor = (type) => {
    switch (type) {
      case "success":
        return "#02B271";
      case "error":
        return "#FF0000";
      case "warning":
        return "#FFA326";
      default:
        return "white";
    }
  };

  useEffect(() => {
    if (data?.graphData) {
      document.getElementById(
        `${elementId}${fullScreen ? "full" : ""}`
      ).innerHTML = "";
      let chart = Sunburst();
      chart
        .data({
          children: data?.graphData || [],
        })
        .width(250)
        .height(250)
        .sort((a, b) => b.value - a.value)
        .tooltipContent((a) => {
          return `Health Value: ${a.showValue}`;
        })
        .tooltipTitle((a) => {
          return a.name;
        })
        .centerRadius(0)
        .radiusScaleExponent(1)
        .labelOrientation("angular")
        .onClick(() => {})
        .color((d) => {
          return getColor(d.fill);
        })
        .excludeRoot(true)(
        document.getElementById(`${elementId}${fullScreen ? "full" : ""}`)
      );
    }
  }, [data]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
      <Typography variant="body1" component={"span"} sx={{ mb: 1 }}>
        {data?.graphLabel}
      </Typography>
      <div id={`${elementId}${fullScreen ? "full" : ""}`}></div>
    </Box>
  );
}
