import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import SpeedoMeter from "../common/graph/speedo-meter";

const Auxiliarydata_speedometer = ({ val }: any) => {
  return (
    <Grid item lg={3} sx={{ my: "10px" }}>
      <Grid
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          variant="body1"
          component={"span"}
          textAlign={"center"}
          sx={{ mb: 1, fontWeight: "500", width: "100%" }}
        >
          {val?.indicatorName}
        </Typography>
        <Box sx={{ height: "65%" }}>
          <SpeedoMeter
            maxValue={val.indicatorMax}
            minValue={val?.indicatorMin}
            value={val?.indicatorValue}
            isPercent={val?.isPercentage}
            isGradientColor={val?.isGradientColor}
            indicatorType={val?.indicatorType}
            indicatorUnit={val?.indicatorUnit}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Auxiliarydata_speedometer;
