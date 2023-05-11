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
  bearingValidationSchema,
} from "./configuration-forms";
import { deleteModule, saveModuleData } from "../../app/services";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useGetModuleById } from "./hooks";
import { eventBus } from "src/EventBus";
import { Delete } from "@mui/icons-material";
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
  const [activeStep, setActiveStep] = useState<number>(1);
  const { configId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading, data, isError, getModuleDataById } =
    useGetModuleById(moduleId);
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
    validationSchema: bearingValidationSchema,
  });
  const handleSubmit = async () => {
    try {
      const validate = await moduleFormContext.validateForm();
      if (Object.keys(validate).length > 0) {
        throw new Error("Form Validation Error!");
      }
      const payload = {
        configuration_id: configId,
        module_type: module,
        module_id: moduleId,
        ...moduleFormContext.values,
      };
      enqueueSnackbar({
        message: "In Progress",
        variant: "info",
      });
      await saveModuleData(payload);
      enqueueSnackbar({
        message: "Module Saved",
        variant: "success",
      });
    } catch (error: any) {
      enqueueSnackbar({
        message:
          error?.message === "Form Validation Error!"
            ? "Form Validation Error!"
            : "Module Failed To Save",
        variant: "error",
      });
    }
  };
  const handleDeleteModule = async () => {
    try {
      enqueueSnackbar({
        message: "In Progress",
        variant: "info",
      });
      await deleteModule(moduleId);
      eventBus.dispatch("ModuleDelete", {});
      enqueueSnackbar({
        message: "Delete Succeess!",
        variant: "success",
      });
    } catch (error: any) {
      enqueueSnackbar({
        message: "Delete Failed!",
        variant: "error",
      });
    }
  };
  useEffect(() => {
    // moduleFormContext.setValues({});
    if (data?.from_data) {
      const { configuration_id, ...rest } = data?.from_data;
      moduleFormContext.setValues({ ...rest });
    }
  }, [data]);
  useEffect(() => {
    setTabConfigs(extractTabConfigs(formSchema, module));
    setStepperSteps(extractSteps(formSchema, module));
  }, []);
  const handleAccordionChange =
    (stepIndex: number) =>
    (value: string) =>
    (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? value : false);
      setActiveStep(stepIndex + 1);
    };
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={activeStep}
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
        {stepperSteps?.map((item: string, index: number) => (
          <Grid key={item} item>
            <AccordionBase
              expanded={expanded}
              handleChange={handleAccordionChange(index)}
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
          <Button
            startIcon={<Delete />}
            color="primary"
            variant="contained"
            onClick={handleDeleteModule}
          >
            Delete Module
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default BearingTabContent;
