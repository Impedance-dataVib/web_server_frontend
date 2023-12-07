import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { ChangeEventHandler } from "react";

interface FileUploadObject {
  onChangeHandler: ChangeEventHandler;
  file: string;
  inputRef: any;
  isLoader?: boolean;
}

export default function fileUpload({
  onChangeHandler,
  file,
  inputRef,
  isLoader = false,
}: FileUploadObject) {
  return (
    <Box
      sx={{
        border: "1px dashed #333070",
        height: "100px",
        position: "relative",
        zIndex: 0,
        mt: 1,
      }}
    >
      <Backdrop
        sx={{ color: '#fff', position: 'absolute', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        open={isLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div style={{ position: "absolute", top: "40%", left: "30%" }}>
        <Typography variant="body1">Drag and Drop your file here</Typography>
      </div>
      <input
        disabled={true}
        accept={file}
        type="file"
        style={{ opacity: 0, width: "100%", height: "100%" }}
        onChange={onChangeHandler}
        ref={inputRef}
      />
    </Box>
  );
}
