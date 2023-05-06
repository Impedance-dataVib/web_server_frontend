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
  BearingChannelInformationForm,
  BearingMachineDetailsForm,
  BearingDiagnosticDetails,
} from "./configuration-forms";
import { saveModuleData } from "../../app/services";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
const extractSteps = (schema: any, module: string) => {
  return Object.keys(schema[module]);
};
const extractTabConfigs = (schema: any, module: string) => {
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
        <BearingChannelInformationForm
          handleFormData={handleFormData}
          formContext={formContext}
        ></BearingChannelInformationForm>
      );

    case "Machine Details":
      return (
        <BearingMachineDetailsForm
          handleFormData={handleFormData}
          formContext={formContext}
        ></BearingMachineDetailsForm>
      );
    case "Diagnostic Details":
      return (
        <BearingDiagnosticDetails
          handleFormData={handleFormData}
          formContext={formContext}
        ></BearingDiagnosticDetails>
      );
    default:
      return <div>Invalid Step</div>;
  }
};
const BearingTabContent = ({ module, moduleId }: any) => {
  const [expanded, setExpanded] = useState<string | false>("Global");
  const [tabConfigs, setTabConfigs] = useState<any>();
  const [stepperSteps, setStepperSteps] = useState<any | []>();
  const { configId } = useParams();

  const moduleFormContext = useFormik({
    initialValues: {
      bearing_crankshaft_sensorx: "",
      bearing_crankshaft_channel_type: "",
      bearing_crankshaft_teeth: "",
      bearing_crankshaft_wheel_type: "",
      min_speed: "",
      min_volt: "",
      recording_period: "",
      recording_length: "",
      name: "",
      rated_rpm: "",
    },
    onSubmit: (values) => {},
  });
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
                formContext={moduleFormContext}
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
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="contained">Cancel</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default BearingTabContent;
