import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import SpeedoMeter from "../common/graph/speedo-meter";

const Auxiliarydata_speedometer = ({ val }: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {/* {globalIndicator.map((val: any) => ( */}
      <Grid container spacing={1}>
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="body1"
            component={"span"}
            textAlign={"center"}
            sx={{ mb: 1, fontWeight: "500" }}
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
      {/* ))} */}
    </Box>
  );
};

export default Auxiliarydata_speedometer;
