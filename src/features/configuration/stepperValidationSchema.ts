export const bearingStepperValidationSchemaGroups: any = {
  "Asset Information": ["asset_name", "equipment_name", "sampling_rate"],
  "Channel Information": [
    "bearing_crankshaft_sensorx",
    "bearing_crankshaft_channel_type",
    "bearing_crankshaft_teeth",
    "bearing_crankshaft_wheel_type",
  ],
  "Diagnostic Details": [
    "min_speed",
    "MaxRPMVar",
    "recording_period",
    "recording_length",
  ],
  "Machine Details": ["name", "rated_rpm"],
};
export const engineStepperValidationSchemaGroups: any = {
  "Asset Information": ["asset_name", "equipment_name", "sampling_rate"],
  "Channel Information": [
    "Crankshaft_SENSORx",
    "Crankshaft_ChannelType",
    "Crankshaft_Teeth",
    "Crankshaft_WheelType",
    "CamShaft_SENSORx",
    "CamShaft_ChannelType",
    "CamShaft_Teeth",
    "CamShaft_WheelType",
    "TDC_SENSORx",
    "TDC_ChannelType",
    "TDC_Teeth",
    "TDC_WheelType",
    "Peak_Pressure_SENSORx",
    "Peak_Pressure_ChannelType",
    "Peak_Pressure_Teeth",
    "Peak_Pressure_WheelType",
    "peak_pressure_transducer_sensitivity",
  ],
  "Engine Details": [
    "name",
    "serial_number",
    "make_model",
    "rated_rpm",
    "application",
    "fuel",
    "type",
    "no_of_strokes",
    "no_of_cylinders",
    "firing_order",
    "phase_shift_mode",
    "shift_angle",
    "power",
    "running_hours",
    "engine_history",
    "vessel_type",
  ],
  "Diagnostic Details": [
    "min_speed",
    "MaxRPMVar",
    "recording_period",
    "recording_length",
  ],
};
export const torqueStepperValidationSchemaGroups: any = {
  "Asset Information": ["asset_name", "equipment_name", "sampling_rate"],
  "Channel Information": [
    "de_channel_sensorx",
    "de_channel_channel_type",
    "de_channel__teeth",
    "de_channel_wheel_type",
    "nde_channel_sensorx",
    "nde_channel_channel_type",
    "nde_channel_teeth",
    "nde_channel_wheel_type",
  ],
  "Diagnostic Details": [
    "min_speed",
    "MaxRPMVar",
    "recording_period",
    "recording_length",
    "zero_degree",
    "rigidity",
    "power",
  ],
  "Machine Details": ["name", "rated_rpm", "vessel_type"],
};
export const motorStepperValidationSchemaGroups: any = {
  "Asset Information": ["asset_name", "equipment_name", "sampling_rate"],
  "Channel Information": [
    "motor_crankshaft_sensorx",
    "motor_crankshaft_channel_type",
    "motor_crankshaft_teeth",
    "motor_crankshaft_wheel_type",
  ],
  "Diagnostic Details": [
    "min_speed",
    "MaxRPMVar",
    "recording_period",
    "recording_length",
  ],
  "Machine Details": ["name", "rated_rpm"],
};
export const turbineStepperValidationSchemaGroups: any = {
  "Asset Information": ["asset_name", "equipment_name", "sampling_rate"],
  "Channel Information": [
    "turbine_crankshaft_sensorx",
    "turbine_crankshaft_channel_type",
    "turbine_crankshaft_teeth",
    "turbine_crankshaft_wheel_type",
  ],
  "Diagnostic Details": [
    "min_speed",
    "MaxRPMVar",
    "recording_period",
    "recording_length",
  ],
  "Machine Details": ["name", "rated_rpm", "type"],
};
