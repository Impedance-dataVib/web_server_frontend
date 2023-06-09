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
        data["MechanicalHealth"],
        "valueInHealth"
      )
    );
    globalIndicator.push(
      buildIndicatorData(
        "Combustion Condition",
        data["EngineEfficiency"],
        "valueInHealth"
      )
    );

    globalIndicator.push(
      buildRpmData("RPM", data["ChannelSpeed"], maxRPMThrshhold)
    );
  } else if (modelType === "Torque") {
    isAlert = false;

    globalIndicator.push(
      buildIndicatorData("Torsion", data["StaticTorsion"], "value")
    );

    globalIndicator.push(
      buildIndicatorData("Torque", data["StaticTorque"], "value")
    );

    globalIndicator.push(
      buildIndicatorData("Power", data["StaticPower"], "value")
    );

    globalIndicator.push(
      buildRpmData("Speed", data["ChannelSpeed"], maxRPMThrshhold)
    );
  } else if (modelType === "Turbine") {
    globalIndicator.push(
      buildRpmData("Speed", data["ChannelSpeed"], maxRPMThrshhold)
    );
    globalIndicator.push(
      buildIndicatorData(
        "Regularity/Deviation",
        data["RegularityDeviation"],
        "valueInPercent"
      )
    );
    globalIndicator.push(
      buildIndicatorData(
        "Bearing Status",
        data["BearingStatus"],
        "valueInPercent"
      )
    );
    globalIndicator.push(
      buildIndicatorData("Shaft Health", data["BladeStatus"], "valueInPercent")
    );
    if (JSON.parse(formData).type === "Steam") {
      globalIndicator.push(
        buildIndicatorData(
          "Coupling",
          data["TurbineCoupling"],
          "valueInPercent"
        )
      );
    } else {
      globalIndicator.push(
        buildIndicatorData(
          "Combustion Kit",
          data["CombustionKit"],
          "valueInPercent"
        )
      );
    }
  } else if (modelType === "Motor") {
    globalIndicator.push(
      buildIndicatorData("Stability", data["MStressStability"], "valueInHealth")
    );
    globalIndicator.push(
      buildIndicatorData("Bearing", data["MBearing"], "valueInHealth")
    );
    globalIndicator.push(
      buildIndicatorData(
        "Electromagnetic Stress",
        data["MElectromag"],
        "valueInHealth"
      )
    );
  } else if (modelType === "Bearing") {
    globalIndicator.push(
      buildIndicatorData("Bearing", data["4KMixed"], "valueInHealth")
    );
    globalIndicator.push(buildRpmData("RPM", data["ChannelSpeed"]));
    globalIndicator.push(
      buildIndicatorData("Friction", data["8KMixed"], "valueInHealth")
    );
  }

  return {
    isAlert,

    globalIndicator,

    currentStatus: data["Status"],

    alertsUpdatedOn: "06.04.2023 - 05:49:53 (UTC)",

    alertData: alertData,
  };
}

function buildIndicatorData(indicator_title, data, key) {
  const value = data ? data[key] : 0;

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
    indicatorMax: 100,
    indicatorValue: value,
    isPercentage: true,
    indicatorUnit: indicatorUnit,
    isGradientColor: true,
    indicatorType: indicatorType,
  };
}

function buildRpmData(indicator_title, data, maxValue) {
  return {
    indicatorName: indicator_title,
    indicatorMin: 0,
    indicatorMax: maxValue || parseInt(data) * 2,
    indicatorValue: data ? Math.floor(data) : 0,
    isPercentage: false,
    isGradientColor: false,
    indicatorType: "error",
  };
}
function buildPeekPressureChart(data, firingOrder) {
  let labels = [];
  for (let item of firingOrder) {
    labels.push("C" + item);
  }
  const increase_fuel_consumption = {
    trendsName: "Peek Pressure",
    datapoints: data["cylinderValues"],
    labels: labels,
    chartType: "bar",
    xLabel: "Peek Pressure",
    yLabel: "Cylinders",
  };
  return increase_fuel_consumption;
}

