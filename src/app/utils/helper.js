import {useMemo} from "react";
import {useLocation} from "react-router-dom";

import {eachDayOfInterval, format} from "date-fns";

export const isEmptyObject = (obj) => Object.keys(obj).length > 0;

export function buildSoketData(response, modelType, formData) {
    const firstKey = Object.keys(response)[0];
    const parserFormData = JSON.parse(formData);
    const maxRPMThrshhold = parseInt(parserFormData.rated_rpm);
    const maxPower = parseInt(parserFormData.power);
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
            buildRpmData("RPM", data.ChannelSpeed || 0, maxRPMThrshhold)
        );
        globalIndicator.push(
            buildTorqueIndicatorData(
                "Torque(kNm)",
                (data.StaticTorque?.value || 0) * 0.001,
                1000
            )
        );

        globalIndicator.push(
            buildTorqueIndicatorData(
                "Power(MW)",
                (data.StaticPower?.value || 0) * 1.0e-6,
                maxPower * 1.0e-6
            )
        );
        globalIndicator.push(
            buildTorqueIndicatorData(
                "Torsion(degree)",
                data.StaticTorsion?.value || 0,
                6
            )
        );
    } else if (modelType === "Turbine") {
        globalIndicator.push(
            buildRpmData("Speed", data?.ChannelSpeed, maxRPMThrshhold)
        );
        globalIndicator.push(
            buildIndicatorData(
                "Regularity/Deviation",
                data?.RegularityDeviation,
                "valueInHealth"
            )
        );
        if (data?.BearingStatus && data?.BearingStatus.valueInHealth) {
            globalIndicator.push(
                buildIndicatorData(
                    "Bearing Status",
                    data?.BearingStatus,
                    "valueInHealth"
                )
            );
        }
        if (data?.BearingStatusGas && data?.BearingStatusGas.valueInHealth) {
            globalIndicator.push(
                buildIndicatorData(
                    "Bearing Status ",
                    data?.BearingStatusGas,
                    "valueInHealth"
                )
            );
        }
        globalIndicator.push(
            buildIndicatorData("Shaft Health", data?.BladeStatus, "valueInHealth")
        );
        if (JSON.parse(formData).type === "Steam") {
            globalIndicator.push(
                buildIndicatorData("Coupling", data?.TurbineCoupling, "valueInHealth")
            );
        } else {
            globalIndicator.push(
                buildIndicatorData(
                    "Combustion Kit",
                    data?.CombustionKit,
                    "valueInHealth"
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
            buildIndicatorData("Bearings", data["4KMixed"], "valueInHealth")
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

function getConditionalIndicatorValue(isGradientOpposite, value) {
    return isGradientOpposite
        ? "" + parseFloat(value).toFixed(2)
        : "" + parseInt(value);
}

function buildIndicatorData(indicator_title, data, key, isGradientOpposite) {
    let isOffline = false;
    if (!data || !data[key]) {
        isOffline = true;
    }
    let value = data ? data[key] : 0;

    if (key !== "value") {
        value = roundToNearest10(value);
    }
    let indicatorUnit = "Stable";
    let indicatorType = "success";
    if (isGradientOpposite) {
        if (value >= 3) {
            indicatorUnit = "Alert";
            indicatorType = "error";
        } else if (value >= 2 && value < 3) {
            indicatorUnit = "Attention";
            indicatorType = "warning";
        }
    } else {
        if (value <= 30) {
            indicatorUnit = "Alert";
            indicatorType = "error";
        } else if (value > 30 && value <= 70) {
            indicatorUnit = "Attention";
            indicatorType = "warning";
        }
    }
    return {
        indicatorName: indicator_title,
        indicatorMin: 0,
        indicatorMax: isGradientOpposite ? 6 : 100,
        indicatorValue: isOffline
            ? "Offline"
            : getConditionalIndicatorValue(isGradientOpposite, value),
        isPercentage: !isOffline,
        indicatorUnit: isOffline ? " " : indicatorUnit,
        isGradientColor: true,
        indicatorType: isOffline ? " " : indicatorType,
        isGradientOpposite: isGradientOpposite ?? false,
        tooltip: trendTooltip[indicator_title],
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
        tooltip: trendTooltip[indicator_title],
    };
}

function buildTorqueIndicatorData(indicator_title, data, maxValue) {
    return {
        indicatorName: indicator_title,
        indicatorMin: 0,
        indicatorMax: maxValue || parseInt(data) * 2,
        indicatorValue: data ? parseFloat(data).toFixed(2) : 0,
        isPercentage: false,
        isGradientColor: false,
        indicatorType: "error",
        tooltip: trendTooltip[indicator_title],
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
    const maxPower = from_data?.power;
    const alertData = response["alertData"];
    const historical_data = response["historical_data"];
    let data = {};

    if (!historical_data || historical_data.length === 0) {
        return {
            cylinder_specific_indicators: [],
            trends: [],
        };
    }
    // process engine data
    if (response["type"] === "Engine") {
        data = JSON.parse(historical_data.at(0)?.jsondata);
        const moduleData = data["Engine"];
        const firingOrder = moduleData["FiringOrder"];
        const firingOrderSplit = firingOrder.length / 2;
        const first = firingOrder.slice(0, firingOrderSplit);

        const second = firingOrder.slice(first.length);
        let cylinder_specific_indicators = [];
        const firingOrderLabel = from_data?.firing_order.trim().split(",");
        if (data?.Compression) {
            const compression = buildCompressionData(
                first,
                second,
                data["Compression"],
                "Compression Condition",
                firingOrderLabel
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
                "Injection Condition",
                firingOrderLabel
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
                "Bearing Condition",
                firingOrderLabel
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
                "Condition of cyl moving parts",
                firingOrderLabel
            );
            if (condition_of_cyl_moving_parts) {
                cylinder_specific_indicators.push(condition_of_cyl_moving_parts);
            }
        }
        if (
            from_data["fuel"] === "Hydrogen" ||
            from_data["fuel"] === "Ammonia" ||
            from_data["fuel"] === "Natural Gas"
        ) {
            const miss_firing = buildCompressionData(
                first,
                second,
                data["Misfiring"],
                "Misfiring",
                firingOrderLabel
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

        const mechanical_health = buildLineGradientChart(
            historical_data,
            "MechanicalHealth",
            "Engine Health",
            true
        );

        trends.push(mechanical_health);
        const peakPressure = data["Pressure"];
        if (peakPressure && parseInt(peakPressure["value"]) !== 0) {
            const peak_pressure = buildPeekPressureChart(
                peakPressure,
                firingOrder,
                from_data["max_pressure"]
            );
            trends.push(peak_pressure);
        }
        return {
            cylinder_specific_indicators: cylinder_specific_indicators,
            trends: trends,
            alert: buildEngineAlertData(alertData),
            alertUpdatedOn: new Date(),
        };
    }
    // process Torque data
    if (response["type"] === "Torque") {
        let trends = [];
        const torsionWithRpm = buildLineChart(
            historical_data,
            "StaticTorque",
            "Torque with RPM",
            false,
            true,
            100
        );
        trends.push(torsionWithRpm);

        const powerWithRpm = buildLineChart(
            historical_data,
            "StaticPower",
            "Power with RPM",
            false,
            true,
            maxPower * 1.0e-6
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
                "Regularity Deviation, Shaft Health",
                true
            );
            trends.push(steamTurbineChart1);

            const steamTurbineChart2 = buildTurbineChart(
                historical_data,
                "BearingStatus",
                "TurbineCoupling",
                "Bearing status, Coupling",
                true
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
                "Regularity Deviation, Shaft Health",
                true
            );
            trends.push(gasTurbineChart1);

            const gasTurbineChart2 = buildTurbineChart(
                historical_data,
                "BearingStatus",
                "CombustionKit",
                "Bearing status, Combustion Kit Status",
                true
            );
            trends.push(gasTurbineChart2);
            return {
                cylinder_specific_indicators: [],
                trends: trends,
                alert: buildTurbineAlertData(alertData),
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
            "Electromagnetic Stress",
            true
        );
        trends.push(motorChart1);

        const motorChart2 = buildMotorChart(
            historical_data,
            "MBearing",
            "MStressStability",
            "Bearing , Stability",
            true
        );
        trends.push(motorChart2);

        return {
            cylinder_specific_indicators: [],
            trends: trends,
            alert: buildMotorAlertData(alertData),
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
            "Global(Unbalance/Alignment/Looseness)",
            true
        );
        trends.push(bearingChart1);

        const bearingChart2 = buildBearingChart(
            historical_data,
            "BearingGlobal",
            "4KMixed",
            " Mechanical health, Stability",
            true
        );
        trends.push(bearingChart2);
        return {
            cylinder_specific_indicators: [],
            trends: trends,
            alert: buildBearingAlertData(alertData),
            alertUpdatedOn: new Date(),
        };
    }

    return {
        cylinder_specific_indicators: [],
        trends: [],
    };
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

function buildCompressionData(
    first,
    second,
    compressionData,
    graphLabel,
    firingOrderLabel
) {
    let children = [];
    const showSecondValue = 100 / second.length;

    const cylinderHealth = compressionData?.cylinderHealth;
    if (!cylinderHealth) {
        return null;
    }
    for (let i = 0; i < first.length; i++) {
        const compression = cylinderHealth[i];
        let firstChild = {
            name: "Cyl " + firingOrderLabel[i],
            fill: checkFillColor(compression),

            showValue: compression,
            children: [],
        };

        for (let j = 0; j < second.length; j++) {
            if (i === j) {
                const secondCompression = cylinderHealth[first.length + j];
                firstChild["children"].push({
                    name: "Cyl " + firingOrderLabel[first.length + j],
                    value: showSecondValue,
                    fill: checkFillColor(secondCompression),
                    showValue: secondCompression,
                });
            }
        }
        if (i === first.length - 1 && first.length < second.length) {
            for (let k = first.length; k < second.length; k++) {
                const secondCompression = cylinderHealth[k];
                firstChild.children[0].children = [
                    {
                        name: "Cyl " + firingOrderLabel[firingOrderLabel.length - 1],
                        value: showSecondValue,
                        fill: checkFillColor(secondCompression),
                        showValue: secondCompression,
                    },
                ];
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

    let i = 0;
    for (const item of data) {
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
        i++;
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
    for (let dp of datapoints) {
        sum += parseInt(dp, 10); //don't forget to add the base
    }

    let avg = sum / datapoints.length;

    return {
        trendsName: title,
        speedName: "Speed",
        min: round(Math.min(...datapoints)),
        max: round(Math.max(...datapoints)),
        yMax: title === "Engine Health" ? 110 : 6,
        avg: round(avg),
        datapoints: datapoints,
        dataPointsY1: zAxisDataPoints,
        labels: labels,
        chartType: "LineGradient",
        yLabel: title === "Engine Health" ? "Health Percent" : title,
        xLabel: "Time",
        isGradientOpposite: isGradientOpposite ?? false,
    };
}

const message_data = {
    0: {status: "Success", message: "All Ok"},
    1: {status: "Success", message: "Good Signal, No Synchronisation with TDC"},
    2: {status: "Success", message: "Good Signal, Synchronisated with TDC"},
    3: {status: "Success", message: "Good Signal, Synchronisated with CAM"},
    "-1": {status: "Fail", message: "Failed to apply configuration"},
    "-2": {status: "Fail", message: "Failed to load recorded signal"},
    "-3": {status: "Fail", message: "Unstable Speed."},
    "-4": {
        status: "Fail",
        message: "Too low speed. Check minRPM settings in Config",
    },
    "-5": {status: "Fail", message: "Too much speed variation."},
    "-6": {status: "Fail", message: "No Valid License"},
    "-7": {status: "Fail", message: "Unstable Speed."},
    "-8": {status: "Fail", message: "Signal Level - Too low"},
    "-10": {status: "Fail", message: "Speed Mismatch between Channels"},
    "-9": {status: "Fail", message: "Mismatch between config & channels info."},
};

const torque_message_data = {
    0: {status: "Success", message: "All Ok"},
    1: {status: "Success", message: "Good Signal"},
    2: {status: "Success", message: "Good Signal"},
    3: {status: "Success", message: "Good Signal"},
    "-1": {status: "Fail", message: "Failed to apply configuration"},
    "-2": {status: "Fail", message: "Failed to load recorded signal"},
    "-3": {status: "Fail", message: "Unstable Speed."},
    "-4": {
        status: "Fail",
        message: "Too low speed. Check minRPM settings in Config",
    },
    "-5": {status: "Fail", message: "Too much speed variation."},
    "-6": {status: "Fail", message: "No Valid License"},
    "-7": {status: "Fail", message: "Unstable Speed."},
    "-8": {status: "Fail", message: "Signal Level - Too low"},
    "-10": {status: "Fail", message: "Speed Mismatch between Channels"},
    "-9": {status: "Fail", message: "Mismatch between config & channels info."},
};

function average(datapoints) {
    let sum = 0;
    for (let i of datapoints) {
        if (i) {
            sum = parseFloat(sum) + parseFloat(i);
        }
    }
    const avg = sum / datapoints.length;
    return parseFloat(avg).toFixed(2);
}

export function round(num) {
    return Math.round(num * 100) / 100;
}

function checkForAlert(dataPoints, min, max) {
    if (!dataPoints) return 0; //return no alert
    let isCompleteRed = false;
    let isCompletelyOrange = false;
    let isCompletelyGreen = false;
    for (let i of dataPoints) {
        if (i <= min) {
            isCompleteRed = true;
        } else if (i > min && i <= max) {
            isCompletelyOrange = true;
        } else if (i > max) {
            isCompletelyGreen = true;
        }
    }

    if (isCompletelyGreen) {
        return 0; //return no alert
    }

    if (isCompleteRed && !isCompletelyOrange) {
        return 1; //return error alert
    }

    if (isCompletelyOrange || isCompleteRed) {
        return 2;  //return warning alert
    }

    return 0; //return no alert
}

function buildTorqueAlertData(data) {
    let returnArray = [];

    if (data) {
        let tempCode = 999;
        for (let item of data) {
            const moduleData = JSON.parse(item["jsondata"]);
            if (!moduleData) {
                continue;
            }
            const code = moduleData["Status"];

            if (tempCode !== code) {
                const message = torque_message_data[code];
                if (message) {
                    returnArray.push({
                        instructionName: message["status"],
                        isTorque: true,
                        instructionType:
                            message["status"] === "Success" ? "success" : "error",
                        instructions: [
                            {message: message["message"], time: moduleData?.DateAndTime},
                        ],
                    });
                }
            }
            tempCode = code;
        }
    }

    return returnArray;
}

function buildBearingAlertData(data) {
    const mechanicalHealth = [];
    const bearing = [];

    const global_ = [];

    if (data) {
        for (const item of data) {
            const moduleData = JSON.parse(item["jsondata"]);

            const bearingGlobal = moduleData["2KMixed"];

            if (bearingGlobal) {
                mechanicalHealth.push(bearingGlobal["valueInHealth"]);
            }

            const bearingData = moduleData["BearingGlobal"];

            if (bearingData) {
                bearing.push(bearingData["valueInHealth"]);
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
                instructionName: "Shaft/Clearance",
                instructionType: "error",
                instructions: [
                    "Roller Bearing Case:",
                    "- Excessive Clearance in all type of bearings",
                    "- Excessive excentricity(static/dynamic) in the case of electric motors",
                    "- Excessive Tipping Displacement in case of vertical installations",
                    "- Excessive stresses causing the shaft to move with high displacement",
                    "- Excessive teeth mesh stresses in the case of a gearbox",

                    "Plain Bearing Case",
                    "- Clearance between bearing pad/bearing cap",
                    "- Excessive Excentricity (Static/dynamic) in the case of electric motors",
                    "- Excessive tipping displacement in the case of vertical installations",
                    "- Excessive teeth mesh stresses in the case of gearbox",
                ],
            });
        }
        if (val > 30 && val <= 70) {
            returnArray.push({
                instructionName: "Shaft/Clearance",
                instructionType: "warning",
                instructions: [
                    " Roller Bearing Case:",
                    "- Excessive Clearance in all type of bearings",
                    "- Excessive excentricity(static/dynamic) in the case of electric motors",
                    "- Excessive Tipping Displacement in case of vertical installations",
                    "- Excessive stresses causing the shaft to move with high displacement",
                    "- Excessive teeth mesh stresses in the case of a gearbox",

                    "Plain Bearing Case",
                    "- Clearance between bearing pad/bearing cap",
                    "- Excessive Excentricity (Static/dynamic) in the case of electric motors",
                    "- Excessive tipping displacement in the case of vertical installations",
                    "- Excessive teeth mesh stresses in the case of gearbox,",
                ],
            });
        }
    }
    if (bearing) {
        const val = average(bearing);
        if (val <= 30) {
            returnArray.push({
                instructionName: "Bearings",
                instructionType: "error",
                instructions: [
                    "Roller Bearing Case",
                    "- Incorrect alignment of the inner ring with the outer ring",
                    "- Race spill, axial sliding irregularities",
                    "- Insufficient axial preload in the case of preloaded bearing",
                    "- Irregularities of the rolling of bearing elements on the races due to excessive clearance related to underload in radial direction",
                    "- Damage of bearing element (Cage/elements/races)",
                    "- Wear of Pulleys/belts",
                    "- Defective Bearing between the bearing outer ring and bore",
                    "- Wear of Housing",

                    "Plain Bearing Case",
                    "- Instability due to axial excessive clearance in the case of thrust bearing radial in the case of guide bearing",

                    "Pads Bearing Case",
                    "- Pivot wear",
                    "- Difficulties of Pivoting pads(jamming)",
                ],
            });
        }
        if (val > 30 && val <= 70) {
            returnArray.push({
                instructionName: "Bearings",
                instructionType: "warning",
                instructions: [
                    "Roller Bearing Case",
                    "- Incorrect alignment of the inner ring with the outer ring",
                    "- Race spill, axial sliding irregularities",
                    "- Insufficient axial preload in the case of preloaded bearing",
                    "- Irregularities of the rolling of bearing elements on the races due to excessive clearance related to underload in radial direction",
                    "- Damage of bearing element (Cage/elements/races)",
                    "- Wear of Pulleys/belts",
                    "- Defective Bearing between the bearing outer ring and bore",
                    "- Wear of Housing",

                    "Plain Bearing Case",
                    "- Instability due to axial excessive clearance in the case of thrust bearing radial in the case of guide bearing",

                    "Pads Bearing Case",
                    "- Pivot wear",
                    "- Difficulties of Pivoting pads(jamming)",
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
                    "Roller Bearing without High Shock index",
                    "- Unbalance, Misalignment",
                    "- Cantilever Rotor Imbalance",
                    "- Mode (bending, Fitting) Excitation",

                    "Roller Bearing with High Shock Index",
                    "- Loosening/Clearance at the support structure",
                    "- Coupling Clearance, clamping wear(toothed Coupling), axial distance not repsected(coupling with flexible blades), cracking(flector)",

                    "Plain Bearings Case without high shock index",
                    "- Imbalance, Misalignment ",
                    "- Cantilever rotor imbalance",

                    "Plain Bearings with High Shock Index Value",
                    "- Coupling: Clearance, clamping wear(toothing Coupling), axial distance not respected (coupling with flexible blades), cracking(flector)",
                    "- Loosening of Caps and supports",
                ],
            });
        }

        if (val > 30 && val <= 70) {
            returnArray.push({
                instructionName: "Global(Imbalance/Alignment/Loosness)",
                instructionType: "warning",
                instructions: [
                    "Roller Bearing without High Shock index",
                    "- Unbalance, Misalignment",
                    "- Cantilever Rotor Imbalance",
                    "- Mode (bending, Fitting) Excitation",
                    "Roller Bearing with High Shock Index",
                    "- Loosening/Clearance at the support structure",
                    "- Coupling Clearance, clamping wear(toothed Coupling), axial distance not repsected(coupling with flexible blades), cracking(flector)",

                    "Plain Bearings Case without high shock index",
                    "- Imbalance, Misalignment",
                    "- Cantilever rotor imbalance",

                    "Plain Bearings with High Shock Index Value",
                    "- Coupling: Clearance, clamping wear(toothing Coupling), axial distance not respected (coupling with flexible blades), cracking(flector)",
                    "- Loosening of Caps and supports",
                ],
            });
        }
    }
    return returnArray;
}

function buildMotorAlertData(data) {
    let returnArray = [];

    const electroMag = [];

    const bearing = [];

    const stressStability = [];

    if (data) {
        for (const item of data) {
            const moduleData = JSON.parse(item["jsondata"]);

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
                    "- Breakage or cracking of a short-circuit ring (also results in abnormal heating of the rotor at the point of cracking or rupture and an increase in current.)",
                ],
            });
        } else if (val > 30 && val <= 70) {
            returnArray.push({
                instructionName: "Electromagnetic Stress",

                instructionType: "warning",

                instructions: [
                    "- Check Insulation of winding",
                    "- Check mechanical strength of the windings in the slots (can also result in defective or even detached slot shims)",
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
                    "=- Check for Air Gap in the B5 of an electric motor",

                    "Check for tilting in the case of vertical axis installations",

                    "Check for the degradation of bearings",

                    "D4",
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

                    "D7",
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
                    "Check for Instability of the power supply (network / transformer / drive also) ",

                    "Check for Phase imbalance",

                    "Check for Mechanical overload ",

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
                    "Check for Instability of the power supply (network / transformer / drive also) ",

                    "Check for Phase imbalance ",

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

    const regularityDeviation = [];

    const bearingStatus = [];

    const bladeStatus = [];

    const turbineCoupling = [];
    const combustionCondition = [];

    if (data) {
        for (const item of data) {
            const moduleData = JSON.parse(item["jsondata"]);
            const RegularityDeviation = moduleData["RegularityDeviation"];

            if (RegularityDeviation) {
                regularityDeviation.push(RegularityDeviation["valueInPercent"]);
            }

            const BearingStatus = moduleData["BearingStatus"];

            if (BearingStatus) {
                bearingStatus.push(BearingStatus["valueInPercent"]);
            }

            const combustion = moduleData["CombustionKit"];

            if (combustion) {
                combustionCondition.push(combustion["valueInPercent"]);
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
                instructionName: "Coupling/Alignment",
                instructionType: "error",
                instructions: [
                    "Inspection of coupling condition for Fatigue",
                    "Checking alignment factors between the turbine and the coupled element",
                ],
            });
        } else if (val > 30 && val <= 70) {
            returnArray.push({
                instructionName: "Coupling/Alignment",
                instructionType: "warning",
                instructions: [
                    "Inspection of coupling condition for Fatigue",
                    "Checking alignment factors between the turbine and the coupled element",
                ],
            });
        }
    }
    if (combustionCondition) {
        const val = average(combustionCondition);

        if (val <= 30) {
            returnArray.push({
                instructionName: "Combustion Kit",
                instructionType: "error",
                instructions: ["Defective injection system"],
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
                    "Check for clamping or dynamic instabilities or damage to rotating/fixed blades",
                    "Check for Non-linearities in the assembly of the connecting structure to the base/ground",
                ],
            });
        }

        if (val > 30 && val <= 70) {
            returnArray.push({
                instructionName: "Shaft/Blades Health",

                instructionType: "warning",

                instructions: [
                    "Check for clamping, dynamic instabilities, damage to rotating blades",
                    "Check for Non-linearities in the assembly of the connecting structure to the base/ground",
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
                    "Check axial stability between the thrust Bearings",
                    "Check dynamic seal defects",
                    "Check Stator geometry defect",
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
                    "Check axial stability between the thrust Bearings",
                    "Check dynamic seal defects",
                    "Check Stator geometry defect",
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
        const data = JSON.parse(item["jsondata"]);

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

    const item = historical_data.at(-1);

    const data = JSON.parse(item["jsondata"]);

    const compression = data["Compression"];

    const bearing = data["Bearing"];

    const bearingBis = data["BearingBis"];

    const misfiring = data["Misfiring"];

    const InjectionCondition = data["InjectionCondition"]; //Performance of Vibration Damper

    if (InjectionCondition) {
        let waring = false;
        let is_all_waring = true;
        let is_all_error = true;
        for (const cylinder of InjectionCondition?.cylinderValues) {
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
                        "Pressure test injector/Dismantle fuel pump/injector. Overhaul if neccessary. ",
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

        for (const cylinder of compression?.cylinderValues) {
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
                    "Check Compression Pressure of specific cylinder",
                    "Check Exhaust Temperatures specific cylinder which may indicate valve tighntess issues",
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
                        "Check Compression Pressure of specific cylinder",
                        "Check Exhaust Temperatures specific cylinder which may indicate valve tighntess issues",
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
                        "Check Compression Pressure of specific cylinder",
                        "Check Exhaust Temperatures specific cylinder which may indicate valve tighntess issues",
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
        for (const cylinder of bearing?.cylinderValues) {
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
        for (const cylinder of bearingBis?.cylinderValues) {
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
                    "Take immediate corrective action on Bearings",
                    "If engine has just been overhauled, check for faulty assembly",
                    "Check engine running hours to identify if the engine is due for overhaul.",
                    "Carry out borescope inspection through cylinder head of piston top for carbon deposits. Eliminate bad fuel injector",
                    "Check quality of fuel oil to eliminate possibility of scuffing of cylinder liners",
                    " Check Jacket cooling water temperature",
                    "Check Lube oil filter for debris",
                    "Check for colour of exhaust(blue smoke/black smoke)",
                    "Open crankcase, check liner surface of affected cylinders through borescope inspection if possible",
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

        for (const cylinder of misfiring?.cylinderValues) {
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
                    "CAUTION - specific cylinder Misfired",
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

function buildLineChart(data, key, title, isGradientOpposite, hideBackground, maxPower) {
    let yMaxValue = maxPower || 6;
    let labels = [];
    let datapoints = [];
    let zAxisDataPoints = [];
    let count = 0;
    if (data) {
        for (let item of data) {
            const moduleData = JSON.parse(item["jsondata"]);

            if (moduleData?.Status <= 0 || !moduleData?.DateAndTime) {
                continue;
            }
            labels.push(getdate(moduleData?.DateAndTime));

            zAxisDataPoints.push(parseInt(moduleData?.ChannelSpeed || 0));
            try {
                const valueObject = moduleData[key];
                if (key === 'StaticPower') {
                    datapoints.push(round((valueObject?.value || 0) * 1.0e-6));
                } else {
                    datapoints.push(round((valueObject?.value || 0) * 0.001));
                }
            } catch (e) {
                console.error("ignorablel error", e);
            }
            count++;
        }
    }
    let sum = 0;
    for (let i of datapoints) {
        sum += parseInt(i, 10); //don't forget to add the base
    }

    let avg = sum / datapoints.length;

    return {
        trendsName: title,
        speedName: "Speed",
        min: round(Math.min(...datapoints)),
        max: round(Math.max(...datapoints)),
        yMax: title === "Engine Health" ? 110 : yMaxValue,
        avg: round(avg),
        datapoints: datapoints,
        dataPointsY1: zAxisDataPoints,
        labels: labels,
        chartType: "LineGradient",
        yLabel: title === "Engine Health" ? "Health Percent" : title,
        xLabel: "Time",
        hideBackground: hideBackground ?? false,
        isGradientOpposite: isGradientOpposite ?? false,
    };
}

function calculateTorqueValue(value, key) {
    if (value) {
        if (key === "StaticTorque") {
            return parseFloat((value || 0) * 0.001).toFixed(2);
        }

        if (key === "StaticPower") {
            return parseFloat((value || 0) * 1.0e-6).toFixed(2);
        }
        return parseFloat(value).toFixed(2);
    } else {
        return 0;
    }
}

export function buildTrendData(historical_data, type, from_data) {
    let labels = [];
    const rpmData = [];
    const resultSet = [];
    from_data = JSON.parse(from_data);
    const firingOrderLabel = from_data?.firing_order
        ? from_data?.firing_order.trim().split(",")
        : [];

    for (const itemData of historical_data) {
        const item = JSON.parse(itemData["jsondata"]);

        if (item.Status <= 0 || !item?.DateAndTime) {
            continue;
        }

        let toPush = false;
        if (type === "Engine") {
            const firingOrder = item?.Engine.FiringOrder;

            for (const key in item) {
                if (keysToIgnore[type].includes(key)) {
                    const objData = item[key];

                    if (objData.hasOwnProperty("cylinderHealth") && objData?.cylinderHealth) {
                        const cylArray = objData?.cylinderHealth;
                        let i = 0;
                        for (let order of firingOrder) {
                            if (firingOrderLabel[i]) {
                                const foundIndex = resultSet.findIndex(
                                    (x) => x.key === key + "Cyl " + firingOrderLabel[i]
                                );
                                if (foundIndex !== -1) {
                                    resultSet[foundIndex].data.push(cylArray[i] ? cylArray[i] : 0);
                                } else {
                                    resultSet.push({
                                        key: key + "Cyl " + firingOrderLabel[i],
                                        data: [cylArray[i] ? cylArray[i] : 0],
                                    });
                                }
                            }
                            i++;
                        }
                    }

                    const foundIndex = resultSet.findIndex((x) => x.key === key);
                    if (foundIndex !== -1) {
                        if (key === "PowerLoss") {
                            resultSet[foundIndex].data.push(objData?.value ? parseFloat(objData?.value).toFixed(2) : 0
                            );
                        } else {
                            resultSet[foundIndex].data.push(objData?.valueInHealth ? objData?.valueInHealth : 0);
                        }
                    } else {
                        if (key === "PowerLoss") {
                            resultSet.push({
                                key,
                                data: [objData?.value ? parseFloat(objData?.value).toFixed(2) : 0],
                            });
                        } else {
                            resultSet.push({key, data: [objData?.valueInHealth ? objData?.valueInHealth : 0]});
                        }
                    }
                    toPush = true;
                }
            }
        } else if (type === "Torque") {
            for (const key in item) {
                if (keysToIgnore[type].includes(key)) {
                    const objData = item[key];
                    const foundIndex = resultSet.findIndex((x) => x.key === key);
                    if (foundIndex !== -1) {
                        resultSet[foundIndex].data.push(
                            calculateTorqueValue(objData?.value, key)
                        );
                    } else {
                        resultSet.push({
                            key,
                            data: [calculateTorqueValue(objData?.value, key)],
                        });
                    }
                    toPush = true;
                }
            }
        } else {
            for (const key in item) {
                if (keysToIgnore[type].includes(key)) {
                    const objData = item[key];
                    const foundIndex = resultSet.findIndex((x) => x.key === key);
                    if (foundIndex !== -1) {
                        resultSet[foundIndex].data.push(objData?.valueInHealth ? objData?.valueInHealth : 0);
                    } else {
                        resultSet.push({key, data: [objData?.valueInHealth ? objData?.valueInHealth : 0]});
                    }
                    toPush = true;
                }
            }
        }
        if (toPush) {
            labels.push(getdate(item?.DateAndTime));
            rpmData.push(parseInt(item?.ChannelSpeed || 0));
        }
    }
    const dataSet = [];
    let maxRpm = 0;
    if (rpmData && rpmData.length > 0) {
        const rpmDataArr = buildDataSet(
            type === "Engine" ? "RPM" : "Speed",
            "black",
            rpmData,
            "y1"
        );
        dataSet.push(rpmDataArr);
        maxRpm = rpmDataArr.maxValue;
    }

    for (let item of resultSet) {
        dataSet.push(
            buildDataSet(
                trendTitle[type][item.key]
                    ? trendTitle[type][item.key]
                    : toTitleCase(item.key),
                getRandomColor(),
                item.data
            )
        );
    }
    return {dataSet, labels, maxRpm};
}

function buildDataSet(title, color, dataPoints, axisId) {
    const isAverage = [
        "Increase in Fuel Consumption",
        "Torque",
        "Power",
    ].includes(title);
    return {
        title: title,
        data: dataPoints,
        label: title,
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0,
        borderColor: color,
        pointBackgroundColor: color,
        backgroundColor: color,
        fill: false,
        yAxisID: axisId ?? "y",
        hidden: false,
        minVal: (isAverage
            ? parseFloat(Math.min(...dataPoints)).toFixed(2)
            : Math.round(Math.min(...dataPoints))) || 0,
        maxValue: (isAverage
            ? parseFloat(Math.max(...dataPoints)).toFixed(2)
            : Math.round(Math.max(...dataPoints))) || 0,
        avgValue: (isAverage
            ? average(dataPoints)
            : roundToNearest10(average(dataPoints))) || 0,
    };
}

export function convertDate(dateVal) {
    let dateExtract = format(dateVal, "yyyy-MM-dd HH:mm:ss");
    return dateExtract;
}

export function convertDateOnly(dateVal) {
    let dateExtract = format(dateVal, "yyyy-MM-dd");
    return dateExtract;
}

export function convertUTCDateToLocalTime(dateVal) {
    let dateExtract = format(dateVal, "dd-MMM-yyyy HH:mm:ss");
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
    for (let i of datapoints) {
        sum += parseInt(i, 10); //don't forget to add the base
    }

    let avg = sum / datapoints.length;

    return {
        trendsName: title,
        speedName: "Speed",
        min: round(Math.min(...datapoints)),
        max: round(Math.max(...datapoints)),
        yMax: 110,
        avg: round(avg),
        datapoints: datapoints,
        dataPointsY1: zAxisDataPoints,
        dataPointsY2: datapoints2,
        labels: labels,
        chartType: "LineGradient",
        yLabel: "Health Percent",
        xLabel: "Time",
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
    for (let i of datapoints) {
        sum += parseInt(i, 10); //don't forget to add the base
    }

    let avg = sum / datapoints.length;

    return {
        trendsName: title,
        speedName: "Speed",
        min: round(Math.min(...datapoints)),
        max: round(Math.max(...datapoints)),
        yMax: 110,
        avg: round(avg),
        datapoints: datapoints,
        dataPointsY1: zAxisDataPoints,
        dataPointsY2: datapoints2,
        labels: labels,
        chartType: "LineGradient",
        yLabel: "Health Percent",
        xLabel: "Time",
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
    for (let i of datapoints) {
        sum += parseInt(i, 10); //don't forget to add the base
    }

    let avg = sum / datapoints.length;
    return {
        trendsName: title,
        speedName: "Speed",
        min: round(Math.min(...datapoints)),
        max: round(Math.max(...datapoints)),
        yMax: 110,
        avg: round(avg),
        datapoints: datapoints,
        dataPointsY1: zAxisDataPoints,
        dataPointsY2: datapoints2,
        labels: labels,
        chartType: "LineGradient",
        yLabel: "Health Percent",
        xLabel: "Time",
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

    const auxData = itemData?.Aux;
    let id = 0;
    const returnData = [];
    if (auxData) {
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
                        id: id++,
                        indicatorMax: val?.Max ? val?.Max : 0,
                        indicatorMin: val?.Min ? val?.Min : 0,
                        indicatorName: val?.Desc + "(" + val?.Unit + ")",
                        indicatorValue: Math.round(val?.Value),
                        isGradientColor: false,
                        isPercentage: val?.Unit === "%",
                    });
                }
            }
        }
    }
    return returnData;
}

export function useQuery() {
    const {search} = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

const max_value = {
    PowerPercent: {max: 250.99, min: -251},
    Power: {max: 2211081215, min: -2000000000},
    FuelLevel: {max: 250.99, min: -251},
    EngineOilTemp: {max: 1735, min: -273},
    EngineOilPressure: {max: 8031.87, min: 0},
    EngineCoolantTemp: {max: 1735, min: -273},
    BatteryVoltage: {max: 3212.75, min: 0},
    EngineRPM: {max: 8031.87, min: 0},
    OperatingHours: {max: 210554060.75, min: 0},
    FuelPressure: {max: 0.125, min: 0},
    CrankcasePressure: {max: 251.99, min: -250},
    BoostPressure: {max: 8031.87, min: 0},
};

function roundToNearest10(number) {
    return Math.round(number / 10) * 10;
}

function toTitleCase(text) {
    const result = text.replace(/([A-Z])/g, " $1");
    return (result.charAt(0).toUpperCase() + result.slice(1)).trim();
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const keysToIgnore = {
    Engine: [
        "PowerLoss",
        "Unbalance",
        "EngineEfficiency",
        "CamPump",
        "Damper",
        "MechanicalHealth",
        "Compression",
        "Injection",
        "Bearing",
        "BearingBis",
        "InjectionCondition",
    ],
    Turbine: [
        "RegularityDeviation",
        "MBearing",
        "BladeStatus",
        "combustionCondition",
        "BladeStatusGas",
        "CombustionKit",
        "TurbineCoupling",
    ],
    Motor: ["MStressStability", "MElectromag", "MBearing"],
    Bearing: [
        "BearingGlobal",
        "GlobalMixed",
        "GlobalKurto",
        "GlobalLevel",
        "2KMixed",
        "4KMixed",
        "8KMixed",
    ],
    Torque: ["StaticTorsion", "StaticTorque", "StaticPower"],
};

const trendTitle = {
    Engine: {
        PowerLoss: "Increase in Fuel Consumption",
        Unbalance: "Performance of Mounts & Supports",
        EngineEfficiency: "Combustion Condition",
        CamPump: "Governor, Crank driven Accessories Health",
        Damper: "Performance of Vibration Damper",
        MechanicalHealth: "Engine Health",
        Compression: "Compression Condition",
        Injection: "Injection Condition",
        Bearing: "Bearing Condition",
        BearingBis: "Condition of cyl moving parts",
        InjectionCondition: "Fuel Injection Performance",
    },
    Turbine: {
        RegularityDeviation: "Regularity/Deviation",
        MBearing: "Bearing Status",
        BladeStatus: "Shaft/Blades Health",
        combustionCondition: "Combustion Kit",
        BladeStatusGas: "Shaft /Blades Health",
        CombustionKit: "Combustion Kit",
        TurbineCoupling: "Coupling/Alignment",
    },
    Motor: {
        MStressStability: "Stability",
        MElectromag: "Electromagnetic Stress",
        MBearing: "Bearing",
    },
    Bearing: {
        BearingGlobal: "Mechanical Health",
        GlobalMixed: "Global(Umbalance/Alignment/Loosness)",
        GlobalKurto: "Shock Index",
        GlobalLevel: "Level(RMS)",
        "2KMixed": "Shaft/Clearance",
        "4KMixed": "Bearings",
        "8KMixed": "Friction",
    },
    Torque: {
        StaticTorsion: "Torsion",
        StaticTorque: "Torque",
        StaticPower: "Power",
    },
};
const trendTooltip = {
    "Engine Health":
        "Overall indication of mechanical condition of Engine. Indicates the minor and major mechanical problems in the moving parts of the engine.Calculated from the wear/friction, cylinder pressure and crankshaft bearings indicators.",
    "Combustion Condition":
        "Indication of Engine running efficiently with regard to Fuel Consumption.Calculated from the injection condition and compression indicators.Even when this indicator approaches the warning limits, the engine can still be kept in operation without concern of damage to the engine as long as the mechanical condition indicator is normal.The consequences of allowing the engine to continue running under this condition are only higher operational costs and higher fuel consumption.",
    "Performance of Mounts & Supports":
        "Mounts indicator provides information about the health of Supporting structures, Excessive frame vibrations.Mount Supports have weakened due to ageing/weathering/lost elasticity/spoilt due to liquid leaks",
    "Governor, Crank driven Accessories Health":
        "This indicator measures irregularities of external/auxilliary equipment directly driven by the Governor and crankshaft.Irregularities in control system/fuel regulation system, turbocharger valves,fuel/lube/water pumps, turbocharger, coulping, shaft line or screw.",
    "Performance of Vibration Damper":
        "Damper indicator provides information about the effectiveness of rotational vibration absorption by Damper. When Damper health is low, the vibrations from the engine are transferred onto the gearboxes/propellers or associated driven systems. ",
    "Increase in Fuel Consumption":
        "Overall indication of engine imbalance, expressed as a percentagem, due to non-optimal thermal health(refer to indicators) and the inertia resistance of the rotating and moving parts.",
    //motor
    Stability:
        "This indicator tracks the degradation of components of electromagnetic circuits during operation",
    Bearing:
        "This indicator monitors dynamic stresses on the bearings or play and wear of the guide elements,and bearing degradation during operation",
    "Electromagnetic Stress":
        "This indicator expresses the electromagnetic stresses resulting from the windings and rotor during operation.",
    //torque
    "Torsion(degree)": "Torsion In degrees",
    "Torque(kNm)": "Torque in KNm",
    "Power(MW)": "Power in MW",
    RPM: "Speed",
    Speed: "Speed",
    //turbine
    "Regularity/Deviation":
        "Indicates the Faults in the steam intake system or lubrication control system of the bearings and thrust bearings",
    "Bearing Status":
        'Condition of Bearings due to Insufficient load due to: - coupling malfunction (dynamic misalignment; see "Coupling" indicator). - structure/support bending - excessive dynamic gearmesh force  (see gearbox levels). - Bearing wear - Cylinder defect (bore/bearing shell) - Stator geometry defect - Friction (dynamic seal defects) - Axial stability between the thrust bearings',
    "Shaft Health":
        "Indicates the overall health of Shaft/Blade and any deterioration due to Loss of clamping, dynamic instabilities, damage to rotating/ Fixed blades",
    Coupling:
        "This indicator expresses the fatigue during operation of the coupling during each cycle.It also describes a variable dynamic misalignment (isokinetic defect) between the turbine and the coupled element of the shaft line",
    "Combustion Kit":
        "This indicator expresses the fatigue during operation of the coupling during each cycle.It also describes a variable dynamic misalignment (isokinetic defect) between the turbine and the coupled element of the shaft line",
    //Bearing
    Bearings:
        "Assembly irregularity Roller bearing case:Incorrect alignment of the inner ring with the outer ring.Race spill, axial sliding irregularities (in the case of a free bearing) between outer ring and housing (stick slip, wear housing?Insufficient axial preload in the case of a preloaded bearing (angular contact).Irregularities of the rolling of the bearing elements on the races (inner/outer race) due to excessive clearance related to an underload in a radial direction.Damage of a bearing element (cage / elements / races).Wear of pulleys / belts.Defective bearing between the bearing outer ring and the bore.Wear of the housingPlain bearing case:Instability due to axial excessive clearance in the case of a thrust bearing, radial in the case of the guide bearingPadsbearing case:Pivot wearDifficulties of pivoting pads (jamming)",
    Friction:
        "Assembly irregularityRoller bearing case:Incorrect alignment of the inner ring with the outer ring.Race spill, axial sliding irregularities (in the case of a free bearing) between outer ring and housing (stick slip, wear housing?Insufficient axial preload in the case of a preloaded bearing (angular contact).Irregularities of the rolling of the bearing elements on the races (inner/outer race) due to excessive clearance related to an underload in a radial direction.Damage of a bearing element (cage / elements / races).Wear of pulleys / belts.Defective bearing between thebearing outer ring and the bore.Wear of the housingPlain bearing case:Instability due to axial excessive clearance in the case of a thrust bearing, radial in the case of the guide bearing Pads bearing case:Pivot wearDifficulties of pivoting pads (jamming)",
    "Mechanical Health":
        "Overall indication of mechanical condition of Bearings. Also Identifies if the continuation of the operation presents an aggravation of the damages evolving towards the loss of function. Then, An intervention is to be expected",
    "Global(Umbalance/Alignment/Loosness)":
        "Roller bearing case-  Without high choc indexUmbalance,misalignment Cantilever rotor umbalance Mode (bending,tilting) excitation-  With high choc index value Loosening and / or clearance at the support structure (assembly at the supports)Coupling: clearance, clamping wear (toothed coupling), axial distance not respected (coupling with flexible blades), cracking (flector) Degradation of bearingsPlain bearings case:Without high choc index Umbalance,misalignment Cantilever rotor umbalance-  With high choc index valueCoupling: clearance,clamping wear (toothed coupling), axial distance not respected (coupling with flexible blades), cracking (flector)Loosening of caps and supports",
    "Shock Index":
        "This indicator measures the presence of irregular pulses (shocks),translating a malfunction in the mechanical behavior of the component",
    "Level(RMS)":
        "This indicator gives an overall level (2Hz-1KHz) in mm /s and compared to the ISO standard 10816.",
    "Shaft/Clearance":
        "Excessive shaft displacement,Bad guiding effect:Roller bearing case :Excessive clearance in all type of bearings Excessive excentricity (static/dynamic) in the case of electric motors : electromagnetic circuit defectExcessive tipping displacement in case of vertical installations Excessive stresses causing the shaft to move with high displacement Excessive teeth mesh stresses in the case of a gearbox Plain bearing case :Clearance between bearing pad/bearing cap Excessive excentricity (static/dynamic) in the case of electric motors : electromagnetic circuit defect Excessive tipping displacement in case of vertical installations Excessive teeth mesh stresses in the case of a gearbox Excessive lubrification",
};

export function buildPngReportData(data, modelType, formData) {
    const maxRPMThrshhold = parseInt(formData.rated_rpm);
    const maxPower = parseInt(formData.power);
    let globalIndicator = [];
    let cylinder_specific_indicators = [];
    console.log(data, modelType);
    if (modelType === "Engine") {
        if (data?.MechanicalHealth && data?.MechanicalHealth.valueInHealth) {
            globalIndicator.push(
                buildIndicatorData(
                    "Engine Health",
                    data?.MechanicalHealth,
                    "valueInHealth"
                )
            );
        }
        if (data?.EngineEfficiency && data?.EngineEfficiency.valueInHealth) {
            globalIndicator.push(
                buildIndicatorData(
                    "Combustion Condition",
                    data?.EngineEfficiency,
                    "valueInHealth"
                )
            );
        }
        if (data?.ChannelSpeed) {
            globalIndicator.push(
                buildRpmData("RPM", data?.ChannelSpeed, maxRPMThrshhold)
            );
        }
        if (data?.Unbalance && data?.Unbalance.valueInHealth) {
            globalIndicator.push(
                buildIndicatorData(
                    "Performance of Mounts & Supports",
                    data?.Unbalance,
                    "valueInHealth"
                )
            );
        }
        if (data?.CamPump && data?.CamPump.valueInHealth) {
            globalIndicator.push(
                buildIndicatorData(
                    "Governor, Crank driven Accessories Health",
                    data?.CamPump,
                    "valueInHealth"
                )
            );
        }
        if (data?.Damper && data?.Damper.valueInHealth) {
            globalIndicator.push(
                buildIndicatorData(
                    "Performance of Vibration Damper",
                    data?.Damper,
                    "valueInHealth"
                )
            );
        }
        if (data?.PowerLoss && data?.PowerLoss.value) {
            globalIndicator.push(
                buildIndicatorData(
                    "Increase in Fuel Consumption",
                    data?.PowerLoss,
                    "value",
                    true
                )
            );
        }

        const moduleData = data["Engine"];
        const firingOrder = moduleData["FiringOrder"];
        const firingOrderSplit = firingOrder.length / 2;
        const first = firingOrder.slice(0, firingOrderSplit);

        const second = firingOrder.slice(first.length);
        const firingOrderLabel = formData?.firing_order.trim().split(",");
        if (data?.Compression) {
            const compression = buildCompressionData(
                first,
                second,
                data["Compression"],
                "Compression Condition",
                firingOrderLabel
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
                "Injection Condition",
                firingOrderLabel
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
                "Bearing Condition",
                firingOrderLabel
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
                "Condition of cyl moving parts",
                firingOrderLabel
            );
            if (condition_of_cyl_moving_parts) {
                cylinder_specific_indicators.push(condition_of_cyl_moving_parts);
            }
        }
        if (
            formData["fuel"] === "Hydrogen" ||
            formData["fuel"] === "Ammonia" ||
            formData["fuel"] === "Natural Gas"
        ) {
            const miss_firing = buildCompressionData(
                first,
                second,
                data["Misfiring"],
                "Misfiring",
                firingOrderLabel
            );
            if (miss_firing) {
                cylinder_specific_indicators.push(miss_firing);
            }
        }
    } else if (modelType === "Torque") {
        if (data?.Status <= 0) {
            return {
                globalIndicator,
                cylinder_specific_indicators,
            };
        }
        if (data?.StaticTorsion && data?.StaticTorsion.value) {
            globalIndicator.push(
                buildTorqueIndicatorData(
                    "Torsion(degree)",
                    data.StaticTorsion?.value || 0,
                    6
                )
            );
        }
        if (data?.StaticTorque && data?.StaticTorque.value) {
            globalIndicator.push(
                buildTorqueIndicatorData(
                    "Torque(kNm)",
                    (data.StaticTorque?.value || 0) * 0.001,
                    1000
                )
            );
        }
        if (data?.StaticPower && data?.StaticPower.value) {
            globalIndicator.push(
                buildTorqueIndicatorData(
                    "Power(MW)",
                    (data.StaticPower?.value || 0) * 1.0e-6,
                    maxPower * 1.0e-6
                )
            );
        }
        if (data?.ChannelSpeed) {
            globalIndicator.push(
                buildTorqueIndicatorData(
                    "Speed",
                    data.ChannelSpeed || 0,
                    maxRPMThrshhold
                )
            );
        }
    } else if (modelType === "Turbine") {
        if (data?.ChannelSpeed) {
            globalIndicator.push(
                buildRpmData("Speed", data?.ChannelSpeed, maxRPMThrshhold)
            );
        }
        if (data?.RegularityDeviation && data?.RegularityDeviation.valueInHealth) {
            globalIndicator.push(
                buildIndicatorData(
                    "Regularity/Deviation",
                    data?.RegularityDeviation,
                    "valueInHealth"
                )
            );
        }
        if (data?.BearingStatus && data?.BearingStatus.valueInHealth) {
            globalIndicator.push(
                buildIndicatorData(
                    "Bearing Status",
                    data?.BearingStatus,
                    "valueInHealth"
                )
            );
        }
        if (data?.BearingStatusGas && data?.BearingStatusGas.valueInHealth) {
            globalIndicator.push(
                buildIndicatorData(
                    "Bearing Status ",
                    data?.BearingStatusGas,
                    "valueInHealth"
                )
            );
        }
        if (data?.BladeStatus && data?.BladeStatus.valueInHealth) {
            globalIndicator.push(
                buildIndicatorData("Shaft Health", data?.BladeStatus, "valueInHealth")
            );
        }

        if (formData.type === "Steam") {
            if (data?.TurbineCoupling && data?.TurbineCoupling.valueInHealth) {
                globalIndicator.push(
                    buildIndicatorData("Coupling", data?.TurbineCoupling, "valueInHealth")
                );
            }
        } else {
            if (data?.CombustionKit && data?.CombustionKit.valueInHealth) {
                globalIndicator.push(
                    buildIndicatorData(
                        "Combustion Kit",
                        data?.CombustionKit,
                        "valueInHealth"
                    )
                );
            }
        }
    } else if (modelType === "Motor") {
        if (data?.MStressStability && data?.MStressStability.valueInHealth) {
            globalIndicator.push(
                buildIndicatorData("Stability", data?.MStressStability, "valueInHealth")
            );
        }
        if (data?.MBearing && data?.MBearing.valueInHealth) {
            globalIndicator.push(
                buildIndicatorData("Bearing", data?.MBearing, "valueInHealth")
            );
        }
        if (data?.ChannelSpeed) {
            globalIndicator.push(
                buildRpmData("Speed", data?.ChannelSpeed, maxRPMThrshhold)
            );
        }
        if (data?.MElectromag && data?.MElectromag.valueInHealth) {
            globalIndicator.push(
                buildIndicatorData(
                    "Electromagnetic Stress",
                    data?.MElectromag,
                    "valueInHealth"
                )
            );
        }
    } else if (modelType === "Bearing") {
        if (data["4KMixed"] && data["4KMixed"].valueInHealth) {
            globalIndicator.push(
                buildIndicatorData("Bearings", data["4KMixed"], "valueInHealth")
            );
        }
        if (data?.ChannelSpeed) {
            globalIndicator.push(
                buildRpmData("RPM", data?.ChannelSpeed, maxRPMThrshhold)
            );
        }
        if (data["8KMixed"] && data["8KMixed"].valueInHealth) {
            globalIndicator.push(
                buildIndicatorData("Friction", data["8KMixed"], "valueInHealth")
            );
        }
        //-----
        if (data?.BearingGlobal && data?.BearingGlobal.valueInHealth) {
            globalIndicator.push(
                buildIndicatorData(
                    "Mechanical Health",
                    data?.BearingGlobal,
                    "valueInHealth"
                )
            );
        }
        if (data?.GlobalMixed && data?.GlobalMixed.valueInHealth) {
            globalIndicator.push(
                buildIndicatorData(
                    "Global(Umbalance/Alignment/Loosness)",
                    data?.GlobalMixed,
                    "valueInHealth"
                )
            );
        }
        if (data?.GlobalKurto && data?.GlobalKurto.valueInHealth) {
            globalIndicator.push(
                buildIndicatorData("Shock Index", data?.GlobalKurto, "valueInHealth")
            );
        }
        if (data?.GlobalLevel && data?.GlobalLevel.valueInHealth) {
            globalIndicator.push(
                buildIndicatorData("Level(RMS)", data?.GlobalLevel, "valueInHealth")
            );
        }
        if (data["2KMixed"] && data["2KMixed"].valueInHealth) {
            globalIndicator.push(
                buildIndicatorData("Shaft/Clearance", data["2KMixed"], "valueInHealth")
            );
        }
    }

    return {
        globalIndicator,
        cylinder_specific_indicators,
    };
}
