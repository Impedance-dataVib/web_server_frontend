import {
  Box,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React from "react";
import SpeedoMeter from "../common/graph/speedo-meter";
import CylinderIndicator from "../dashboard/pages/module/cylinder-indicator";
import SunburstChart from "../common/graph/sunbrustChart";
const Torque = ({ indicatorData }: any) => {
  const [renderData, setRenderData] = React.useState<any>();

  const globalIndicator = renderData?.globalIndicator || [];
  React.useEffect(() => {
    setRenderData(indicatorData);
  }, [indicatorData]);

  return (
    <Box>
      <Grid item xs={12} my={"20px"}>
        <Grid
          container
          alignItems={"center"}
          justifyContent="center"
          spacing={8}
        >
          {globalIndicator
            ?.filter((item: any) => item.indicatorName !== "Speed")
            .map((val: any) => (
              <Grid
                key={`globalIndicator-${val.indicatorName}`}
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
                  sx={{ mb: 1, fontWeight: "500", cursor: "pointer" }}
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
                    isTorqueModule={val?.isTorqueModule}
                    indicatorName={val?.indicatorName}
                    height={150}
                  />
                </Box>
              </Grid>
            ))}
        </Grid>
      </Grid>

      <Divider
        flexItem
        sx={{ width: "85%", my: 8, ml: 10, borderBottomWidth: 5 }}
      />
    </Box>
  );
};

export default Torque;