export function buildData(response) {
  const fileData = response["file_data"];
  const from_data = response["from_data"];
  const historical_data = response["historical_data"];
  const firstKey = Object.keys(fileData)[0];
  const data = fileData[firstKey];
  // process engine data
  if (response["type"] === "Engine") {
    const moduleData = data["Engine"];
    const firingOrder = moduleData["FiringOrder"];
    const firingOrderSplit = firingOrder.length / 2;
    const first = firingOrder.slice(0, firingOrderSplit);
    const second = firingOrder.slice(firingOrderSplit + 1);
    let cylinder_specific_indicators = [];
    const compression = buildCompressionData(
      first,
      second,
      data["Compression"],
      "compression"
    );
    const injection_Condition = buildCompressionData(
      first,
      second,
      data["Injection"],
      "Injection Condition"
    );
    const bearing_Condition = buildCompressionData(
      first,
      second,
      data["Bearing"],
      "Baring Condition"
    );
    const condition_of_cyl_moving_parts = buildCompressionData(
      first,
      second,
      data["BearingBis"],
      "Condition of cyl moving parts"
    );
    cylinder_specific_indicators.push(compression);
    cylinder_specific_indicators.push(injection_Condition);
    cylinder_specific_indicators.push(bearing_Condition);
    cylinder_specific_indicators.push(condition_of_cyl_moving_parts);
    if (from_data["fuel"] === "Gas") {
      const miss_firing = buildCompressionData(
        first,
        second,
        data["Misfiring"],
        "Miss firing"
      );
      cylinder_specific_indicators.push(miss_firing);
    }
    let trends = [];
    const increase_fuel_consumption = buildLineGradientChart(
      historical_data,
      "PowerLoss",
      "Increase fuel consumption"
    );
    trends.push(increase_fuel_consumption);
    const peakPressure = data["Pressure"];

    if (parseInt(peakPressure["value"]) !== 0) {
      const peak_pressure = buildPeekPressureChart(peakPressure, firingOrder);
      trends.push(peak_pressure);
    }
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
    };
  }
  // process Torque data
  if (response["type"] === "Torque") {
    return {
      cylinder_specific_indicators: [],
      trends: [],
      alert: buildTorqueAlertData(historical_data),
    };
  }
  // process Turbine data
  if (response["type"] === "Turbine") {
    return {
      cylinder_specific_indicators: [],
      trends: [],
      alert: buildTurbineAlertData(historical_data),
    };
  }
  // process Motor data
  if (response["type"] === "Motor") {
    return {
      cylinder_specific_indicators: [],
      trends: [],
      alert: buildMotorAlertData(historical_data),
    };
  }
  // process Bearing data
  if (response["type"] === "Bearing") {
    return {
      cylinder_specific_indicators: [],
      trends: [],
      alert: buildBearingAlertData(historical_data),
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

  const cylinderHealth = compressionData["cylinderHealth"];
  for (let i = 0; i < first.length; i++) {
    const item = first[i];
    const compression = cylinderHealth[i];
    let firstChild = {
      name: "CY" + item,
      fill: checkFillColor(compression),

      showValue: compression,
      children: [],
    };

    for (let j = 0; j < second.length; j++) {
      if (i === j) {
        const secondItem = second[j];
        const secondCompression = cylinderHealth[first.length + j];
        firstChild["children"].push({
          name: "CY" + secondItem,
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
  if (data.includes("RECORDING")) {
    currentStep = 2;
  } else if (data.includes("Processing")) {
    currentStep = 3;
  } else if (data.includes("(400")) {
    currentStep = 4;
  }
  return {
    currentStep: currentStep,
    currentMode: "Auto",
    stepProgress: 25,
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
  let count = 0;
  if (data) {
    for (let item of data) {
      const objectData = JSON.parse(item["jsondata"]);
      const firstKey = Object.keys(objectData)[0];
      const moduleData = objectData[firstKey];
      labels.push(firstKey);
      const valueObject = moduleData[key];
      if (isGradientOpposite) {
        datapoints.push(round(valueObject["valueInHealth"]));
      } else {
        datapoints.push(round(valueObject["value"]));
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
    min: round(Math.min(...datapoints)),
    max: round(Math.max(...datapoints)),
    avg: round(avg),
    datapoints: datapoints,
    dataPointsY1: datapoints,
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

function buildTorqueAlertData(data) {
  let returnArray = [];
  if (data) {
    for (let item of data) {
      const objectData = JSON.parse(item["jsondata"]);
      const firstKey = Object.keys(objectData)[0];
      const moduleData = objectData[firstKey];
      const code = moduleData["Status"];
      const message = message_data[code];
      returnArray.push({
        instructionName: message["status"],
        isTorque: true,
        instructionType: message["status"] === "Success" ? "success" : "error",
        instructions: [{ message: message["message"], time: firstKey }],
      });
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
        mechanicalHealth.push(bearingGlobal["value"]);
      }
      const globalMixed = moduleData["GlobalMixed"];
      if (globalMixed) {
        global_.push(globalMixed["value"]);
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
        electroMag.push(mElectromag["value"]);
      }
      const MBearing = moduleData["MBearing"];
      if (MBearing) {
        bearing.push(MBearing["value"]);
      }
      const MStressStability = moduleData["MStressStability"];
      if (MStressStability) {
        stressStability.push(MStressStability["value"]);
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
    }
    if (val > 30 && val <= 70) {
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
        regularityDeviation.push(RegularityDeviation["valueInHealth"]);
      }
      const BearingStatus = moduleData["BearingStatus"];
      if (BearingStatus) {
        bearingStatus.push(BearingStatus["valueInHealth"]);
      }
      const BladeStatus = moduleData["BladeStatus"];
      if (BladeStatus) {
        bladeStatus.push(BladeStatus["valueInHealth"]);
      }
      const TurbineCoupling = moduleData["TurbineCoupling"];
      if (TurbineCoupling) {
        turbineCoupling.push(TurbineCoupling["valueInHealth"]);
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
    }
    if (val > 30 && val <= 70) {
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
    const val = bearingStatus["valueInHealth"];
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
    const val = regularityDeviation["valueInHealth"];
    if (val <= 30) {
      returnArray.push({
        instructionName: "Regularity/Deviation",
        instructionType: "error",
        instructions: [
          "Check for the Faults in Steam Intake",
          " Check the lubrication of the bearings and thrust bearings",
        ],
      });
    }
    if (val > 30 && val <= 70) {
      returnArray.push({
        instructionName: "Regularity/Deviation",
        instructionType: "warning",
        instructions: [
          "Check for the Faults in Steam Intake",
          " Check the lubrication of the bearings and thrust bearings",
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

  const item = historical_data[0];
  const objectData = JSON.parse(item["jsondata"]);
  const firstKey = Object.keys(objectData)[0];
  const data = objectData[firstKey];

  const compression = data["Compression"];
  const bearing = data["Bearing"];
  const bearingBis = data["BearingBis"];
  const misfiring = data["Misfiring"];
  const unbalance = data["Unbalance"]; //Performance of Vibration Damper
  const campump = data["Campump"]; //"Governing and Crank driven Access"

  const moduleData = data["Engine"];
  const firingOrder = moduleData["FiringOrder"];

  if (compression) {
    const cylinderValue = compression["cylinderHealth"];
    let instructions = [];

    // Compression in Cylinders
    let cylinders_waring = false;
    let is_all_cylinders_error = true;
    let is_all_cylinders_waring = true;
    let cylinders_waring_names = [];

    for (let i = 0; i < cylinderValue.length; i++) {
      const cylinder = cylinderValue[i];
      if (cylinder <= 30) {
        is_all_cylinders_waring = false;
      } else if (cylinder > 30 && cylinder <= 70) {
        cylinders_waring_names.push(firingOrder[i]);
        cylinders_waring = true;
        is_all_cylinders_error = false;
      } else {
        is_all_cylinders_waring = false;
        is_all_cylinders_error = false;
      }
    }

    // Condition of Cyl Moving Parts
    let is_all_condition_of_moving_part_error = true;

    for (let i = 0; i < bearingBis.length; i++) {
      const cylinder = bearingBis[i];
      if (cylinder > 30) {
        is_all_condition_of_moving_part_error = false;
      }
    }
    if (!is_all_cylinders_waring && cylinders_waring) {
      for (let cyl of cylinders_waring_names) {
        instructions.push("Check Compression Pressure of Cyl_" + cyl);
        instructions.push("Check Exhaust Temperatures Cyl_" + cyl);
      }
      instructions.push("Check Tappet Settings");
      instructions.push("Use Borescope for further identification");

      returnArray.push({
        instructionName: "Compression in Cylinders",
        instructionType: "warning",
        instructions: instructions,
      });
    }
    if (is_all_cylinders_waring) {
      instructions.push("Check Compression Pressure");
      instructions.push("Check Exhaust Temperatures");
      instructions.push("Check Tappet Settings");
      instructions.push("Use Borescope for further identification");

      returnArray.push({
        instructionName: "Compression in Cylinders",
        instructionType: "warning",
        instructions: instructions,
      });
    }
    if (is_all_condition_of_moving_part_error && is_all_cylinders_error) {
      instructions.push("Check Liner and Piston Rings");
      instructions.push("Check crankcase pressure for Blowby");
      instructions.push("Check Exhaust Temperatures");
      instructions.push("Use Borescope for further identification");
      instructions.push("Check Compression Pressure");
      instructions.push(
        "Carry Crank Case Inspection to Visually look for Seizure/Scoring Marks in Liner bore or Piston Skirt"
      );

      returnArray.push({
        instructionName:
          "Compression in Cylinders and Condition of Cyl Moving Parts ",
        instructionType: "error",
        instructions: instructions,
      });
    }
  }
  if (bearing) {
    let instructions = [];
    let bearing_waring = false;
    let bearing_error = false;
    let is_all_bearing_error = true;
    let is_all_bearing_waring = true;
    let bearing_waring_names = [];

    for (let i = 0; i < bearing.length; i++) {
      const cylinder = bearing[i];
      if (cylinder <= 30) {
        is_all_bearing_waring = false;
        bearing_error = true;
      } else if (cylinder > 30 && cylinder <= 70) {
        bearing_waring_names.push(firingOrder[i]);
        bearing_waring = true;
        is_all_bearing_error = false;
      } else {
        is_all_bearing_waring = false;
        is_all_bearing_error = false;
      }
    }

    let is_all_campump_warning = false;
    let is_all_campump_error = false;
    if (campump) {
      for (let i = 0; i < campump.length; i++) {
        const cylinder = campump[i];
        if (cylinder < 30 || cylinder > 70) {
          is_all_campump_warning = true;
        }
        if (cylinder < 30) {
          is_all_campump_error = true;
        }
      }
    }

    if (is_all_bearing_waring) {
      instructions.push(
        "Excessive Thrust from the driven Load. (If it is a main engine, Check propellor)"
      );
      instructions.push("Check Thrust Bearing failure");
      instructions.push("Check Lube Oil Pressure Low");
      instructions.push("Check Low/Contaminated oil");
      instructions.push("Check Lube oil filter for debris");
      instructions.push("Check Misalignment");

      returnArray.push({
        instructionName: "Bearing Condition",
        instructionType: "warning",
        instructions: instructions,
      });
    }
    if (!is_all_bearing_waring && bearing_waring) {
      for (let cyl of bearing_waring_names) {
        instructions.push("Check for Peak Pressure of *Cyl_*" + cyl);
      }
      instructions.push("Check for Clogged Oil Passage of Individual Bearing");
      instructions.push("Check for Damaged Bearing");

      returnArray.push({
        instructionName: "Bearing Condition",
        instructionType: "warning",
        instructions: instructions,
      });
    }

    if (!is_all_bearing_waring && is_all_bearing_error) {
      instructions.push("STOP THE ENGINE AND INVESTIGATE");
      returnArray.push({
        instructionName: "Bearing Condition",
        instructionType: "error",
        instructions: instructions,
      });
    }

    if (bearing_waring && is_all_campump_warning) {
      instructions.push("Lube oil filter");
      instructions.push("Check lubrication");
      instructions.push("Check gear Backlash");
      instructions.push("Check Irregularity in Governor/control system.");
      instructions.push("Check Irregularity in fuel regulation system.");
      instructions.push(
        "Check alignment of external/auxiliary equipment, incl.pumps, couplings, shaft line & screw. "
      );

      returnArray.push({
        instructionName:
          "Bearing Condition and Governing and Crank driven Access",
        instructionType: "warning",
        instructions: instructions,
      });
    }
    if (bearing_error && is_all_campump_error) {
      instructions.push("Lube oil filter");
      instructions.push("Check lubrication");
      instructions.push("Check gear Backlash");
      instructions.push("Check Irregularity in Governor/control system.");
      instructions.push("Check Irregularity in fuel regulation system.");
      instructions.push(
        "Check alignment of external/auxiliary equipment, incl.pumps, couplings, shaft line & screw. "
      );

      returnArray.push({
        instructionName:
          "Bearing Condition and Governing and Crank driven Access",
        instructionType: "error",
        instructions: instructions,
      });
    }
  }
  if (bearingBis) {
    let instructions = [];
    let waring = false;
    let is_all_error = true;
    let is_all_waring = true;
    let waring_names = [];

    for (let i = 0; i < bearingBis.length; i++) {
      const cylinder = bearingBis[i];
      if (cylinder <= 30) {
        is_all_waring = false;
      } else if (cylinder > 30 && cylinder <= 70) {
        waring_names.push(firingOrder[i]);
        waring = true;
        is_all_error = false;
      } else {
        is_all_waring = false;
        is_all_error = false;
      }
    }

    let is_all_campump_error = false;
    if (campump) {
      for (let i = 0; i < campump.length; i++) {
        const cylinder = campump[i];
        if (cylinder > 30) {
          is_all_campump_error = true;
          break;
        }
      }
    } else {
      is_all_campump_error = false;
    }

    if (is_all_waring) {
      instructions.push("Check Jacket water Quality");
      instructions.push(
        "Check Water Pump Pressure or Jacket water Temperature"
      );
      instructions.push("Check Jacket water coolant level");
      instructions.push("Check Lube Oil Pressure Low");
      instructions.push("Check Low/Contaminated oil");
      instructions.push("Check Lube oil filter for debris");

      returnArray.push({
        instructionName: "Condition of Cyl Moving Parts",
        instructionType: "warning",
        instructions: instructions,
      });
    }
    if (!is_all_waring && waring) {
      for (let cyl of waring_names) {
        instructions.push("Check Jacket water cooling issues of Cyl_" + cyl);
      }
      instructions.push(
        "Check for Piston cooling nozzle alignment or clogging"
      );
      instructions.push("Check Broken Ring");

      returnArray.push({
        instructionName: "Condition of Cyl Moving Parts",
        instructionType: "warning",
        instructions: instructions,
      });
    }

    if (!is_all_waring && is_all_error) {
      instructions.push(
        "Check Alignment of Piston Cooling Nozzle of Mentioned cylinder"
      );
      instructions.push(
        "If engine is freshly overhauled, compability of piston and liner"
      );

      returnArray.push({
        instructionName: "Condition of Cyl Moving Parts",
        instructionType: "error",
        instructions: instructions,
      });
    }

    if (is_all_error || is_all_campump_error) {
      instructions.push("Check Jacket water Quality");
      instructions.push(
        "Check Water Pump Pressure or Jacket water Temperature"
      );
      instructions.push("Check Jacket water coolant level");
      instructions.push("Check Lube Oil Pressure Low");
      instructions.push("Check Low/Contaminated oil");
      instructions.push("Check Lube oil filter for debris");

      returnArray.push({
        instructionName:
          "Condition of Cyl Moving Parts and Governing and Crank driven Access",
        instructionType: "error",
        instructions: instructions,
      });
    }
  }
  if (misfiring) {
    let instructions = [];
    let is_all_error = true;

    for (let i = 0; i < misfiring.length; i++) {
      const cylinder = misfiring[i];
      if (cylinder > 30) {
        is_all_error = false;
      }
    }

    if (is_all_error) {
      instructions.push("CAUTION - *Cyl_x* Misfired");
      instructions.push("Check Gas quality");
      instructions.push("Check Spark Plug");
      instructions.push("Reduce the Load");
    }
    if (instructions && instructions.length > 0) {
      returnArray.push({
        instructionName: "Misfiring",
        instructionType: "error",
        instructions: instructions,
      });
    }
  }
  if (unbalance) {
    const val = unbalance["valueInHealth"];
    if (val <= 30) {
      returnArray.push({
        instructionName: "Performance of Mounts & Supports",
        instructionType: "error",
        instructions:
          "Check Tie rod for 2 stroke  Foundation Blocks          Chockfast",
      });
    }
  }

  return returnArray;
}

function average(datapoints) {
  let sum = 0;
  for (let i = 0; i < datapoints.length; i++) {
    sum += parseInt(datapoints[i], 10); //don't forget to add the base
  }

  return sum / datapoints.length;
}
function round(num) {
  return Math.round(num * 100) / 100;
}
