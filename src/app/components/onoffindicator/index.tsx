import React from "react";
import { Box, Typography } from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

export interface OnOffIndicatorProps {
  label: string | number;
  value: number | boolean;
}

const OnOffIndicator = ({ label, value }: OnOffIndicatorProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <RadioButtonCheckedIcon color={value === 1 ? "success" : "disabled"} />
      </Box>
      <Box>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Box>
  );
};
export default OnOffIndicator;
