import React, { memo } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
const validationSchema = yup.object({
  rpm_min: yup.number(),
  rpm_max: yup
    .number()
    .test(
      "Max Rpm should be greater!",
      "MAX RPM should be greater than MIN RPM",
      (value: any, context) => value >= context.parent.rpm_min
    ),
});

const propsAreEqual = (prev: any, next: any) => {
  return (
    JSON.stringify(prev.rpmRange) === JSON.stringify(next.rpmRange) &&
    prev.open === next.open
  );
};
const RPMRangeModal = memo(({ open, onClose, rpmRange, setRPMRange }: any) => {
  const formContext = useFormik({
    initialValues: { rpm_min: 0, rpm_max: 0 },
    onSubmit: () => {},
    validationSchema: validationSchema,
  });
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Select RPM Range</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <TextField
            error={Boolean(formContext.errors.rpm_min)}
            id="rpm_min"
            name="rpm_min"
            label="RPM Minimum"
            type="number"
            variant="standard"
            fullWidth
            value={formContext.values.rpm_min}
            onChange={(e) => {
              formContext.handleChange(e);
            }}
            helperText={formContext.errors.rpm_min}
          ></TextField>
        </Box>
        <Box sx={{ mt: 1 }}>
          <TextField
            error={Boolean(formContext.errors.rpm_min)}
            id="rpm_max"
            name="rpm_max"
            label="RPM Max"
            type="number"
            variant="standard"
            fullWidth
            value={formContext.values.rpm_max}
            onChange={(e) => {
              formContext.handleChange(e);
            }}
            helperText={formContext.errors.rpm_max}
          ></TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="contained" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="info"
          variant="contained"
          onClick={() => {
            formContext.setValues({ rpm_min: 0, rpm_max: 0 });
            setRPMRange({ rpm_min: 0, rpm_max: 0 });
          }}
        >
          Reset
        </Button>
        <Button
          color="primary"
          onClick={() => setRPMRange({ ...formContext.values })}
          variant="contained"
        >
          Add RPM Range
        </Button>
      </DialogActions>
    </Dialog>
  );
}, propsAreEqual);

export default RPMRangeModal;
