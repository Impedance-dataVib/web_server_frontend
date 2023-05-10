import * as yup from "yup";
export const torqueValidationSchema = yup.object({
  de_channel_sensorx: yup.string().required("This is a required field"),
  de_channel_channel_type: yup.string().required("This is a required field"),
  de_channel__teeth: yup.number().required("This is a required field"),
  de_channel_wheel_type: yup.string().required("This is a required field"),
  nde_channel_sensorx: yup.string().required("This is a required field"),
  nde_channel_channel_type: yup.string().required("This is a required field"),
  nde_channel_teeth: yup.number().required("This is a required field"),
  nde_channel_wheel_type: yup.string().required("This is a required field"),
  min_speed: yup.number().required("This is a required field"),
  min_volt: yup.number().required(),
  recording_period: yup.number().required("This is a required field"),
  recording_length: yup.number().required("This is a required field"),
  name: yup.string().required("This is a required field"),
  rated_rpm: yup.number().required("This is a required field"),
  zero_degree: yup.number().required("This is a required field"),
  rigidity: yup.number().required("This is a required field"),
  power: yup.number().required("This is a required field"),
});
export const motorValidationSchema = yup.object({
  motor_crankshaft_sensorx: yup.string().required("This is a required field"),
  motor_crankshaft_channel_type: yup
    .string()
    .required("This is a required field"),
  motor_crankshaft_teeth: yup.number().required("This is a required field"),
  motor_crankshaft_wheel_type: yup
    .string()
    .required("This is a required field"),
  min_speed: yup.number().required("This is a required field"),
  min_volt: yup.number().required("This is a required field"),
  recording_period: yup.number().required("This is a required field"),
  recording_length: yup.number().required("This is a required field"),
  name: yup.string().required("This is a required field"),
  rated_rpm: yup.number().required("This is a required field"),
});
