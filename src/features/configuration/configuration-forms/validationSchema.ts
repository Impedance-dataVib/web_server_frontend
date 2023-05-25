import * as yup from "yup";
export const torqueValidationSchema = yup.object({
  asset_name: yup.string().required("This is a required field"),
  equipment_name: yup
    .string()
    .required("This is a required field")
    .notOneOf(
      [yup.ref("asset_name"), null],
      "should not match with Asset name!"
    ),

  de_channel_sensorx: yup.string().required("This is a required field"),
  de_channel_channel_type: yup
    .string()
    .test(
      "Channel Type Same",
      "Field should be same for DE and NDE",
      (value, context) => value === context.parent.nde_channel_channel_type
    )
    .required("This is a required field"),
  de_channel__teeth: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    )
    .test(
      "no of teeth should be same?",
      "The no of teeth for both channels DE & NDE must be same.",
      (value, testConetext) => testConetext.parent.nde_channel_teeth === value
    )
    .integer("The field should be an integer !"),
  de_channel_wheel_type: yup
    .string()
    .required("This is a required field")
    .test(
      "Field Should Be Same",
      "Field should be same for DE and NDE",
      (value, context) => value === context.parent.nde_channel_wheel_type
    ),
  nde_channel_sensorx: yup.string().required("This is a required field"),
  nde_channel_channel_type: yup.string().required("This is a required field"),
  nde_channel_teeth: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    )
    .test(
      "no of teeth should be same?",
      "The no of teeth for both channels DE & NDE must be same.",
      (value, testConetext) => testConetext.parent.de_channel__teeth === value
    )
    .integer("The field should be an integer !"),

  nde_channel_wheel_type: yup.string().required("This is a required field"),
  min_speed: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  min_volt: yup
    .number()
    .required()
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  recording_period: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  recording_length: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  name: yup.string().required("This is a required field"),
  rated_rpm: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    )
    .integer("The field should be an integer !")
    .test(
      "is minRPM less than ratedRPM",
      "Error: minRPM must always be less than the rated RPM",
      (value, context) => value > context.parent.min_speed
    ),
  zero_degree: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  rigidity: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  power: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  vessel_type: yup.string().required("This is a required field"),
});
export const motorValidationSchema = yup.object({
  asset_name: yup.string().required("This is a required field"),
  equipment_name: yup
    .string()
    .required("This is a required field")
    .notOneOf(
      [yup.ref("asset_name"), null],
      "should not match with Asset name!"
    ),

  motor_crankshaft_sensorx: yup.string().required("This is a required field"),
  motor_crankshaft_channel_type: yup
    .string()
    .required("This is a required field"),
  motor_crankshaft_teeth: yup
    .number()
    .integer("The field should be an integer !")
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  motor_crankshaft_wheel_type: yup
    .string()
    .required("This is a required field"),
  min_speed: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  min_volt: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  recording_period: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  recording_length: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  name: yup.string().required("This is a required field"),
  rated_rpm: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    )
    .integer("The field should be an integer !")
    .test(
      "is minRPM less than ratedRPM",
      "Error: minRPM must always be less than the rated RPM",
      (value, context) => value > context.parent.min_speed
    ),
});

export const turbineValidationSchema = yup.object({
  asset_name: yup.string().required("This is a required field"),
  equipment_name: yup
    .string()
    .required("This is a required field")
    .notOneOf(
      [yup.ref("asset_name"), null],
      "should not match with Asset name!"
    ),

  turbine_crankshaft_sensorx: yup.string().required("This is a required field"),
  turbine_crankshaft_channel_type: yup
    .string()
    .required("This is a required field"),
  turbine_crankshaft_teeth: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    )
    .integer("The field should be an integer !"),
  turbine_crankshaft_wheel_type: yup
    .string()
    .required("This is a required field"),
  min_speed: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  min_volt: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  recording_period: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  recording_length: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  name: yup.string().required("This is a required field"),
  rated_rpm: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    )
    .integer("The field should be an integer !")
    .test(
      "is minRPM less than ratedRPM",
      "Error: minRPM must always be less than the rated RPM",
      (value, context) => value > context.parent.min_speed
    ),
});

