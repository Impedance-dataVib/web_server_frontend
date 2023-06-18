import { Box, Typography } from "@mui/material";
import { ChangeEventHandler } from "react";

interface FileUploadObject {
  onChangeHandler: ChangeEventHandler;
  file: string;
  inputRef: any;
}

export default function fileUpload({
  onChangeHandler,
  file,
  inputRef,
}: FileUploadObject) {
  return (
    <Box
      sx={{
        border: "1px dashed #333070",
        height: "100px",
        position: "relative",
        mt: 1,
      }}
    >
      <div style={{ position: "absolute", top: "40%", left: "30%" }}>
        <Typography variant="body1">Drag and Drop your file here</Typography>
      </div>
      <input
        accept={file}
        type="file"
        style={{ opacity: 0, width: "100%", height: "100%" }}
        onChange={onChangeHandler}
        ref={inputRef}
      />
    </Box>
  );
}
