import { Box, Button, Grid, Typography } from "@mui/material";
import LineGradient from "src/features/common/graph/line-gradient";
import CircleIcon from "@mui/icons-material/Circle";
import { BarChart } from "src/features/common/graph/bar-chart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Trends({ trends, fullScreen }: any) {
  const navigate = useNavigate();
  const [trendsData, setTrendsData] = useState(trends);

  useEffect(() => {
    if (!fullScreen) {
      setTrendsData(() =>
        trends.filter((v: any) => v.chartType === "LineGradient")
      );
    } else {
      setTrendsData(trends);
    }
  }, [fullScreen, trends]);

  return (
    <>
      <Grid container spacing={2} sx={{ overflow: "auto" }}>
        {trendsData &&
          trendsData.map((val: any, index: any) => (
            <Grid
              item
              lg={6}
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
              <Box
                sx={{
                  height: fullScreen ? "50vh" : "30vh",
                  width: "100%",
                }}
              >
                {val?.chartType === "LineGradient" && (
                  <LineGradient
                    maxValue={val?.yMax}
                    dataPointsY1={val?.dataPointsY1}
                    dataPointsY2={val?.dataPointsY2}
                    trendsName={val?.trendsName}
                    hideBackground={val?.hideBackground}
                    speedName={val.speedName}
                    datapoints={val?.datapoints}
                    labels={val?.labels}
                    yLabel={val.yLabel}
                    isGradientOpposite={val?.isGradientOpposite}
                  />
                )} 
                {val?.chartType === "bar" && 
                  (<BarChart
                    datapoints={val?.datapoints}
                    labels={val?.labels}
                    maxValue={val?.yMax}
                  />
                )}
              </Box>
             
            </Grid>
          ))}
        {trendsData.length === 0 && (
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Typography textAlign={"center"} sx={{ width: "100%" }}>
              No Trend's Data found
            </Typography>
          </Grid>
        )}
      </Grid>
      {fullScreen && (
        <Box sx={{ display: "flex" }}>
          <Typography p={"10px 20px"} color={"red"}>
            Note :- To know more about other indicators, go to Trends Page
          </Typography>
          <Button
            onClick={() => navigate("/trends")}
            size="small"
            variant="contained"
            sx={{ mt: "10px" }}
          >
            Click here
          </Button>
        </Box>
      )}
    </>
  );
}
