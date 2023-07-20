import React from "react";
import { Box } from "@mui/material";

const Content = ({ children }: any) => {
  return (
    <Box
      sx={{
        p: 2,
        px: 5,
        backgroundColor: (theme) => theme.palette.color1.main,
        width: "100%",
        minHeight: "calc(100vh - 60px)",
      }}
    >
      {children}
    </Box>
  );
};
export default Content;
