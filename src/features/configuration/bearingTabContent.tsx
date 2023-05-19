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
  BearingAssetInformation,
} from "./configuration-forms";
import { deleteModule, saveModuleData } from "../../app/services";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useGetModuleById, useGetSystemCustomerNameInfo } from "./hooks";
import { eventBus } from "src/EventBus";
import { Delete } from "@mui/icons-material";
import { bearingStepperValidationSchemaGroups } from "./stepperValidationSchema";
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
    case "Asset Information":
      return (
        <BearingAssetInformation
          handleFormData={handleFormData}
          formContext={formContext}
        ></BearingAssetInformation>
      );
    default:
      return <div>Invalid Step</div>;
  }
};
const BearingTabContent = ({ module, moduleId, setIsUnsaved }: any) => {
  const [expanded, setExpanded] = useState<string | false>("Global");
  const [tabConfigs, setTabConfigs] = useState<any>();
  const [stepperSteps, setStepperSteps] = useState<any | []>();
  const [activeStep, setActiveStep] = useState<number>(0);
  const { configId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { isLoading, data, isError, getModuleDataById } =
    useGetModuleById(moduleId);
  const { data: customerName } = useGetSystemCustomerNameInfo();
  const getInitialFormData = () => {
    if (data?.from_data && customerName) {
      const { configuration_id, ...rest } = data?.from_data;
      return { ...rest, customer_name: customerName };
    }
    return {
      customer_name: customerName,
      asset_name: "",
      equipment_name: "",
      sampling_rate: "",
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
    };
  };
  const moduleFormContext = useFormik({
    initialValues: getInitialFormData(),
    enableReinitialize: true,
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
      setIsUnsaved(false);
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
    setTabConfigs(extractTabConfigs(formSchema, module));
    setStepperSteps(extractSteps(formSchema, module));
  }, []);
  const handleAccordionChange =
    (stepIndex: number) =>
    (value: string) =>
    async (event: React.SyntheticEvent, newExpanded: boolean) => {
      try {
        const formValidation = await moduleFormContext.validateForm();
        const getStepsInOrder = extractSteps(formSchema, module);

        if (stepIndex === 0) {
          setExpanded(newExpanded ? value : false);
        } else if (stepIndex > 0) {
          const validationFields =
            bearingStepperValidationSchemaGroups[
              getStepsInOrder[stepIndex - 1]
            ];
          const stepValidation = Object.keys(formValidation).some((item) =>
            validationFields.includes(item)
          );
          //Checking the validation errors of the previous step, if present true else false

          if (!stepValidation) {
            setExpanded(newExpanded ? value : false);
            setActiveStep(stepIndex);
          } else {
            throw new Error(
              `${getStepsInOrder[stepIndex - 1]} step has validation errors!`
            );
          }
        }
      } catch (error: any) {
        enqueueSnackbar({
          message: error?.message,
          variant: "error",
        });
      }
    };
    useEffect(() => {
      setIsUnsaved(moduleFormContext.dirty);
    }, [moduleFormContext.dirty])
  
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
                handleFormData={(e: any) => {}}
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
          <Button
            variant="contained"
            onClick={() => navigate("/configuration")}
          >
            Cancel
          </Button>
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
