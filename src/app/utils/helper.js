import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { format } from "date-fns";
export const isEmptyObject = (obj) => Object.keys(obj).length > 0;

export function buildSoketData(response, modelType, formData) {
  const firstKey = Object.keys(response)[0];
  const parserFormData = JSON.parse(formData);
  const maxRPMThrshhold = parseInt(parserFormData.rated_rpm);
  const data = response[firstKey];
  let globalIndicator = [];

  let isAlert = true;
  let alertData = [];
  if (modelType === "Engine") {
    globalIndicator.push(
      buildIndicatorData(
        "Engine Health",
        data?.MechanicalHealth,
        "valueInHealth"
      )
    );
    globalIndicator.push(
      buildIndicatorData(
        "Combustion Condition",
        data?.EngineEfficiency,
        "valueInHealth"
      )
    );
    globalIndicator.push(
      buildRpmData("RPM", data?.ChannelSpeed, maxRPMThrshhold)
    );
    globalIndicator.push(
      buildIndicatorData(
        "Performance of Mounts & Supports",
        data?.Unbalance,
        "valueInHealth"
      )
    );
    globalIndicator.push(
      buildIndicatorData(
        "Governor, Crank driven Accessories Health",
        data?.CamPump,
        "valueInHealth"
      )
    );
    globalIndicator.push(
      buildIndicatorData(
        "Performance of Vibration Damper",
        data?.Damper,
        "valueInHealth"
      )
    );
    globalIndicator.push(
      buildIndicatorData(
        "Increase in Fuel Consumption",
        data?.PowerLoss,
        "value",
        true
      )
    );
  } else if (modelType === "Torque") {
    isAlert = false;

    globalIndicator.push(
      buildRpmData("Torsion(degree)", data.StaticTorsion?.value || 0, 6)
    );

    globalIndicator.push(
      buildRpmData("Torque(kNm)", (data.StaticTorque?.value || 0) * 0.001, 1000)
    );

    globalIndicator.push(
      buildRpmData("Power(MW)", (data.StaticPower?.value || 0) * 1.0e-6, 100)
    );

    globalIndicator.push(
      buildRpmData("Speed", data.ChannelSpeed || 0, maxRPMThrshhold)
    );
  } else if (modelType === "Turbine") {
    globalIndicator.push(
      buildRpmData("Speed", data?.ChannelSpeed, maxRPMThrshhold)
    );
    globalIndicator.push(
      buildIndicatorData(
        "Regularity/Deviation",
        data?.RegularityDeviation,
        "valueInPercent"
      )
    );
    globalIndicator.push(
      buildIndicatorData(
        "Bearing Status",
        data?.BearingStatus,
        "valueInPercent"
      )
    );
    globalIndicator.push(
      buildIndicatorData("Shaft Health", data?.BladeStatus, "valueInPercent")
    );
    if (JSON.parse(formData).type === "Steam") {
      globalIndicator.push(
        buildIndicatorData("Coupling", data?.TurbineCoupling, "valueInPercent")
      );
    } else {
      globalIndicator.push(
        buildIndicatorData(
          "Combustion Kit",
          data?.CombustionKit,
          "valueInPercent"
        )
      );
    }
  } else if (modelType === "Motor") {
    globalIndicator.push(
      buildIndicatorData("Stability", data?.MStressStability, "valueInHealth")
    );
    globalIndicator.push(
      buildIndicatorData("Bearing", data?.MBearing, "valueInHealth")
    );
    globalIndicator.push(
      buildRpmData("Speed", data?.ChannelSpeed, maxRPMThrshhold)
    );
    globalIndicator.push(
      buildIndicatorData(
        "Electromagnetic Stress",
        data?.MElectromag,
        "valueInHealth"
      )
    );
  } else if (modelType === "Bearing") {
    globalIndicator.push(
      buildIndicatorData("Bearing", data["4KMixed"], "valueInHealth")
    );
    globalIndicator.push(
      buildRpmData("RPM", data?.ChannelSpeed, maxRPMThrshhold)
    );
    globalIndicator.push(
      buildIndicatorData("Friction", data["8KMixed"], "valueInHealth")
    );

    //-----

    globalIndicator.push(
      buildIndicatorData(
        "Mechanical Health",
        data?.BearingGlobal,
        "valueInHealth"
      )
    );

    globalIndicator.push(
      buildIndicatorData(
        "Global(Umbalance/Alignment/Loosness)",
        data?.GlobalMixed,
        "valueInHealth"
      )
    );
    globalIndicator.push(
      buildIndicatorData("Shock Index", data?.GlobalKurto, "valueInHealth")
    );
    globalIndicator.push(
      buildIndicatorData("Level(RMS)", data?.GlobalLevel, "valueInHealth")
    );
    globalIndicator.push(
      buildIndicatorData("Shaft/Clearance", data["2KMixed"], "valueInHealth")
    );
  }

  return {
    isAlert,

    globalIndicator,

    currentStatus: data["Status"],

    globalIndicatorTime: firstKey,

    alertData: alertData,
  };
}

function buildIndicatorData(indicator_title, data, key, isGradientOpposite) {
  let isOffline = false;
  const value = data ? data[key] : 0;
  if (!data || !data[key]) {
    isOffline = true;
  }
  let indicatorUnit = "Stable";
  let indicatorType = "success";
  if (value <= 30) {
    indicatorUnit = "Alert";
    indicatorType = "error";
  } else if (value > 30 && value <= 70) {
    indicatorUnit = "Attention";
    indicatorType = "warning";
  }

  return {
    indicatorName: indicator_title,
    indicatorMin: 0,
    indicatorMax: isGradientOpposite ? 6 : 100,
    indicatorValue: isOffline ? "Offline" : parseFloat(value).toFixed(2),
    isPercentage: isOffline ? false : true,
    indicatorUnit: isOffline ? " " : indicatorUnit,
    isGradientColor: true,
    indicatorType: isOffline ? " " : indicatorType,
    isGradientOpposite: isGradientOpposite ?? false,
  };
}

function buildRpmData(indicator_title, data, maxValue) {
  return {
    indicatorName: indicator_title,
    indicatorMin: 0,
    indicatorMax: maxValue || parseInt(data) * 2,
    indicatorValue: data ? parseInt(data) : 0,
    isPercentage: false,
    isGradientColor: false,
    indicatorType: "error",
  };
}
function buildPeekPressureChart(data, firingOrder, maxPressure) {
  let labels = [];
  for (let item of firingOrder) {
    labels.push("C" + item);
  }
  const increase_fuel_consumption = {
    trendsName: "Peek Pressure",
    datapoints: data?.cylinderValues || [],
    labels: labels,
    chartType: "bar",
    xLabel: "Peek Pressure",
    yLabel: "Cylinders",
    yMax: round(maxPressure),
  };
  return increase_fuel_consumption;
}

