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

  de_channel_sensorx: yup
    .string()
    .required("This is a required field")
    .test(
      "Channel Validation",
      `Error: NDE and DE channel shouldn't be same`,
      (value, context) => {
        if (value === "No Channel") {
          return true;
        } else if (value != context.parent.nde_channel_sensorx) {
          return true;
        } else {
          return false;
        }
      }
    ),
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
  nde_channel_sensorx: yup
    .string()
    .required("This is a required field")
    .test(
      "Channel Validation",
      `Error: NDE and DE channel shouldn't be same`,
      (value, context) => {
        if (value === "No Channel") {
          return true;
        } else if (value != context.parent.de_channel_sensorx) {
          return true;
        } else {
          return false;
        }
      }
    ),
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
  aux_device_id: yup
    .number()
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value: any) => value > 0 || !value || value == ""
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
      "greater than 10",
      "Min RPM should greater than 10",
      (value) => value > 10
    ),
  MaxRPMVar: yup
    .number()
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value: any) => value > 0 || !value || value == ""
    )
    .integer("The field should be an integer !"),
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
    )
    .test(
      "Recording length should be between 1 & 200s",
      "Recording length should be between 1 & 200s",
      (value) => value > 1 && value < 200
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
    .test("Is Required", "This is a required field", (value, context) => {
      if (
        context.parent.motor_crankshaft_channel_type === "Speed" &&
        value != undefined
      ) {
        return true;
      } else if (
        context.parent.motor_crankshaft_channel_type === "Speed" &&
        value == undefined
      ) {
        return false;
      } else if (
        context.parent.motor_crankshaft_channel_type === "Transducer" &&
        value == undefined
      ) {
        return true;
      } else {
        return true;
      }
    })
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value: any, context) => {
        if (
          value > 0 &&
          context.parent.turbine_crankshaft_channel_type === "Speed"
        ) {
          return true;
        } else if (
          (value > 0 || value == undefined) &&
          context.parent.turbine_crankshaft_channel_type === "Transducer"
        ) {
          return true;
        } else if (
          value < 0 &&
          context.parent.turbine_crankshaft_channel_type === "Speed"
        ) {
          return false;
        } else {
          return true;
        }
      }
    )
    .integer("The field should be an integer !"),
  motor_crankshaft_wheel_type: yup
    .string()
    .test("Is Required", "This is a required field", (value, context) => {
      if (
        context.parent.motor_crankshaft_channel_type === "Speed" &&
        value != undefined
      ) {
        return true;
      } else if (
        context.parent.motor_crankshaft_channel_type === "Speed" &&
        value == undefined
      ) {
        return false;
      } else if (
        context.parent.motor_crankshaft_channel_type === "Transducer" &&
        value == undefined
      ) {
        return true;
      } else {
        return true;
      }
    }),
  min_speed: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  MaxRPMVar: yup
    .number()
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value: any) => value > 0 || !value || value == ""
    )
    // .test(
    //   "less than 0.05",
    //   "Min Volt must be less than or equal to 0.05",
    //   (value) => value <= 0.05
    // ),
    .integer("The field should be an integer !"),
  aux_device_id: yup
    .number()
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value: any) => value > 0 || !value || value == ""
    ),
  recording_period: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0 || !value
    ),
  recording_length: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    )
    .test(
      "Recording length should be between 1 & 200s",
      "Recording length should be between 1 & 200s",
      (value) => value > 1 && value < 200
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
    .test("Is Required", "This is a required field", (value, context) => {
      if (
        context.parent.turbine_crankshaft_channel_type === "Speed" &&
        value != undefined
      ) {
        return true;
      } else if (
        context.parent.turbine_crankshaft_channel_type === "Speed" &&
        value == undefined
      ) {
        return false;
      } else if (
        context.parent.turbine_crankshaft_channel_type === "Transducer" &&
        value == undefined
      ) {
        return true;
      } else {
        return true;
      }
    })
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value: any, context) => {
        if (
          value > 0 &&
          context.parent.turbine_crankshaft_channel_type === "Speed"
        ) {
          return true;
        } else if (
          (value > 0 || value == undefined) &&
          context.parent.turbine_crankshaft_channel_type === "Transducer"
        ) {
          return true;
        } else if (
          value < 0 &&
          context.parent.turbine_crankshaft_channel_type === "Speed"
        ) {
          return false;
        } else {
          return true;
        }
      }
    )
    .integer("The field should be an integer !"),
  turbine_crankshaft_wheel_type: yup
    .string()
    .test("Is Required", "This is a required field", (value, context) => {
      if (
        context.parent.turbine_crankshaft_channel_type === "Speed" &&
        value != undefined
      ) {
        return true;
      } else if (
        context.parent.turbine_crankshaft_channel_type === "Speed" &&
        value == undefined
      ) {
        return false;
      } else if (
        context.parent.turbine_crankshaft_channel_type === "Transducer" &&
        value == undefined
      ) {
        return true;
      } else {
        return true;
      }
    }),
  min_speed: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    )
    .test(
      "greater than 10",
      "Min RPM should greater than 10",
      (value) => value > 10
    ),
  aux_device_id: yup
    .number()
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value: any) => value > 0 || !value || value == ""
    ),
  MaxRPMVar: yup
    .number()
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value: any) => value > 0 || !value || value == ""
    )
    // .test(
    //   "less than 0.05",
    //   "Min Volt must be less than or equal to 0.05",
    //   (value) => value <= 0.05
    // ),
    .integer("The field should be an integer !"),
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
    )
    .test(
      "Recording length should be between 1 & 200s",
      "Recording length should be between 1 & 200s",
      (value) => value > 1 && value < 200
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
    .test("Is Required", "This is a required field", (value, context) => {
      if (
        context.parent.bearing_crankshaft_channel_type === "Speed" &&
        value != undefined
      ) {
        return true;
      } else if (
        context.parent.bearing_crankshaft_channel_type === "Speed" &&
        value == undefined
      ) {
        return false;
      } else if (
        context.parent.bearing_crankshaft_channel_type === "Transducer" &&
        value == undefined
      ) {
        return true;
      } else {
        return true;
      }
    })
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value: any, context) => {
        if (
          value > 0 &&
          context.parent.turbine_crankshaft_channel_type === "Speed"
        ) {
          return true;
        } else if (
          (value > 0 || value == undefined) &&
          context.parent.turbine_crankshaft_channel_type === "Transducer"
        ) {
          return true;
        } else if (
          value < 0 &&
          context.parent.turbine_crankshaft_channel_type === "Speed"
        ) {
          return false;
        } else {
          return true;
        }
      }
    )
    .integer("The field should be an integer !"),
  bearing_crankshaft_wheel_type: yup
    .string()
    .test("Is Required", "This is a required field", (value, context) => {
      if (
        context.parent.bearing_crankshaft_channel_type === "Speed" &&
        value != undefined
      ) {
        return true;
      } else if (
        context.parent.bearing_crankshaft_channel_type === "Speed" &&
        value == undefined
      ) {
        return false;
      } else if (
        context.parent.bearing_crankshaft_channel_type === "Transducer" &&
        value == undefined
      ) {
        return true;
      } else {
        return true;
      }
    }),
  min_speed: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    )
    .test(
      "greater than 10",
      "Min RPM should greater than 10",
      (value) => value > 10
    ),
  aux_device_id: yup
    .number()
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value: any) => value > 0 || !value || value == ""
    ),
  MaxRPMVar: yup
    .number()
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value: any) => value > 0 || !value || value == ""
    )
    // .test(
    //   "less than 0.05",
    //   "Min Volt must be less than or equal to 0.005",
    //   (value) => value <= 0.005
    // ),
    .integer("The field should be an integer !"),
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
    )
    .test(
      "Recording length should be between 1 & 200s",
      "Recording length should be between 1 & 200s",
      (value) => value > 1 && value < 200
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
        if (context.parent.CamShaft_SENSORx === "No Channel") {
          return true;
        }
        return value !== null && value !== undefined;
      }
    ),
  CamShaft_Teeth: yup
    .number()
    .test(
      "is Required ?",
      "Error: Required Field if channel selected",
      (value: any, context) => {
        if (context.parent.CamShaft_SENSORx === "No Channel") {
          return true;
        }
        return value !== null && value !== undefined;
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
        if (context.parent.CamShaft_SENSORx === "No Channel") {
          return true;
        }
        return value !== null && value !== undefined;
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
        if (context.parent.TDC_SENSORx === "No Channel") {
          return true;
        }
        return value !== null && value !== undefined;
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
        if (context.parent.TDC_SENSORx === "No Channel") {
          return true;
        }
        return value !== null && value !== undefined;
      }
    )
    .integer("The field should be an integer !"),
  TDC_WheelType: yup
    .string()
    .test(
      "is Required ?",
      "Error: Required Field if channel selected",
      (value: any, context) => {
        if (context.parent.TDC_SENSORx === "No Channel") {
          return true;
        }
        return value !== null && value !== undefined;
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
        if (context.parent.Peak_Pressure_SENSORx === "No Channel") {
          return true;
        }
        return value !== null && value !== undefined;
      }
    ),
  Peak_Pressure_Teeth: yup
    .number()
    .test(
      "is Required ?",
      "Error: Required Field if channel selected",
      (value: any, context) => {
        if (context.parent.Peak_Pressure_SENSORx === "No Channel") {
          return true;
        }
        return value !== null && value !== undefined;
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
        if (context.parent.Peak_Pressure_SENSORx === "No Channel") {
          return true;
        }
        return value !== null && value !== undefined;
      }
    ),
  peak_pressure_transducer_sensitivity: yup
    .number()
    .test(
      "is Required ?",
      "Error: Required Field if channel selected",
      (value: any, context) => {
        if (context.parent.Peak_Pressure_SENSORx === "No Channel") {
          return true;
        }
        return value !== null && value !== undefined;
      }
    )
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value: any, context) => {
        if (context.parent.Peak_Pressure_SENSORx === "No Channel") {
          return true;
        }
        return value > 0;
      }
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
  aux_device_id: yup
    .number()
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value: any) => value > 0 || !value || value == ""
    ),
  no_of_strokes: yup.string().required("This is a required field"),
  max_pressure: yup
    .number()
    .test(
      "Is positive?",
      "ERROR: The number must be in whole number and greater than equal to 0!",

      (value: any) => value >= 0 || value === undefined || value?.length === 0
    )
    .test(
      "Check pressure field is present!",
      "Peak Pressure Channel is selected, this is a compulsory field",
      (value: any, context) => {
        if (
          context.parent.Peak_Pressure_SENSORx === "No Channel" &&
          (value == 0 || value === undefined || value?.length === 0)
        ) {
          return true;
        } else if (
          context.parent.Peak_Pressure_SENSORx !== "No Channel" &&
          (value == 0 || value === undefined || value?.length === 0)
        ) {
          return false;
        } else {
          return true;
        }
      }
    ),
  no_of_cylinders: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be in whole number and greater than 0!",

      (value) => value > 0
    )
    .integer("The field should be an integer !"),
  firing_order: yup
    .string()
    .required("This is a required field")
    .test(
      "Firing Order Maximum Count",
      "Error: No Of Cylinders is not matching the count of firing order and negative values not allowed and blank value not allowed",
      (value, context) =>
        value.trim().split(",").length === context.parent.no_of_cylinders &&
        !value
          .trim()
          .split(",")
          .some((item) => Number(item) < 0) &&
        !value
          .trim()
          .split(",")
          .some((item) => item.trim() === "")
    )
    .test(
      "Firing Order duplicated values",
      "Error: some values in the firing order are duplicated!",
      (value) => {
        const firing_order = value.trim().split(",");
        const countObeject = firing_order.reduce((init: any, prev) => {
          if (Object.keys(init).includes(prev)) {
            return { ...init, [prev]: init[prev] + 1 };
          }
          return {
            ...init,
            [prev]: 1,
          };
        }, {});
        return !Object.values(countObeject).some((item) => Number(item) > 1);
      }
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
    )
    .test(
      "greater than 10",
      "Min RPM should greater than 10",
      (value) => value > 10
    ),
  MaxRPMVar: yup
    .number()
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value: any) => value > 0 || !value || value == ""
    )
    // .test(
    //   "less than 0.05",
    //   "Min Volt must be less than or equal to 0.05",
    //   (value) => value <= 0.05
    // ),
    .integer("The field should be an integer !"),
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
    )
    .test(
      "Recording length should be between 1 & 200s",
      "Recording length should be between 1 & 200s",
      (value) => value > 1 && value < 200
    ),
  vessel_type: yup.string().required("This is a required field"),
  engine_history: yup.string().required("This is a required field"),
  running_hours: yup.string().required("This is a required field"),
});
