const formSchema = {
  Engine: {
    "Channel Information": [
      {
        name: "Crankshaft (ChannelNum)",
        group: "yes",
        children: [
          {
            name: "SENSORx",
            type: "dropdown",
            options: [
              "Ch1",
              "Ch2",
              "Ch3",
              "Ch4",
              "Ch5",
              "CH6",
              "CH7",
              "CH8",
              "No Channel",
            ],
          },
          {
            name: "ChannelType Teeth(",
            type: "dropdown",
            options: ["Speed", "Transducer"],
          },
          {
            name: "Teeth",
            type: "text",
          },
          {
            name: "Wheel Type",
            type: "dropdown",
            options: [
              "Standard",
              "1 Missing Tooth",
              "1 Missing + 1 Junction",
              "1 Missing + 2 Junction",
              "1 Missing + 3 Junctions",
              "1 Junction",
              "2 Junctions",
              "3 Junctions",
              "Noisy",
              "Optical",
              "Odd",
            ],
          },
        ],
      },
      {
        name: "CamShaft (CamChan)",
        group: "yes",
        children: [
          {
            name: "SENSORx",
            type: "dropdown",
            options: ["Ch1", "Ch2", "Ch3", "Ch4", "Ch5", "No Channel"],
          },
          {
            name: "ChannelType Teeth(",
            type: "dropdown",
            options: ["Speed", "Transducer"],
          },
          {
            name: "Teeth",
            type: "dropdown",
            options: [0.5],
          },
          {
            name: "Wheel Type",
            type: "dropdown",
            options: [
              "Standard",
              "1 Missing Tooth",
              "1 Missing + 1 Junction",
              "1 Missing + 2 Junction",
              "1 Missing + 3 Junctions",
              "1 Junction",
              "2 Junctions",
              "3 Junctions",
              "Noisy",
              "Optical",
              "Odd",
            ],
          },
        ],
      },
      {
        name: "TDC(OtChan)",
        group: "yes",
        children: [
          {
            name: "SENSORx",
            type: "dropdown",
            options: ["Ch1", "Ch2", "Ch3", "Ch4", "Ch5", "No Channel"],
          },
          {
            name: "ChannelType Teeth(",
            type: "dropdown",
            options: ["Speed", "Transducer"],
          },
          {
            name: "Teeth",
            type: "text",
          },
          {
            name: "Wheel Type",
            type: "dropdown",
            options: [
              "Standard",
              "1 Missing Tooth",
              "1 Missing + 1 Junction",
              "1 Missing + 2 Junction",
              "1 Missing + 3 Junctions",
              "1 Junction",
              "2 Junctions",
              "3 Junctions",
              "Noisy",
              "Optical",
              "Odd",
            ],
          },
        ],
      },
      {
        name: "Peak Pressure",
        group: "yes",
        children: [
          {
            name: "SENSORx",
            type: "dropdown",
            options: ["Ch1", "Ch2", "Ch3", "Ch4", "Ch5", "No Channel"],
          },
          {
            name: "ChannelType Teeth(",
            type: "dropdown",
            options: ["Speed", "Transducer"],
          },
          {
            name: "Teeth",
            type: "text",
          },
          {
            name: "Wheel Type",
            type: "dropdown",
            options: [
              "Standard",
              "1 Missing Tooth",
              "1 Missing + 1 Junction",
              "1 Missing + 2 Junction",
              "1 Missing + 3 Junctions",
              "1 Junction",
              "2 Junctions",
              "3 Junctions",
              "Noisy",
              "Optical",
              "Odd",
            ],
          },
        ],
      },
    ],
    "Engine Details": [
      {
        name: "Name",
        label: "name",
        type: "text",
      },
      {
        name: "Serial Number",
        label: "serial_number",
        type: "text",
      },
      {
        name: "Make & Model",
        label: "make_model",
        type: "text",
      },
      {
        name: "Rated RPM",
        label: "rated_rpm",
        type: "text",
      },
      {
        name: "Application",
        label: "application",
        type: "dropdown",
        options: [
          "Prime Mover",
          "Main Engine",
          "Auxiliary DG",
          "Stationary Gensets",
        ],
      },
      {
        name: "Fuel",
        label: "fuel",
        type: "dropdown",
        options: ["Diesel", "Gas"],
      },
      {
        name: "Type",
        label: "type",
        type: "dropdown",
        options: ["Inline", "V"],
      },
      {
        name: "No of strokes",
        label: "no_of_strokes",
        type: "dropdown",
        options: ["2-stroke", "4-stroke"],
      },
      {
        name: "No of Cylinders",
        label: "no_of_cylinders",
        type: "text",
      },
      {
        name: "Firing Order",
        label: "firing_order",
        type: "dropdown",
        options: [1, 9, 3, 11, 2, 10, 5, 12, 8, 16, 6, 14, 7, 15, 4, 13],
      },
      {
        name: "Phase Shift Mode",
        label: "phase_shift_mode",
        type: "dropdown",
        options: ["Manual", "Auto"],
      },
      {
        name: "Shift Angle",
        label: "shift_angle",
        type: "text",
      },
      {
        name: "Power",
        label: "power",
        type: "text",
      },
    ],
    "Diagnostic Details": [
      {
        name: "Min Speed(minRPM)",
        label: "min_speed",
        type: "text",
      },
      {
        name: "MinVolt(LevelMin)",
        label: "min_volt",
        type: "text",
      },
      {
        name: "Recording Period ",
        label: "recording_period",
        type: "text",
      },
      {
        name: "Recording Length",
        label: "recording_length",
        type: "text",
      },
    ],
    "Advanced Parameters": [
      {
        name: "overwrite",
        label: "over_write",
        type: "toggle",
      },
      {
        name: "overwriteType",
        label: "over_writeType",
        type: "toggle",
      },
      {
        name: "overwriteMin",
        label: "over_writeMin",
        type: "toggle",
      },
      {
        name: "overwriteMedian",
        label: "over_writeMedian",
        type: "toggle",
      },
      {
        name: "overwriteMiddle",
        label: "over_writeMiddle",
        type: "toggle",
      },
      {
        name: "overwriteMax",
        label: "over_writeMax",
        type: "toggle",
      },
      {
        name: "Filter_lowDecim",
        label: "Filter_lowDecim",
        type: "toggle",
      },
      {
        name: "Filter_low",
        label: "Filter_low",
        type: "toggle",
      },
      {
        name: "engine_useSmallEngineLogic",
        label: "engine_useSmallEngineLogic",
        type: "toggle",
      },
      {
        name: "engine_useInjectionSkewLogicRemoval",
        label: "engine_useInjectionSkewLogicRemoval",
        type: "toggle",
      },
      {
        name: "engine_useIncreaseSensitivity",
        label: "engine_useIncreaseSensitivity",
        type: "toggle",
      },
      {
        name: "engine_useNoDetailedIndicAlarmLimits",
        label: "engine_useNoDetailedIndicAlarmLimits",
        type: "toggle",
      },
      {
        name: "engine_useInjectionAlarmOverwrite",
        label: "engine_useInjectionAlarmOverwrite",
        type: "toggle",
      },
      {
        name: "engine_useInjectionAcyWeighting",
        label: "engine_useInjectionAcyWeighting",
        type: "toggle",
      },
      {
        name: "engine_useInjectionDissymetryDeviation",
        label: "engine_useInjectionDissymetryDeviation",
        type: "toggle",
      },
      {
        name: "highPass",
        label: "highPass",
        type: "toggle",
      },
    ],
  },
  Torque: {
    "Channel Information": [
      {
        name: "DE Channel",
        group: "yes",
        children: [
          {
            name: "SENSORx",
            type: "dropdown",
            options: ["Ch1", "Ch2", "Ch3", "Ch4", "Ch5", "No Channel"],
          },
          {
            name: "ChannelType Teeth(",
            type: "dropdown",
            options: ["Speed", "Transducer"],
          },
          {
            name: "Teeth",
            type: "text",
          },
        ],
      },
      {
        name: "NDE Channel",
        group: "yes",
        children: [
          {
            name: "SENSORx",
            type: "dropdown",
            options: ["Ch1", "Ch2", "Ch3", "Ch4", "Ch5", "No Channel"],
          },
          {
            name: "ChannelType Teeth(",
            type: "dropdown",
            options: ["Speed", "Transducer"],
          },
          {
            name: "Teeth",
            type: "text",
          },
        ],
      },
    ],
    "Diagnostic Details": [
      {
        name: "Min Speed",
        label: "min_speed",
        type: "text",
      },
      {
        name: "MinVolt",
        label: "min_volt",
        type: "text",
      },
      {
        name: "Recording Period",
        label: "recording_period",
        type: "text",
      },
      {
        name: "Recording Length",
        label: "recording_length",
        type: "text",
      },
      {
        name: "ZeroDegree",
        label: "zero_degree",
        type: "text",
      },
      {
        name: "Rigidity(R)",
        label: "rigidity",
        type: "text",
      },
      {
        name: "Power",
        label: "power",
        type: "text",
      },
    ],
    "Machine Details": [
      {
        name: "Name",
        label: "name",
        type: "text",
      },
      {
        name: "Rated RPM",
        label: "rated_rpm",
        type: "text",
      },
      {
        name: "VesselType",
        label: "vessel_type",
        type: "dropdown",
        options: [
          "AHTS",
          "PSV",
          "OSV",
          "Harbor Tugs",
          "Container Ship",
          "Large Bulk carriers",
          "Mini Bulk Carriers",
          "Gas Tankers",
        ],
      },
    ],
  },
  Bearing: {
    "Channel Information": [
      {
        name: "Crankshaft",
        group: "yes",
        children: [
          {
            name: "SENSORx",
            label: "bearing_crankshaft_sensorx",
            type: "dropdown",
            options: [
              "Ch1",
              "Ch2",
              "Ch3",
              "Ch4",
              "Ch5",
              "CH6",
              "CH7",
              "CH8",
              "No Channel",
            ],
          },
          {
            name: "Channel Type",
            label: "bearing_crankshaft_channel_type",
            type: "dropdown",
            options: ["Speed", "Transducer"],
          },
          {
            name: "Teeth",
            label: "bearing_crankshaft_teeth",
            type: "text",
          },
          {
            name: "Wheel Type",
            label: "bearing_crankshaft_wheel_type",
            type: "dropdown",
            options: [
              "Standard",
              "1 Missing Tooth",
              "1 Missing + 1 Junction",
              "1 Missing + 2 Junction",
              "1 Missing + 3 Junctions",
              "1 Junction",
              "2 Junctions",
              "3 Junctions",
              "Noisy",
              "Optical",
              "Odd",
            ],
          },
        ],
      },
    ],
    "Diagnostic Details": [
      {
        name: "Min Speed",
        label: "min_speed",
        type: "text",
      },
      {
        name: "Min Volt",
        label: "min_volt",
        type: "text",
      },
      {
        name: "Recording Period",
        label: "recording_period",
        type: "text",
      },
      {
        name: "Recording Length",
        label: "recording_length",
        type: "text",
      },
    ],
    "Machine Details": [
      {
        name: "Name",
        label: "name",
        type: "text",
      },
      {
        name: "Rated RPM",
        label: "rated_rpm",
        type: "text",
      },
    ],
  },
  Turbine: {
    "Channel Information": [
      {
        name: "Crankshaft",
        group: "yes",
        children: [
          {
            name: "SENSORx",
            type: "dropdown",
            options: ["Ch1", "Ch2", "Ch3", "Ch4", "Ch5", "No Channel"],
          },
          {
            name: "ChannelType Teeth(",
            type: "dropdown",
            options: ["Speed", "Transducer"],
          },
          {
            name: "Teeth",
            type: "text",
          },
        ],
      },
    ],
    "Diagnostic Details": [
      {
        name: "Min Speed",
        label: "min_speed",
        type: "text",
      },
      {
        name: "Min Volt",
        label: "min_volt",
        type: "text",
      },
      {
        name: "Recording Period",
        label: "recording_period",
        type: "text",
      },
      {
        name: "Recording Length",
        label: "recording_length",
        type: "text",
      },
    ],
    "Machine Details": [
      {
        name: "Name",
        label: "name",
        type: "text",
      },
      {
        name: "Rated RPM",
        label: "rated_rpm",
        type: "text",
      },
    ],
  },
  Motor: {
    "Channel Information": [
      {
        name: "Crankshaft",
        group: "yes",
        children: [
          {
            name: "SENSORx",
            label: "motor_crankshaft_sensorx",
            type: "dropdown",
            options: [
              "Ch1",
              "Ch2",
              "Ch3",
              "Ch4",
              "Ch5",
              "CH6",
              "CH7",
              "CH8",
              "No Channel",
            ],
          },
          {
            name: "Channel Type",
            label: "motor_crankshaft_channel_type",
            type: "dropdown",
            options: ["Speed", "Transducer"],
          },
          {
            name: "Teeth",
            label: "motor_crankshaft_teeth",
            type: "text",
          },
          {
            name: "Wheel Type",
            label: "motor_crankshaft_wheel_type",
            type: "dropdown",
            options: [
              "Standard",
              "1 Missing Tooth",
              "1 Missing + 1 Junction",
              "1 Missing + 2 Junction",
              "1 Missing + 3 Junctions",
              "1 Junction",
              "2 Junctions",
              "3 Junctions",
              "Noisy",
              "Optical",
              "Odd",
            ],
          },
        ],
      },
    ],
    "Diagnostic Details": [
      {
        name: "Min Speed",
        label: "min_speed",
        type: "text",
      },
      {
        name: "Min Volt",
        label: "min_volt",
        type: "text",
      },
      {
        name: "Recording Period",
        label: "recording_period",
        type: "text",
      },
      {
        name: "Recording Length",
        label: "recording_length",
        type: "text",
      },
    ],
    "Machine Details": [
      {
        name: "Name",
        label: "name",
        type: "text",
      },
      {
        name: "Rated RPM",
        label: "rated_rpm",
        type: "text",
      },
    ],
  },
  "Default Parameters": [
    {
      name: "Data Disk Naming ",
      type: "text",
    },
    {
      name: "Reboot Hours",
      type: "text",
    },
    {
      name: "Level Min",
      type: "text",
    },
    {
      name: "Json Report  ",
      type: "text",
    },
    {
      name: "Component Type",
      type: "text",
    },
    {
      name: "Wav Saving Periodicity",
      type: "text",
    },
  ],
};

export default formSchema;
