import { memo } from "react";
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

const propsAreEqual = (prev: any, next: any) => {
  return (
    JSON.stringify(prev.indicators) === JSON.stringify(next.indicators) &&
    prev.open === next.open &&
    prev.options === next.options
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
                  <Chip label={option} {...getTagProps({ index })} />
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
          <Button variant="contained" color="success" onClick={onClose}>
            Apply
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
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
  propsAreEqual
);

export default IndicatorsModal;
