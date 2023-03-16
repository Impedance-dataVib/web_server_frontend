import React from "react";
import { Box, Typography } from "@mui/material";

const LogoutPage = () => {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >      
        <Box>
          <Typography>Session is logged out</Typography>
        </Box>
    </Box>
  );
};
export default LogoutPage;