export function buildData(response) {
  const from_data = response["from_data"];
  const historical_data = response["historical_data"];
  let data = {};

  if (!historical_data || historical_data.length == 0) {
    return {
      cylinder_specific_indicators: [],
      trends: [],
    };
  }
  // process engine data
  if (response["type"] === "Engine") {
    data = JSON.parse(historical_data.at(-1)?.jsondata);
    const moduleData = data["Engine"];
    const firingOrder = moduleData["FiringOrder"];
    const firingOrderSplit = firingOrder.length / 2;
    const first = firingOrder.slice(0, firingOrderSplit);
    const second = firingOrder.slice(firingOrderSplit + 1);
    let cylinder_specific_indicators = [];

    if (data?.Compression) {
      const compression = buildCompressionData(
        first,
        second,
        data["Compression"],
        "compression"
      );
      if (compression) {
        cylinder_specific_indicators.push(compression);
      }
    }
    if (data?.Injection) {
      const injection_Condition = buildCompressionData(
        first,
        second,
        data["Injection"],
        "Injection Condition"
      );
      if (injection_Condition) {
        cylinder_specific_indicators.push(injection_Condition);
      }
    }
    if (data?.Bearing) {
      const bearing_Condition = buildCompressionData(
        first,
        second,
        data["Bearing"],
        "Bearing Condition"
      );
      if (bearing_Condition) {
        cylinder_specific_indicators.push(bearing_Condition);
      }
    }
    if (data?.BearingBis) {
      const condition_of_cyl_moving_parts = buildCompressionData(
        first,
        second,
        data["BearingBis"],
        "Condition of cyl moving parts"
      );
      if (condition_of_cyl_moving_parts) {
        cylinder_specific_indicators.push(condition_of_cyl_moving_parts);
      }
    }
    if (from_data["fuel"].includes("Gas")) {
      const miss_firing = buildCompressionData(
        first,
        second,
        data["Misfiring"],
        "Miss firing"
      );
      if (miss_firing) {
        cylinder_specific_indicators.push(miss_firing);
      }
    }
    let trends = [];
    const increase_fuel_consumption = buildLineGradientChart(
      historical_data,
      "PowerLoss",
      "Increase in fuel consumption"
    );
    trends.push(increase_fuel_consumption);
    const peakPressure = data["Pressure"];
    // TODO: if (peakPressure && parseInt(peakPressure["value"]) !== 0) {

    const peak_pressure = buildPeekPressureChart(
      peakPressure,
      firingOrder,
      from_data["max_pressure"]
    );
    trends.push(peak_pressure);
    // }
    const mechanical_health = buildLineGradientChart(
      historical_data,
      "MechanicalHealth",
      "Engine Health",
      true
    );

    trends.push(mechanical_health);
    return {
      cylinder_specific_indicators: cylinder_specific_indicators,
      trends: trends,
      alert: buildEngineAlertData(historical_data),
      alertUpdatedOn: new Date(),
    };
  }
  // process Torque data
  if (response["type"] === "Torque") {
    let trends = [];
    const torsionWithRpm = buildLineChart(
      historical_data,
      "StaticTorsion",
      "Torsion with RPM",
      false,
      true
    );
    trends.push(torsionWithRpm);

    const powerWithRpm = buildLineChart(
      historical_data,
      "StaticPower",
      "Power with RPM",
      false,
      true
    );
    trends.push(powerWithRpm);

    return {
      cylinder_specific_indicators: [],
      trends,
      alert: buildTorqueAlertData(historical_data),
      alertUpdatedOn: new Date(),
    };
  }
  // process Turbine data
  if (response["type"] === "Turbine") {
    if (from_data.type === "Steam") {
      let trends = [];
      const steamTurbineChart1 = buildTurbineChart(
        historical_data,
        "RegularityDeviation",
        "BladeStatus",
        "Regularity Deviation, Shaft Health"
      );
      trends.push(steamTurbineChart1);

      const steamTurbineChart2 = buildTurbineChart(
        historical_data,
        "BearingStatus",
        "TurbineCoupling",
        "Bearing status, Coupling"
      );
      trends.push(steamTurbineChart2);
      return {
        cylinder_specific_indicators: [],
        trends: trends,
        alert: buildTurbineAlertData(historical_data),
        alertUpdatedOn: new Date(),
      };
    } else {
      let trends = [];
      const gasTurbineChart1 = buildTurbineChart(
        historical_data,
        "RegularityDeviation",
        "BladeStatus",
        "Regularity Deviation, Shaft Health"
      );
      trends.push(gasTurbineChart1);

      const gasTurbineChart2 = buildTurbineChart(
        historical_data,
        "BearingStatus",
        "CombustionKit",
        "Bearing status, Combustion Kit Status"
      );
      trends.push(gasTurbineChart2);
      return {
        cylinder_specific_indicators: [],
        trends: trends,
        alert: buildTurbineAlertData(historical_data),
        alertUpdatedOn: new Date(),
      };
    }
  }
  // process Motor data
  if (response["type"] === "Motor") {
    let trends = [];
    const motorChart1 = buildMotorChart(
      historical_data,
      "MElectromag",
      null,
      "Electromagnetic Stress"
    );
    trends.push(motorChart1);

    const motorChart2 = buildMotorChart(
      historical_data,
      "MBearing",
      "MStressStability",
      "Bearing , Stability"
    );
    trends.push(motorChart2);

    return {
      cylinder_specific_indicators: [],
      trends: trends,
      alert: buildMotorAlertData(historical_data),
      alertUpdatedOn: new Date(),
    };
  }
  // process Bearing data
  if (response["type"] === "Bearing") {
    let trends = [];
    const bearingChart1 = buildBearingChart(
      historical_data,
      "GlobalMixed",
      null,
      "Global(Unbalance/Alignment/Looseness)"
    );
    trends.push(bearingChart1);

    const bearingChart2 = buildBearingChart(
      historical_data,
      "BearingGlobal",
      "4KMixed",
      " Mechanical health, Stability"
    );
    trends.push(bearingChart2);
    return {
      cylinder_specific_indicators: [],
      trends: trends,
      alert: buildBearingAlertData(historical_data),
      alertUpdatedOn: new Date(),
    };
  }

  return {
    cylinder_specific_indicators: [],
    trends: [],
  };
}

function buildTrendChart(data, name, type) {
  const increase_fuel_consumption = {
    trendsName: name,
    min: 0,
    max: 100,
    avg: 50,
    datapoints: [0, 20, 20, 60, 60, 20, 100, 80, 20, 25, 5, 10, 70],
    labels: [
      "0H",
      "1H",
      "2H",
      "3H",
      "4H",
      "5H",
      "6H",
      "7H",
      "8H",
      "9H",
      "10H",
      "11H",
      "12H",
    ],
    chartType: type,
    xLabel: "Increase Fuel Consumption",
    yLabel: "Time",
  };
  return increase_fuel_consumption;
}

function checkFillColor(value) {
  if (value <= 30) {
    return "error";
  }
  if (value > 30 && value <= 60) {
    return "warning";
  }

  return "success";
}

function buildCompressionData(first, second, compressionData, graphLabel) {
  let children = [];
  const showValue = 100 / first.length;
  const showSecondValue = 100 / second.length;

  const cylinderHealth = compressionData?.cylinderHealth;
  if (!cylinderHealth) {
    return null;
  }
  for (let i = 0; i < first.length; i++) {
    const item = first[i];
    const compression = cylinderHealth[i];
    let firstChild = {
      name: "Cyl " + item,
      fill: checkFillColor(compression),

      showValue: compression,
      children: [],
    };

    for (let j = 0; j < second.length; j++) {
      if (i === j) {
        const secondItem = second[j];
        const secondCompression = cylinderHealth[first.length + j];
        firstChild["children"].push({
          name: "Cyl " + secondItem,
          value: showSecondValue,
          fill: checkFillColor(secondCompression),
          showValue: secondCompression,
        });
      }
    }
    children.push(firstChild);
  }
  const compression = {
    graphLabel: graphLabel,
    graphData: [
      {
        name: "Global",
        fill: checkFillColor(compressionData["valueInHealth"]),
        showValue: compressionData["valueInHealth"],
        children: children,
      },
    ],
  };
  return compression;
}
export function buildLiveStatusData(data) {
  let currentStep = 1;
  let stepProgress = 0;
  if (data) {
    const arr = data.split("\n");
    let totalTime = 0;

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (i === 0) {
        currentStep = 1;
        stepProgress = 0;
      } else {
        if (i === 1) {
          totalTime = item.split(" ")[4];
        } else {
          if (item.includes("RECORDING")) {
            currentStep = 2;
            const lineArray = item.split(" ");
            const currantTime = lineArray[3];
            if (currantTime !== "RECORDING") {
              let per = percentage(currantTime, totalTime);
              if (per === 100) {
                per = 0;
              }
              stepProgress = 100 - per;
            }
          } else if (
            item.includes("START PROCESSING") ||
            item.includes("Processing Diagmot")
          ) {
            currentStep = 3;
            stepProgress = 100;
          } else if (item.includes("END PROCESSING")) {
            currentStep = 4;
            stepProgress = 100;
          }
        }
      }
    }
  }

  return {
    currentStep: currentStep,
    currentMode: "Auto",
    stepProgress: parseInt(stepProgress),
    currentMessage: "Initiate Manual Measurement",
  };
}

