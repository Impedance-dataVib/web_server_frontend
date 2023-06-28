import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {
  Alert,
  AlertTitle,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import CustomConnector from "../../app/components/custom-stepper";
import AccordionBase from "../../app/components/accordion-base";
import formSchema from "./formSchema";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
  TorqueChannelInformationForm,
  TorqueMachineDetailsForm,
  TorqueDiagnosticDetails,
  torqueValidationSchema,
  TorqueAssetInformation,
  TorqueAdvancedParameters,
} from "./configuration-forms";
import { useFormik } from "formik";
import { deleteModule, saveModuleData } from "../../app/services";
import { useNavigate, useParams } from "react-router-dom";
import { useGetModuleById, useGetSystemCustomerNameInfo } from "./hooks";
import { useSnackbar } from "notistack";
import { Delete } from "@mui/icons-material";
import { eventBus } from "src/EventBus";
import { torqueStepperValidationSchemaGroups } from "./stepperValidationSchema";

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
        <TorqueChannelInformationForm
          handleFormData={handleFormData}
          formContext={formContext}
        ></TorqueChannelInformationForm>
      );

    case "Machine Details":
      return (
        <TorqueMachineDetailsForm
          handleFormData={handleFormData}
          formContext={formContext}
        ></TorqueMachineDetailsForm>
      );
    case "Diagnostic Details":
      return (
        <TorqueDiagnosticDetails
          handleFormData={handleFormData}
          formContext={formContext}
        ></TorqueDiagnosticDetails>
      );
    case "Asset Information":
      return (
        <TorqueAssetInformation
          handleFormData={handleFormData}
          formContext={formContext}
        ></TorqueAssetInformation>
      );
    case "Advanced Parameters":
      return (
        <TorqueAdvancedParameters
          handleFormData={handleFormData}
          formContext={formContext}
        ></TorqueAdvancedParameters>
      );
    default:
      return <div>Invalid Step</div>;
  }
};
const TorqueTabContent = ({ module, moduleId, setIsUnsaved }: any) => {
  const [expanded, setExpanded] = useState<string | false>("Global");
  const [tabConfigs, setTabConfigs] = useState<any>();
  const [stepperSteps, setStepperSteps] = useState<any | []>();
  const [activeStep, setActiveStep] = useState<number>(0);
  const { configId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading, data, isError } = useGetModuleById(moduleId);
  useEffect(() => {
    setTabConfigs(extractTabConfigs(formSchema, module));
    setStepperSteps(extractSteps(formSchema, module));
  }, []);
  const navigate = useNavigate();
  const { data: customerName } = useGetSystemCustomerNameInfo();
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
            torqueStepperValidationSchemaGroups[getStepsInOrder[stepIndex - 1]];
          const stepValidation = Object.keys(formValidation).some((item) =>
            validationFields.includes(item)
          );
          //Checking the validation errors of the previous step, if present true else false

          if (!stepValidation) {
            if (getStepsInOrder.length - 1 === stepIndex && !newExpanded) {
              setActiveStep(stepIndex + 1);
            } else {
              setActiveStep(stepIndex);
            }
            setExpanded(newExpanded ? value : false);
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
  const getInitialFormData = () => {
    if (data?.from_data && customerName) {
      const { configuration_id, ...rest } = data?.from_data;
      if (rest?.overWrite) {
        return {
          ...rest,
          customer_name: customerName,
          module_type: data.module_type,
        };
      } else {
        return {
          ...rest,
          overWrite: [],
          customer_name: customerName,
          module_type: data.module_type,
        };
      }
    }
    return {
      customer_name: customerName,
      asset_name: "",
      equipment_name: "",
      module_type: data.module_type,

      de_channel_sensorx: "",
      de_channel_channel_type: "",
      de_channel__teeth: "",
      de_channel_wheel_type: "",
      nde_channel_sensorx: "",
      nde_channel_channel_type: "",
      nde_channel_teeth: "",
      nde_channel_wheel_type: "",
      min_speed: "",
      MaxRPMVar: "",
      recording_period: "",
      recording_length: "",
      zero_degree: "",
      rigidity: "",
      power: "",
      name: "",
      rated_rpm: "",
      vessel_type: "",
      overWrite: [],
      has_filter_options: false,
      Filter_lowDecim: "",
      Filter_low: "",
      highPass: "",
      has_overwrite_parameters: false,
      aux_device_id: "",
    };
  };

  const moduleFormContext = useFormik({
    initialValues: getInitialFormData(),
    enableReinitialize: true,
    onSubmit: (values) => {},
    validationSchema: torqueValidationSchema,
  });

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

  useEffect(() => {
    setIsUnsaved(moduleFormContext.dirty);
  }, [moduleFormContext.dirty]);

  return (
    <Box sx={{ width: "100%" }}>
      {isLoading && (
        <>
          <LinearProgress />
          <Box sx={{ my: 1 }}>
            <Alert severity="info" onClose={() => {}}>
              <AlertTitle>
                Please wait! Data is taking some time to load.
              </AlertTitle>
            </Alert>
          </Box>
        </>
      )}
      {isError && (
        <Box sx={{ my: 1 }}>
          <Alert severity="error" onClose={() => {}}>
            <AlertTitle>Something went wrong !</AlertTitle>
            <Typography variant="caption">
              Please refresh the page! If this behaviour remains the same
              contact admin team.
            </Typography>
          </Alert>
        </Box>
      )}
      {!isLoading && !isError && (
        <>
          {" "}
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            connector={<CustomConnector></CustomConnector>}
            sx={{ width: "auto", mb: 3, mt: 2 }}
          >
            {stepperSteps?.map((label: string) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Grid container sx={{ width: "auto" }}>
            {stepperSteps?.map((item: string, index: number) => (
              <Grid key={item} item sx={{ width: "100%" }}>
                <AccordionBase
                  expanded={expanded}
                  handleChange={handleAccordionChange(index)}
                  value={item}
                  title={item}
                >
                  <StepToComponentEngineModule
                    step={item}
                    handleFormData={(e: any) => {}}
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
        </>
      )}
    </Box>
  );
};

export default TorqueTabContent;
