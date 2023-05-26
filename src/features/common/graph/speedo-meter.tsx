import { Typography } from "@mui/material";
import ReactSpeedometer, { Transition } from "react-d3-speedometer";

export default function SpeedoMeter({ 
  maxValue,
  minValue,
  value,
  isGradientColor,
  isPercent,
  indicatorType,
  indicatorUnit,
 }: any) {
  return (
    <>
    <ReactSpeedometer
      maxValue={maxValue}
      minValue={minValue}
      height={150}
      width={250}
      ringWidth={20}
      value={value}
      needleTransition={"easeQuadIn" as Transition}
      needleTransitionDuration={1000}
      needleColor="#434343"
      customSegmentStops={!isGradientColor ? [minValue, value, maxValue]: []}
      startColor={ "red"}
      segmentColors={!isGradientColor ? ["#FFA326", "#7070703C"]: []}
      maxSegmentLabels={4}
      currentValueText={`${value} ${isPercent ? "%": ""}`}
      segments={1000}
      endColor={"green"}
    />
    <Typography 
        variant="body1" 
        component={"p"} 
        textAlign={"center"} 
        sx={{ color: indicatorType === "warning" ? "#E18442" :  ( indicatorType === "error" ? "#E21A00" : "#02B271" )}}
      >
      {indicatorUnit}
    </Typography>
    </>
    );
}
