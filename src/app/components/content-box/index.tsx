import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const ContentBox = ({ children, title }: any) => {
  return (
    <>
      <Typography sx={{ fontSize: "24px", marginLeft: "55px",marginBottom:'19px' }}>
        {title || "Title"}
      </Typography>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          width: "auto",
          marginLeft: "54px",
          marginRight: "95px",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default ContentBox;
