import React from "react";
import { Download, Visibility } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

export interface ReportTypeProps {
  label: string;
  downloadUrl?: string | undefined;
  viewUrl?: string | undefined;
}

const ReportType = ({ label, downloadUrl, viewUrl }: ReportTypeProps) => {
  const onClickDownload = () => {
    // TODO
    window.open(downloadUrl, "_blank");
  };

  const onClickView = () => {
    // TODO
    window.open(viewUrl, "viewUrl");
  };

  return (
    <Box sx={{ textAlign: "center", mb: 1 }}>
      <Box>
        <Typography variant="caption">{label}</Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ width: "100px", mx: "auto" }}>
          <IconButton
            sx={{
              border: "1px solid black",
              borderRadius: "2px",
              backgroundColor: downloadUrl ? "green" : "disabled",
            }}
            disabled={!downloadUrl}
            onClick={onClickDownload}
          >
            <Download />
          </IconButton>
          {viewUrl && (
            <IconButton
              sx={{ border: "1px solid black", borderRadius: "2px" }}
              onClick={onClickView}
            >
              <Visibility />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default ReportType;
