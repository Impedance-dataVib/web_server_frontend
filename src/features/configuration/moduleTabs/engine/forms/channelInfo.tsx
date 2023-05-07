import { BootstrapInput } from "../../../../../app/components/bootstarp-input";
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const ChannelInformationForm = ({ handleFormData, formContext }: any) => {
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
                onChange={formContext?.handleChange}
                value={formContext?.values?.["Crankshaft_SENSORx"]}
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
                onChange={formContext?.handleChange}
                value={formContext?.values?.["Crankshaft_ChannelType"]}
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
              onChange={formContext?.handleChange}
              value={formContext?.values?.["Crankshaft_Teeth"]}
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
                onChange={formContext?.handleChange}
                value={formContext?.values?.["Crankshaft_WheelType"]}
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
                onChange={formContext?.handleChange}
                value={formContext?.values?.["CamShaft_SENSORx"]}
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
                onChange={formContext?.handleChange}
                value={formContext?.values?.["CamShaft_ChannelType"]}
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
              onChange={formContext?.handleChange}
              value={formContext?.values?.["CamShaft_Teeth"]}
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
                onChange={formContext?.handleChange}
                value={formContext?.values?.["CamShaft_WheelType"]}
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
                onChange={formContext?.handleChange}
                value={formContext?.values?.["TDC_SENSORx"]}
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
                onChange={formContext?.handleChange}
                value={formContext?.values?.["TDC_ChannelType"]}
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
              onChange={formContext?.handleChange}
              value={formContext?.values?.["TDC_Teeth"]}
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
                onChange={formContext?.handleChange}
                value={formContext?.values?.["TDC_WheelType"]}
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
                onChange={formContext?.handleChange}
                value={formContext?.values?.["Peak_Pressure_SENSORx"]}
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
                onChange={formContext?.handleChange}
                value={formContext?.values?.["Peak_Pressure_ChannelType"]}
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
              onChange={formContext?.handleChange}
              value={formContext?.values?.["Peak_Pressure_Teeth"]}
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
                onChange={formContext?.handleChange}
                value={formContext?.values?.["Peak_Pressure_WheelType"]}
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
              onChange={formContext?.handleChange}
              value={
                formContext?.values?.["peak_pressure_transducer_sensitivity"]
              }
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
export default ChannelInformationForm;
