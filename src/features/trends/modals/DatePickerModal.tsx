import React, { memo } from "react";
import {
  Box,
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
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  dateRangeValues: Object;
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
    return (
      <>
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>Add Date Range</DialogTitle>
          <DialogContent>
            <Box>
              <DateRange
                ranges={[dateRangeValues]}
                onChange={(e: any) => {
                  setDateRangeValues(e.selection);
                }}
              ></DateRange>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  },
  propsAreEqual
);

export default DateRangePickerModal;
