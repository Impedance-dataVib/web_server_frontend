import { Box, Grid, Typography } from "@mui/material";
import SpeedoMeter from "src/features/common/graph/speedo-meter";

const GlobalIndicatorChart = ({globalIndicator}: any) => {
  return (
    <Grid container spacing={1} sx={{ height: "240px" }}>
      {globalIndicator && globalIndicator.map((val: any, index: any) => (
      <Grid key={`globalIndicator${index}`} item sx={{display: 'flex', flexDirection: 'column'}}>
        <Typography variant="body1" component={"span"} textAlign={"center"} sx={{mb: 1, fontWeight: "500"}}>
          {val?.indicatorName}
        </Typography>
        <Box sx={{ height: "65%" }}>
          <SpeedoMeter 
            maxValue={val.indicatorMax} 
            minValue={val?.indicatorMin} 
            value={val?.indicatorValue}
            isPercent={val?.isPercentage}
            isGradientColor={val?.isGradientColor}
          />
        </Box>
        <Typography variant="body1" component={"span"} textAlign={"center"} 
        
            sx={{ color: val?.indicatorType === "warning" ? "#E18442" :  ( val?.indicatorType === "error" ? "#E21A00" : "#02B271" )}}
          >
            {val?.indicatorUnit}
          </Typography>
      </Grid>))}
    </Grid>
  );
};
export default GlobalIndicatorChart;
