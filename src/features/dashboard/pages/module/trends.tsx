import { Box, Grid, Typography } from "@mui/material";
import LineGradient from "src/features/common/graph/line-gradient";
import CircleIcon from "@mui/icons-material/Circle";
import { BarChart } from "src/features/common/graph/bar-chart";

export default function Trends({ trends }: any) {
  return (
    <Grid container spacing={2} sx={{ overflow: 'scroll' }}>
      {trends &&
        trends.map((val: any, index: any) => (
          <Grid item xs={4} key={`trends${index}`} sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant="body1" component={"span"} textAlign={"center"}>
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
  );
}
