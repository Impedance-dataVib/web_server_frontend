const formSchema = {
  Engine: {
    "Asset Information": [
      {
        name: "Customer Name",
        label: "customer_name",
        type: "text",
        disabled: true,
      },
      {
        name: "Asset Name",
        label: "asset_name",
        type: "text",
      },
      {
        name: "Equipment Name",
        label: "equipment_name",
        type: "text",
      },
      {
        name: "Sampling rate",
        label: "sampling_rate",
        type: "dropdown",
        options: ["64K", "128K", "256K"],
      },
    ],
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
        helperNote: "Enter Engine Name",
      },
      {
        name: "Serial Number",
        label: "serial_number",
        type: "text",
        helperNote: "Enter Engine Serial Number",
      },
      {
        name: "Make & Model",
        label: "make_model",
        type: "text",
        helperNote: "Enter Engine Make & Model",
      },
      {
        name: "Rated RPM",
        label: "rated_rpm",
        type: "text",
        helperNote: "Enter the rated max RPM",
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
        helperNote: "Enter the Application where the Engine is used",
      },
      {
        name: "Fuel",
        label: "fuel",
        type: "dropdown",
        options: ["Diesel", "Gas"],
        helperNote: "Select the type of fuel used",
      },
      {
        name: "Type",
        label: "type",
        type: "dropdown",
        options: ["Inline", "V"],
        helperNote: "Select the type of engine(Inline or V)",
      },
      {
        name: "No of strokes",
        label: "no_of_strokes",
        type: "dropdown",
        options: ["2-stroke", "4-stroke"],
        helperNote: "Select the no of strokes",
      },
      {
        name: "No of Cylinders",
        label: "no_of_cylinders",
        type: "text",
        helperNote: "Enter the no of cylinders",
      },
      {
        name: "Firing Order",
        label: "firing_order",
        type: "text",
        helperNote: "Enter the firing order",
      },
      {
        name: "Phase Shift Mode",
        label: "phase_shift_mode",
        type: "dropdown",
        options: ["Manual", "Auto"],
        helperNote: "Select the type of Phase Shift",
      },
      {
        name: "Shift Angle",
        label: "shift_angle",
        type: "text",
        helperNote: "Phase shift of firing orders in degrees",
      },
      {
        name: "Power",
        label: "power",
        type: "text",
        helperNote: "Power Value in Watts",
      },
      {
        name: "Running Hours",
        label: "running_hours",
        type: "text",
        helperNote: "Enter Current Running Hours",
      },
      {
        name: "Engine History",
        label: "engine_history",
        type: "dropdown",
        options: [
          "Last Overhaul was a MOH",
          "Overdue for a MOH",
          "Never Overhauled",
          "Overdue for a TOH",
          "Approaching a MOH",
          "Approaching a TOH",
          "Last Overhaul was a TOH",
        ],
        helperNote: "Enter Current Running Hours",
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
          "Gas Tankers",
          "Passenger Ships",
          "RORO",
          "Fishing Vessel",
          "Research Ships",
          "War Ships",
          "Barges",
          "Inland Water Way Transporters",
        ],
        helperNote: "Enter Current Running Hours",
      },
    ],
    "Diagnostic Details": [
      {
        name: "Min Speed(minRPM)",
        label: "min_speed",
        type: "text",
        helperNote: "Enter the min volts required to perform the analysis",
      },
      {
        name: "MinVolt(LevelMin)(in mV)",
        label: "min_volt",
        type: "text",
        helperNote: "Enter the min volts required to perform the analysis",
      },
      {
        name: "Recording Period (in seconds)",
        label: "recording_period",
        type: "text",
        helperNote: "time between two recordings",
      },
      {
        name: "Recording Length (in seconds)",
        label: "recording_length",
        type: "text",
        helperNote: "Length of Sample Collection",
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
    "Asset Information": [
      {
        name: "Customer Name",
        label: "customer_name",
        type: "text",
        disabled: true,
      },
      {
        name: "Asset Name",
        label: "asset_name",
        type: "text",
      },
      {
        name: "Equipment Name",
        label: "equipment_name",
        type: "text",
      },
      {
        name: "Sampling rate",
        label: "sampling_rate",
        type: "dropdown",
        options: ["64K", "128K", "256K"],
      },
    ],
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
        name: "Min Speed(minRPM)",
        label: "min_speed",
        type: "text",
        helperNote: "Enter the min rpm required to perform analysis",
      },
      {
        name: "MinVolt (in mV)",
        label: "min_volt",
        type: "text",
        helperNote: "Enter the min volts required to perform the analysis",
      },
      {
        name: "Recording Period (in seconds)",
        label: "recording_period",
        type: "text",
        helperNote: "recording time for one diagnosis",
      },
      {
        name: "Recording Length (in seconds)",
        label: "recording_length",
        type: "text",
        helperNote: "Length of Sample Collection",
      },
      {
        name: "ZeroDegree (in degree)",
        label: "zero_degree",
        type: "text",
        helperNote: "Enter zero degree",
      },
      {
        name: "Rigidity(R)(in N-m/rad)",
        label: "rigidity",
        type: "popup",
        helperNote: "Calculate the rigidity",
      },
      {
        name: "Power (in Watts)",
        label: "power",
        type: "text",
        helperNote: "Enter the power in watts",
      },
    ],
    "Machine Details": [
      {
        name: "Name",
        label: "name",
        type: "text",
        helperNote: "Enter Equipment Name",
      },
      {
        name: "Rated RPM",
        label: "rated_rpm",
        type: "text",
        helperNote: "Enter the rated max RPM",
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
        helperNote: "Select the vessel type",
      },
    ],
  },
  Bearing: {
    "Asset Information": [
      {
        name: "Customer Name",
        label: "customer_name",
        type: "text",
        disabled: true,
      },
      {
        name: "Asset Name",
        label: "asset_name",
        type: "text",
      },
      {
        name: "Equipment Name",
        label: "equipment_name",
        type: "text",
      },
      {
        name: "Sampling rate",
        label: "sampling_rate",
        type: "dropdown",
        options: ["64K", "128K", "256K"],
      },
    ],
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
        name: "Min Speed(minRPM)",
        label: "min_speed",
        type: "text",
        helperNote: "Enter the min rpm required to perform analysis",
      },
      {
        name: "Min Volt (in mV)",
        label: "min_volt",
        type: "text",
        helperNote: "Enter the min volts required to perform the analysis",
      },
      {
        name: "Recording Period (in seconds)",
        label: "recording_period",
        type: "text",
        helperNote: "recording time for one diagnosis",
      },
      {
        name: "Recording Length (in seconds)",
        label: "recording_length",
        type: "text",
        helperNote: "Length of Sample Collection",
      },
    ],
    "Machine Details": [
      {
        name: "Name",
        label: "name",
        type: "text",
        helperNote: "Enter Equipment Name",
      },
      {
        name: "Rated RPM",
        label: "rated_rpm",
        type: "text",
        helperNote: "Enter the rated max RPM",
      },
    ],
  },
  Turbine: {
    "Asset Information": [
      {
        name: "Customer Name",
        label: "customer_name",
        type: "text",
        disabled: true,
      },
      {
        name: "Asset Name",
        label: "asset_name",
        type: "text",
      },
      {
        name: "Equipment Name",
        label: "equipment_name",
        type: "text",
      },
      {
        name: "Sampling rate",
        label: "sampling_rate",
        type: "dropdown",
        options: ["64K", "128K", "256K"],
      },
    ],
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
        name: "Min Speed(minRPM)",
        label: "min_speed",
        type: "text",
        helperNote: "Enter the min rpm required to perform analysis",
      },
      {
        name: "Min Volt (in mV)",
        label: "min_volt",
        type: "text",
        helperNote: "Enter the min volts required to perform the analysis",
      },
      {
        name: "Recording Period (in seconds)",
        label: "recording_period",
        type: "text",
        helperNote: "recording time for one diagnosis",
      },
      {
        name: "Recording Length (in seconds)",
        label: "recording_length",
        type: "text",
        helperNote: "Length of Sample Collection",
      },
    ],
    "Machine Details": [
      {
        name: "Name",
        label: "name",
        type: "text",
        helperNote: "Enter Equipment Name",
      },
      {
        name: "Rated RPM",
        label: "rated_rpm",
        type: "text",
        helperNote: "Enter the rated max RPM",
      },
    ],
  },
  Motor: {
    "Asset Information": [
      {
        name: "Customer Name",
        label: "customer_name",
        type: "text",
        disabled: true,
      },
      {
        name: "Asset Name",
        label: "asset_name",
        type: "text",
      },
      {
        name: "Equipment Name",
        label: "equipment_name",
        type: "text",
      },
      {
        name: "Sampling rate",
        label: "sampling_rate",
        type: "dropdown",
        options: ["64K", "128K", "256K"],
      },
    ],
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
        name: "Min Speed(minRPM)",
        label: "min_speed",
        type: "text",
        helperNote: "Enter the min rpm required to perform analysis",
      },
      {
        name: "Min Volt (in mV)",
        label: "min_volt",
        type: "text",
        helperNote: "Enter the min volts required to perform the analysis",
      },
      {
        name: "Recording Period (in seconds)",
        label: "recording_period",
        type: "text",
        helperNote: "recording time for one diagnosis",
      },
      {
        name: "Recording Length (in seconds)",
        label: "recording_length",
        type: "text",
        helperNote: "Length of Sample Collection",
      },
      // {
      //   name: "Rigidity(R)",
      //   label: "rigidity",
      //   type: "popup",
      // }
    ],
    "Machine Details": [
      {
        name: "Name",
        label: "name",
        type: "text",
        helperNote: "Enter Equipment Name",
      },
      {
        name: "Rated RPM",
        label: "rated_rpm",
        type: "text",
        helperNote: "Enter the rated max RPM",
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