export function buildSignalData(data, formData, type) {
  let firstChannelName = "";
  let secondChannelName = "";
  formData = JSON.parse(formData);
  if (type === "Engine") {
    firstChannelName = "Crankshaft";
    if (formData["CamShaft_SENSORx"] !== "No Channel") {
      secondChannelName = "CamShaft";
    }
    if (formData["TDC_SENSORx"] !== "No Channel") {
      secondChannelName = "TDC";
    }
    if (formData["Peak_Pressure_SENSORx"] !== "No Channel") {
      secondChannelName = "Peak Pressure";
    }
  }
  if (type === "Torque") {
    firstChannelName = "DE Channel";
    if (formData["nde_channel_sensorx"] !== "No Channel") {
      secondChannelName = "NDE Channel";
    }
  }
  if (type === "Turbine") {
    firstChannelName = "Sensor";
  }
  if (type === "Motor") {
    firstChannelName = "Sensor";
  }

  if (type === "Bearing") {
    firstChannelName = "Sensor";
  }

  let returnArray = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const firstKey = Object.keys(item)[0];
    const itemData = item[firstKey];

    if (!itemData.hasOwnProperty("Status")) {
      const itemDataFirstKey = Object.keys(itemData)[0];
      const channelData = itemData[itemDataFirstKey];
      returnArray.push({
        title: i === 0 ? firstChannelName : secondChannelName,
        value: channelData["ChannelSpeed"],
      });
    }
  }
  return returnArray;
}

export function getCommaSepratedChannel(data, type) {
  data = JSON.parse(data);
  if (type === "Engine") {
    let channel = buildChannelName(data["Crankshaft_SENSORx"]);
    if (data["CamShaft_SENSORx"] !== "No Channel") {
      return channel + "," + buildChannelName(data["CamShaft_SENSORx"]);
    }
    if (data["TDC_SENSORx"] !== "No Channel") {
      return channel + "," + buildChannelName(data["TDC_SENSORx"]);
    }
    if (data["Peak_Pressure_SENSORx"] !== "No Channel") {
      return channel + "," + buildChannelName(data["Peak_Pressure_SENSORx"]);
    }
    return channel;
  }
  if (type === "Torque") {
    let channel = buildChannelName(data["de_channel_sensorx"]);
    if (data["nde_channel_sensorx"] !== "No Channel") {
      channel = channel + "," + buildChannelName(data["nde_channel_sensorx"]);
    }
    return channel;
  }
  if (type === "Turbine") {
    return buildChannelName(data["turbine_crankshaft_sensorx"]);
  }
  if (type === "Motor") {
    return buildChannelName(data["motor_crankshaft_sensorx"]);
  }

  if (type === "Bearing") {
    return buildChannelName(data["bearing_crankshaft_sensorx"]);
  }
}

function buildChannelName(channel) {
  return "CHANNEL" + channel.substr(channel.length - 1);
}

function buildLineGradientChart(data, key, title, isGradientOpposite) {
  let labels = [];
  let datapoints = [];
  let zAxisDataPoints = [];
  let count = 0;
  if (data) {
    for (let item of data) {
      const moduleData = JSON.parse(item["jsondata"]);

      labels.push(getdate(moduleData?.DateAndTime));

      zAxisDataPoints.push("" + parseInt(moduleData?.ChannelSpeed || 0));
      const valueObject = moduleData[key];
      if (isGradientOpposite && valueObject) {
        datapoints.push(round(valueObject?.valueInHealth || 0));
      } else {
        datapoints.push(round(valueObject?.value || 0));
      }
      count++;
    }
  }
  let sum = 0;
  for (let i = 0; i < datapoints.length; i++) {
    sum += parseInt(datapoints[i], 10); //don't forget to add the base
  }

  let avg = sum / datapoints.length;

  return {
    trendsName: title,
    speedName: "Speed",
    min: round(Math.min(...datapoints)),
    max: round(Math.max(...datapoints)),
    yMax: title === "Engine Health" ? 100 : 6,
    avg: round(avg),
    datapoints: datapoints,
    dataPointsY1: zAxisDataPoints,
    labels: labels,
    chartType: "LineGradient",
    xLabel: title,
    yLabel: "Time",
    isGradientOpposite: isGradientOpposite ?? false,
  };
}
const message_data = {
  0: { status: "Success", message: "All Ok" },
  1: { status: "Success", message: "Good Signal, No Synchronisation with TDC" },
  2: { status: "Success", message: "Good Signal, Synchronisated with TDC" },
  3: { status: "Success", message: "Good Signal, Synchronisated with CAM" },
  "-1": { status: "Fail", message: "Failed to apply configuration" },
  "-2": { status: "Fail", message: "Failed to load recorded signal" },
  "-3": { status: "Fail", message: "Unstable Speed." },
  "-4": {
    status: "Fail",
    message: "Too low speed. Check minRPM settings in Config",
  },
  "-5": { status: "Fail", message: "Too much speed variation." },
  "-6": { status: "Fail", message: "No Valid License" },
  "-7": { status: "Fail", message: "Unstable Speed." },
  "-8": { status: "Fail", message: "Signal Level - Too low" },
  "-10": { status: "Fail", message: "Speed Mismatch between Channels" },
  "-9": { status: "Fail", message: "Mismatch between config & channels info." },
};

function average(datapoints) {
  let sum = 0;
  for (let i = 0; i < datapoints.length; i++) {
    if (datapoints[i]) {
      sum += datapoints[i];
    }
  }

  return sum / datapoints.length;
}
export function round(num) {
  return Math.round(num * 100) / 100;
}
function checkForAlert(datapoints, min, max) {
  if (!datapoints) return 0; //return success
  let sum = 0;
  for (let i = 0; i < datapoints.length; i++) {
    sum += datapoints[i];
  }

  const avg = sum / datapoints.length;
  if (avg <= min) {
    return 1; // return error
  }
  if (avg > min && avg <= max) {
    return 2; //return warning
  }
  return 0; //return success
}
function buildTorqueAlertData(data) {
  let returnArray = [];

  if (data) {
    let tempCode = 999;
    for (let item of data) {
      const moduleData = JSON.parse(item["jsondata"]);

      const code = moduleData["Status"];

      if (tempCode !== code) {
        const message = message_data[code];
        returnArray.push({
          instructionName: message["status"],
          isTorque: true,
          instructionType:
            message["status"] === "Success" ? "success" : "error",
          instructions: [
            { message: message["message"], time: moduleData?.DateAndTime },
          ],
        });
      }
      tempCode = code;
    }
  }

  return returnArray;
}

