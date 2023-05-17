import { BootstrapInput } from "../../../../../app/components/bootstarp-input";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const SENSORx = [
  "Ch1",
  "Ch2",
  "Ch3",
  "Ch4",
  "Ch5",
  "CH6",
  "CH7",
  "CH8",
  "No Channel",
];

const ChannelType = ["Speed", "Transducer"];
const WheelType = [
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
];

const ChannelInformationForm = ({ handleFormData, formContext }: any) => {
  const optionsChannelInformation = {
    SENSORx,
    ChannelType,
    WheelType,
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item>
          <Typography
            component={"label"}
            sx={{
              width: "143px",
              display: "inline-block",
              fontSize: "16px",
            }}
          >
            Crankshaft
          </Typography>
        </Grid>
        <Grid container item spacing={1}>
          <Grid item>
            <FormControl
              sx={{
                minWidth: "182px",
              }}
              error={Boolean(formContext?.errors?.["Crankshaft_SENSORx"])}
            >
              <InputLabel id={`Crankshaft_SENSORx-label`}>Sensorx</InputLabel>
              <Select
                labelId={`Crankshaft_SENSORx-label`}
                name="Crankshaft_SENSORx"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["Crankshaft_SENSORx"]}
              >
                {optionsChannelInformation["SENSORx"].map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(formContext?.errors?.["Crankshaft_SENSORx"]) && (
                <FormHelperText>
                  {formContext?.errors?.["Crankshaft_SENSORx"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              sx={{
                minWidth: "182px",
              }}
              error={Boolean(formContext?.errors?.["Crankshaft_ChannelType"])}
            >
              <InputLabel id={`Crankshaft_ChannelType-label`}>
                ChannelType
              </InputLabel>
              <Select
                labelId={`Crankshaft_ChannelType-label`}
                onChange={formContext?.handleChange}
                value={formContext?.values?.["Crankshaft_ChannelType"]}
                name="Crankshaft_ChannelType"
              >
                {optionsChannelInformation["ChannelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
              {Boolean(formContext?.errors?.["Crankshaft_ChannelType"]) && (
                <FormHelperText>
                  {formContext?.errors?.["Crankshaft_ChannelType"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              name={"Crankshaft_Teeth"}
              label="Teeth"
              variant="outlined"
              sx={{
                fontSize: "16px",
                width: "182px",
                padding: "1px 1px",
              }}
              onChange={formContext?.handleChange}
              value={formContext?.values?.["Crankshaft_Teeth"]}
              error={Boolean(formContext?.errors?.["Crankshaft_Teeth"])}
              helperText={formContext?.errors?.["Crankshaft_Teeth"]}
              inputProps={{
                style: {
                  padding: "11px 26px 13px 12px",
                },
              }}
            ></TextField>
          </Grid>
          <Grid item>
            <FormControl
              sx={{
                minWidth: "182px",
              }}
              error={Boolean(formContext?.errors?.["Crankshaft_WheelType"])}
            >
              <InputLabel id={`Crankshaft_WheelType-label`}>
                WheelType
              </InputLabel>
              <Select
                labelId={`Crankshaft_WheelType-label`}
                name="Crankshaft_WheelType"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["Crankshaft_WheelType"]}
              >
                {optionsChannelInformation["WheelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
              {Boolean(formContext?.errors?.["Crankshaft_WheelType"]) && (
                <FormHelperText>
                  {formContext?.errors?.["Crankshaft_WheelType"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          mt: 1,
        }}
      >
        <Grid item>
          <Typography
            component={"label"}
            sx={{
              width: "143px",
              display: "inline-block",
              fontSize: "16px",
            }}
          >
            CamShaft
          </Typography>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item>
            <FormControl
              sx={{
                minWidth: "182px",
              }}
              error={Boolean(formContext?.errors?.["CamShaft_SENSORx"])}
            >
              <InputLabel id={`CamShaft_SENSORx-label`}>Sensorx</InputLabel>
              <Select
                labelId={`CamShaft_SENSORx-label`}
                name="CamShaft_SENSORx"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["CamShaft_SENSORx"]}
              >
                {optionsChannelInformation["SENSORx"].map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(formContext?.errors?.["CamShaft_SENSORx"]) && (
                <FormHelperText>
                  {formContext?.errors?.["CamShaft_SENSORx"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              sx={{
                minWidth: "182px",
              }}
              error={Boolean(formContext?.errors?.["CamShaft_ChannelType"])}
            >
              <InputLabel id={`CamShaft_ChannelType-label`}>
                ChannelType
              </InputLabel>
              <Select
                labelId={`CamShaft_ChannelType-label`}
                onChange={formContext?.handleChange}
                value={formContext?.values?.["CamShaft_ChannelType"]}
                name="CamShaft_ChannelType"
              >
                {optionsChannelInformation["ChannelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
              {Boolean(formContext?.errors?.["CamShaft_ChannelType"]) && (
                <FormHelperText>
                  {formContext?.errors?.["CamShaft_ChannelType"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              name={"CamShaft_Teeth"}
              label="Teeth"
              variant="outlined"
              disabled
              sx={{
                fontSize: "16px",
                width: "182px",
                padding: "1px 1px",
              }}
              onChange={formContext?.handleChange}
              value={formContext?.values?.["CamShaft_Teeth"]}
              error={Boolean(formContext?.errors?.["CamShaft_Teeth"])}
              helperText={formContext?.errors?.["CamShaft_Teeth"]}
              inputProps={{
                style: {
                  padding: "11px 26px 13px 12px",
                },
              }}
            ></TextField>
          </Grid>
          <Grid item>
            <FormControl
              sx={{
                minWidth: "182px",
              }}
              error={Boolean(formContext?.errors?.[""])}
            >
              <InputLabel id={`CamShaft_WheelType-label`}>WheelType</InputLabel>
              <Select
                labelId={`CamShaft_WheelType-label`}
                name="CamShaft_WheelType"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["CamShaft_WheelType"]}
                disabled
              >
                {optionsChannelInformation["WheelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
              {Boolean(formContext?.errors?.["CamShaft_WheelType"]) && (
                <FormHelperText>
                  {formContext?.errors?.["CamShaft_WheelType"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 1 }}>
        <Grid item>
          <Typography
            component={"label"}
            sx={{
              width: "143px",
              display: "inline-block",
              fontSize: "16px",
            }}
          >
            TDC
          </Typography>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item>
            <FormControl
              sx={{
                minWidth: "182px",
              }}
              error={Boolean(formContext?.errors?.["TDC_SENSORx"])}
            >
              <InputLabel id={`TDC_SENSORx-label`}>Sensorx</InputLabel>
              <Select
                labelId={`TDC_SENSORx-label`}
                name="TDC_SENSORx"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["TDC_SENSORx"]}
              >
                {optionsChannelInformation["SENSORx"].map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(formContext?.errors?.["TDC_SENSORx"]) && (
                <FormHelperText>
                  {formContext?.errors?.["TDC_SENSORx"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              sx={{
                minWidth: "182px",
              }}
              error={Boolean(formContext?.errors?.["TDC_ChannelType"])}
            >
              <InputLabel id={`TDC_ChannelType-label`}>ChannelType</InputLabel>
              <Select
                labelId={`TDC_ChannelType-label`}
                onChange={formContext?.handleChange}
                value={formContext?.values?.["TDC_ChannelType"]}
                name="TDC_ChannelType"
              >
                {optionsChannelInformation["ChannelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
              {Boolean(formContext?.errors?.["TDC_ChannelType"]) && (
                <FormHelperText>
                  {formContext?.errors?.["TDC_ChannelType"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              name={"TDC_Teeth"}
              label="Teeth"
              variant="outlined"
              disabled
              sx={{
                fontSize: "16px",
                width: "182px",
                padding: "1px 1px",
              }}
              onChange={formContext?.handleChange}
              value={formContext?.values?.["TDC_Teeth"]}
              error={Boolean(formContext?.errors?.["TDC_Teeth"])}
              helperText={formContext?.errors?.["TDC_Teeth"]}
              inputProps={{
                style: {
                  padding: "11px 26px 13px 12px",
                },
              }}
            ></TextField>
          </Grid>
          <Grid item>
            <FormControl
              sx={{
                minWidth: "182px",
              }}
              error={Boolean(formContext?.errors?.["TDC_WheelType"])}
              disabled
            >
              <InputLabel id={`TDC_WheelType-label`}>WheelType</InputLabel>
              <Select
                labelId={`TDC_WheelType-label`}
                name="TDC_WheelType"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["TDC_WheelType"]}
              >
                {optionsChannelInformation["WheelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
              {Boolean(formContext?.errors?.["TDC_WheelType"]) && (
                <FormHelperText>
                  {formContext?.errors?.["TDC_WheelType"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 1 }}>
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
            <FormControl
              sx={{
                minWidth: "182px",
              }}
              error={Boolean(formContext?.errors?.["Peak_Pressure_SENSORx"])}
            >
              <InputLabel id={`Peak_Pressure_SENSORx-label`}>
                Sensorx
              </InputLabel>
              <Select
                labelId={`Peak_Pressure_SENSORx-label`}
                name="Peak_Pressure_SENSORx"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["Peak_Pressure_SENSORx"]}
              >
                {optionsChannelInformation["SENSORx"].map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(formContext?.errors?.["Peak_Pressure_SENSORx"]) && (
                <FormHelperText>
                  {formContext?.errors?.["Peak_Pressure_SENSORx"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              sx={{
                minWidth: "182px",
              }}
              error={Boolean(
                formContext?.errors?.["Peak_Pressure_ChannelType"]
              )}
            >
              <InputLabel id={`Peak_Pressure_ChannelType-label`}>
                ChannelType
              </InputLabel>
              <Select
                labelId={`Peak_Pressure_ChannelType-label`}
                onChange={formContext?.handleChange}
                value={formContext?.values?.["Peak_Pressure_ChannelType"]}
                name="Peak_Pressure_ChannelType"
              >
                {optionsChannelInformation["ChannelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
              {Boolean(formContext?.errors?.["Peak_Pressure_ChannelType"]) && (
                <FormHelperText>
                  {formContext?.errors?.["Peak_Pressure_ChannelType"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              name={"Peak_Pressure_Teeth"}
              label="Teeth"
              variant="outlined"
              disabled
              sx={{
                fontSize: "16px",
                width: "182px",
                padding: "1px 1px",
              }}
              onChange={formContext?.handleChange}
              value={formContext?.values?.["Peak_Pressure_Teeth"]}
              error={Boolean(formContext?.errors?.["Peak_Pressure_Teeth"])}
              helperText={formContext?.errors?.["Peak_Pressure_Teeth"]}
              inputProps={{
                style: {
                  padding: "11px 26px 13px 12px",
                },
              }}
            ></TextField>
          </Grid>
          <Grid item>
            <FormControl
              sx={{
                minWidth: "182px",
              }}
              error={Boolean(formContext?.errors?.["Peak_Pressure_WheelType"])}
              disabled
            >
              <InputLabel id={`Peak_Pressure_WheelType-label`}>
                WheelType
              </InputLabel>
              <Select
                labelId={`Peak_Pressure_WheelType-label`}
                name="Peak_Pressure_WheelType"
                onChange={formContext?.handleChange}
                value={formContext?.values?.["Peak_Pressure_WheelType"]}
              >
                {optionsChannelInformation["WheelType"].map(
                  (option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
              {Boolean(formContext?.errors?.["Peak_Pressure_WheelType"]) && (
                <FormHelperText>
                  {formContext?.errors?.["Peak_Pressure_WheelType"]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              name={"peak_pressure_transducer_sensitivity"}
              label="Transducer Sensitivity"
              variant="outlined"
              sx={{
                fontSize: "16px",
                width: "182px",
                padding: "1px 1px",
              }}
              onChange={formContext?.handleChange}
              error={Boolean(
                formContext?.errors?.["peak_pressure_transducer_sensitivity"]
              )}
              helperText={
                formContext?.errors?.["peak_pressure_transducer_sensitivity"]
              }
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
