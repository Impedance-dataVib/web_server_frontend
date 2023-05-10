import React, { useState } from "react";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import Stack from "@mui/material/Stack";

const schema = [
  { name: "Outer Diameter(D)(mm)", label: "outer_diameter", type: "text" },
  { name: "Inner Diameter(d)(mm)", label: "inner_diameter", type: "text" },
  { name: "Sheer Modulus(G)", label: "sheer_modulus", type: "text" },
  { name: "Length(L)(mm)", label: "length", type: "text" },
  { name: "MaxRPM", label: "max_rpm", type: "text" },
  { name: "MaxPower", label: "max_power", type: "text" },
];
const validationSchema = yup.object({
  outer_diameter: yup.number().required("This is a required field"),
  inner_diameter: yup.number().required("This is a required field"),
  sheer_modulus: yup.number().required("This is a required field"),
  length: yup.number().required("This is a required field"),
  max_rpm: yup.number().required("This is a required field"),
  max_power: yup.number().required("This is a required field"),
});

const getFieldObjectsInitialValues = (schema: any) => {
  return schema.reduce((init: any, prev: any) => {
    return { ...init, [prev.label]: "" };
  }, {});
};

export const PopupRigidity = ({ formContext, fieldProps }: any) => {
  const [open, setOpen] = useState(false);
  const formContextPopUp = useFormik({
    initialValues: { ...getFieldObjectsInitialValues },
    onSubmit: () => {},
    validationSchema: validationSchema,
  });
  
  return (
    <Stack direction={"row"}>
      <TextField
        name={fieldProps.label}
        label={fieldProps.label}
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
          style: {
            padding: "11px 26px 13px 12px",
          },
        }}
      ></TextField>
      <Button onClick={() => setOpen(true)}>Calculate</Button>
      <CalculateRigidityModal
        open={open}
        onClose={() => setOpen(false)}
        onCalculate={() => console.log("")}
        formContext={formContextPopUp}
      ></CalculateRigidityModal>
    </Stack>
  );
};

const FormFieldConditionalRender = ({ type, fieldProps, formContext }: any) => {
  switch (type) {
    case "dropdown":
      return (
        <FormControl
          sx={{ minWidth: "182px", marginBottom: "20px" }}
          error={Boolean(formContext?.errors?.[fieldProps.label])}
        >
          <InputLabel id={fieldProps.label}>{fieldProps.name}</InputLabel>
          <Select
            name={fieldProps.label}
            onChange={formContext?.handleChange}
            label={fieldProps.label}
            value={formContext?.values?.[fieldProps.label]}
          >
            {fieldProps.options.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {formContext?.touched?.[fieldProps.label] &&
            Boolean(formContext?.errors?.[fieldProps.label]) && (
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
          label={fieldProps.label}
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

const CalculateRigidityModal = ({
  open,
  onClose,
  onCalculate,
  formContext,
}: any) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Calculate Rigidity</DialogTitle>
      <DialogContent>
        <Box sx={{ minWidth: "500px" }}>
          {schema.map((item) => (
            <FormFieldConditionalRender
              type={item.type}
              fieldProps={item}
              formContext={formContext}
            ></FormFieldConditionalRender>
          ))}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="secondary" onClick={onClose} variant="contained">
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={onCalculate}
          disabled={!formContext.isValid}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalculateRigidityModal;