function buildBearingAlertData(data) {
  const mechanicalHealth = [];

  const global_ = [];

  if (data) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      const objectData = JSON.parse(item["jsondata"]);

      const firstKey = Object.keys(objectData)[0];

      const moduleData = objectData[firstKey];

      const bearingGlobal = moduleData["BearingGlobal"];

      if (bearingGlobal) {
        mechanicalHealth.push(bearingGlobal["valueInHealth"]);
      }

      const globalMixed = moduleData["GlobalMixed"];

      if (globalMixed) {
        global_.push(globalMixed["valueInHealth"]);
      }
    }
  }

  let returnArray = [];

  if (mechanicalHealth) {
    const val = average(mechanicalHealth);
    if (val <= 30) {
      returnArray.push({
        instructionName: "Mechanical Health",
        instructionType: "error",
        instructions: [
          "The continuation of the operation presents an aggravation of the damages evolving towards the loss of function. An intervention is to be expected",
        ],
      });
    }
    if (val > 30 && val <= 70) {
      returnArray.push({
        instructionName: "Mechanical Health",
        instructionType: "warning",
        instructions: [
          "OK for operation under supervision,due to the presence of damages or significant dysfunctions.\n",
        ],
      });
    }
  }

  if (global_) {
    const val = average(global_);

    if (val <= 30) {
      returnArray.push({
        instructionName: "Global(Imbalance/Alignment/Loosness)",
        instructionType: "error",
        instructions: [
          "Check for Bending/cracking of bearings, Unbalances & Looseing of support structures",
        ],
      });
    }

    if (val > 30 && val <= 70) {
      returnArray.push({
        instructionName: "Global(Imbalance/Alignment/Loosness)",
        instructionType: "warning",
        instructions: [
          "Check for unbalance, Loosening of Support structure & Coupling clearances",
        ],
      });
    }
  }
  return returnArray;
}

function buildMotorAlertData(data) {
  let returnArray = [];

  const electroMag = []; // data['MElectromag'];

  const bearing = []; //data['MBearing'];

  const stressStability = []; // data['MStressStability'];

  if (data) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      const objectData = JSON.parse(item["jsondata"]);

      const firstKey = Object.keys(objectData)[0];

      const moduleData = objectData[firstKey];

      const mElectromag = moduleData["MElectromag"];

      if (mElectromag) {
        electroMag.push(mElectromag["valueInHealth"]);
      }

      const MBearing = moduleData["MBearing"];
      if (MBearing) {
        bearing.push(MBearing["valueInHealth"]);
      }

      const MStressStability = moduleData["MStressStability"];
      if (MStressStability) {
        stressStability.push(MStressStability["valueInHealth"]);
      }
    }
  }

  if (electroMag) {
    const val = average(electroMag);
    if (val <= 30) {
      returnArray.push({
        instructionName: "Electromagnetic Stress",

        instructionType: "error",

        instructions: [
          "Breakage or cracking of a short-circuit ring (also results in abnormal heating of the rotor at the point of cracking or rupture and an increase in current.)",
        ],
      });
    } else if (val > 30 && val <= 70) {
      returnArray.push({
        instructionName: "Electromagnetic Stress",

        instructionType: "warning",

        instructions: [
          "Damage to the winding insulation",

          "Deterioration of the mechanical strength of the windings in the slots (can also result in defective or even detached slot shims)",
        ],
      });
    }
  }

  if (bearing) {
    const val = average(bearing);

    if (val <= 30) {
      returnArray.push({
        instructionName: "Bearing",

        instructionType: "error",

        instructions: [
          "Check for Air Gap in the case of an electric motor",

          "Check for tilting in the case of vertical axis installations",

          "Check for the degradation of bearings",

          "Check if Loosening at the level of the support structure (assembly at the level of the supports)",
        ],
      });
    }

    if (val > 30 && val <= 70) {
      returnArray.push({
        instructionName: "Bearing",

        instructionType: "warning",

        instructions: [
          "Check for Air Gap in the case of an electric motor",

          "Check for tilting in the case of vertical axis installations",

          "Check for the degradation of bearings",

          "Check if Loosening at the level of the support structure (assembly at the level of the supports)",
        ],
      });
    }
  }

  if (stressStability) {
    const val = average(stressStability);

    if (val <= 30) {
      returnArray.push({
        instructionName: "Stress/Stability",

        instructionType: "error",

        instructions: [
          "Check for Instability of the power supply (network / transformer / drive) which will also result in a significant variation in power",

          "Check for Phase imbalance (which will result in uneven intensity across all three phases)",

          "Check for Mechanical overload which will also result in a rise in intensity and abnormal heating",

          "Check for Uneven air gap (or off-center rotor in the stator), possibly also caused by a wobbly foot (or lame foot)",

          "Check for Stator deformation (thermal or mechanical deformation)",

          "In the case of a direct current motor, the possible cause may also be due to a falling armature insulation or a badly adjusted neutral line.",
        ],
      });
    }

    if (val > 30 && val <= 70) {
      returnArray.push({
        instructionName: "Stress/Stability",

        instructionType: "warning",

        instructions: [
          "Check for Instability of the power supply (network / transformer / drive) which will also result in a significant variation in power",

          "Check for Phase imbalance (which will result in uneven intensity across all three phases)",

          "Check for Stator deformation (thermal or mechanical deformation)",

          "In the case of a direct current motor, the possible cause may also be due to a falling armature insulation or a badly adjusted neutral line.",
        ],
      });
    }
  }

  return returnArray;
}

function buildTurbineAlertData(data) {
  let returnArray = [];

  const regularityDeviation = []; //data['RegularityDeviation'];

  const bearingStatus = []; //data['BearingStatus'];

  const bladeStatus = []; //data['BladeStatus'];

  const turbineCoupling = []; //data['TurbineCoupling'];

  if (data) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      const objectData = JSON.parse(item["jsondata"]);

      const firstKey = Object.keys(objectData)[0];

      const moduleData = objectData[firstKey];

      const RegularityDeviation = moduleData["RegularityDeviation"];

      if (RegularityDeviation) {
        regularityDeviation.push(RegularityDeviation["valueInPercent"]);
      }

      const BearingStatus = moduleData["BearingStatus"];

      if (BearingStatus) {
        bearingStatus.push(BearingStatus["valueInPercent"]);
      }

      const BladeStatus = moduleData["BladeStatus"];

      if (BladeStatus) {
        bladeStatus.push(BladeStatus["valueInPercent"]);
      }

      const TurbineCoupling = moduleData["TurbineCoupling"];
      if (TurbineCoupling) {
        turbineCoupling.push(TurbineCoupling["valueInPercent"]);
      }
    }
  }

  if (turbineCoupling) {
    const val = average(turbineCoupling);

    if (val <= 30) {
      returnArray.push({
        instructionName: "Shaft/Blades Health",
        instructionType: "error",
        instructions: [
          "Inspection of coupling condition Checking the settings on the evaluation of the alignment factors between the turbine and the coupled element",
        ],
      });
    } else if (val > 30 && val <= 70) {
      returnArray.push({
        instructionName: "Shaft/Blades Health",
        instructionType: "warning",
        instructions: [
          "Inspection of coupling condition Checking the settings on the evaluation of the alignment factors between the turbine and the coupled element",
        ],
      });
    }
  }

  if (bladeStatus) {
    const val = average(bladeStatus);

    if (val <= 30) {
      returnArray.push({
        instructionName: "Shaft/Blades Health",

        instructionType: "error",

        instructions: [
          "Check for clamping, dynamic instabilities, damage to rotating blades",
        ],
      });
    }

    if (val > 30 && val <= 70) {
      returnArray.push({
        instructionName: "Shaft/Blades Health",

        instructionType: "warning",

        instructions: [
          "Check for clamping, dynamic instabilities, damage to rotating blades",
        ],
      });
    }
  }

  if (bearingStatus) {
    const val = average(bearingStatus);

    if (val <= 30) {
      returnArray.push({
        instructionName: "Bearing Status",

        instructionType: "error",

        instructions: [
          "Check Cylinder defect (bore/bearing shell)",

          "Check for structure/support bending",

          "Check for the excessive dynamic gearmesh force  ",

          "Check for misalignment see Coupling indicator",
        ],
      });
    }

    if (val > 30 && val <= 70) {
      returnArray.push({
        instructionName: "Bearing Status",

        instructionType: "warning",

        instructions: [
          "Check Cylinder defect (bore/bearing shell)",

          "Check for structure/support bending",

          "Check for the excessive dynamic gearmesh force  ",

          "Check for misalignment see Coupling indicator",
        ],
      });
    }
  }

  if (regularityDeviation) {
    const val = average(regularityDeviation);
    if (val <= 30) {
      returnArray.push({
        instructionName: "Regularity/Deviation",
        instructionType: "error",
        instructions: [
          "Check for the Faults in Steam Intake",
          "Check the lubrication of the bearings and thrust bearings",
        ],
      });
    } else if (val > 30 && val <= 70) {
      returnArray.push({
        instructionName: "Regularity/Deviation",
        instructionType: "warning",
        instructions: [
          "Check for the Faults in Steam Intake",
          "Check the lubrication of the bearings and thrust bearings",
        ],
      });
    }
  }

  return returnArray;
}

