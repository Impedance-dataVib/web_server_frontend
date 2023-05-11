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
  MotorDiagnosticDetails,
  MotorMachineDetailsForm,
  MotorChannelInformationForm,
  motorValidationSchema,
} from "./configuration-forms";
import { useFormik } from "formik";
import { deleteModule, saveModuleData } from "../../app/services";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useGetConfigurationModuleByConfigId, useGetModuleById } from "./hooks";
import { Delete } from "@mui/icons-material";
import { eventBus } from "../../EventBus";
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
        <MotorChannelInformationForm
          handleFormData={handleFormData}
          formContext={formContext}
        ></MotorChannelInformationForm>
      );

    case "Machine Details":
      return (
        <MotorMachineDetailsForm
          handleFormData={handleFormData}
          formContext={formContext}
        ></MotorMachineDetailsForm>
      );
    case "Diagnostic Details":
      return (
        <MotorDiagnosticDetails
          handleFormData={handleFormData}
          formContext={formContext}
        ></MotorDiagnosticDetails>
      );
    default:
      return <div>Invalid Step</div>;
  }
};
const MotorTabContent = ({ module, moduleId }: any) => {
  const [expanded, setExpanded] = useState<string | false>("Global");
  const [tabConfigs, setTabConfigs] = useState<any>();
  const [stepperSteps, setStepperSteps] = useState<any | []>();
  const [activeStep, setActiveStep] = useState<number>(1);
  const { configId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading, data, isError, getModuleDataById } =
    useGetModuleById(moduleId);
  const { getAllModulesByConfigId } =
    useGetConfigurationModuleByConfigId(configId);
  const navigate = useNavigate();
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
  const moduleFormContext = useFormik({
    initialValues: {
      motor_crankshaft_sensorx: "No Channel",
      motor_crankshaft_channel_type: "Speed",
      motor_crankshaft_teeth: "",
      motor_crankshaft_wheel_type: "Standard",
      min_speed: "",
      min_volt: "",
      recording_period: "",
      recording_length: "",
      name: "",
      rated_rpm: "",
    },
    onSubmit: (values) => {},
    validationSchema: motorValidationSchema,
  });
  useEffect(() => {
    // moduleFormContext.setValues({});
    if (data?.from_data) {
      const { configuration_id, ...rest } = data?.from_data;
      moduleFormContext.setValues({ ...rest });
    }
  }, [data]);
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
                handleFormData={(e: any) =>
                  console.log(e.target.name, e.target.value)
                }
                formContext={moduleFormContext}
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

export default MotorTabContent;
