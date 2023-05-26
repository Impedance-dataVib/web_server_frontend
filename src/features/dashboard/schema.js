export const API_DATA = [
  {
    id: 79,
    name: "Engine",
    description: "",
    configuration_id: 16,
    module_type: "Engine",
    process_name: "PROCCESS5",
    created_date: "2023-05-11T09:57:00+00:00",
  },
];

export const webSocketData = {
  isAlert: true, // Alerts & Instructions (true) && Status Messages (false)
  alertsUpdatedOn: "06.04.2023 - 05:49:53 (UTC)",
  alertData: [ 
    {
      instructionName: "Injection & Combustion",
      instructionType: "error",
      instructions: [
        "Check Relevant Fuel Injector’s for indicated cylinders",
        "Check Relevant Fuel Injector’s for indicated cylinders",
        "Check Relevant Fuel Injector’s for indicated cylinders",
      ],
    },
    {
      instructionName: "Bearing",
      instructionType: "warning",
      instructions: [
        "Check Relevant Fuel Injector’s for indicated cylinders",
        "Check Relevant Fuel Injector’s for indicated cylinders",
      ],
    },
    {
      instructionName: "",
      instructionType: "success",
      instructions: [
        "Check Relevant Fuel Injector’s for indicated cylinders",
        "Check Relevant Fuel Injector’s for indicated cylinders",
      ],
    },
  ],
  globalIndicator: [
    {
      indicatorName: "Combustion Condition",
      indicatorMin: 0,
      indicatorMax: 100,
      indicatorValue: 23,
      isPercentage: true, 
      indicatorUnit: "Alert",
      isGradientColor: true,
      indicatorType: "error"
    },
    {
      indicatorName: "RPM",
      indicatorMin: 0,
      indicatorMax: 1500,
      indicatorValue: 450,
      isPercentage: false,
      indicatorUnit: "Attention",
      isGradientColor: false,
      indicatorType: "warning"
    },
    {
      indicatorName: "Engine Health",
      indicatorMin: 0,
      indicatorMax: 100,
      indicatorValue: 73,
      isPercentage: true,
      indicatorUnit: "Stable",
      isGradientColor: true,
      indicatorType: "success"
    },
  ],
  trends: [
    {
      trendsName: "Increase Fuel Consumption",
      min: 0,
      max: 100,
      avg: 50,
      datapoints: [0, 20, 20, 60, 60, 20, 100, 80, 20, 25, 5, 10, 70],
      labels: ['0H', '1H', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', '11H', '12H'],
      chartType: 'LineGradient', 
      xLabel: 'Increase Fuel Consumption',
      yLabel: 'Time'
    },
    {
        trendsName: "Peak Pressure",
        min: 0,
        max: 100,
        avg: 50,
        datapoints: [0, 20, 20, 60, 60, 20, 100, 80, 20, 25, 5, 10, 70, 40, 60 , 20, 44, 89],
        labels: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13', 'C14', 'C15', 'C16', 'C17', 'C18'],
        chartType: 'Bar',
        xLabel: 'Peak Pressure',
        yLabel: 'Cylinders'
      },
      {
        trendsName: "Mechanical Health",
        min: 0,
        max: 100,
        avg: 50,
        datapoints: [0, 20, 20, 60, 60, 20, 100, 80, 20, 25, 5, 10, 70],
        labels: ['0H', '1H', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', '11H', '12H'],
        chartType: 'LineGradient',
        xLabel: 'Mechanical Health',
        yLabel: 'Time'
      },
  ],
  currentStatus: {
    title: "Non Syncronized",
    icon: "non",
    iconColor: 'error',
  },
  liveStatus: {
    // belowLabel: ['idle', 'Record', 'Analysis', 'Report'],
    currentStep: 2,
    currentMode: 'Auto',
    stepProgress: 25,
    currentMessage: 'Initiate Manual Measurement'
  },
  signals: {
    crankShaft: 1170,
    tdc: 1170,

  }
};

const SIGNAL_STATUS_QUALITY = [
    {
        id: '0',
        resultType: 'success',
        description: ''
    },
    {
        id: '1',
        resultType: 'success',
        description: 'Good Signal, No Synchronisation with TDC'
    },
    {
        id: '2',
        resultType: 'success',
        description: 'Good Signal, Synchronisated with TDC'
    },
    {
        id: '3',
        resultType: 'success',
        description: 'Good Signal, Synchronisated with CAM'
    },
    {
        id: '-1',
        resultType: 'error',
        description: 'Failed to apply configuration'
    },
    {
        id: '-3',
        resultType: 'error',
        description: 'Unstable Speed'
    },
    {
        id: '-4',
        resultType: 'error',
        description: 'Too low speed. Check minRPM settings in Config'
    },
    {
        id: '-5',
        resultType: 'error',
        description: 'Too much speed variation'
    },{
        id: '-6',
        resultType: 'error',
        description: 'No Valid License'
    },{
        id: '-7',
        resultType: 'error',
        description: 'Unstable Speed'
    },{
        id: '-8',
        resultType: 'error',
        description: 'Signal Level - Too low'
    },{
        id: '-9',
        resultType: 'error',
        description: 'Mismatch between config & channels info'
    },{
        id: '-10',
        resultType: 'error',
        description: 'Speed Mismatch between Channels'
    },
]
// Step 0, 3 :: enable download and view
// Step 1, 2 :: disabled download and view
// Download redirect to download