function buildEngineAlertData(historical_data) {
  let returnArray = [];

  if (!historical_data || !historical_data[0]) {
    return returnArray;
  }

  const buildData = {
    engineHealth: [],
    engineEfficiency: [],
    powerLoss: [],
    Damper: [],
    Unbalance: [],
    CamPump: [],
  };
  for (let item of historical_data) {
    const objectData = JSON.parse(item["jsondata"]);

    const firstKey = Object.keys(objectData)[0];

    const data = objectData[firstKey];

    if (data["MechanicalHealth"]) {
      buildData.engineHealth.push(data["MechanicalHealth"]["valueInHealth"]);
    }
    if (data["EngineEfficiency"]) {
      buildData.engineEfficiency.push(
        data["EngineEfficiency"]["valueInHealth"]
      );
    }
    if (data["PowerLoss"]) {
      buildData.powerLoss.push(data["PowerLoss"]["value"]);
    }
    if (data["Damper"]) {
      buildData.Damper.push(data["Damper"]["valueInHealth"]);
    }
    if (data["Unbalance"]) {
      buildData.Unbalance.push(data["Unbalance"]["valueInHealth"]);
    }
    if (data["CamPump"]) {
      buildData.CamPump.push(data["CamPump"]["valueInHealth"]);
    }
  }

  let conditionValue = checkForAlert(buildData.CamPump, 30, 70);
  if (conditionValue === 2) {
    returnArray.push({
      instructionName: "Governing and Crank driven Access",
      instructionType: "warning",
      instructions: [
        "If engine has just been overhauled, check for faulty assembly",
        "Check governor/control system functioning.",
        "Check gear condition/Backlash",
        "Check Irregularity in fuel regulation system.",
        "Check condition of attached pumps",
        "Check condition of Camshaft/rollers/followers",
        "Check camshaft damper if fitted",
        "Check for water in fuel if engine is hunting",
      ],
    });
  } else if (conditionValue === 1) {
    returnArray.push({
      instructionName: "Governing and Crank driven Access",
      instructionType: "error",
      instructions: [
        "Initiate corrective action immediately to improve health of Governing and crank driven accessories",
        "If engine has just been overhauled, check for faulty assembly",
        "Check governor/control system functioning.",
        "Check gear condition/Backlash",
        "Check Irregularity in fuel regulation system.",
        "Check condition of attached pumps",
        "Check condition of Camshaft/rollers/followers",
        "Check camshaft damper if fitted",
        "Check for water in fuel if engine is hunting",
      ],
    });
  }

  conditionValue = checkForAlert(buildData.Unbalance, 30, 70);
  if (conditionValue === 2) {
    returnArray.push({
      instructionName: "Performance of Mounts & Supports",
      instructionType: "warning",
      instructions: [
        "Check the tightness of Support Structure assemblies",
        "Check the tightness of Mounts",
        "Check the condition of Anti Vibration Pads",
      ],
    });
  } else if (conditionValue === 1) {
    returnArray.push({
      instructionName: "Performance of Mounts & Supports",
      instructionType: "error",
      instructions: [
        "Take Immediate Action on Mounts",
        "Check the tightness of Support Structure assemblies",
        "Check the tightness of Mounts",
        "Replace Anti Vibration pads if due for overhaul",
      ],
    });
  }

  conditionValue = checkForAlert(buildData.Damper, 30, 70);
  if (conditionValue === 2) {
    returnArray.push({
      instructionName: "Performance of Vibration Damper",
      instructionType: "warning",
      instructions: [
        "Check the activity of the torisonal vibration damper at specific frequencies-different speeds",
      ],
    });
  } else if (conditionValue === 1) {
    returnArray.push({
      instructionName: "Performance of Vibration Damper",
      instructionType: "error",
      instructions: [
        "Take Immediate action to improve the health of Damper by Checking the activity of the torisonal vibration damper ",
      ],
    });
  }

  conditionValue = checkForAlert(buildData.powerLoss, 1.9, 3);
  if (conditionValue === 2) {
    returnArray.push({
      instructionName: "Increase in Fuel Consumption",
      instructionType: "warning",
      instructions: [
        "Check engine running hours",
        "Check individual cylinder indicators",
        "Check fuel quality",
      ],
    });
  }

  conditionValue = checkForAlert(buildData.engineEfficiency, 30, 70);
  if (conditionValue === 2) {
    returnArray.push({
      instructionName: "Combustion Condition",
      instructionType: "warning",
      instructions: [
        "Check Compression and Injection indicators on specific cylinders and action accordingly. ",
      ],
    });
  } else if (conditionValue === 1) {
    returnArray.push({
      instructionName: "Combustion Condition",
      instructionType: "error",
      instructions: [
        "Initiate immediate action to improve operation condition by Checking Compression and Injection indicators on specific cylinders",
      ],
    });
  }
  conditionValue = checkForAlert(buildData.engineHealth, 30, 70);
  if (conditionValue === 2) {
    returnArray.push({
      instructionName: "Engine Health",
      instructionType: "warning",
      instructions: [
        "Check other mechanical global indicators and cylinder specific indicators and take action accordingly",
      ],
    });
  } else if (conditionValue === 1) {
    returnArray.push({
      instructionName: "Engine Health",
      instructionType: "error",
      instructions: [
        "Initiate action to improve mechanical health immediately after checking other global and cylinder specific mechanical indicators.",
      ],
    });
  }

  const item = historical_data[0];

  const objectData = JSON.parse(item["jsondata"]);

  const firstKey = Object.keys(objectData)[0];

  const data = objectData[firstKey];

  const compression = data["Compression"];

  const bearing = data["Bearing"];

  const bearingBis = data["BearingBis"];

  const misfiring = data["Misfiring"];

  const InjectionCondition = data["InjectionCondition"]; //Performance of Vibration Damper

  if (InjectionCondition) {
    let waring = false;
    let is_all_waring = true;
    let is_all_error = true;
    for (let i = 0; i < InjectionCondition["cylinderValues"].length; i++) {
      const cylinder = InjectionCondition["cylinderValues"][i];
      if (cylinder <= 30) {
        is_all_waring = false;
      } else if (cylinder > 30 && cylinder <= 70) {
        waring = true;
        is_all_error = false;
      } else {
        is_all_waring = false;
        is_all_error = false;
      }
    }
    if (is_all_error) {
      returnArray.push({
        instructionName: "Fuel Injection Performance",
        instructionType: "error",
        instructions: [
          "Inititate immediate Corrective action to improve Fuel Injection Performance",
          "If fuel system has just been overhauled, check for faulty assembly",
          "Check running hours if injector/pump is due for overhaul",
          "Check Fuel oil filter/filter pressure. Check for fuel quality",
          "Check for injector timing.",
          "Pressure test injector/Dismantle fuel pump/injector. Overhaul if neccessary.",
          "Check fuel linkage in affected cylinders",
        ],
      });
    } else {
      if (is_all_waring) {
        returnArray.push({
          instructionName: "Fuel Injection Performance",
          instructionType: "warning",
          instructions: [
            "If fuel system has just been overhauled, check for faulty assembly",
            "Check running hours if injector/pump is due for overhaul",
            "Check Fuel oil filter/filter pressure. Check for fuel quality",
            "Check for injector timing.",
            "Pressure test injector/Dismantle fuel pump/injector. Overhaul if neccessary.",
            "Check fuel linkage in affected cylinders",
          ],
        });
      } else if (waring) {
        returnArray.push({
          instructionName: "Fuel Injection Performance",
          instructionType: "warning",
          instructions: [
            "If fuel system has just been overhauled, check for faulty assembly",
            "Check running hours if injector/pump is due for overhaul",
            "Pressure test injector/Dismantle fuel pump/injector. Overhaul if neccessary.",
            "In case of electronic injectors, check solenoid valves/timing",
            "Check fuel linkage in affected cylinders",
          ],
        });
      }
    }
  }
  if (compression) {
    let waring = false;
    let is_all_waring = true;
    let is_all_error = true;
    for (let i = 0; i < compression["cylinderValues"].length; i++) {
      const cylinder = compression["cylinderValues"][i];
      if (cylinder <= 30) {
        is_all_waring = false;
      } else if (cylinder > 30 && cylinder <= 70) {
        waring = true;
        is_all_error = false;
      } else {
        is_all_waring = false;
        is_all_error = false;
      }
    }
    if (is_all_error) {
      returnArray.push({
        instructionName: "Compression in Cylinders",
        instructionType: "error",
        instructions: [
          "If top overhaul has just been performed, check for faulty assembly",
          "Check for engine running hours if due for overhaul",
          "Check Crankcase pressure which may indicate liner/piston issues.",
          "Check Compression Pressure of *Cyl_x*",
          "Check Exhaust Temperatures *Cyl_x* which may indicate valve tighntess issues",
          "Use Borescope for further identification",
          "Check for deterioration in the Condition of Cyl Moving Parts",
          "Check for blue exhaust smoke indicating broken piston ring and excessive lube being burnt",
        ],
      });
    } else {
      if (is_all_waring) {
        returnArray.push({
          instructionName: "Compression in Cylinders",
          instructionType: "warning",
          instructions: [
            "If top overhaul has just been performed, check for faulty assembly",
            "Check Tappet Settings",
            "Check Crankcase pressure which may indicate liner/piston issues.",
            "Check Compression Pressure of *Cyl_x*",
            "Check Exhaust Temperatures *Cyl_x* which may indicate valve tighntess issues",
            "Use Borescope for further identification",
            "Check for deterioration in the Condition of Cyl Moving Parts",
            "Check for blue exhaust smoke indicating broken piston ring and excessive lube being burnt",
          ],
        });
      } else if (waring) {
        returnArray.push({
          instructionName: "Compression in Cylinders",
          instructionType: "warning",
          instructions: [
            "If top overhaul has just been performed, check for faulty assembly",
            "Check Tappet Settings",
            "Check Crankcase pressure which may indicate liner/piston issues.",
            "Check Compression Pressure of *Cyl_x*",
            "Check Exhaust Temperatures *Cyl_x* which may indicate valve tighntess issues",
            "Use Borescope for further identification",
            "Check for deterioration in the Condition of Cyl Moving Parts",
            "Check for engine running hours if due for overhaul",
            "Check for blue exhaust smoke indicating broken piston ring and excessive lube being burnt",
          ],
        });
      }
    }
  }
  if (bearing) {
    let waring = false;
    let is_all_waring = true;
    let is_all_error = true;
    for (let i = 0; i < bearing["cylinderValues"].length; i++) {
      const cylinder = bearing["cylinderValues"][i];
      if (cylinder <= 30) {
        is_all_waring = false;
      } else if (cylinder > 30 && cylinder <= 70) {
        waring = true;
        is_all_error = false;
      } else {
        is_all_waring = false;
        is_all_error = false;
      }
    }
    if (is_all_error) {
      returnArray.push({
        instructionName: "Bearing Condition",
        instructionType: "error",
        instructions: [
          "If engine has just been overhauled, check for faulty assembly",
          "Check if the engine is due for overhaul",
          "Take immediate corrective action on Bearings",
          "Identify defect in the Main or Bottom end bearing",
          "Check bearing clearances",
          "Incase of bottom end bearing, check free movement of rod.",
          "Check if bearing shelves have moved from their original position",
          "Incase of excessive clearances of bearings, check for bearing damage.",
          "Check for Peak Pressure of specific cylinders",
          "Check for Clogged Oil Passage of Individual Bearing",
          "Check tightness of bearing bolts",
        ],
      });
    } else {
      if (is_all_waring) {
        returnArray.push({
          instructionName: "Bearing Condition",
          instructionType: "warning",
          instructions: [
            "If engine has just been overhauled, check for faulty assembly",
            "Check if the bearings are due for overhaul",
            "Check external influence on crankshaft from the driven load",
            "Check bearing clearances/Damages",
            "Check Damper indicator to detect malfunction",
            "Check Lube Oil Pressure.",
            "Check oil contamination for water/fuel",
            "Check Lube oil filter for wear debris",
            "Check crankshaft Misalignment",
          ],
        });
      } else if (waring) {
        returnArray.push({
          instructionName: "Bearing Condition",
          instructionType: "warning",
          instructions: [
            "If engine has just been overhauled, check for faulty assembly",
            "Identify defect in the Main or Bottom end bearing",
            "Check bearing clearances",
            "In case of bottom end bearing, check free movement of rod.",
            "Check if bearing shelves have moved from their original position",
            "In case of excessive clearances of bearings, check for bearing damage.",
            "Check for Peak Pressure of specific cylinders",
            "Check for Clogged Oil Passage of Individual Bearing",
            "Check tightness of bearing bolts",
          ],
        });
      }
    }
  }
  if (bearingBis) {
    let waring = false;
    let is_all_waring = true;
    let is_all_error = true;
    for (let i = 0; i < bearingBis["cylinderValues"].length; i++) {
      const cylinder = bearingBis["cylinderValues"][i];
      if (cylinder <= 30) {
        is_all_waring = false;
      } else if (cylinder > 30 && cylinder <= 70) {
        waring = true;
        is_all_error = false;
      } else {
        is_all_waring = false;
        is_all_error = false;
      }
    }
    if (is_all_error) {
      returnArray.push({
        instructionName: "Condition of Cyl Moving Parts",
        instructionType: "error",
        instructions: [
          "If engine has just been overhauled, check for faulty assembly",
          "Check if the engine is due for overhaul",
          "Take immediate corrective action on Bearings",
          "Identify defect in the Main or Bottom end bearing",
          "Check bearing clearances",
          "Incase of bottom end bearing, check free movement of rod.",
          "Check if bearing shelves have moved from their original position",
          "Incase of excessive clearances of bearings, check for bearing damage.",
          "Check for Peak Pressure of *Cyl_x*",
          "Check for Clogged Oil Passage of Individual Bearing",
          "Check tightness of bearing bolts",
        ],
      });
    } else {
      if (is_all_waring) {
        returnArray.push({
          instructionName: "Condition of Cyl Moving Parts",
          instructionType: "warning",
          instructions: [
            "If engine has just been overhauled, check for faulty assembly",
            "Check engine running hours to identify if the engine is due for overhaul.",
            "Carry out borescope inspection through cylinder head of piston top for carbon deposits. Eliminate bad fuel injector",
            "Check quality of fuel oil to eliminate possibility of scuffing of cylinder liners",
            "Check Jacket cooling water temperature",
            "Check Lube oil filter for debris",
            "Check for colour of exhaust(blue smoke/black smoke)",
            "Open crankcase, check liner surface of affected cylinders through borescope inspection if possible",
          ],
        });
      } else if (waring) {
        returnArray.push({
          instructionName: "Condition of Cyl Moving Parts",
          instructionType: "warning",
          instructions: [
            "If engine has just been overhauled, check for faulty assembly",
            "Check if the engine is due for overhaul",
            "Check Jacket water cooling temperature of affected cylinders",
            "Check for Piston cooling nozzle alignment or clogging of affected cylinder",
            "Check for Broken piston Ring of affected cylinder",
            "Check for colour of exhaust. Blue Colour may indicate excessive lube burning, black may indicate incomplete combustion.",
            "Check liner surface of affected cylinders from crankcase through borescope inspection if possible",
          ],
        });
      }
    }
  }
  if (misfiring) {
    let is_all_error = true;

    for (let i = 0; i < misfiring["cylinderValues"].length; i++) {
      const cylinder = misfiring["cylinderValues"][i];
      if (cylinder > 30) {
        is_all_error = false;
        break;
      }
    }

    if (is_all_error) {
      returnArray.push({
        instructionName: "Misfiring",
        instructionType: "error",
        instructions: [
          "CAUTION - *Cyl_x* Misfired",
          "Check if knocking sensors are activated/Malfunctioning",
          "Check Gas quality if multiple units are knocking. Reduce engine load.",
          "Check Spark Plug condition/Malfunctioning",
          "Check engine timing.",
          "Check Spark plug Cable, Ignition coil.",
          "Check Turbocharger' air filters",
        ],
      });
    }
  }

  return returnArray;
}

