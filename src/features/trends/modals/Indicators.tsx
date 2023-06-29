import React, { memo } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
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
    JSON.stringify(prev.indicators) === JSON.stringify(next.indicators) &&
    prev.open === next.open
  );
};
const IndicatorsModal = memo(
  ({ open, onClose, indicators, setIndicators, options }: any) => {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <DialogTitle>Add Indicators</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <Autocomplete
              multiple
              disableClearable
              value={indicators}
              onChange={(event, newValue) => {
                setIndicators((val: any) => {
                  return [...newValue];
                });
              }}
              options={options}
              getOptionLabel={(option: string) => option}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option: string, index: number) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    disabled={index === 0}
                  />
                ))
              }
              sx={{
                maxWidth: "100rem",
                minWidth: "50rem",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid rgba(29, 69, 128, 0.5)",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Indicators"
                  placeholder="Indicators"
                />
              )}
            />
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
              setIndicators((val: any) => [val[0]]);
            }}
          >
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
  propsAreEqual
);

export default IndicatorsModal;
