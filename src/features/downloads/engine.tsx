import { Box, Grid, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import SpeedoMeter from "../common/graph/speedo-meter";
import SunburstChart from "../common/graph/sunbrustChart";

const Engine = ({ indicatorData }: any) => {
  const [renderData, setRenderData] = useState<any>();

  const globalIndicator = renderData?.globalIndicator || [];
  const cylinder_specific_indicators =
    renderData?.cylinder_specific_indicators || [];

  useEffect(() => {
    setRenderData(indicatorData);
  }, [indicatorData]);

  return (
    <Box>
      <Typography
        fontWeight={500}
        fontSize={"24px"}
        sx={{ textAlign: "center" }}
      >
        Global Indicators
      </Typography>
      <Grid item xs={12} my={"20px"}>
        <Grid
          container
          alignItems={"center"}
          justifyContent="center"
          spacing={8}
        >
          {globalIndicator
            ?.filter(
              (item: any) =>
                item.indicatorName !== "RPM" &&
                item.indicatorName !== "Bearings"
            )
            .map((val: any) => (
              <Grid
                key={`globalIndicator-${val.indicatorName}`}
                item
                sx={{ display: "flex", flexDirection: "column" }}
                lg={4}
                md={4}
                sm={4}
              >
                <Typography
                  variant="body1"
                  component={"span"}
                  textAlign={"center"}
                  sx={{
                    mb: 1,
                    fontWeight: "400",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                  title={val?.tooltip}
                >
                  {val?.indicatorName}
                </Typography>
                <Box
                  sx={{
                    height: "65%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <SpeedoMeter
                    maxValue={val.indicatorMax}
                    isGradientOpposite={val?.isGradientOpposite}
                    minValue={val?.indicatorMin}
                    value={val?.indicatorValue}
                    isPercent={val?.isPercentage}
                    isGradientColor={val?.isGradientColor}
                    indicatorType={val?.indicatorType}
                    indicatorUnit={val?.indicatorUnit}
                    indicatorName={val?.indicatorName}
                    height={150}
                  />
                </Box>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Typography
        fontWeight={500}
        fontSize={"24px"}
        sx={{ textAlign: "center" }}
      >
        CYLINDER SPECIFIC INDICATORS
      </Typography>
      <Box
        sx={{
          my: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ minWidth: 1100, border: "1px dotted black", my: 5, py: 5 }}>
          <Grid
            container
            alignItems={"center"}
            justifyContent="center"
            spacing={4}
          >
            {cylinder_specific_indicators.map((val: any, index: any) => (
              <Grid
                item
                sx={{ display: "flex", flexDirection: "column" }}
                lg={6}
                md={6}
                sm={6}
              >
                <SunburstChart
                  data={val}
                  elementId={`sunbrust${index}${+new Date()}`}
                  fullScreen={false}
                  borderFlag={true}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Engine;