function buildLineChart(data, key, title, isGradientOpposite, hideBackground) {
  let labels = [];
  let datapoints = [];
  let zAxisDataPoints = [];
  let count = 0;
  if (data) {
    for (let item of data) {
      const moduleData = JSON.parse(item["jsondata"]);

      if (moduleData?.Status <= 0) {
        continue;
      }
      labels.push(getdate(moduleData?.DateAndTime));

      zAxisDataPoints.push(parseInt(moduleData?.ChannelSpeed || 0));
      const valueObject = moduleData[key];
      if (isGradientOpposite && valueObject) {
        datapoints.push(round(valueObject?.valueInHealth || 0));
      } else {
        datapoints.push(round(valueObject?.value || 0));
      }
      count++;
    }
  }
  let sum = 0;
  for (let i = 0; i < datapoints.length; i++) {
    sum += parseInt(datapoints[i], 10); //don't forget to add the base
  }

  let avg = sum / datapoints.length;

  return {
    trendsName: title,
    speedName: "Speed",
    min: round(Math.min(...datapoints)),
    max: round(Math.max(...datapoints)),
    yMax: title === "Engine Health" ? 100 : 6,
    avg: round(avg),
    datapoints: datapoints,
    dataPointsY1: zAxisDataPoints,
    labels: labels,
    chartType: "LineGradient",
    xLabel: title,
    yLabel: "Time",
    hideBackground: hideBackground ?? false,
    isGradientOpposite: isGradientOpposite ?? false,
  };
}

