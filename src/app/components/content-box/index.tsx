import React, { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface IContentBoxProps {
  title?: string;
}

const ContentBox = ({
  children,
  title,
}: PropsWithChildren<IContentBoxProps>) => {
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
        }}
      >
        {title || "Title"}
      </Typography>
      <Box
        sx={{
          // backgroundColor: "#fff",
          width: "auto",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default ContentBox;
