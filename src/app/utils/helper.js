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
        "Combustion Condition",
        data["EngineEfficiency"],
        "valueInHealth"
      )
    );

    globalIndicator.push(
      buildRpmData("RPM", data["ChannelSpeed"], maxRPMThrshhold)
    );

    globalIndicator.push(
      buildIndicatorData(
        "Engine Health",
        data["MechanicalHealth"],
        "valueInHealth"
      )
    );
    alertData = buildEngineAlertData(data);
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
      buildIndicatorData(
        "Regularity/Deviation",
        data["RegularityDeviation"],
        "valueInHealth"
      )
    );
    globalIndicator.push(
      buildIndicatorData(
        "Bearing Status",
        data["BearingStatus"],
        "valueInHealth"
      )
    );
    globalIndicator.push(
      buildIndicatorData("Shaft Health", data["BladeStatus"], "valueInHealth")
    );
    globalIndicator.push(
      buildIndicatorData("Coupling", data["TurbineCoupling"], "valueInHealth")
    );
    globalIndicator.push(
      buildRpmData("RPM", data["ChannelSpeed"], maxRPMThrshhold)
    );

    globalIndicator.push(
      buildIndicatorData(
        "Combustion Kit",
        data["CombustionKit"],
        "valueInHealth"
      )
    );

    alertData = buildTurbineAlertData(data);
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

    alertData = buildMotorAlertData(data);
  } else if (modelType === "Bearing") {
    globalIndicator.push(buildIndicatorData("Bearing", data["4KMixed"]));
    globalIndicator.push(buildRpmData("RPM", data["ChannelSpeed"]));
    globalIndicator.push(buildIndicatorData("Friction", data["8KMixed"]));
    alertData = buildBearingAlertData(data);
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
    indicatorValue: data,
    isPercentage: false,
    indicatorUnit: "Alert",
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
    min: 0,
    max: 100,
    avg: 50,
    datapoints: data["cylinderHealth"],
    labels: labels,
    chartType: "bar",
    xLabel: "Peek Pressure",
    yLabel: "Cylinders",
  };
  return increase_fuel_consumption;
}

function buildMotorAlertData(data) {
  let returnArray = [];
  const electroMag = data["MElectromag"];
  const bearing = data["MBearing"];
  const stressStability = data["MStressStability"];

  if (electroMag) {
    const val = electroMag["valueInHealth"];
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
    const val = bearing["valueInHealth"];
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
    const val = stressStability["valueInHealth"];
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
  const regularityDeviation = data["RegularityDeviation"];
  const bearingStatus = data["BearingStatus"];
  const bladeStatus = data["BladeStatus"];
  const turbineCoupling = data["TurbineCoupling"];

  if (turbineCoupling) {
    const val = bladeStatus["valueInHealth"];
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
    const val = bladeStatus["valueInHealth"];
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

    if (is_all_bearing_error) {
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

    if (is_all_error) {
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
    const peak_pressure = buildPeekPressureChart(data["Pressure"], firingOrder);
    const mechanical_health = buildLineGradientChart(
      historical_data,
      "MechanicalHealth",
      "Mechanical Health",
      true
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
    return {
      cylinder_specific_indicators: [],
      trends: [],
      alert: buildTorqueAlertData(historical_data),
    };
  }
  // process Turbine data
  if (response["type"] === "Turbine") {
    //TODO:
  }
  // process Motor data
  if (response["type"] === "Motor") {
    //TODO:
  }
  // process Bearing data
  if (response["type"] === "Bearing") {
    //TODO:
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
function buildLineGradientChart(data, key, title, isGradientOpposite) {
  let labels = [];
  let datapoints = [];
  let count = 0;
  if (data) {
    for (let item of data) {
      if (count === 7) {
        break;
      }
      const objectData = JSON.parse(item["jsondata"]);
      const firstKey = Object.keys(objectData)[0];
      const moduleData = objectData[firstKey];
      labels.push(firstKey);
      const valueObject = moduleData[key];
      datapoints.push(valueObject["value"]);
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
    min: Math.min(...datapoints),
    max: Math.max(...datapoints),
    avg: avg,
    datapoints: datapoints,
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
        instructionType: message["status"] === "Success" ? "success" : "error",
        instructions: [{ message: message["message"], time: firstKey }],
      });
    }
  }
  return returnArray;
}
function buildBearingAlertData(data) {
  let returnArray = [];
  const mechanicalHealth = data["BearingGlobal"];
  const global_ = data["GlobalMixed"];

  if (mechanicalHealth) {
    const val = mechanicalHealth["value"];
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
          "OK for operation under supervision,due to the presence of damages or significant dysfunctions.",
        ],
      });
    }
  }

  if (global_) {
    const val = global_["value"];
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