export function buildTrendData(historical_data, type, from_data) {
  let labels = [];
  const dataSet = [];
  const increase_fuel_data = [];
  const engine_health_data = [];
  const torsion = [];
  const power = [];
  const rpmData = [];
  const global = [];
  const mechanical = [];
  const mixed = [];
  const electromag = [];
  const streeStability = [];
  const bearing = [];

  const regularity_deviation = [];
  const bladeStatus = [];
  const coupling = [];
  const turbine_coupling = [];

  const regularity_dev = [];
  const blade_status = [];
  const bearing_status = [];
  const CombustionKit = [];

  let maxRpm = 0;

  const parseData = JSON.parse(from_data);
  for (let item of historical_data) {
    const moduleData = JSON.parse(item["jsondata"]);

    labels.push(getdate(moduleData?.DateAndTime));
    rpmData.push(parseInt(moduleData?.ChannelSpeed || 0));

    if (type === "Engine") {
      let itemData = moduleData["PowerLoss"];
      increase_fuel_data.push(itemData?.value || 0);

      itemData = moduleData["MechanicalHealth"];
      engine_health_data.push(itemData?.valueInHealth || 0);
    } else if (type === "Torque") {
      let itemData = moduleData["StaticTorsion"];
      torsion.push(itemData?.value || 0);
      itemData = moduleData["StaticPower"];
      power.push(itemData?.value || 0);
    } else if (type === "Bearing") {
      let itemData = moduleData["GlobalMixed"];
      global.push(itemData?.valueInHealth || 0);
      itemData = moduleData["BearingGlobal"];
      mechanical.push(itemData?.valueInHealth || 0);
      itemData = moduleData["4KMixed"];
      mixed.push(itemData?.valueInHealth || 0);
    } else if (type === "Motor") {
      let itemData = moduleData["MElectromag"];
      electromag.push(itemData?.valueInHealth || 0);
      itemData = moduleData["MBearing"];
      bearing.push(itemData?.valueInHealth || 0);
      itemData = moduleData["MStressStability"];
      streeStability.push(itemData?.valueInHealth || 0);
    } else if (type === "Turbine") {
      if (parseData.type === "Steam") {
        let itemData = moduleData["RegularityDeviation"];
        regularity_deviation.push(itemData?.valueInHealth || 0);
        itemData = moduleData["BladeStatus"];
        bladeStatus.push(itemData?.valueInHealth || 0);
        itemData = moduleData["BearingStatus"];
        coupling.push(itemData?.valueInHealth || 0);
        itemData = moduleData["TurbineCoupling"];
        turbine_coupling.push(itemData?.valueInHealth || 0);
      } else {
        let itemData = moduleData["RegularityDeviation"];
        regularity_dev.push(itemData?.valueInHealth || 0);
        itemData = moduleData["BladeStatus"];
        blade_status.push(itemData?.valueInHealth || 0);

        itemData = moduleData["BearingStatus"];
        bearing_status.push(itemData?.valueInHealth || 0);
        itemData = moduleData["CombustionKit"];
        CombustionKit.push(itemData?.valueInHealth || 0);
      }
    }
  }

  if (increase_fuel_data && increase_fuel_data.length > 0) {
    dataSet.push(
      buildDataSet("Increase in fuel consumption", "red", increase_fuel_data)
    );
  }

  if (engine_health_data && engine_health_data.length > 0) {
    dataSet.push(buildDataSet("Engine Health", "green", engine_health_data));
  }

  if (torsion && torsion.length > 0) {
    dataSet.push(buildDataSet("Torsion", "red", torsion));
  }
  if (power && power.length > 0) {
    dataSet.push(buildDataSet("Power", "green", power));
  }

  if (rpmData && rpmData.length > 0) {
    const rpmDataArr = buildDataSet("RPM", "black", rpmData, "y1");
    dataSet.push(rpmDataArr);
    maxRpm = rpmDataArr.maxValue;
  }

  if (global && global.length > 0) {
    dataSet.push(
      buildDataSet("Global(Unbalance/Alignment/Looseness)", "red", global)
    );
  }
  if (mechanical && mechanical.length > 0) {
    dataSet.push(buildDataSet("Mechanical health", "red", mechanical));
  }
  if (mixed && mixed.length > 0) {
    dataSet.push(buildDataSet(" Stability", "red", mixed));
  }
  if (electromag && electromag.length > 0) {
    dataSet.push(buildDataSet("Electromagnetic Stress", "red", electromag));
  }
  if (bearing && bearing.length > 0) {
    dataSet.push(buildDataSet("Bearing", "red", bearing));
  }
  if (streeStability && streeStability.length > 0) {
    dataSet.push(buildDataSet("Stability", "red", streeStability));
  }
  if (regularity_deviation && regularity_deviation.length > 0) {
    dataSet.push(
      buildDataSet("Regularity Deviation", "red", regularity_deviation)
    );
  }
  if (bladeStatus && bladeStatus.length > 0) {
    dataSet.push(buildDataSet("Shaft Health", "red", bladeStatus));
  }
  if (coupling && coupling.length > 0) {
    dataSet.push(buildDataSet("Bearing status", "red", coupling));
  }
  if (turbine_coupling && turbine_coupling.length > 0) {
    dataSet.push(buildDataSet(" Coupling", "red", turbine_coupling));
  }
  if (regularity_dev && regularity_dev.length > 0) {
    dataSet.push(buildDataSet("Regularity Deviation", "red", regularity_dev));
  }
  if (blade_status && blade_status.length > 0) {
    dataSet.push(buildDataSet("Shaft Health", "red", blade_status));
  }
  if (bearing_status && bearing_status.length > 0) {
    dataSet.push(buildDataSet("Bearing status", "red", bearing_status));
  }
  if (CombustionKit && CombustionKit.length > 0) {
    dataSet.push(buildDataSet(" Combustion Kit", "red", CombustionKit));
  }
  return { dataSet, labels, maxRpm };
}

