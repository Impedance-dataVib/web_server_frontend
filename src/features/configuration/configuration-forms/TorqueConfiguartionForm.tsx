import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { BootstrapInput } from "../../../app/components/bootstarp-input";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import formSchema from "../formSchema";
import { PopupRigidity } from "../modals/calculateRigidityModal";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import { useParams } from "react-router-dom";
import { useGetChannelByConfigIdName } from "../hooks";
import { useSnackbar } from "notistack";
import { FieldArray, FieldArrayRenderProps, FormikProvider } from "formik";
import { useAuth } from "src/app/auth";

const FormFieldConditionalRender = ({ type, fieldProps, formContext }: any) => {
  switch (type) {
    case "dropdown":
      return (
        <FormControl
          sx={{ minWidth: "182px", marginBottom: "20px" }}
          error={Boolean(formContext?.errors?.[fieldProps.label])}
        >
          <InputLabel id={`${fieldProps.label}-label`}>
            {fieldProps.name}
          </InputLabel>
          <Select
            labelId={`${fieldProps.label}-label`}
            name={fieldProps.label}
            onChange={formContext?.handleChange}
            value={formContext?.values?.[fieldProps.label]}
            label={fieldProps.name}
          >
            {fieldProps.options.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {Boolean(formContext?.errors?.[fieldProps.label]) && (
            <FormHelperText>
              {formContext?.errors?.[fieldProps.label]}
            </FormHelperText>
          )}
        </FormControl>
      );

    case "text":
      return (
        <TextField
          name={fieldProps.label}
          label={fieldProps.name}
          onChange={formContext?.handleChange}
          value={formContext?.values?.[fieldProps.label]}
          error={Boolean(formContext?.errors?.[fieldProps.label])}
          helperText={formContext?.errors?.[fieldProps.label]}
          variant="outlined"
          sx={{
            fontSize: "16px",
            marginBottom: "20px",
            width: "182px",
            padding: "1px 1px",
          }}
          inputProps={{
            readOnly: fieldProps?.disabled ? true : false,
            style: {
              padding: "11px 26px 13px 12px",
            },
          }}
          InputLabelProps={{ shrink: true }}
        ></TextField>
      );
    case "toggle":
      return (
        <FormControlLabel
          control={
            <Switch
              name={fieldProps.label}
              onChange={formContext?.handleChange}
              value={formContext?.values?.[fieldProps.label]}
              color="primary"
            />
          }
          label={fieldProps?.name}
          labelPlacement="start"
          disabled={fieldProps?.userName === "admin" ? false : true}
        />
      );
    case "array_overwrite":
      return (
        <FormikProvider value={formContext}>
          <FieldArray name={fieldProps.label}>
            {(formHelper: FieldArrayRenderProps) => {
              return (
                <Box>
                  {formContext?.values?.[fieldProps.label].map(
                    (item: any, index: number) => (
                      <Box key={index}>
                        <TextField
                          name={`${fieldProps.label}[${index}].overwrite`}
                          label={`overwrite`}
                          onChange={formContext?.handleChange}
                          value={item.overwrite}
                          variant="outlined"
                          sx={{
                            fontSize: "16px",
                            marginBottom: "20px",
                            width: "182px",
                            padding: "1px 1px",
                          }}
                          inputProps={{
                            style: {
                              padding: "11px 26px 13px 12px",
                            },
                          }}
                          InputLabelProps={{ shrink: true }}
                        ></TextField>
                        <TextField
                          name={`${fieldProps.label}[${index}].overwriteMin`}
                          label={`overwriteMin`}
                          onChange={formContext?.handleChange}
                          value={item.overwriteMin}
                          variant="outlined"
                          sx={{
                            fontSize: "16px",
                            marginBottom: "20px",
                            width: "182px",
                            padding: "1px 1px",
                          }}
                          inputProps={{
                            style: {
                              padding: "11px 26px 13px 12px",
                            },
                          }}
                          InputLabelProps={{ shrink: true }}
                        ></TextField>
                        <TextField
                          name={`${fieldProps.label}[${index}].overwriteMiddle`}
                          label={`overwriteMiddle`}
                          onChange={formContext?.handleChange}
                          value={item.overwriteMiddle}
                          variant="outlined"
                          sx={{
                            fontSize: "16px",
                            marginBottom: "20px",
                            width: "182px",
                            padding: "1px 1px",
                          }}
                          inputProps={{
                            style: {
                              padding: "11px 26px 13px 12px",
                            },
                          }}
                          InputLabelProps={{ shrink: true }}
                        ></TextField>
                        <TextField
                          name={`${fieldProps.label}[${index}].overwriteMax`}
                          label={`overwriteMax`}
                          onChange={formContext?.handleChange}
                          value={item.overwriteMax}
                          variant="outlined"
                          sx={{
                            fontSize: "16px",
                            marginBottom: "20px",
                            width: "182px",
                            padding: "1px 1px",
                          }}
                          inputProps={{
                            style: {
                              padding: "11px 26px 13px 12px",
                            },
                          }}
                          InputLabelProps={{ shrink: true }}
                        ></TextField>
                        <Button
                          color="secondary"
                          onClick={() => formHelper.remove(index)}
                        >
                          Remove
                        </Button>
                      </Box>
                    )
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      formHelper.push({
                        overwrite: "",
                        overwriteMin: "",
                        overwriteMiddle: "",
                        overwriteMax: "",
                      })
                    }
                  >
                    Add
                  </Button>
                </Box>
              );
            }}
          </FieldArray>
        </FormikProvider>
      );
    case "popup":
      return (
        <PopupRigidity
          formContext={formContext}
          fieldProps={fieldProps}
        ></PopupRigidity>
      );
    case "filter_parameters": {
      return (
        <Grid item container direction={"column"}>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  name={fieldProps.name}
                  onChange={(e) => {
                    formContext?.setFieldValue(e.target.name, e.target.checked);
                  }}
                  value={formContext?.values?.[fieldProps.name]}
                  color="primary"
                />
              }
              label={fieldProps?.name}
              labelPlacement="start"
              disabled={fieldProps?.userName === "admin" ? false : true}
            />
          </Grid>

          {formContext?.values?.[fieldProps.name] && (
            <>
              <Grid item>
                <TextField
                  name={"Filter_lowDecim"}
                  label={"Filter Low Decim"}
                  onChange={formContext?.handleChange}
                  value={formContext?.values?.["Filter_lowDecim"]}
                  variant="outlined"
                  sx={{
                    fontSize: "16px",
                    marginBottom: "20px",
                    width: "182px",
                    padding: "1px 1px",
                  }}
                  error={Boolean(formContext?.errors?.[fieldProps.label])}
                  helperText={formContext?.errors?.[fieldProps.label]}
                  inputProps={{
                    readOnly: fieldProps?.disabled ? true : false,
                    style: {
                      padding: "11px 26px 13px 12px",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                ></TextField>
              </Grid>
              <Grid item>
                <TextField
                  name={"Filter Low"}
                  label={"Filter_low"}
                  onChange={formContext?.handleChange}
                  value={formContext?.values?.["Filter_low"]}
                  variant="outlined"
                  sx={{
                    fontSize: "16px",
                    marginBottom: "20px",
                    width: "182px",
                    padding: "1px 1px",
                  }}
                  error={Boolean(formContext?.errors?.[fieldProps.label])}
                  helperText={formContext?.errors?.[fieldProps.label]}
                  inputProps={{
                    readOnly: fieldProps?.disabled ? true : false,
                    style: {
                      padding: "11px 26px 13px 12px",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                ></TextField>
              </Grid>
              <Grid item>
                <TextField
                  name={"highPass"}
                  label={"HighPass"}
                  onChange={formContext?.handleChange}
                  value={formContext?.values?.["highPass"]}
                  variant="outlined"
                  sx={{
                    fontSize: "16px",
                    marginBottom: "20px",
                    width: "182px",
                    padding: "1px 1px",
                  }}
                  error={Boolean(formContext?.errors?.[fieldProps.label])}
                  helperText={formContext?.errors?.[fieldProps.label]}
                  inputProps={{
                    readOnly: fieldProps?.disabled ? true : false,
                    style: {
                      padding: "11px 26px 13px 12px",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                ></TextField>
              </Grid>
            </>
          )}
        </Grid>
      );
    }
    default:
      return <div>No Valid Field Type</div>;
      break;
  }
};

export const TorqueChannelInformationForm = ({
  handleFormData,
  formContext,
}: any) => {
  const [optionsChannelInformation, setOptionsChannelInformation] = useState({
    SENSORx: [
      "Ch1",
      "Ch2",
      "Ch3",
      "Ch4",
      "Ch5",
      "CH6",
      "CH7",
      "CH8",
      "No Channel",
    ],
    ChannelType: ["Speed"],
    WheelType: [
      "Standard",
      "1 Missing Tooth",
      "1 Missing + 1 Junction",
      "1 Missing + 2 Junction",
      "1 Missing + 3 Junctions",
      "1 Junction",
      "2 Junctions",
      "3 Junctions",
      "Noisy",
      "Optical",
      "Odd",
    ],
  });

  const { configId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { data: deChannelData, isPending: deChannelisPending } =
    useGetChannelByConfigIdName(
      configId || "",
      formContext?.values["de_channel_sensorx"],
      formContext.dirty
    );

  const { data: ndeChannel, isPending: ndeChannelisPending } =
    useGetChannelByConfigIdName(
      configId || "",
      formContext?.values["nde_channel_sensorx"],
      formContext.dirty
    );
  useEffect(() => {
    if (deChannelData && formContext.dirty && !deChannelisPending) {
      enqueueSnackbar({
        message:
          "Channel has been used in another module the value will be populate automatically or please use another channel",
        variant: "warning",
      });
      formContext.validateForm().then(() => {
        formContext.setFieldValue(
          "de_channel_channel_type",
          deChannelData?.channel_type,
          false
        );
        formContext.setFieldValue(
          "de_channel__teeth",
          deChannelData?.teeth,
          false
        );
        formContext.setFieldValue(
          "de_channel_wheel_type",
          deChannelData?.wheel_type,
          false
        );
      });
      setTimeout(async () => {
        await formContext.validateForm();
      }, 100);
    } else {
      if (formContext.dirty && !deChannelisPending) {
        enqueueSnackbar({
          message: "Channel is not used in another module",
          variant: "info",
        });
      }
      formContext.setFieldValue("de_channel_channel_type", "", false);
      formContext.setFieldValue("de_channel__teeth", "", false);
      formContext.setFieldValue("de_channel_wheel_type", "", false);
      formContext.validateForm();
    }
    return () => {};
  }, [deChannelData, deChannelisPending]);

  useEffect(() => {
    if (ndeChannel && formContext.dirty && !ndeChannelisPending) {
      enqueueSnackbar({
        message:
          "Channel has been used in another module the value will be populate automatically or please use another channel",
        variant: "warning",
      });
      formContext.validateForm().then(() => {
        formContext.setFieldValue(
          "nde_channel_channel_type",
          ndeChannel?.channel_type,
          false
        );
        formContext.setFieldValue(
          "nde_channel_teeth",
          ndeChannel?.teeth,
          false
        );
        formContext.setFieldValue(
          "nde_channel_wheel_type",
          ndeChannel?.wheel_type,
          false
        );
      });
      setTimeout(async () => {
        await formContext.validateForm();
      }, 100);
    } else {
      if (formContext.dirty && !ndeChannelisPending) {
        enqueueSnackbar({
          message: "Channel is not used in another module",
          variant: "info",
        });
      }
      formContext.setFieldValue("nde_channel_channel_type", "", false);
      formContext.setFieldValue("nde_channel_teeth", "", false);
      formContext.setFieldValue("nde_channel_wheel_type", "", false);
      formContext.validateForm();
    }
    return () => {};
  }, [ndeChannel, ndeChannelisPending]);

  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{ marginLeft: "64px", marginTop: "28px" }}
      >
        <Grid item>
          <Typography
            component={"label"}
            sx={{
              width: "143px",
              display: "inline-block",
              fontSize: "16px",
              marginRight: "41px",
              marginBottom: "5px",
            }}
          >
            DE Channel
          </Typography>
        </Grid>
        <Grid container item spacing={1}>
          <Grid item>
            <FormControl
              sx={{ minWidth: "182px", marginBottom: "20px" }}
              error={Boolean(formContext?.errors?.["de_channel_sensorx"])}
            >
              <InputLabel id={`de_channel_sensorx-label`}>Sensorx</InputLabel>
              <Select
                labelId="de_channel_sensorx-label"
                name="de_channel_sensorx"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["de_channel_sensorx"]}
                label={"Sensorx"}
              >
                {optionsChannelInformation["SENSORx"].map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(formContext?.errors?.["de_channel_sensorx"]) && (
                <FormHelperText>
                  {formContext?.errors?.["de_channel_sensorx"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              sx={{ minWidth: "182px", marginBottom: "20px" }}
              error={Boolean(formContext?.errors?.["de_channel_channel_type"])}
            >
              <InputLabel id={`de_channel_channel_type-label`}>
                Sensor_Type
              </InputLabel>
              <Select
                labelId="de_channel_channel_type-label"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["de_channel_channel_type"]}
                name="de_channel_channel_type"
                label={"Channel_Type"}
                inputProps={{
                  readOnly: deChannelData ? true : false,
                }}
              >
                {optionsChannelInformation["ChannelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
              {Boolean(formContext?.errors?.["de_channel_channel_type"]) && (
                <FormHelperText>
                  {formContext?.errors?.["de_channel_channel_type"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              name={"de_channel__teeth"}
              label="Teeth"
              variant="outlined"
              sx={{
                fontSize: "16px",
                marginBottom: "20px",
                width: "182px",
                padding: "1px 1px",
              }}
              onChange={formContext?.handleChange}
              value={formContext?.values?.["de_channel__teeth"]}
              error={Boolean(formContext?.errors?.["de_channel__teeth"])}
              helperText={formContext?.errors?.["de_channel__teeth"]}
              inputProps={{
                readOnly: deChannelData ? true : false,
                style: {
                  padding: "11px 26px 13px 12px",
                },
              }}
            ></TextField>
          </Grid>
          <Grid item>
            <FormControl
              sx={{ minWidth: "182px", marginBottom: "20px" }}
              error={Boolean(formContext?.errors?.["de_channel_wheel_type"])}
            >
              <InputLabel id={`de_channel_wheel_type-label`}>
                Wheel_Type
              </InputLabel>
              <Select
                labelId="de_channel_wheel_type-label"
                name="de_channel_wheel_type"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["de_channel_wheel_type"]}
                label={"Wheel_Type"}
                inputProps={{
                  readOnly: deChannelData ? true : false,
                }}
              >
                {optionsChannelInformation["WheelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
              {Boolean(formContext?.errors?.["de_channel_wheel_type"]) && (
                <FormHelperText>
                  {formContext?.errors?.["de_channel_wheel_type"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        sx={{ marginLeft: "64px", marginTop: "28px" }}
      >
        <Grid item>
          <Typography
            component={"label"}
            sx={{
              width: "143px",
              display: "inline-block",
              fontSize: "16px",
              marginRight: "41px",
              marginBottom: "5px",
            }}
          >
            NDE Channel
          </Typography>
        </Grid>
        <Grid container item spacing={1}>
          <Grid item>
            <FormControl
              sx={{ minWidth: "182px", marginBottom: "20px" }}
              error={Boolean(formContext?.errors?.["nde_channel_sensorx"])}
            >
              <InputLabel id={`nde_channel_sensorx-label`}>Sensorx</InputLabel>
              <Select
                labelId="nde_channel_sensorx-label"
                name="nde_channel_sensorx"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["nde_channel_sensorx"]}
                label={"Sensorx"}
              >
                {optionsChannelInformation["SENSORx"].map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(formContext?.errors?.["nde_channel_sensorx"]) && (
                <FormHelperText>
                  {formContext?.errors?.["nde_channel_sensorx"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              sx={{ minWidth: "182px", marginBottom: "20px" }}
              error={Boolean(formContext?.errors?.["nde_channel_channel_type"])}
            >
              <InputLabel id={`nde_channel_channel_type-label`}>
                Sensor_Type
              </InputLabel>
              <Select
                labelId="nde_channel_channel_type-label"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["nde_channel_channel_type"]}
                name="nde_channel_channel_type"
                label={"Channel_Type"}
                inputProps={{
                  readOnly: ndeChannel ? true : false,
                }}
              >
                {optionsChannelInformation["ChannelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
              {Boolean(formContext?.errors?.["nde_channel_channel_type"]) && (
                <FormHelperText>
                  {formContext?.errors?.["nde_channel_channel_type"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              name={"nde_channel_teeth"}
              label="Teeth"
              variant="outlined"
              sx={{
                fontSize: "16px",
                marginBottom: "20px",
                width: "182px",
                padding: "1px 1px",
              }}
              onChange={formContext?.handleChange}
              value={formContext?.values?.["nde_channel_teeth"]}
              error={Boolean(formContext?.errors?.["nde_channel_teeth"])}
              helperText={formContext?.errors?.["nde_channel_teeth"]}
              inputProps={{
                readOnly: ndeChannel ? true : false,
                style: {
                  padding: "11px 26px 13px 12px",
                },
              }}
            ></TextField>
          </Grid>
          <Grid item>
            <FormControl
              sx={{ minWidth: "182px", marginBottom: "20px" }}
              error={Boolean(formContext?.errors?.["nde_channel_wheel_type"])}
            >
              <InputLabel id={`nde_channel_wheel_type-label`}>
                Wheel_Type
              </InputLabel>
              <Select
                labelId="nde_channel_wheel_type-label"
                name="nde_channel_wheel_type"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["nde_channel_wheel_type"]}
                label={"Wheel_Type"}
                inputProps={{
                  readOnly: ndeChannel ? true : false,
                }}
              >
                {optionsChannelInformation["WheelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
              {Boolean(formContext?.errors?.["nde_channel_wheel_type"]) && (
                <FormHelperText>
                  {formContext?.errors?.["nde_channel_wheel_type"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export const TorqueAssetInformation = ({
  handleFormData,
  formContext,
}: any) => {
  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{ marginLeft: "64px", marginTop: "28px" }}
      >
        {formSchema["Bearing"]["Asset Information"].map((item: any) => (
          <Grid key={item.label} container item>
            <Grid item>
              <Typography
                component={"label"}
                sx={{
                  width: "143px",
                  display: "inline-block",
                  fontSize: "16px",
                  marginRight: "41px",
                  marginBottom: "5px",
                  alignItems: "right",
                }}
              >
                {item.name}
              </Typography>
              {item?.helperNote && (
                <Tooltip title={item.helperNote}>
                  <IconButton>
                    <HelpIcon></HelpIcon>
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
            <Grid item>
              <FormFieldConditionalRender
                type={item.type}
                fieldProps={{ ...item, handleChange: handleFormData }}
                formContext={formContext}
              ></FormFieldConditionalRender>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export const TorqueMachineDetailsForm = ({
  handleFormData,
  formContext,
}: any) => {
  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{ marginLeft: "64px", marginTop: "28px" }}
      >
        {formSchema["Torque"]["Machine Details"].map((item: any) => (
          <Grid key={item.label} container item>
            <Grid item>
              <Typography
                component={"label"}
                sx={{
                  width: "143px",
                  display: "inline-block",
                  fontSize: "16px",
                  marginRight: "41px",
                  marginBottom: "5px",
                  alignItems: "right",
                }}
              >
                {item.name}
              </Typography>
              {item?.helperNote && (
                <Tooltip title={item.helperNote}>
                  <IconButton>
                    <HelpIcon></HelpIcon>
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
            <Grid item>
              <FormFieldConditionalRender
                type={item.type}
                fieldProps={{ ...item, handleChange: handleFormData }}
                formContext={formContext}
              ></FormFieldConditionalRender>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export const TorqueDiagnosticDetails = ({
  handleFormData,
  formContext,
}: any) => {
  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{ marginLeft: "64px", marginTop: "28px" }}
      >
        {formSchema["Torque"]["Diagnostic Details"].map((item: any) => (
          <Grid key={item.label} container item>
            <Grid item>
              <Typography
                component={"label"}
                sx={{
                  width: "143px",
                  display: "inline-block",
                  fontSize: "16px",
                  marginRight: "41px",
                  marginBottom: "5px",
                  alignItems: "right",
                }}
              >
                {item.name}
              </Typography>
              {item?.helperNote && (
                <Tooltip title={item.helperNote}>
                  <IconButton>
                    <HelpIcon></HelpIcon>
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
            <Grid item>
              <FormFieldConditionalRender
                type={item.type}
                fieldProps={{ ...item, handleChange: handleFormData }}
                formContext={formContext}
              ></FormFieldConditionalRender>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export const TorqueAdvancedParameters = ({
  handleFormData,
  formContext,
}: any) => {
  const { userName } = useAuth();

  return (
    <Grid container spacing={1}>
      <Container sx={{ color: "grey" }}>
        *Advance Parameter Can Be Change By Admin Only
      </Container>
      {formSchema["Torque"]["Advanced Parameters"].map((item: any) => (
        <Grid key={item.label} container item>
          <Grid item>
            <FormFieldConditionalRender
              type={item.type}
              fieldProps={{
                ...item,
                handleChange: handleFormData,
                userName: userName,
              }}
              formContext={formContext}
            ></FormFieldConditionalRender>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
