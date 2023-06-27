import { useParams } from "react-router-dom";
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
import { useEffect } from "react";
import { useGetChannelByConfigIdName } from "src/features/configuration/hooks";
import { useSnackbar } from "notistack";

const SENSORx = [
  "No Channel",
  "Ch1",
  "Ch2",
  "Ch3",
  "Ch4",
  "Ch5",
  "CH6",
  "CH7",
  "CH8",
];

const ChannelType = ["Speed"];
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

  const { configId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { data: crankShatftData, isPending: crankShaftisPending } =
    useGetChannelByConfigIdName(
      configId || "",
      formContext?.values["Crankshaft_SENSORx"],
      formContext.dirty
    );
  useEffect(() => {
    if (crankShatftData && formContext.dirty && !crankShaftisPending) {
      enqueueSnackbar({
        message:
          "Channel has been used in another module the value will be populate automatically or please use another channel",
        variant: "warning",
      });
      formContext.validateForm().then(() => {
        formContext.setFieldValue(
          "Crankshaft_ChannelType",
          crankShatftData?.channel_type,
          true
        );
        formContext.setFieldValue(
          "Crankshaft_Teeth",
          crankShatftData?.teeth,
          true
        );
        formContext.setFieldValue(
          "Crankshaft_WheelType",
          crankShatftData?.wheel_type,
          true
        );
      });
      setTimeout(async () => {
        await formContext.validateForm();
      }, 100);
    } else {
      if (formContext.dirty && !crankShaftisPending) {
        enqueueSnackbar({
          message: "Channel is not used in another module",
          variant: "info",
        });
      }
      formContext.validateForm().then(() => {
        formContext.setFieldValue("Crankshaft_ChannelType", "", false);
        formContext.setFieldValue("Crankshaft_Teeth", "", false);
        formContext.setFieldValue("Crankshaft_WheelType", "", false);
      });
    }
    return () => {};
  }, [crankShatftData, crankShaftisPending]);
  const { data: camShatftData, isPending: camShaftisPending } =
    useGetChannelByConfigIdName(
      configId || "",
      formContext?.values["CamShaft_SENSORx"],
      formContext.dirty
    );
  useEffect(() => {
    if (camShatftData && formContext.dirty && !camShaftisPending) {
      enqueueSnackbar({
        message:
          "Channel has been used in another module the value will be populate automatically or please use another channel",
        variant: "warning",
      });
      formContext.validateForm().then(() => {
        formContext.setFieldValue(
          "CamShaft_ChannelType",
          camShatftData?.channel_type,
          false
        );
        formContext.setFieldValue(
          "CamShaft_Teeth",
          camShatftData?.teeth,
          false
        );
        formContext.setFieldValue(
          "CamShaft_WheelType",
          camShatftData?.wheel_type,
          false
        );
      });
      setTimeout(async () => {
        await formContext.validateForm();
      }, 100);
    } else {
      if (formContext.dirty) {
        enqueueSnackbar({
          message: "Channel is not used in another module",
          variant: "info",
        });
      }
      formContext.setFieldValue("CamShaft_ChannelType", "", false);
      formContext.setFieldValue("CamShaft_Teeth", "", false);
      formContext.setFieldValue("CamShaft_WheelType", "", false);
      formContext.validateForm();
    }
    return () => {};
  }, [camShatftData, camShaftisPending]);

  const { data: tdcData, isPending: tdcIsPending } =
    useGetChannelByConfigIdName(
      configId || "",
      formContext?.values["TDC_SENSORx"],
      formContext.dirty
    );
  useEffect(() => {
    if (tdcData && formContext.dirty && !tdcIsPending) {
      enqueueSnackbar({
        message:
          "Channel has been used in another module the value will be populate automatically or please use another channel",
        variant: "warning",
      });
      formContext.validateForm().then(() => {
        formContext.setFieldValue(
          "TDC_ChannelType",
          tdcData?.channel_type,
          false
        );
        formContext.setFieldValue("TDC_Teeth", tdcData?.teeth, false);
        formContext.setFieldValue("TDC_WheelType", tdcData?.wheel_type, false);
      });
      setTimeout(async () => {
        await formContext.validateForm();
      }, 100);
    } else {
      if (formContext.dirty && !tdcIsPending) {
        enqueueSnackbar({
          message: "Channel is not used in another module",
          variant: "info",
        });
      }
      formContext.setFieldValue("TDC_ChannelType", "", false);
      formContext.setFieldValue("TDC_Teeth", "", false);
      formContext.setFieldValue("TDC_WheelType", "", false);
      formContext.validateForm();
    }
    return () => {};
  }, [tdcData, tdcIsPending]);

  const { data: peakPressureData, isPending: peakPressureIsPending } =
    useGetChannelByConfigIdName(
      configId || "",
      formContext?.values["Peak_Pressure_SENSORx"],
      formContext.dirty
    );
  useEffect(() => {
    if (peakPressureData && formContext.dirty && !peakPressureIsPending) {
      enqueueSnackbar({
        message:
          "Channel has been used in another module the value will be populate automatically or please use another channel",
        variant: "warning",
      });
      formContext.validateForm().then(() => {
        formContext.setFieldValue(
          "Peak_Pressure_ChannelType",
          peakPressureData?.channel_type,
          false
        );
        formContext.setFieldValue(
          "Peak_Pressure_Teeth",
          peakPressureData?.teeth,
          false
        );
        formContext.setFieldValue(
          "Peak_Pressure_WheelType",
          peakPressureData?.wheel_type,
          false
        );
      });
      setTimeout(async () => {
        await formContext.validateForm();
      }, 100);
    } else {
      if (formContext.dirty && !peakPressureIsPending) {
        enqueueSnackbar({
          message: "Channel is not used in another module",
          variant: "info",
        });
      }
      formContext.validateForm().then(() => {
        formContext.setFieldValue("Peak_Pressure_ChannelType", "", false);
        formContext.setFieldValue("Peak_Pressure_Teeth", "", false);
        formContext.setFieldValue("Peak_Pressure_WheelType", "", false);
      });
    }
    return () => {};
  }, [peakPressureData, peakPressureIsPending]);

  return (
    <>
      <Grid container spacing={1} width={"100%"}>
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
                label={"Sensorx"}
              >
                {optionsChannelInformation["SENSORx"]
                  .filter((item) => item !== "No Channel")
                  .map((option: string) => (
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
                Sensor_Type
              </InputLabel>
              <Select
                labelId={`Crankshaft_ChannelType-label`}
                onChange={formContext?.handleChange}
                value={formContext?.values?.["Crankshaft_ChannelType"]}
                name="Crankshaft_ChannelType"
                label={"ChannelType"}
                inputProps={{
                  readOnly: crankShatftData ? true : false,
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
                readOnly: crankShatftData ? true : false,
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
                label={"WheelType"}
                inputProps={{
                  readOnly: crankShatftData ? true : false,
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
                label={"Sensorx"}
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
          {formContext?.values?.["CamShaft_SENSORx"] !== "No Channel" && (
            <>
              <Grid item>
                <FormControl
                  sx={{
                    minWidth: "182px",
                  }}
                  error={Boolean(formContext?.errors?.["CamShaft_ChannelType"])}
                >
                  <InputLabel id={`CamShaft_ChannelType-label`}>
                    Sensor_Type
                  </InputLabel>
                  <Select
                    labelId={`CamShaft_ChannelType-label`}
                    onChange={formContext?.handleChange}
                    value={formContext?.values?.["CamShaft_ChannelType"]}
                    name="CamShaft_ChannelType"
                    label={"ChannelType"}
                    inputProps={{
                      readOnly: camShatftData ? true : false,
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
                    readOnly: camShatftData ? true : false,
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
                  <InputLabel id={`CamShaft_WheelType-label`}>
                    WheelType
                  </InputLabel>
                  <Select
                    labelId={`CamShaft_WheelType-label`}
                    name="CamShaft_WheelType"
                    onChange={formContext?.handleChange}
                    value={formContext?.values?.["CamShaft_WheelType"]}
                    inputProps={{
                      readOnly: camShatftData ? true : false,
                    }}
                    label={"WheelType"}
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
            </>
          )}
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
                label={"Sensorx"}
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
          {formContext?.values?.["TDC_SENSORx"] !== "No Channel" && (
            <>
              <Grid item>
                <FormControl
                  sx={{
                    minWidth: "182px",
                  }}
                  error={Boolean(formContext?.errors?.["TDC_ChannelType"])}
                >
                  <InputLabel id={`TDC_ChannelType-label`}>
                    Sensor_Type
                  </InputLabel>
                  <Select
                    labelId={`TDC_ChannelType-label`}
                    onChange={formContext?.handleChange}
                    value={formContext?.values?.["TDC_ChannelType"]}
                    name="TDC_ChannelType"
                    label={"ChannelType"}
                    inputProps={{
                      readOnly: tdcData ? true : false,
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
                    readOnly: tdcData ? true : false,
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
                >
                  <InputLabel id={`TDC_WheelType-label`}>WheelType</InputLabel>
                  <Select
                    labelId={`TDC_WheelType-label`}
                    name="TDC_WheelType"
                    onChange={formContext?.handleChange}
                    value={formContext?.values?.["TDC_WheelType"]}
                    label={"WheelType"}
                    inputProps={{
                      readOnly: tdcData ? true : false,
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
                  {Boolean(formContext?.errors?.["TDC_WheelType"]) && (
                    <FormHelperText>
                      {formContext?.errors?.["TDC_WheelType"]}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </>
          )}
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
                label={"Sensorx"}
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
          {formContext?.values?.["Peak_Pressure_SENSORx"] !== "No Channel" && (
            <>
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
                    Sensor_Type
                  </InputLabel>
                  <Select
                    labelId={`Peak_Pressure_ChannelType-label`}
                    onChange={formContext?.handleChange}
                    value={formContext?.values?.["Peak_Pressure_ChannelType"]}
                    name="Peak_Pressure_ChannelType"
                    label={"ChannelType"}
                    inputProps={{
                      readOnly: peakPressureData ? true : false,
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
                    formContext?.errors?.["Peak_Pressure_ChannelType"]
                  ) && (
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
                    readOnly: peakPressureData ? true : false,
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
                  error={Boolean(
                    formContext?.errors?.["Peak_Pressure_WheelType"]
                  )}
                >
                  <InputLabel id={`Peak_Pressure_WheelType-label`}>
                    WheelType
                  </InputLabel>
                  <Select
                    labelId={`Peak_Pressure_WheelType-label`}
                    name="Peak_Pressure_WheelType"
                    onChange={formContext?.handleChange}
                    value={formContext?.values?.["Peak_Pressure_WheelType"]}
                    label={"WheelType"}
                    inputProps={{
                      readOnly: peakPressureData ? true : false,
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
                    formContext?.errors?.["Peak_Pressure_WheelType"]
                  ) && (
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
                    formContext?.errors?.[
                      "peak_pressure_transducer_sensitivity"
                    ]
                  )}
                  helperText={
                    formContext?.errors?.[
                      "peak_pressure_transducer_sensitivity"
                    ]
                  }
                  value={
                    formContext?.values?.[
                      "peak_pressure_transducer_sensitivity"
                    ]
                  }
                  inputProps={{
                    style: {
                      padding: "11px 26px 13px 12px",
                    },
                  }}
                ></TextField>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default ChannelInformationForm;
