import { Typography } from "@mui/material";
import ReactSpeedometer, { Transition } from "react-d3-speedometer";

export default function SpeedoMeter({
  maxValue,
  minValue,
  value,
  isGradientColor,
  isGradientOpposite,
  isPercent,
  indicatorType,
  indicatorUnit,
  isTorqueModule,
  indicatorName,
  height
}: any) {
  const getMeterColor = () => {
    const indicator = indicatorName?.split(" ");
    if (isTorqueModule) {
      switch (indicator[0]) {
        case "Torque":
        case "Power":
          return "#ffd966";
        case "Speed":
          return "#00000033";
        default:
          return "#FFA326";
      }
    }
    return "#FFA326";
  };
  const getTypographyColor = (type: string) => {
    switch (type) {
      case "warning":
        return "#E18442";
      case "error":
        return "#E21A00";
      default:
        return "#02B271";
    }
  }

  return (
    <div>
      <ReactSpeedometer
        forceRender={true}
        maxValue={maxValue}
        minValue={minValue}
        height={height||200}
        width={250}
        ringWidth={20}
        value={parseInt(value)}
        needleTransition={"easeQuadIn" as Transition}
        needleTransitionDuration={0}
        needleColor={maxValue && "#434343"}
        needleHeightRatio={value === "Offline" ? 0 : 0.9}
        customSegmentStops={!isGradientColor ? [minValue, maxValue] : []}
        startColor={isGradientOpposite ? "green" : "red"}
        segmentColors={
          !isGradientColor ? [getMeterColor(), getMeterColor()] : []
        }
        maxSegmentLabels={4}
        currentValueText={`${value} ${isPercent ? "%" : ""}`}
        segments={1000}
        endColor={isGradientOpposite ? "red" : "green"}
      />
      <Typography
        variant="body1"
        component={"p"}
        textAlign={"center"}
        sx={{
          color: getTypographyColor(indicatorType),
        }}
      >
        {indicatorUnit}
      </Typography>
    </div>
  );
}
