import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { BootstrapInput } from "../../../app/components/bootstarp-input";
import { Typography } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import formSchema from "../formSchema";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
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
      return <></>;
    default:
      return <div>No Valid Field Type</div>;
      break;
  }
};

export const TurbineChannelInformationForm = ({
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
            Crankshaft
          </Typography>
        </Grid>
        <Grid container item spacing={1}>
          <Grid item>
            <FormControl
              sx={{ minWidth: "182px", marginBottom: "20px" }}
              error={Boolean(
                formContext?.errors?.["turbine_crankshaft_sensorx"]
              )}
            >
              <InputLabel id={`turbine_crankshaft_sensorx-label`}>
                Sensorx
              </InputLabel>
              <Select
                labelId="turbine_crankshaft_sensorx-label"
                name="turbine_crankshaft_sensorx"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["turbine_crankshaft_sensorx"]}
                label={"Sensorx"}
              >
                {optionsChannelInformation["SENSORx"].map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(formContext?.errors?.["turbine_crankshaft_sensorx"]) && (
                <FormHelperText>
                  {formContext?.errors?.["turbine_crankshaft_sensorx"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              sx={{ minWidth: "182px", marginBottom: "20px" }}
              error={Boolean(
                formContext?.errors?.["turbine_crankshaft_channel_type"]
              )}
            >
              <InputLabel id={`turbine_crankshaft_channel_type-label`}>
                Channel_Type
              </InputLabel>
              <Select
                labelId="turbine_crankshaft_channel_type-label"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["turbine_crankshaft_channel_type"]}
                name="turbine_crankshaft_channel_type"
                label={"Channel_Type"}
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
                formContext?.errors?.["turbine_crankshaft_channel_type"]
              ) && (
                <FormHelperText>
                  {formContext?.errors?.["turbine_crankshaft_channel_type"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              name={"turbine_crankshaft_teeth"}
              label="Teeth"
              variant="outlined"
              sx={{
                fontSize: "16px",
                marginBottom: "20px",
                width: "182px",
                padding: "1px 1px",
              }}
              onChange={formContext?.handleChange}
              value={formContext?.values?.["turbine_crankshaft_teeth"]}
              error={Boolean(formContext?.errors?.["turbine_crankshaft_teeth"])}
              helperText={formContext?.errors?.["turbine_crankshaft_teeth"]}
              inputProps={{
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
                formContext?.errors?.["turbine_crankshaft_wheel_type"]
              )}
            >
              <InputLabel id={`turbine_crankshaft_wheel_type-label`}>
                Wheel_Type
              </InputLabel>
              <Select
                labelId="turbine_crankshaft_wheel_type-label"
                name="turbine_crankshaft_wheel_type"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["turbine_crankshaft_wheel_type"]}
                label={"Wheel_Type"}
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
                formContext?.errors?.["turbine_crankshaft_wheel_type"]
              ) && (
                <FormHelperText>
                  {formContext?.errors?.["turbine_crankshaft_wheel_type"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export const TurbineAssetInformation = ({
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
export const TurbineMachineDetailsForm = ({
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
        {formSchema["Turbine"]["Machine Details"].map((item: any) => (
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

export const TurbineDiagnosticDetails = ({
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
        {formSchema["Turbine"]["Diagnostic Details"].map((item: any) => (
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
