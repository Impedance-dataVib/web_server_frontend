import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { BootstrapInput } from "../../../app/components/bootstarp-input";
import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import formSchema from "../formSchema";

export const ChannelInformationForm = ({ handleFormData }: any) => {
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
            <FormControl sx={{ minWidth: "182px", marginBottom: "20px" }}>
              <Select
                name="Crankshaft_SENSORx"
                onChange={(e) => console.log(e)}
                input={<BootstrapInput></BootstrapInput>}
              >
                {optionsChannelInformation["SENSORx"].map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: "182px", marginBottom: "20px" }}>
              <Select
                onChange={(e) => console.log(e)}
                name="Crankshaft_ChannelType"
                input={<BootstrapInput></BootstrapInput>}
              >
                {optionsChannelInformation["ChannelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              name={"Crankshaft_Teeth"}
              label="Teeth"
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
            ></TextField>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: "182px", marginBottom: "20px" }}>
              <Select
                name="Crankshaft_WheelType"
                onChange={(e) => console.log(e)}
                input={<BootstrapInput></BootstrapInput>}
              >
                {optionsChannelInformation["WheelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ marginLeft: "64px", marginTop: "28px" }}>
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
            CamShaft
          </Typography>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item>
            <FormControl sx={{ minWidth: "182px", marginBottom: "20px" }}>
              <Select
                name="CamShaft_SENSORx"
                onChange={(e) => console.log(e)}
                input={<BootstrapInput></BootstrapInput>}
              >
                {optionsChannelInformation["SENSORx"].map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: "182px", marginBottom: "20px" }}>
              <Select
                onChange={(e) => console.log(e)}
                name="CamShaft_ChannelType"
                input={<BootstrapInput></BootstrapInput>}
              >
                {optionsChannelInformation["ChannelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              name={"CamShaft_Teeth"}
              label="Teeth"
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
            ></TextField>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: "182px", marginBottom: "20px" }}>
              <Select
                name="CamShaft_WheelType"
                onChange={(e) => console.log(e)}
                input={<BootstrapInput></BootstrapInput>}
              >
                {optionsChannelInformation["WheelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ marginLeft: "64px", marginTop: "28px" }}>
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
            TDC
          </Typography>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item>
            <FormControl sx={{ minWidth: "182px", marginBottom: "20px" }}>
              <Select
                name="TDC_SENSORx"
                onChange={(e) => console.log(e)}
                input={<BootstrapInput></BootstrapInput>}
              >
                {optionsChannelInformation["SENSORx"].map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: "182px", marginBottom: "20px" }}>
              <Select
                onChange={(e) => console.log(e)}
                name="TDC_ChannelType"
                input={<BootstrapInput></BootstrapInput>}
              >
                {optionsChannelInformation["ChannelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              name={"TDC_Teeth"}
              label="Teeth"
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
            ></TextField>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: "182px", marginBottom: "20px" }}>
              <Select
                name="TDC_WheelType"
                onChange={(e) => console.log(e)}
                input={<BootstrapInput></BootstrapInput>}
              >
                {optionsChannelInformation["WheelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ marginLeft: "64px", marginTop: "28px" }}>
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
            Peak Pressure
          </Typography>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item>
            <FormControl sx={{ minWidth: "182px", marginBottom: "20px" }}>
              <Select
                name="Peak_Pressure_SENSORx"
                onChange={(e) => console.log(e)}
                input={<BootstrapInput></BootstrapInput>}
              >
                {optionsChannelInformation["SENSORx"].map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: "182px", marginBottom: "20px" }}>
              <Select
                onChange={(e) => console.log(e)}
                name="Peak_Pressure_ChannelType"
                input={<BootstrapInput></BootstrapInput>}
              >
                {optionsChannelInformation["ChannelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              name={"Peak_Pressure_Teeth"}
              label="Teeth"
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
            ></TextField>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: "182px", marginBottom: "20px" }}>
              <Select
                name="Peak_Pressure_WheelType"
                onChange={(e) => console.log(e)}
                input={<BootstrapInput></BootstrapInput>}
              >
                {optionsChannelInformation["WheelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              name={"peak_pressure_transducer_sensitivity"}
              label="Transducer Sensitivity"
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
            ></TextField>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const FormFieldConditionalRender = ({ type, fieldProps }: any) => {
  switch (type) {
    case "dropdown":
      return (
        <FormControl sx={{ minWidth: "182px", marginBottom: "20px" }}>
          <InputLabel id={fieldProps.label}>{fieldProps.name}</InputLabel>
          <Select
            name={fieldProps.label}
            onChange={fieldProps.handleChange}
            label={fieldProps.name}
          >
            {fieldProps.options.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );

    case "text":
      return (
        <TextField
          name={fieldProps.label}
          label={fieldProps.name}
          onChange={fieldProps.handleChange}
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
        ></TextField>
      );
    case "toggle":
      return <></>;
    default:
      return <div>No Valid Field Type</div>;
      break;
  }
};
export const EngineDetailsForm = ({ handleFormData }: any) => {
  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{ marginLeft: "64px", marginTop: "28px" }}
      >
        {formSchema["Engine"]["Engine Details"].map((item: any) => (
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
            </Grid>
            <Grid item>
              <FormFieldConditionalRender
                type={item.type}
                fieldProps={{ ...item, handleChange: handleFormData }}
              ></FormFieldConditionalRender>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export const DiagnosticDetailsForm = ({ handleFormData }: any) => {
  return (
    <Grid container spacing={1} sx={{ marginLeft: "64px", marginTop: "28px" }}>
      {formSchema["Engine"]["Diagnostic Details"].map((item: any) => (
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
          </Grid>
          <Grid item>
            <FormFieldConditionalRender
              type={item.type}
              fieldProps={{ ...item, handleChange: handleFormData }}
            ></FormFieldConditionalRender>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export const AdvancedParameters = ({ handleFormData }: any) => {
  return (
    <Grid container spacing={1} sx={{ marginLeft: "64px", marginTop: "28px" }}>
      {formSchema["Engine"]["Advanced Parameters"].map((item: any) => (
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
          </Grid>
          <Grid item>
            <FormFieldConditionalRender
              type={item.type}
              fieldProps={{ ...item, handleChange: handleFormData }}
            ></FormFieldConditionalRender>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
