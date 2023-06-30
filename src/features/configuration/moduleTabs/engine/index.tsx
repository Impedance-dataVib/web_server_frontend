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
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import ChannelInformationForm from "./forms/channelInfo";
import EngineDetailsForm from "./forms/engineDetails";
import DiagnosticDetailsForm from "./forms/diagnosticDetails";
import AdvancedParameters from "./forms/advancedParams";
import CustomConnector from "../../../../app/components/custom-stepper";
import AccordionBase from "../../../../app/components/accordion-base";
import formSchema from "../../formSchema";
import EngineAssetInformation from "./forms/assetInformation";
import { deleteModule, saveModuleData } from "../../../../app/services";
import { useSnackbar } from "notistack";
import { useGetModuleById, useGetSystemCustomerNameInfo } from "../../hooks";
import { Delete } from "@mui/icons-material";
import { eventBus } from "src/EventBus";
import { engineValidationSchema } from "../../configuration-forms";
import { engineStepperValidationSchemaGroups } from "../../stepperValidationSchema";

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
    case "Asset Information":
      return (
        <EngineAssetInformation
          handleFormData={handleFormData}
          formContext={formContext}
        ></EngineAssetInformation>
      );
    default:
      return <div>Invalid Step</div>;
  }
};

const EngineTabContent = ({ module, moduleId, setIsUnsaved }: any) => {
  const [, setTabConfigs] = useState<any>();
  const [stepperSteps, setStepperSteps] = useState<any | []>();
  const [expanded, setExpanded] = useState<string | false>();
  const [activeStep, setActiveStep] = useState<number>(0);
  const { configId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading, data, isError } = useGetModuleById(moduleId);
  const navigate = useNavigate();
  const { data: customerName } = useGetSystemCustomerNameInfo();
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
        message: "Module Saved!",
        variant: "success",
      });
      moduleFormContext.resetForm({
        values: { ...moduleFormContext.values },
        isSubmitting: false,
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
            engineStepperValidationSchemaGroups[getStepsInOrder[stepIndex - 1]];
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
      Crankshaft_SENSORx: "",
      Crankshaft_ChannelType: "",
      Crankshaft_Teeth: "",
      Crankshaft_WheelType: "",
      CamShaft_SENSORx: "No Channel",
      CamShaft_ChannelType: "",
      CamShaft_Teeth: "",
      CamShaft_WheelType: "",
      TDC_SENSORx: "No Channel",
      TDC_ChannelType: "",
      TDC_Teeth: "1",
      TDC_WheelType: "",
      Peak_Pressure_SENSORx: "No Channel",
      Peak_Pressure_ChannelType: "",
      Peak_Pressure_Teeth: "",
      Peak_Pressure_WheelType: "",
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
      running_hours: "",
      engine_history: "",
      vessel_type: "",
      min_speed: "",
      MaxRPMVar: "",
      recording_period: "",
      recording_length: "",
      overWrite: [],
      has_filter_options: false,
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
      has_overwrite_parameters: false,
      max_pressure: "",
      aux_device_id: "",
    };
  };

  const moduleFormContext = useFormik({
    initialValues: getInitialFormData(),
    enableReinitialize: true,
    onSubmit: (values) => {},
    validationSchema: engineValidationSchema,
  });

  useEffect(() => {
    setIsUnsaved(moduleFormContext.dirty);
  }, [moduleFormContext.dirty]);

  return (
    <Box sx={{ width: "auto" }}>
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

export default EngineTabContent;
