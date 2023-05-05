import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Grid } from "@mui/material";
import CustomConnector from "../../app/components/custom-stepper";
import AccordionBase from "../../app/components/accordion-base";
import formSchema from "./formSchema";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
  ChannelInformationForm,
  AdvancedParameters,
  DiagnosticDetailsForm,
  EngineDetailsForm,
} from "./configuration-forms";

const extractSteps = (schema: any, module: string) => {
  return Object.keys(schema[module]);
};
const extractTabConfigs = (schema: any, module: string) => {
  return schema[module];
};

const StepToComponentEngineModule = ({ step, handleFormData }: any) => {
  switch (step) {
    case "Channel Information":
      return (
        <ChannelInformationForm
          handleFormData={handleFormData}
        ></ChannelInformationForm>
      );

    case "Engine Details":
      return (
        <EngineDetailsForm handleFormData={handleFormData}></EngineDetailsForm>
      );
      break;
    case "Diagnostic Details":
      return (
        <DiagnosticDetailsForm
          handleFormData={handleFormData}
        ></DiagnosticDetailsForm>
      );

    case "Advanced Parameters":
      return (
        <AdvancedParameters
          handleFormData={handleFormData}
        ></AdvancedParameters>
      );
    default:
      return <div>Invalid Step</div>;
  }
};
const EngineTabContent = ({ module }: any) => {
  const [expanded, setExpanded] = useState<string | false>("Global");
  const [tabConfigs, setTabConfigs] = useState<any>();
  const [stepperSteps, setStepperSteps] = useState<any | []>();
  useEffect(() => {
    setTabConfigs(extractTabConfigs(formSchema, module));
    setStepperSteps(extractSteps(formSchema, module));
  }, []);
  const handleAccordionChange =
    (value: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? value : false);
    };
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={2}
        alternativeLabel
        connector={<CustomConnector></CustomConnector>}
        sx={{ width: "70%", marginBottom: "66px", marginTop: "40px" }}
      >
        {stepperSteps?.map((label: string) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container sx={{ width: "70%" }}>
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
              ></StepToComponentEngineModule>
            </AccordionBase>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ marginTop: "48px", width: "70%" }}>
        <Stack
          spacing={1}
          direction="row"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button variant="contained">Save</Button>
          <Button variant="contained">Cancel</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default EngineTabContent;
