import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SpeedoMeter from "src/features/common/graph/speedo-meter";

const GlobalIndicatorChart = ({ globalIndicator, fullScreen }: any) => {
  const [styling, setStyling] = useState({});
  useEffect(() => {
    setStyling(
      fullScreen
        ? { display: "flex", flexDirection: "row" }
        : { overflow: "auto", display: "flex", flexDirection: "column" }
    );
  }, [fullScreen]);
  return (
    <Grid
      container
      spacing={1}
      sx={{ height: globalIndicator && !fullScreen ? "100%" : "", ...styling, maxHeight: globalIndicator && !fullScreen ? "240px" : "" }}
    >
      {globalIndicator &&
        globalIndicator.map((val: any, index: any) => (
          <Grid
            key={`globalIndicator${index}`}
            item
            sx={{ display: "flex", flexDirection: "column" }}
            lg={6}
            md={12} 
            sm={12}
          >
            <Typography
              variant="body1"
              component={"span"}
              textAlign={"center"}
              sx={{ mb: 1, fontWeight: "500" }}
            >
              {val?.indicatorName}
            </Typography>
            <Box 
              sx={{ 
                height: "65%",
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '20px' 
              }}
            >
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
        ))}
    </Grid>
  );
};
export default GlobalIndicatorChart;