export const bearingValidationSchema = yup.object({
  asset_name: yup.string().required("This is a required field"),
  equipment_name: yup
    .string()
    .required("This is a required field")
    .notOneOf(
      [yup.ref("asset_name"), null],
      "should not match with Asset name!"
    ),

  bearing_crankshaft_sensorx: yup.string().required("This is a required field"),
  bearing_crankshaft_channel_type: yup
    .string()
    .required("This is a required field"),
  bearing_crankshaft_teeth: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    )
    .integer("The field should be an integer !"),
  bearing_crankshaft_wheel_type: yup
    .string()
    .required("This is a required field"),
  min_speed: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  min_volt: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  recording_period: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  recording_length: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  name: yup.string().required("This is a required field"),
  rated_rpm: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    )
    .integer("The field should be an integer !")
    .test(
      "is minRPM less than ratedRPM",
      "Error: minRPM must always be less than the rated RPM",
      (value, context) => value > context.parent.min_speed
    ),
});
export const engineValidationSchema = yup.object({
  asset_name: yup.string().required("This is a required field"),
  equipment_name: yup
    .string()
    .required("This is a required field")
    .notOneOf(
      [yup.ref("asset_name"), null],
      "should not match with Asset name!"
    ),

  Crankshaft_SENSORx: yup
    .string()
    .required("This is a required field")
    .test(
      "Channel Validation",
      `Error: Crank, CAM, TDC, Peak pressure channel shouldn't be same`,
      (value, context) => {
        if (value === "No Channel") {
          return true;
        } else if (
          value != context.parent.TDC_SENSORx &&
          value != context.parent.Peak_Pressure_SENSORx &&
          value != context.parent.CamShaft_SENSORx
        ) {
          return true;
        } else {
          return false;
        }
      }
    ),
  Crankshaft_ChannelType: yup.string().required("This is a required field"),
  Crankshaft_Teeth: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    )
    .integer("The field should be an integer !"),
  Crankshaft_WheelType: yup.string().required("This is a required field"),
  CamShaft_SENSORx: yup
    .string()

    .test(
      "Optional Fields",
      "ERROR: CAM,TDC, Peak pressure at time only one can be selected",
      (value, context) => {
        if (
          value !== "No Channel" &&
          (context.parent.TDC_SENSORx !== "No Channel" ||
            context.parent.Peak_Pressure_SENSORx !== "No Channel")
        ) {
          return false;
        } else if (value === "No Channel") {
          return true;
        } else {
          return true;
        }
      }
    ),
  CamShaft_ChannelType: yup
    .string()
    .test(
      "is Required ?",
      "Error: Required Field if channel selected",
      (value: any, context) => {
        if (
          context.parent.CamShaft_SENSORx === "No Channel" ||
          value?.toString().trim().length > 0
        ) {
          return true;
        } else if (
          context.parent.CamShaft_SENSORx !== "No Channel" &&
          value?.toString().trim().length === 0
        ) {
          return false;
        }
      }
    ),
  CamShaft_Teeth: yup
    .number()
    .test(
      "is Required ?",
      "Error: Required Field if channel selected",
      (value: any, context) => {
        if (
          context.parent.CamShaft_SENSORx === "No Channel" ||
          value?.toString().trim().length > 0
        ) {
          return true;
        } else if (
          context.parent.CamShaft_SENSORx !== "No Channel" &&
          value?.toString().trim().length === 0
        ) {
          return false;
        }
      }
    )
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value: any, context) =>
        value > 0 || context.parent.CamShaft_SENSORx === "No Channel"
    ),
  CamShaft_WheelType: yup
    .string()
    .test(
      "is Required ?",
      "Error: Required Field if channel selected",
      (value: any, context) => {
        if (
          context.parent.CamShaft_SENSORx === "No Channel" ||
          value?.toString().trim().length > 0
        ) {
          return true;
        } else if (
          context.parent.CamShaft_SENSORx !== "No Channel" &&
          value?.toString().trim().length === 0
        ) {
          return false;
        }
      }
    ),
  TDC_SENSORx: yup
    .string()

    .test(
      "Optional Fields",
      "ERROR: CAM,TDC, Peak pressure at time only one can be selected",
      (value, context) => {
        if (
          value !== "No Channel" &&
          (context.parent.CamShaft_SENSORx !== "No Channel" ||
            context.parent.Peak_Pressure_SENSORx !== "No Channel")
        ) {
          return false;
        } else if (value === "No Channel") {
          return true;
        } else {
          return true;
        }
      }
    ),
  TDC_ChannelType: yup
    .string()
    .test(
      "is Required ?",
      "Error: Required Field if channel selected",
      (value: any, context) => {
        if (
          context.parent.TDC_SENSORx === "No Channel" ||
          value?.toString().trim().length > 0
        ) {
          return true;
        } else if (
          context.parent.TDC_SENSORx !== "No Channel" &&
          value?.toString().trim().length === 0
        ) {
          return false;
        }
      }
    ),
  TDC_Teeth: yup
    .number()
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value: any, context) =>
        value > 0 || context.parent.TDC_SENSORx === "No Channel"
    )
    .test(
      "is Required ?",
      "Error: Required Field if channel selected",
      (value: any, context) => {
        if (
          context.parent.TDC_SENSORx === "No Channel" ||
          value?.toString().trim().length > 0
        ) {
          return true;
        } else if (
          context.parent.TDC_SENSORx !== "No Channel" &&
          value?.toString().trim().length === 0
        ) {
          return false;
        }
      }
    ),
  TDC_WheelType: yup
    .string()
    .test(
      "is Required ?",
      "Error: Required Field if channel selected",
      (value: any, context) => {
        if (
          context.parent.TDC_SENSORx === "No Channel" ||
          value?.toString().trim().length > 0
        ) {
          return true;
        } else if (
          context.parent.TDC_SENSORx !== "No Channel" &&
          value?.toString().trim().length === 0
        ) {
          return false;
        }
      }
    ),
  Peak_Pressure_SENSORx: yup
    .string()

    .test(
      "Optional Fields",
      "ERROR: CAM,TDC, Peak pressure at time only one can be selected",
      (value, context) => {
        if (
          value !== "No Channel" &&
          (context.parent.CamShaft_SENSORx !== "No Channel" ||
            context.parent.TDC_SENSORx !== "No Channel")
        ) {
          return false;
        } else if (value === "No Channel") {
          return true;
        } else {
          return true;
        }
      }
    ),
  Peak_Pressure_ChannelType: yup
    .string()
    .test(
      "is Required ?",
      "Error: Required Field if channel selected",
      (value: any, context) => {
        if (
          context.parent.Peak_Pressure_SENSORx === "No Channel" ||
          value?.toString().trim().length > 0
        ) {
          return true;
        } else if (
          context.parent.Peak_Pressure_SENSORx !== "No Channel" &&
          value?.toString().trim().length === 0
        ) {
          return false;
        }
      }
    ),
  Peak_Pressure_Teeth: yup
    .number()
    .test(
      "is Required ?",
      "Error: Required Field if channel selected",
      (value: any, context) => {
        if (
          context.parent.Peak_Pressure_SENSORx === "No Channel" ||
          value?.toString().trim().length > 0
        ) {
          return true;
        } else if (
          context.parent.Peak_Pressure_SENSORx !== "No Channel" &&
          value?.toString().trim().length === 0
        ) {
          return false;
        }
      }
    )
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value: any, context) =>
        value > 0 || context.parent.Peak_Pressure_SENSORx === "No Channel"
    ),
  Peak_Pressure_WheelType: yup
    .string()
    .test(
      "is Required ?",
      "Error: Required Field if channel selected",
      (value: any, context) => {
        if (
          context.parent.Peak_Pressure_SENSORx === "No Channel" ||
          value?.toString().trim().length > 0
        ) {
          return true;
        } else if (
          context.parent.Peak_Pressure_SENSORx !== "No Channel" &&
          value?.toString().trim().length === 0
        ) {
          return false;
        }
      }
    ),
  peak_pressure_transducer_sensitivity: yup
    .number()
    .test(
      "is Required ?",
      "Error: Required Field if channel selected",
      (value: any, context) => {
        if (
          context.parent.Peak_Pressure_SENSORx === "No Channel" ||
          value?.toString().trim().length > 0
        ) {
          return true;
        } else if (
          context.parent.Peak_Pressure_SENSORx !== "No Channel" &&
          value?.toString().trim().length === 0
        ) {
          return false;
        }
      }
    )
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value: any) => value > 0
    ),
  name: yup.string().required("This is a required field"),
  serial_number: yup.string().required("This is a required field"),
  make_model: yup.string().required("This is a required field"),
  rated_rpm: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    )
    .integer("The field should be an integer !"),
  application: yup.string().required("This is a required field"),
  fuel: yup.string().required("This is a required field"),
  type: yup.string().required("This is a required field"),
  no_of_strokes: yup.string().required("This is a required field"),
  no_of_cylinders: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be in whole number and greater than 0!",

      (value) => value !== 0 && value - Math.floor(value) === 0
    ),
  firing_order: yup
    .string()
    .required("This is a required field")
    .test(
      "Firing Order Maximum Count",
      "Error: No Of Cylinders is not matching the count of firing order",
      (value, context) =>
        value.trim().split(",").length === context.parent.no_of_cylinders
    ),
  phase_shift_mode: yup.string().required("This is a required field"),
  shift_angle: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  power: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  min_speed: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    )
    .test(
      "is minRPM less than ratedRPM",
      "Error: minRPM must always be less than the rated RPM",
      (value, context) => value < context.parent.rated_rpm
    ),
  min_volt: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  recording_period: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  recording_length: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  vessel_type: yup.string().required("This is a required field"),
  engine_history: yup.string().required("This is a required field"),
  running_hours: yup.string().required("This is a required field"),
});
