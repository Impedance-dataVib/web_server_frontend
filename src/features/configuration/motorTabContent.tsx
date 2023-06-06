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
  MotorAssetInformation,
  MotorAdvancedParameters,
} from "./configuration-forms";
import { useFormik } from "formik";
import { deleteModule, saveModuleData } from "../../app/services";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  useGetConfigurationModuleByConfigId,
  useGetModuleById,
  useGetSystemCustomerNameInfo,
} from "./hooks";
import { Delete } from "@mui/icons-material";
import { eventBus } from "../../EventBus";
import { motorStepperValidationSchemaGroups } from "./stepperValidationSchema";
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
    case "Asset Information":
      return (
        <MotorAssetInformation
          handleFormData={handleFormData}
          formContext={formContext}
        ></MotorAssetInformation>
      );
    case "Advanced Parameters":
      return (
        <MotorAdvancedParameters
          handleFormData={handleFormData}
          formContext={formContext}
        ></MotorAdvancedParameters>
      );
    default:
      return <div>Invalid Step</div>;
  }
};
const MotorTabContent = ({ module, moduleId, setIsUnsaved }: any) => {
  const [expanded, setExpanded] = useState<string | false>("Global");
  const [tabConfigs, setTabConfigs] = useState<any>();
  const [stepperSteps, setStepperSteps] = useState<any | []>();
  const [activeStep, setActiveStep] = useState<number>(0);
  const { configId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading, data, isError, getModuleDataById } =
    useGetModuleById(moduleId);
  const { getAllModulesByConfigId } =
    useGetConfigurationModuleByConfigId(configId);
  const { data: customerName } = useGetSystemCustomerNameInfo();
  const navigate = useNavigate();
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
            motorStepperValidationSchemaGroups[getStepsInOrder[stepIndex - 1]];
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
      motor_crankshaft_ac_dc: "",
      motor_crankshaft_power_source: "",
      motor_crankshaft_sensitivity: "",
      motor_crankshaft_unit: "",
      motor_crankshaft_sensorx: "",
      motor_crankshaft_channel_type: "",
      motor_crankshaft_teeth: "",
      motor_crankshaft_wheel_type: "",
      min_speed: "",
      min_volt: "",
      recording_period: "",
      recording_length: "",
      name: "",
      rated_rpm: "",
      overWrite: [],
      has_filter_options: false,
      Filter_lowDecim: "",
      Filter_low: "",
      highPass: "",
    };
  };
  const moduleFormContext = useFormik({
    initialValues: getInitialFormData(),
    enableReinitialize: true,
    onSubmit: (values) => {},
    validationSchema: motorValidationSchema,
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

  useEffect(() => {
    setIsUnsaved(moduleFormContext.dirty);
  }, [moduleFormContext.dirty]);

  return (
    <Box sx={{ width: "auto" }}>
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
    </Box>
  );
};

export default MotorTabContent;
