const formSchema = {
  Engine: {
    Global: [
      { name: "ConfigName", type: "text" },
      { name: "Sampling Data", type: "number" },
      { name: "Data Disk", type: "number" },
      { name: "Data Disk Naming", type: "text" },
      { name: "Reboot Hours", type: "number" },
    ],
    "Channel Information": [
      {
        name: "Crankshaft (ChannelNum)",
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
        ],
      },
    ],
    "Engine Details": [
      {
        name: "Name",
        type: "text",
      },
      {
        name: "Fuel",
        type: "dropdown",
        options: ["Diesel", "Gas"],
      },
      {
        name: "Type",
        type: "dropdown",
        options: ["Inline", "V"],
      },
      {
        name: "No of strokes",
        type: "dropdown",
        options: ["2-stroke", "4-stroke"],
      },
      {
        name: "No of Cylinders",
        type: "text",
      },
      {
        name: "Firing Order",
        type: "dropdown",
        options: [1, 9, 3, 11, 2, 10, 5, 12, 8, 16, 6, 14, 7, 15, 4, 13],
      },
      {
        name: "Phase Shift Mode",
        type: "dropdown",
        options: ["Manual", "Auto"],
      },
      {
        name: "Shift Angle",
        type: "text",
      },
      {
        name: "Power",
        type: "text",
      },
    ],
    "Diagnostic Details": [
      {
        name: "Min Speed(minRPM)",
        type: "text",
      },
      {
        name: "MinVolt(LevelMin)",
        type: "text",
      },
      {
        name: "Recording Period ",
        type: "text",
      },
      {
        name: "Recording Length",
        type: "text",
      },
    ],
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
        type: "text",
      },
      {
        name: "MinVolt",
        type: "text",
      },
      {
        name: "Recording Period",
        type: "text",
      },
      {
        name: "Recording Length",
        type: "text",
      },
      {
        name: "ZeroDegree",
        type: "text",
      },
      {
        name: "Rigidity(R)",
        type: "text",
      },
      {
        name: "Power",
        type: "text",
      },
    ],
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
  },
  Bearing: {
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
        type: "text",
      },
      {
        name: "Min Volt",
        type: "text",
      },
      {
        name: "Recording Period",
        type: "text",
      },
      {
        name: "Recording Length",
        type: "text",
      },
    ],
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
        type: "text",
      },
      {
        name: "Min Volt",
        type: "text",
      },
      {
        name: "Recording Period",
        type: "text",
      },
      {
        name: "Recording Length",
        type: "text",
      },
    ],
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
  },
};

export default formSchema;
