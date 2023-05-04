import { Box } from "@mui/material";
import { ChangeEventHandler } from "react";

interface FileUploadObject {
  onChangeHandler: ChangeEventHandler;
}

export default function fileUpload ({onChangeHandler}: FileUploadObject) {
    
    return (
        <Box 
          sx={{
            border: "1px dashed #333070",
            height: "100px",
            position: "relative",
            mt: 1
          }}
        >
          <div style={{ position: "absolute", top: "40%", left: "20%" }}>
            Drag and Drop your file here
          </div>
          <input
            accept="image/*"
            multiple
            type="file"
            style={{ opacity: 0, width: "100%", height: "100%" }}
            onChange={onChangeHandler}
          />
        </Box>
    )
}