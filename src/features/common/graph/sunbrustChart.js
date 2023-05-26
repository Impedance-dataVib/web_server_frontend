import React, { useEffect, useRef, useState } from "react";
import Sunburst from "sunburst-chart";
import * as d3 from "d3";
import { SUNBRUST_DATA } from "src/features/dashboard/pages/module/schema";
let data = SUNBRUST_DATA;

export default function SunburstChart({ elementId }) {
  const color = d3.scaleOrdinal(d3.schemePaired);

  useEffect(() => {
    console.log(data, elementId, document.getElementById(elementId).innerHTML);
    if (data) {
      document.getElementById(elementId).innerHTML = "";
      let chart = Sunburst();
      chart
        .data({
          children: data,
        })
        .width(300)
        .height(300)
        .sort((a, b) => b.value - a.value)
        .tooltipContent((a) => {
          return `Health Value: ${a.showValue}`;
        })
        .centerRadius(0)
        .radiusScaleExponent(1)
        .labelOrientation("auto")
        .onClick(() => {
          console.log("ddd");
        })
        .color((d) => {
          return d.fill === "success" ? "#02B271"  : ( d.fill === "error" ? "#E21A00" : "#E18442")|| color(d.name);
        })
        .excludeRoot(true)(document.getElementById(elementId));
    }
  }, [data]);

  return (
     <div id={elementId}></div>
  );
}
