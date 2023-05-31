import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import LineGradient from "src/features/common/graph/line-gradient";
import CircleIcon from "@mui/icons-material/Circle";
import { BarChart } from "src/features/common/graph/bar-chart";
import { useGetAllTrends, useGetAllModules } from "../hooks";

const TrendsPage = () => {
  const { data: allModules } = useGetAllModules();
  const { data, isLoading, getAllTrends } = useGetAllTrends(
    allModules.map((item: any) => item.id)
  );

  return (
    <Box>
      <Typography
        variant="h5"
        padding={2}
        sx={{ fontWeight: 600, fontSize: "24px" }}
      >
        Trends
      </Typography>
      <Box m={2} sx={{ bgcolor: "white" }}>
        <Grid container spacing={2}>
          {data.map((trend: any, index: number) => (
            <Grid container item xs={12} key={index}>
              {trend.map((val: any, index: number) => (
                <Grid
                  item
                  lg={4}
                  md={6}
                  sm={12}
                  key={`trends${index}`}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography
                    variant="body1"
                    component={"span"}
                    textAlign={"center"}
                  >
                    {val?.trendsName}
                  </Typography>
                  <Box sx={{ height: "80%", width: "100%" }}>
                    {val?.chartType === "LineGradient" ? (
                      <LineGradient
                        minValue={val?.min}
                        maxValue={val?.max}
                        avgValue={val?.avg}
                        datapoints={val?.datapoints}
                        labels={val?.labels}
                      />
                    ) : (
                      <BarChart
                        datapoints={val?.datapoints}
                        labels={val?.labels}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <Typography
                      component="span"
                      textAlign={"left"}
                      alignItems="center"
                      display={"flex"}
                    >
                      <CircleIcon color="primary" />
                      {val?.trendsName}
                    </Typography>
                    <Typography
                      component="span"
                      textAlign={"left"}
                      alignItems="center"
                      display={"flex"}
                    >
                      Min.
                    </Typography>
                    <Typography
                      component="span"
                      textAlign={"left"}
                      alignItems="center"
                      display={"flex"}
                    >
                      Max.
                    </Typography>
                    <Typography
                      component="span"
                      textAlign={"left"}
                      alignItems="center"
                      display={"flex"}
                    >
                      Avg.
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default TrendsPage;