function buildDataSet(title, color, dataPoints, axisId) {
  return {
    title: title,
    data: dataPoints,
    label: title,
    borderColor: color,
    pointBackgroundColor: color,
    backgroundColor: color,
    fill: false,
    yAxisID: axisId ?? "y",
    hidden: false,
    minVal: Math.min(...dataPoints),
    maxValue: Math.max(...dataPoints),
    avgValue: average(dataPoints),
  };
}

export function convertDate(dateVal) {
  let dateExtract = format(dateVal, "yyyy-MM-dd HH:mm:ss");
  return dateExtract;
}
function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

function buildTurbineChart(data, key, key2, title, isGradientOpposite) {
  let labels = [];
  let datapoints = [];
  let datapoints2 = [];
  let zAxisDataPoints = [];
  let count = 0;
  if (data) {
    for (let item of data) {
      const moduleData = JSON.parse(item["jsondata"]);
      labels.push(getdate(moduleData?.DateAndTime));

      zAxisDataPoints.push(parseInt(moduleData?.ChannelSpeed || 0));
      const valueObject = moduleData[key];
      datapoints.push(round(valueObject?.valueInHealth || 0));
      if (key2) {
        const valueObject2 = moduleData[key2];
        datapoints2.push(round(valueObject2?.valueInHealth || 0));
      }
      count++;
    }
  }
  let sum = 0;
  for (let i = 0; i < datapoints.length; i++) {
    sum += parseInt(datapoints[i], 10); //don't forget to add the base
  }

  let avg = sum / datapoints.length;

  return {
    trendsName: title,
    speedName: "Speed",
    min: round(Math.min(...datapoints)),
    max: round(Math.max(...datapoints)),
    yMax: 100,
    avg: round(avg),
    datapoints: datapoints,
    dataPointsY1: zAxisDataPoints,
    dataPointsY2: datapoints2,
    labels: labels,
    chartType: "LineGradient",
    xLabel: title,
    yLabel: "Time",
    isGradientOpposite: isGradientOpposite ?? false,
  };
}

function buildMotorChart(data, key, key2, title, isGradientOpposite) {
  let labels = [];
  let datapoints = [];
  let datapoints2 = [];
  let zAxisDataPoints = [];
  let count = 0;
  if (data) {
    for (let item of data) {
      const moduleData = JSON.parse(item["jsondata"]);
      labels.push(getdate(moduleData?.DateAndTime));

      zAxisDataPoints.push(parseInt(moduleData?.ChannelSpeed || 0));
      const valueObject = moduleData[key];
      datapoints.push(round(valueObject?.valueInHealth || 0));
      if (key2) {
        const valueObject2 = moduleData[key2];
        datapoints2.push(round(valueObject2?.valueInHealth || 0));
      }
      count++;
    }
  }
  let sum = 0;
  for (let i = 0; i < datapoints.length; i++) {
    sum += parseInt(datapoints[i], 10); //don't forget to add the base
  }

  let avg = sum / datapoints.length;

  return {
    trendsName: title,
    speedName: "Speed",
    min: round(Math.min(...datapoints)),
    max: round(Math.max(...datapoints)),
    yMax: 100,
    avg: round(avg),
    datapoints: datapoints,
    dataPointsY1: zAxisDataPoints,
    dataPointsY2: datapoints2,
    labels: labels,
    chartType: "LineGradient",
    xLabel: title,
    yLabel: "Time",
    isGradientOpposite: isGradientOpposite ?? false,
  };
}

function buildBearingChart(data, key, key2, title, isGradientOpposite) {
  let labels = [];
  let datapoints = [];
  let datapoints2 = [];
  let zAxisDataPoints = [];
  let count = 0;
  if (data) {
    for (let item of data) {
      const moduleData = JSON.parse(item["jsondata"]);
      labels.push(getdate(moduleData?.DateAndTime));

      zAxisDataPoints.push(parseInt(moduleData?.ChannelSpeed || 0));
      const valueObject = moduleData[key];
      datapoints.push(round(valueObject?.valueInHealth || 0));
      if (key2) {
        const valueObject2 = moduleData[key2];
        datapoints2.push(round(valueObject2?.valueInHealth || 0));
      }
      count++;
    }
  }
  let sum = 0;
  for (let i = 0; i < datapoints.length; i++) {
    sum += parseInt(datapoints[i], 10); //don't forget to add the base
  }

  let avg = sum / datapoints.length;
  return {
    trendsName: title,
    speedName: "Speed",
    min: round(Math.min(...datapoints)),
    max: round(Math.max(...datapoints)),
    yMax: 100,
    avg: round(avg),
    datapoints: datapoints,
    dataPointsY1: zAxisDataPoints,
    dataPointsY2: datapoints2,
    labels: labels,
    chartType: "LineGradient",
    xLabel: title,
    yLabel: "Time",
    isGradientOpposite: isGradientOpposite ?? false,
  };
}
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getdate(firstKey) {
  const date = new Date(firstKey);
  return (
    month[date.getMonth()] +
    " " +
    date.getDate() +
    ", " +
    date.getHours() +
    ":" +
    date.getMinutes()
  );
}
export function buildAuxData(data) {
  data = JSON.parse(data);
  const firstKey = Object.keys(data)[0];
  const itemData = data[firstKey];

  const auxData = itemData["Aux"];

  const returnData = [];
  for (let key of Object.keys(auxData)) {
    if (
      key !== "ID" &&
      key !== "DateAndTime" &&
      key !== "DeviceType" &&
      key !== "DeviceName"
    ) {
      const val = auxData[key];
      if (val && val?.Value && val?.Value !== "NA") {
        returnData.push({
          indicatorMax: max_value[key].max,
          indicatorMin: max_value[key].min,
          indicatorName: val?.Desc + "(" + val?.Unit + ")",
          indicatorValue: Math.round(val?.Value),
          isGradientColor: false,
          isPercentage: val?.Unit === "%",
        });
      }
    }
  }
  return returnData;
}

export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const max_value = {
  PowerPercent: { max: 250.99, min: -251 },
  Power: { max: 2211081215, min: -2000000000 },
  FuelLevel: { max: 250.99, min: -251 },
  EngineOilTemp: { max: 1735, min: -273 },
  EngineOilPressure: { max: 8031.87, min: 0 },
  EngineCoulantTemp: { max: 1735, min: -273 },
  BatteryVoltage: { max: 3212.75, min: 0 },
  EngineRPM: { max: 8031.87, min: 0 },
  OperatingHours: { max: 210554060.75, min: 0 },
  FuelPressure: { max: 0.125, min: 0 },
  CrankcasePressure: { max: 251.99, min: -250 },
  BoostPressure: { max: 8031.87, min: 0 },
};
