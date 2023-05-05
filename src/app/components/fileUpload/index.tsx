import { Box, Typography } from "@mui/material";
import { ChangeEventHandler, useId, useState } from "react";

interface FileUploadObject {
  onChangeHandler: ChangeEventHandler;
  accept?: string;
}

const FileUploadComponent = ({
  onChangeHandler,
  accept = "image/*",
}: FileUploadObject) => {
  const id = useId();
  const [dragOverFlag, setDragOverFlag] = useState<boolean>(false);

  const onDropHandler = (e: any) => {
    e.preventDefault();
  };

  const onDropCapture = () => {
    if (dragOverFlag) {
      setDragOverFlag(false);
    }
  };

  const onDragOver = () => {
    if (!dragOverFlag) {
      setDragOverFlag(true);
    }
  };

  const onDragEnd = () => {
    if (dragOverFlag) {
      setDragOverFlag(false);
    }
  };

  const onFileChangeHandler = (e: any) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onChangeHandler(files[0]);
    }
  };

  return (
    <Box
      sx={{
        height: "100px",
        position: "relative",
        mt: 1,
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23333' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
        borderRadius: "8px",
        backgroundImageColor: (theme) => theme.palette.primary.main,
        backgroundColor: dragOverFlag ? "red" : "white",
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragEnd}
      onDropCapture={onDropCapture}
    >
      <Box sx={{ height: "100%" }}>
        <Box style={{ position: "absolute", top: "40%", left: "20%" }}>
          <Typography>
            Drag and drop, or click here to browse your files
          </Typography>
        </Box>

        <input
          id={id}
          accept={accept}
          multiple
          type="file"
          onDrop={onDropHandler}
          style={{
            opacity: 0,
            width: "100%",
            height: "100%",
          }}
          onChange={onFileChangeHandler}
        />
      </Box>
    </Box>
  );
};

export default FileUploadComponent;
