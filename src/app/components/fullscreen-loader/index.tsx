import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const FullScreenLoader = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
    >
      <Box
        sx={{
          height: "20px",
          color: (theme) => theme.palette.color3.main,
          textAlign: "center",
        }}
      >
        <CircularProgress
          sx={{ color: (theme) => theme.palette.color3.main }}
        />
        <Typography>Loading</Typography>
      </Box>
    </Box>
  );
};
export default FullScreenLoader;
