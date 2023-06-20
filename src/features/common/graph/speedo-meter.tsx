import { Typography } from "@mui/material";
import { useEffect } from "react";
import ReactSpeedometer, { Transition } from "react-d3-speedometer";

export default function SpeedoMeter({
  maxValue,
  minValue,
  value,
  isGradientColor,
  isPercent,
  indicatorType,
  indicatorUnit,
  isTorqueModule,
  indicatorName
}: any) {

  const getMeterColor = () => {
    const indicator= indicatorName.split("(");
    if(isTorqueModule) {
      switch (indicator[0]) {
        case "Torque": 
        case "Power": 
          return "#ffd966";
        case "Speed": 
          return "#00000033"
        default: 
          return "#FFA326";
      }
    }
    return "#FFA326";
  } 

  return (
    <>
      <ReactSpeedometer
        maxValue={maxValue}
        minValue={minValue}
        height={150}
        width={250}
        ringWidth={20}
        value={parseInt(value)}
        needleTransition={"easeQuadIn" as Transition}
        needleTransitionDuration={1000}
        needleColor="#434343"
        customSegmentStops={!isGradientColor ? [minValue, maxValue] : []}
        startColor={"red"}
        segmentColors={!isGradientColor ? [getMeterColor(), getMeterColor()] : []}
        maxSegmentLabels={4}
        currentValueText={`${value} ${isPercent ? "%" : ""}`}
        segments={1000}
        endColor={"green"}
      />
      <Typography
        variant="body1"
        component={"p"}
        textAlign={"center"}
        sx={{
          color:
            indicatorType === "warning"
              ? "#E18442"
              : indicatorType === "error"
              ? "#E21A00"
              : "#02B271",
        }}
      >
        {indicatorUnit}
      </Typography>
    </>
  );
}
