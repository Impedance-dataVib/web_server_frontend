import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import formSchema, { OVER_WRITE_INDICATORS } from "../formSchema";
import { PopupRigidity } from "../modals/calculateRigidityModal";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import { useGetChannelByConfigIdName } from "../hooks";
import { useParams } from "react-router-dom";
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
    case "popup":
      return (
        <>
          <PopupRigidity
            formContext={formContext}
            fieldProps={fieldProps}
          ></PopupRigidity>
        </>
      );

    case "toggle":
      return (
        <FormControlLabel
          control={
            <Switch
              name={fieldProps.label}
              onChange={formContext?.handleChange}
              checked={formContext?.values?.[fieldProps.label]}
              color="primary"
            />
          }
          label={fieldProps?.name}
          labelPlacement="end"
          disabled={fieldProps?.userName === "admin" ? false : true}
        />
      );
    case "array_overwrite":
      return (
        <FormikProvider value={formContext}>
          <FieldArray name={fieldProps.label}>
            {(formHelper: FieldArrayRenderProps) => {
              return (
                <>
                  <Box>
                    <FormControlLabel
                      control={
                        <Switch
                          name={"has_overwrite_parameters"}
                          onChange={(e) => {
                            formContext?.setFieldValue(
                              e.target.name,
                              e.target.checked
                            );
                          }}
                          checked={
                            formContext?.values?.has_overwrite_parameters
                          }
                          color="primary"
                        />
                      }
                      label={"Overwrite parameters"}
                      labelPlacement="end"
                      disabled={fieldProps?.userName === "admin" ? false : true}
                    />
                  </Box>
                  {formContext?.values?.has_overwrite_parameters && (
                    <Box>
                      {formContext?.values?.[fieldProps.label].map(
                        (item: any, index: number) => (
                          <Box key={index}>
                            <FormControl
                              sx={{ minWidth: "182px", marginBottom: "20px" }}
                              // error={Boolean(
                              //   formContext?.errors?.[fieldProps.label]
                              // )}
                              disabled={
                                fieldProps?.userName === "admin" ? false : true
                              }
                            >
                              <InputLabel
                                id={`${fieldProps.label}[${index}]-overwrite-label`}
                              >
                                {`overwrite`}
                              </InputLabel>
                              <Select
                                labelId={`${fieldProps.label}[${index}]-overwrite-label`}
                                name={`${fieldProps.label}[${index}].overwrite`}
                                onChange={formContext?.handleChange}
                                label={`overwrite`}
                                value={item.overwrite}
                              >
                                <MenuItem value={""}>None</MenuItem>
                                {OVER_WRITE_INDICATORS["Bearing"].map(
                                  (option: string) => (
                                    <MenuItem key={option} value={option}>
                                      {option}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                              {/* {Boolean(formContext?.errors?.[fieldProps.label]) && (
                            <FormHelperText>
                              {formContext?.errors?.[fieldProps.label]}
                            </FormHelperText>
                          )} */}
                            </FormControl>

                            <TextField
                              name={`${fieldProps.label}[${index}].overwriteMin`}
                              label={`overwriteMin`}
                              onChange={formContext?.handleChange}
                              value={item.overwriteMin}
                              variant="outlined"
                              disabled={
                                fieldProps?.userName === "admin" ? false : true
                              }
                              sx={{
                                fontSize: "16px",
                                marginBottom: "20px",
                                width: "182px",
                                padding: "1px 1px",
                              }}
                              inputProps={{
                                style: {
                                  padding: "11px 26px 18px 12px",
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
                              disabled={
                                fieldProps?.userName === "admin" ? false : true
                              }
                              sx={{
                                fontSize: "16px",
                                marginBottom: "20px",
                                width: "182px",
                                padding: "1px 1px",
                              }}
                              inputProps={{
                                style: {
                                  padding: "11px 26px 18px 12px",
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
                              disabled={
                                fieldProps?.userName === "admin" ? false : true
                              }
                              sx={{
                                fontSize: "16px",
                                marginBottom: "20px",
                                width: "182px",
                                padding: "1px 1px",
                              }}
                              inputProps={{
                                style: {
                                  padding: "11px 26px 18px 12px",
                                },
                              }}
                              InputLabelProps={{ shrink: true }}
                            ></TextField>
                            <Button
                              color="secondary"
                              disabled={
                                fieldProps?.userName === "admin" ? false : true
                              }
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
                        disabled={
                          fieldProps?.userName === "admin" ? false : true
                        }
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
                  )}
                </>
              );
            }}
          </FieldArray>
        </FormikProvider>
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
                  checked={formContext?.values?.[fieldProps.name]}
                  color="primary"
                />
              }
              label={fieldProps?.label}
              labelPlacement="end"
              disabled={fieldProps?.userName === "admin" ? false : true}
            />
          </Grid>

          {formContext?.values?.[fieldProps.name] && (
            <>
              <Grid item>
                <Typography
                  component={"label"}
                  sx={{
                    width: "143px",
                    display: "inline-block",
                    fontSize: "13px",
                    marginRight: "41px",
                    marginLeft: "15px",
                    marginBottom: "5px",
                    alignItems: "right",
                  }}
                >
                  Filter Low Decim
                </Typography>
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
                  disabled={fieldProps?.userName === "admin" ? false : true}
                ></TextField>
              </Grid>
              <Grid item>
                <Typography
                  component={"label"}
                  sx={{
                    width: "143px",
                    display: "inline-block",
                    fontSize: "13px",
                    marginRight: "41px",
                    marginLeft: "15px",
                    marginBottom: "5px",
                    alignItems: "right",
                  }}
                >
                  Filter low
                </Typography>
                <TextField
                  name={"Filter Low"}
                  label={"Filter low"}
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
                  disabled={fieldProps?.userName === "admin" ? false : true}
                ></TextField>
              </Grid>
              <Grid item>
                <Typography
                  component={"label"}
                  sx={{
                    width: "143px",
                    display: "inline-block",
                    fontSize: "13px",
                    marginRight: "41px",
                    marginLeft: "15px",
                    marginBottom: "5px",
                    alignItems: "right",
                  }}
                >
                  High Pass
                </Typography>
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
                  disabled={fieldProps?.userName === "admin" ? false : true}
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

export const MotorChannelInformationForm = ({
  handleFormData,
  formContext,
}: any) => {
  const [optionsChannelInformation, setOptionsChannelInformation] = useState({
    SENSORx: [
      "No Channel",
      "Ch1",
      "Ch2",
      "Ch3",
      "Ch4",
      "Ch5",
      "CH6",
      "CH7",
      "CH8",
    ],
    ChannelType: ["Speed", "Transducer"],
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
  const { data, isPending } = useGetChannelByConfigIdName(
    configId || "",
    formContext?.values["motor_crankshaft_sensorx"],
    formContext.dirty
  );
  useEffect(() => {
    if (data && formContext.dirty && !isPending) {
      enqueueSnackbar({
        message:
          "Channel has been used in another module the value will be populate automatically or please use another channel",
        variant: "warning",
      });
      formContext.validateForm().then(() => {
        formContext.setFieldValue(
          "motor_crankshaft_channel_type",
          data?.channel_type,
          false
        );
        formContext.setFieldValue("motor_crankshaft_teeth", data?.teeth, false);
        formContext.setFieldValue(
          "motor_crankshaft_wheel_type",
          data?.wheel_type,
          false
        );
      });
      setTimeout(async () => {
        await formContext.validateForm();
      }, 100);
    } else {
      if (formContext.dirty && !isPending) {
        enqueueSnackbar({
          message: "Channel is not used in another module",
          variant: "info",
        });
      }
      formContext.setFieldValue("motor_crankshaft_channel_type", "", false);
      formContext.setFieldValue("motor_crankshaft_teeth", "", false);
      formContext.setFieldValue("motor_crankshaft_wheel_type", "", false);
      formContext.validateForm();
    }
    return () => {};
  }, [data, isPending]);
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
            Sensor
          </Typography>
        </Grid>
        <Grid container item spacing={1}>
          <Grid item>
            <FormControl
              sx={{ minWidth: "182px", marginBottom: "20px" }}
              error={Boolean(formContext?.errors?.["motor_crankshaft_sensorx"])}
            >
              <InputLabel id={`motor_crankshaft_sensorx-label`}>
                Sensorx
              </InputLabel>
              <Select
                labelId="motor_crankshaft_sensorx-label"
                name="motor_crankshaft_sensorx"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["motor_crankshaft_sensorx"]}
                label={"Sensorx"}
              >
                {optionsChannelInformation["SENSORx"].map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(formContext?.errors?.["motor_crankshaft_sensorx"]) && (
                <FormHelperText>
                  {formContext?.errors?.["motor_crankshaft_sensorx"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              sx={{ minWidth: "182px", marginBottom: "20px" }}
              error={Boolean(
                formContext?.errors?.["motor_crankshaft_channel_type"]
              )}
            >
              <InputLabel id={`motor_crankshaft_channel_type-label`}>
                Sensor_Type
              </InputLabel>
              <Select
                labelId="motor_crankshaft_channel_type-label"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["motor_crankshaft_channel_type"]}
                name="motor_crankshaft_channel_type"
                label={"Channel_Type"}
                inputProps={{
                  readOnly: data ? true : false,
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
              {Boolean(
                formContext?.errors?.["motor_crankshaft_channel_type"]
              ) && (
                <FormHelperText>
                  {formContext?.errors?.["motor_crankshaft_channel_type"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {formContext?.values["motor_crankshaft_channel_type"] === "Speed" && (
            <>
              <Grid item>
                <TextField
                  name={"motor_crankshaft_teeth"}
                  label="Teeth"
                  variant="outlined"
                  sx={{
                    fontSize: "16px",
                    marginBottom: "20px",
                    width: "182px",
                    padding: "1px 1px",
                  }}
                  onChange={formContext?.handleChange}
                  value={formContext?.values?.["motor_crankshaft_teeth"]}
                  error={Boolean(
                    formContext?.errors?.["motor_crankshaft_teeth"]
                  )}
                  helperText={formContext?.errors?.["motor_crankshaft_teeth"]}
                  inputProps={{
                    readOnly: data ? true : false,
                    style: {
                      padding: "11px 26px 13px 12px",
                    },
                  }}
                ></TextField>
              </Grid>
              <Grid item>
                <FormControl
                  sx={{ minWidth: "182px", marginBottom: "20px" }}
                  error={Boolean(
                    formContext?.errors?.["motor_crankshaft_wheel_type"]
                  )}
                >
                  <InputLabel id={`motor_crankshaft_wheel_type-label`}>
                    Wheel_Type
                  </InputLabel>
                  <Select
                    labelId="motor_crankshaft_wheel_type-label"
                    name="motor_crankshaft_wheel_type"
                    onChange={formContext?.handleChange}
                    value={formContext?.values?.["motor_crankshaft_wheel_type"]}
                    label={"Wheel_Type"}
                    inputProps={{
                      readOnly: data ? true : false,
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
                  {Boolean(
                    formContext?.errors?.["motor_crankshaft_wheel_type"]
                  ) && (
                    <FormHelperText>
                      {formContext?.errors?.["motor_crankshaft_wheel_type"]}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </>
          )}
          {formContext?.values["motor_crankshaft_channel_type"] ===
            "Transducer" && (
            <>
              <Grid item>
                <FormControl
                  sx={{ minWidth: "182px", marginBottom: "20px" }}
                  error={Boolean(
                    formContext?.errors?.["motor_crankshaft_wheel_type"]
                  )}
                >
                  <InputLabel id={`motor_crankshaft_unit-label`}>
                    Unit
                  </InputLabel>
                  <Select
                    labelId="motor_crankshaft_unit-label"
                    name="motor_crankshaft_unit"
                    value={formContext?.values["motor_crankshaft_unit"]}
                    onChange={formContext?.handleChange}
                    label={"Unit"}
                    inputProps={{
                      readOnly: data ? true : false,
                    }}
                  >
                    {["", "g", "v", "um"].map((option: string) => (
                      <MenuItem
                        key={option === "" ? "none" : option}
                        value={option}
                      >
                        {option === "" ? "none" : option}
                      </MenuItem>
                    ))}
                  </Select>
                  {Boolean(formContext?.errors?.["motor_crankshaft_unit"]) && (
                    <FormHelperText>
                      {formContext?.errors?.["motor_crankshaft_unit"]}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl
                  sx={{ minWidth: "182px", marginBottom: "20px" }}
                  error={Boolean(
                    formContext?.errors?.["motor_crankshaft_sensitivity"]
                  )}
                >
                  <InputLabel id={`motor_crankshaft_sensitivity-label`}>
                    Sensitivity(mV)
                  </InputLabel>
                  <Select
                    labelId="motor_crankshaft_sensitivity-label"
                    name="motor_crankshaft_sensitivity"
                    value={formContext?.values["motor_crankshaft_sensitivity"]}
                    onChange={formContext?.handleChange}
                    label={"Sensitivity(mV)"}
                    inputProps={{
                      readOnly: data ? true : false,
                    }}
                  >
                    {["", "10", "100", "1000"].map((option: string) => (
                      <MenuItem
                        key={option === "" ? "none" : option}
                        value={option}
                      >
                        {option === "" ? "none" : option}
                      </MenuItem>
                    ))}
                  </Select>
                  {Boolean(
                    formContext?.errors?.["motor_crankshaft_sensitivity"]
                  ) && (
                    <FormHelperText>
                      {formContext?.errors?.["motor_crankshaft_sensitivity"]}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl
                  sx={{ minWidth: "182px", marginBottom: "20px" }}
                  error={Boolean(
                    formContext?.errors?.["motor_crankshaft_power_source"]
                  )}
                >
                  <InputLabel id={`motor_crankshaft_power_source-label`}>
                    Power Source
                  </InputLabel>
                  <Select
                    labelId="motor_crankshaft_power_source-label"
                    name="motor_crankshaft_power_source"
                    value={formContext?.values["motor_crankshaft_power_source"]}
                    onChange={formContext?.handleChange}
                    label={"Power Source"}
                    inputProps={{
                      readOnly: data ? true : false,
                    }}
                  >
                    {["None", "IEPE"].map((option: string) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {Boolean(
                    formContext?.errors?.["motor_crankshaft_power_source"]
                  ) && (
                    <FormHelperText>
                      {formContext?.errors?.["motor_crankshaft_power_source"]}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl
                  sx={{ minWidth: "182px", marginBottom: "20px" }}
                  error={Boolean(
                    formContext?.errors?.["motor_crankshaft_ac_dc"]
                  )}
                >
                  <InputLabel id={`motor_crankshaft_ac_dc-label`}>
                    AC/DC
                  </InputLabel>
                  <Select
                    labelId="motor_crankshaft_ac_dc-label"
                    name="motor_crankshaft_ac_dc"
                    value={formContext?.values["motor_crankshaft_ac_dc"]}
                    onChange={formContext?.handleChange}
                    label={"AC/DC"}
                    inputProps={{
                      readOnly: data ? true : false,
                    }}
                  >
                    {["None", "AC", "DC"].map((option: string) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {Boolean(formContext?.errors?.["motor_crankshaft_ac_dc"]) && (
                    <FormHelperText>
                      {formContext?.errors?.["motor_crankshaft_ac_dc"]}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export const MotorAssetInformation = ({ handleFormData, formContext }: any) => {
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
export const MotorMachineDetailsForm = ({
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
        {formSchema["Motor"]["Machine Details"].map((item: any) => (
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

export const MotorDiagnosticDetails = ({
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
        {formSchema["Motor"]["Diagnostic Details"].map((item: any) => (
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

export const MotorAdvancedParameters = ({
  handleFormData,
  formContext,
}: any) => {
  const { userName } = useAuth();

  return (
    <Grid container spacing={1}>
      <Container sx={{ color: "grey" }}>
        *Advance Parameter Can Be Change By Admin Only
      </Container>
      {formSchema["Motor"]["Advanced Parameters"].map((item: any) => (
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
