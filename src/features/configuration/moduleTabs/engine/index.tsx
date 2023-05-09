import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Grid } from "@mui/material";

// import CustomConnector from "../../../../../app/components/custom-stepper";
// import AccordionBase from "../../../app/components/accordion-base";
// import formSchema from "../formSchema";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// import {
//   ChannelInformationForm,
//   AdvancedParameters,
//   DiagnosticDetailsForm,
//   EngineDetailsForm,
// } from "../configuration-forms";
import { useFormik } from "formik";
// import { saveModuleData } from "../../../app/services";
import { useParams } from "react-router-dom";
import ChannelInformationForm from "./forms/channelInfo";
import EngineDetailsForm from "./forms/engineDetails";
import DiagnosticDetailsForm from "./forms/diagnosticDetails";
import AdvancedParameters from "./forms/advancedParams";
import CustomConnector from "../../../../app/components/custom-stepper";
import AccordionBase from "../../../../app/components/accordion-base";
import formSchema from "../../formSchema";
import { saveModuleData } from "../../../../app/services";
const extractSteps = (schema: any, module: string) => {
  return Object.keys(schema[module]);
};
const extractTabConfigs = (schema: any, module: string): any => {
  return schema[module];
};

const StepToComponentEngineModule = ({
  step,
  handleFormData,
  formContext,
}: any) => {
  switch (step) {
    case "Channel Information":
      return (
        <ChannelInformationForm
          handleFormData={handleFormData}
          formContext={formContext}
        ></ChannelInformationForm>
      );

    case "Engine Details":
      return (
        <EngineDetailsForm
          handleFormData={handleFormData}
          formContext={formContext}
        ></EngineDetailsForm>
      );
      break;
    case "Diagnostic Details":
      return (
        <DiagnosticDetailsForm
          handleFormData={handleFormData}
          formContext={formContext}
        ></DiagnosticDetailsForm>
      );

    case "Advanced Parameters":
      return (
        <AdvancedParameters
          handleFormData={handleFormData}
          formContext={formContext}
        ></AdvancedParameters>
      );
    default:
      return <div>Invalid Step</div>;
  }
};

const EngineTabContent = ({ module, moduleId }: any) => {
  
  const [tabConfigs, setTabConfigs] = useState<any>();
  const [stepperSteps, setStepperSteps] = useState<any | []>();
  const [expanded, setExpanded] = useState<string | false>('Channel Information');
  const [activeStep, setActiveStep] = useState<number>(0);
  const { configId } = useParams();

  const handleSubmit = async () => {
    try {
      const payload = {
        configuration_id: configId,
        module_type: module,
        module_id: moduleId,
        from_data: {
          ...moduleFormContext.values,
        },
        advance_option: "",
      };
      await saveModuleData(payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTabConfigs(extractTabConfigs(formSchema, module));
    setStepperSteps(extractSteps(formSchema, module));
  }, []);

  const handleAccordionChange = (value: string) => {
    // Validate the form first before navigating
    console.log("handleAccordionChange = ", value, stepperSteps);
    
    setExpanded(value || false);
    const index = stepperSteps.indexOf(value);
    setActiveStep(index > 0 ? index : 0);
  };

  const moduleFormContext = useFormik({
    initialValues: {
      Crankshaft_SENSORx: "",
      Crankshaft_ChannelType: "",
      Crankshaft_Teeth: "",
      Crankshaft_WheelType: "",
      CamShaft_SENSORx: "",
      CamShaft_ChannelType: "",
      CamShaft_Teeth: "0.5",
      CamShaft_WheelType: "Standard",
      TDC_SENSORx: "",
      TDC_ChannelType: "",
      TDC_Teeth: "1",
      TDC_WheelType: "Standard",
      Peak_Pressure_SENSORx: "",
      Peak_Pressure_ChannelType: "",
      Peak_Pressure_Teeth: "0.5",
      Peak_Pressure_WheelType: "Standard",
      peak_pressure_transducer_sensitivity: "",
      name: "",
      serial_number: "",
      make_model: "",
      rated_rpm: "",
      application: "",
      fuel: "",
      type: "",
      no_of_strokes: "",

      no_of_cylinders: "",
      firing_order: "",
      phase_shift_mode: "",
      shift_angle: "",
      power: "",
      min_speed: "",
      min_volt: "",
      recording_period: "",
      recording_length: "",
      over_write: "",
      over_writeType: "",
      over_writeMin: "",
      over_writeMiddle: "",
      over_writeMedian: "",
      over_writeMax: "",
      Filter_lowDecim: "",
      Filter_low: "",
      engine_useSmallEngineLogic: "",
      engine_useInjectionSkewLogicRemoval: "",
      engine_useIncreaseSensitivity: "",
      engine_useNoDetailedIndicAlarmLimits: "",

      engine_useInjectionAlarmOverwrite: "",
      engine_useInjectionAcyWeighting: "",
      engine_useInjectionDissymetryDeviation: "",
      highPass: "",
    },
    onSubmit: (values) => {},
  });

  console.log("moduleFormContext = ", moduleFormContext.values);

  return (
    <Box sx={{ width: "auto" }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomConnector></CustomConnector>}
        sx={{ width: "auto", mb: 3, mt: 2 }}
        // @ts-expect-error
        onChange={(e) => setActiveStep(e?.target?.value)}
      >
        {stepperSteps?.map((label: string, index: number) => (
          <Step key={label} index={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container sx={{ width: "auto" }}>
        {stepperSteps?.map((item: string) => (
          <Grid key={item} item>
            <AccordionBase
              expanded={expanded}
              handleChange={handleAccordionChange}
              value={item}
              title={item}
            >
              <StepToComponentEngineModule
                step={item}
                handleFormData={(e: any) =>
                  console.log(e.target.name, e.target.value)
                }
                formContext={moduleFormContext}
              ></StepToComponentEngineModule>
            </AccordionBase>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Stack
          spacing={1}
          direction="row"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="contained">Cancel</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default EngineTabContent;
