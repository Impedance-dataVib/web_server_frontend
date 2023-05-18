export const bearingStepperValidationSchemaGroups = {
  "Asset Information": ["asset_name", "equipment_name", "sampling_rate"],
  "Channel Information": [
    "bearing_crankshaft_sensorx",
    "bearing_crankshaft_channel_type",
    "bearing_crankshaft_teeth",
    "bearing_crankshaft_wheel_type",
  ],
  "Diagnostic Details": [
    "min_speed",
    "min_volt",
    "recording_period",
    "recording_length",
  ],
  "Machine Details": ["name", "rated_rpm"],
};
export const engineStepperValidationSchemaGroups = {
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
    
  ],
  "Diagnostic Details": [],
};
export const torqueStepperValidationSchemaGroups = {
  "Asset Information": ["asset_name", "equipment_name", "sampling_rate"],
  "Channel Information": [],
  "Diagnostic Details": [],
  "Machine Details": [],
};
export const turbineStepperValidationSchemaGroups = {
  "Asset Information": ["asset_name", "equipment_name", "sampling_rate"],
  "Channel Information": [],
  "Diagnostic Details": [],
  "Machine Details": [],
};
export const motorStepperValidationSchemaGroups = {
  "Asset Information": ["asset_name", "equipment_name", "sampling_rate"],
  "Channel Information": [],
  "Diagnostic Details": [],
  "Machine Details": [],
};
