import React from "react";
import SpeedoMeter from "../common/graph/speedo-meter";

const To_png = ({ ref }: any) => {
  return (
    <div ref={ref}>
      <SpeedoMeter
        maxValue={100}
        isGradientOpposite={true}
        minValue={0}
        value={60}
        isPercent={true}
        isGradientColor={true}
        indicatorType={"indicator"}
      />
    </div>
  );
};

export default To_png;
