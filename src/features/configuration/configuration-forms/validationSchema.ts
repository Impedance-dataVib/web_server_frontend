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
    ),
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
    ),
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
});
export const motorValidationSchema = yup.object({
  motor_crankshaft_sensorx: yup.string().required("This is a required field"),
  motor_crankshaft_channel_type: yup
    .string()
    .required("This is a required field"),
  motor_crankshaft_teeth: yup
    .number()
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
    ),
});
