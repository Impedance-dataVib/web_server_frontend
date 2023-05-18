import * as yup from "yup";
export const torqueValidationSchema = yup.object({
  de_channel_sensorx: yup.string().required("This is a required field"),
  de_channel_channel_type: yup.string().required("This is a required field"),
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
  de_channel_wheel_type: yup.string().required("This is a required field"),
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
    .integer("The field should be an integer !"),
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
    .integer("The field should be an integer !"),
});

export const turbineValidationSchema = yup.object({
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
    .integer("The field should be an integer !"),
});

export const bearingValidationSchema = yup.object({
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
    .integer("The field should be an integer !"),
});
export const engineValidationSchema = yup.object({
  Crankshaft_SENSORx: yup.string().required("This is a required field"),
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
  CamShaft_SENSORx: yup.string().required("This is a required field"),
  CamShaft_ChannelType: yup.string().required("This is a required field"),
  CamShaft_Teeth: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  CamShaft_WheelType: yup.string().required("This is a required field"),
  TDC_SENSORx: yup.string().required("This is a required field"),
  TDC_ChannelType: yup.string().required("This is a required field"),
  TDC_Teeth: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    )
    .integer("The field should be an integer !"),
  TDC_WheelType: yup.string().required("This is a required field"),
  Peak_Pressure_SENSORx: yup.string().required("This is a required field"),
  Peak_Pressure_ChannelType: yup.string().required("This is a required field"),
  Peak_Pressure_Teeth: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  Peak_Pressure_WheelType: yup.string().required("This is a required field"),
  peak_pressure_transducer_sensitivity: yup
    .number()
    .required("This is a required field")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
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
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  firing_order: yup.string().required("This is a required field"),
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
});
