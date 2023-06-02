import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { FieldArray, FieldArrayRenderProps, FormikProvider } from "formik";
import debounce from "lodash/debounce";
import { useCallback } from "react";

const MultipleFields = ({ fieldProps, formContext }: any) => {
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
};

const FormFieldConditionalRender = ({ type, fieldProps, formContext }: any) => {
  switch (type) {
    case "dropdown":
      return (
        <FormControl
          sx={{ minWidth: "182px" }}
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
                  onChange={(e) => {
                    formContext?.handleChange(e);
                  }}
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
  }
};
export default FormFieldConditionalRender;
