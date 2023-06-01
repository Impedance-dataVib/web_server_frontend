export const isEmptyObject = (obj) => Object.keys(obj).length > 0 

export function buildSoketData(response, modelType, formData) {
  const firstKey = Object.keys(response)[0];
  const parserFormData = JSON.parse(formData);
  const maxRPMThrshhold = parseInt(parserFormData.rated_rpm);
  const data = response[firstKey];
  let globalIndicator = [];

  let isAlert = true;

  if (modelType === "Engine") {
    globalIndicator.push(
      buildIndicatorData("Combustion Condition", data["EngineEfficiency"])
    );

    globalIndicator.push(buildRpmData("RPM", data["ChannelSpeed"], maxRPMThrshhold));

    globalIndicator.push(
      buildIndicatorData("Engine Health", data["MechanicalHealth"])
    );
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

    globalIndicator.push(buildRpmData("RPM", data["ChannelSpeed"], maxRPMThrshhold));

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

    globalIndicator.push(buildRpmData("RPM", data["ChannelSpeed"], maxRPMThrshhold));

    globalIndicator.push(
      buildIndicatorData("Friction", data["MechanicalHealth"])
    );
  }

  return {
    isAlert,

    globalIndicator,

    currentStatus: data["Status"],

    alertsUpdatedOn: "06.04.2023 - 05:49:53 (UTC)",

    alertData: [
      {
        instructionName: "Injection & Combustion",

        instructionType: "error",

        instructions: [
          "Check Relevant Fuel Injector’s for indicated cylinders",

          "Check Relevant Fuel Injector’s for indicated cylinders",
        ],
      },

      {
        instructionName: "Bearing",

        instructionType: "warning",

        instructions: [
          "Check Relevant Fuel Injector’s for indicated cylinders",

          "Check Relevant Fuel Injector’s for indicated cylinders",
        ],
      },

      {
        instructionName: "",

        instructionType: "success",

        instructions: [
          "Check Relevant Fuel Injector’s for indicated cylinders",

          "Check Relevant Fuel Injector’s for indicated cylinders",
        ],
      },
    ],

    liveStatus: {
      currentStep: 2,

      currentMode: "Auto",

      stepProgress: 25,

      currentMessage: "Initiate Manual Measurement",
    },

    signals: {
      // crankShaft: 1170,

      // tdc: 1170,
    },
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
    indicatorMax: maxValue || parseInt(data)*2,
    indicatorValue: data,
    isPercentage: false,
    indicatorUnit: "Alert",
    isGradientColor: false,
    indicatorType: "error",
  };
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
      "Increase Fuel Consumption"
    );
    const peak_pressure = buildTrendChart(data["PowerLoss"], "Peak Pressure"); //TODO:: check peak pressure
    const mechanical_health = buildTrendChart(
      data["MechanicalHealth"],
      "Mechanical Health"
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
      "Mechanical Health"
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
    const peak_pressure = buildTrendChart(data["PowerLoss"], "Peak Pressure"); //TODO:: check peak pressure
    const mechanical_health = buildTrendChart(
      data["MechanicalHealth"],
      "Mechanical Health"
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
    const peak_pressure = buildTrendChart(data["PowerLoss"], "Peak Pressure"); //TODO:: check peak pressure
    const mechanical_health = buildTrendChart(
      data["MechanicalHealth"],
      "Mechanical Health"
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
    const peak_pressure = buildTrendChart(data["PowerLoss"], "Peak Pressure"); //TODO:: check peak pressure
    const mechanical_health = buildTrendChart(
      data["MechanicalHealth"],
      "Mechanical Health"
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

function buildTrendChart(data, name) {
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
    chartType: "LineGradient",
    xLabel: "Increase Fuel Consumption",
    yLabel: "Time",
  };
  return increase_fuel_consumption;
}

function checkFillColor(value) {
  if (value === 100) {
    return "success";
  }
  return "error";
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
        fill: "white",
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

      if (!itemData.hasOwnProperty('Status')) {
          const itemDataFirstKey = Object.keys(itemData)[0];
          const channelData = itemData[itemDataFirstKey];
          returnArray.push({
              title: firstKey,
              value: channelData['ChannelSpeed']
          })
      }
  }
  return returnArray;
}


export function getCommaSepratedChannel(data, type) {
  data = JSON.parse(data);
  if (type === 'Engine') {
      let channel = buildChannelName(data['Crankshaft_SENSORx']);
      if (data['CamShaft_SENSORx'] !== 'No Channel') {
          return (channel + ',' + buildChannelName(data['CamShaft_SENSORx']));
      }
      if (data['TDC_SENSORx'] !== 'No Channel') {
          return (channel + ',' + buildChannelName(data['TDC_SENSORx']));
      }
      if (data['Peak_Pressure_SENSORx'] !== 'No Channel') {
          return (channel + ',' + buildChannelName(data['Peak_Pressure_SENSORx']));
      }
      return channel;
  }
  if (type === 'Torque') {
      let channel = buildChannelName(data['de_channel_sensorx']);
      if (data['nde_channel_sensorx'] !== 'No Channel') {
          channel = (channel + ',' + buildChannelName(data['nde_channel_sensorx']));
      }
      return channel;
  }
  if (type === 'Turbine') {
      return buildChannelName(data['turbine_crankshaft_sensorx']);
  }
  if (type === 'Motor') {
      return buildChannelName(data['motor_crankshaft_sensorx']);
  }

  if (type === 'Bearing') {
      return buildChannelName(data['bearing_crankshaft_sensorx']);
  }
  
}

function buildChannelName(channel) {
  return "CHANNEL" + channel.substr(channel.length - 1);
}