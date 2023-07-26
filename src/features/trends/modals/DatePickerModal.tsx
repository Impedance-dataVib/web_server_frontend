import React, { memo, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
interface DateRangePickerModalProps {
  open: boolean;
  onClose: any;
  dateRangeValues: any;
  setDateRangeValues: React.Dispatch<React.SetStateAction<Object>>;
}
const propsAreEqual = (prev: any, next: any) => {
  return (
    JSON.stringify(prev.dateRangeValues) ===
      JSON.stringify(next.dateRangeValues) && prev.open === next.open
  );
};
const DateRangePickerModal = memo(
  ({
    open,
    onClose,
    dateRangeValues,
    setDateRangeValues,
  }: DateRangePickerModalProps) => {
    const [dateValuesLocal, setDateValuesLocal] = useState({
      startDate: dateRangeValues.startDate,
      endDate: dateRangeValues.endDate,
      key: "selection",
    });

    // const minDate = new Date(
    //   new Date().getFullYear(),
    //   new Date().getMonth() - 3,
    //   new Date().getDate()
    // );
    return (
      <>
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>Add Date Range</DialogTitle>
          <DialogContent>
            <Box>
              <DateRange
                ranges={[dateValuesLocal]}
                maxDate={new Date()}
                onChange={(e: any) => {
                  setDateValuesLocal(e.selection);
                }}
              ></DateRange>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="success"
              disabled={
                dateValuesLocal.endDate && dateValuesLocal.startDate
                  ? false
                  : true
              }
              onClick={() => {
                setDateRangeValues({ ...dateValuesLocal });
                onClose();
              }}
            >
              Apply
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => {
                setDateValuesLocal({
                  startDate: null,
                  endDate: null,
                  key: "selection",
                });
                setDateRangeValues({
                  startDate: null,
                  endDate: null,
                  key: "selection",
                });
              }}
            >
              Reset
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
  propsAreEqual
);

export default DateRangePickerModal;
