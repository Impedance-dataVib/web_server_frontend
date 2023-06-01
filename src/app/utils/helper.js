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
      buildIndicatorData("Combustion Condition", data["EngineEfficiency"])
    );

    globalIndicator.push(
      buildRpmData("RPM", data["ChannelSpeed"], maxRPMThrshhold)
    );

    globalIndicator.push(
      buildIndicatorData("Engine Health", data["MechanicalHealth"])
    );
    alertData = buildEngineAlertData(data);
  } else if (modelType === "Torque") {
    isAlert = false;

    globalIndicator.push(
      buildIndicatorData("Torsion", data["EngineEfficiency"])
    );

    globalIndicator.push(
      buildIndicatorData("Torque", data["EngineEfficiency"])
    );

    globalIndicator.push(buildIndicatorData("Power", data["MechanicalHealth"]));

    globalIndicator.push(buildIndicatorData("Speed", data["MechanicalHealth"]));
  } else if (modelType === "Turbine") {
    globalIndicator.push(
      buildIndicatorData("Regularity/Deviation", data["EngineEfficiency"])
    );

    globalIndicator.push(
      buildIndicatorData("Bearing Status", data["ChannelSpeed"])
    );

    globalIndicator.push(
      buildIndicatorData("Shaft Health", data["MechanicalHealth"])
    );

    globalIndicator.push(
      buildIndicatorData("Combustion Kit", data["MechanicalHealth"])
    );

    globalIndicator.push(
      buildIndicatorData("Coupling", data["MechanicalHealth"])
    );

    globalIndicator.push(
      buildRpmData("RPM", data["ChannelSpeed"], maxRPMThrshhold)
    );

    globalIndicator.push(
      buildIndicatorData("Coupling", data["MechanicalHealth"])
    );
  } else if (modelType === "Motor") {
    globalIndicator.push(
      buildIndicatorData("Stability", data["EngineEfficiency"])
    );

    globalIndicator.push(
      buildIndicatorData("Bearing", data["MechanicalHealth"])
    );

    globalIndicator.push(
      buildIndicatorData("Electromagnetic Stress", data["MechanicalHealth"])
    );
  } else if (modelType === "Bearing") {
    globalIndicator.push(
      buildIndicatorData("Bearing", data["EngineEfficiency"])
    );

    globalIndicator.push(
      buildRpmData("RPM", data["ChannelSpeed"], maxRPMThrshhold)
    );

    globalIndicator.push(
      buildIndicatorData("Friction", data["MechanicalHealth"])
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

function buildIndicatorData(indicator_title, data) {
  return {
    indicatorName: indicator_title,

    indicatorMin: 0,

    indicatorMax: 100,

    indicatorValue: data["valueInHealth"],

    isPercentage: true,

    indicatorUnit: "Alert",

    isGradientColor: true,

    indicatorType: "error",
  };
}

function buildRpmData(indicator_title, data, maxValue) {
  return {
    indicatorName: indicator_title,
    indicatorMin: 0,
    indicatorMax: maxValue || parseInt(data) * 2,
    indicatorValue: data,
    isPercentage: false,
    indicatorUnit: "Alert",
    isGradientColor: false,
    indicatorType: "error",
  };
}

function buildEngineAlertData(data) {
  let returnArray = [];
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
    }
    if (is_all_cylinders_waring) {
      instructions.push("Check Compression Pressure");
      instructions.push("Check Exhaust Temperatures");
      instructions.push("Check Tappet Settings");
      instructions.push("Use Borescope for further identification");
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
    }

    if (instructions && instructions.length > 0) {
      returnArray.push({
        instructionName: "Compression in Cylinders",
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
    if (is_all_bearing_waring) {
      instructions.push(
        "Excessive Thrust from the driven Load. (If it is a main engine, Check propellor)"
      );
      instructions.push("Check Thrust Bearing failure");
      instructions.push("Check Lube Oil Pressure Low");
      instructions.push("Check Low/Contaminated oil");
      instructions.push("Check Lube oil filter for debris");
      instructions.push("Check Misalignment");
    }
    if (!is_all_bearing_waring && bearing_waring) {
      for (let cyl of bearing_waring_names) {
        instructions.push("Check for Peak Pressure of *Cyl_*" + cyl);
      }
      instructions.push("Check for Clogged Oil Passage of Individual Bearing");
      instructions.push("Check for Damaged Bearing");
    }

    if (is_all_bearing_error) {
      instructions.push("STOP THE ENGINE AND INVESTIGATE");
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
    if (bearing_waring && is_all_campump_warning) {
      instructions.push("Lube oil filter");
      instructions.push("Check lubrication");
      instructions.push("Check gear Backlash");
      instructions.push("Check Irregularity in Governor/control system.");
      instructions.push("Check Irregularity in fuel regulation system.");
      instructions.push(
        "Check alignment of external/auxiliary equipment, incl.pumps, couplings, shaft line & screw. "
      );
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
    }

    if (instructions && instructions.length > 0) {
      returnArray.push({
        instructionName: "Bearing Condition",
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

    if (is_all_waring) {
      instructions.push("Check Jacket water Quality");
      instructions.push(
        "Check Water Pump Pressure or Jacket water Temperature"
      );
      instructions.push("Check Jacket water coolant level");
      instructions.push("Check Lube Oil Pressure Low");
      instructions.push("Check Low/Contaminated oil");
      instructions.push("Check Lube oil filter for debris");
    }
    if (!is_all_waring && waring) {
      for (let cyl of waring_names) {
        instructions.push("Check Jacket water cooling issues of Cyl_" + cyl);
      }
      instructions.push(
        "Check for Piston cooling nozzle alignment or clogging"
      );
      instructions.push("Check Broken Ring");
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
    if (is_all_error) {
      instructions.push(
        "Check Alignment of Piston Cooling Nozzle of Mentioned cylinder"
      );
      instructions.push(
        "If engine is freshly overhauled, compability of piston and liner"
      );
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
    }
    if (instructions && instructions.length > 0) {
      returnArray.push({
        instructionName: "Condition of Cyl Moving Parts",
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

export function buildData(response) {
  const fileData = response["file_data"];
  const from_data = response["from_data"];
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
    const increase_fuel_consumption = buildTrendChart(
      data["PowerLoss"],
      "Increase Fuel Consumption",
      "LineGradient"
    );
    const peak_pressure = buildTrendChart(
      data["PowerLoss"],
      "Peak Pressure",
      "bar"
    ); //TODO:: check peak pressure
    const mechanical_health = buildTrendChart(
      data["MechanicalHealth"],
      "Mechanical Health",
      "LineGradient"
    );
    trends.push(increase_fuel_consumption);
    trends.push(peak_pressure);
    trends.push(mechanical_health);
    return {
      cylinder_specific_indicators: cylinder_specific_indicators,
      trends: trends,
    };
  }
  // process Torque data
  if (response["type"] === "Torque") {
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
    const increase_fuel_consumption = buildTrendChart(
      data["PowerLoss"],
      "Increase Fuel Consumption"
    );
    const peak_pressure = buildTrendChart(data["PowerLoss"], "Peak Pressure"); //TODO:: check peak pressure
    const mechanical_health = buildTrendChart(
      data["MechanicalHealth"],
      "Mechanical Health",
      "LineGradient"
    );
    trends.push(increase_fuel_consumption);
    trends.push(peak_pressure);
    trends.push(mechanical_health);
    return {
      cylinder_specific_indicators: cylinder_specific_indicators,
      trends: trends,
    };
  }
  // process Turbine data
  if (response["type"] === "Turbine") {
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
    const increase_fuel_consumption = buildTrendChart(
      data["PowerLoss"],
      "Increase Fuel Consumption"
    );
    const peak_pressure = buildTrendChart(
      data["PowerLoss"],
      "Peak Pressure",
      "LineGradient"
    ); //TODO:: check peak pressure
    const mechanical_health = buildTrendChart(
      data["MechanicalHealth"],
      "Mechanical Health",
      "LineGradient"
    );
    trends.push(increase_fuel_consumption);
    trends.push(peak_pressure);
    trends.push(mechanical_health);
    return {
      cylinder_specific_indicators: cylinder_specific_indicators,
      trends: trends,
    };
  }
  // process Motor data
  if (response["type"] === "Motor") {
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
    const increase_fuel_consumption = buildTrendChart(
      data["PowerLoss"],
      "Increase Fuel Consumption"
    );
    const peak_pressure = buildTrendChart(
      data["PowerLoss"],
      "Peak Pressure",
      "LineGradient"
    ); //TODO:: check peak pressure
    const mechanical_health = buildTrendChart(
      data["MechanicalHealth"],
      "Mechanical Health",
      "LineGradient"
    );
    trends.push(increase_fuel_consumption);
    trends.push(peak_pressure);
    trends.push(mechanical_health);
    return {
      cylinder_specific_indicators: cylinder_specific_indicators,
      trends: trends,
    };
  }
  // process Bearing data
  if (response["type"] === "Bearing") {
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
    const increase_fuel_consumption = buildTrendChart(
      data["PowerLoss"],
      "Increase Fuel Consumption"
    );
    const peak_pressure = buildTrendChart(
      data["PowerLoss"],
      "Peak Pressure",
      "LineGradient"
    ); //TODO:: check peak pressure
    const mechanical_health = buildTrendChart(
      data["MechanicalHealth"],
      "Mechanical Health",
      "LineGradient"
    );
    trends.push(increase_fuel_consumption);
    trends.push(peak_pressure);
    trends.push(mechanical_health);
    return {
      cylinder_specific_indicators: cylinder_specific_indicators,
      trends: trends,
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
        name: "",
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
  } else if (data.includes("(300")) {
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

export function buildSignalData(data) {
  let returnArray = [];
  for (let item of data) {
    const firstKey = Object.keys(item)[0];
    const itemData = item[firstKey];

    if (!itemData.hasOwnProperty("Status")) {
      const itemDataFirstKey = Object.keys(itemData)[0];
      const channelData = itemData[itemDataFirstKey];
      returnArray.push({
        title: firstKey,
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
