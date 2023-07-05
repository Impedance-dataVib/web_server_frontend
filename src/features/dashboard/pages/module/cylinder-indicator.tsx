import React from "react";
import "./styles.css";
import SunburstChart from "src/features/common/graph/sunbrustChart";
import { Grid } from "@mui/material";

function CylinderIndicator({ cylinderSpecificIndicators, fullScreen }: any) {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "row",
        marginTop: "15px",
        overflow: "auto",
        height: cylinderSpecificIndicators.length <= 4 ? "33vh" : "unset",
      }}
    >
      {cylinderSpecificIndicators.map((val: any, index: any) => (
        <Grid
          key={`globalIndicator-${val.graphLabel}`}
          item
          md={6}
          sm={6}
          lg={fullScreen ? 6 : 3}
          xs={fullScreen ? 6 : 12}
        >
          <SunburstChart
            data={val}
            elementId={`sunbrust${index}`}
            fullScreen={fullScreen}
          />
        </Grid>
      ))}
    </Grid>
  );
}
export default React.memo(CylinderIndicator);
