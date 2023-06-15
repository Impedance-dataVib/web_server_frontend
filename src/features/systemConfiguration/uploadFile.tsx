import { Box, Typography } from "@mui/material";
import FileUpload from "../../app/components/file-upload";
import SystemInfoApi from "./api";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
export default function UploadFile({ setApiData }: any) {
  const [fileName1, setFileName1] = useState<any>();
  const [fileName2, setFileName2] = useState<any>();
  const handleFile1 = (e: any) => {
    const file1 = e.target.files[0];
    const filename = e.target.files[0]?.name;
    setFileName1(filename);
    if (!file1) {
      return;
    }
    const data = new FormData();
    data.append("file", file1);
    data.append("upload_type", "license_file");

    SystemInfoApi.updateSystemLicenseFile(data)
      .then((val) => {
        enqueueSnackbar({
          message: `You have Successfully updated the License data`,
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar({
          message: error.Message,
          variant: "error",
        });
      });
    setApiData((val: any) => {
      return {
        ...val,
      };
    });
  };
  const handleFile2 = (e: any) => {
    const file2 = e.target.files[0];
    const filename = e.target.files[0]?.name;
    setFileName2(filename);
    if (!file2) {
      return;
    }

    const formdata = new FormData();
    formdata.append("file", file2);
    formdata.append("upload_type", "software_file");

    SystemInfoApi.updateSystemSoftwareFile(formdata)
      .then((val) => {
        enqueueSnackbar({
          message: `You have Successfully updated the Software data`,
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar({
          message: error.Message,
          variant: "error",
        });
      });

    //for rerender the system page
    setApiData((val: any) => {
      return {
        ...val,
      };
    });
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        mx: 0,
      }}
    >
      <Box sx={{ width: "49%" }}>
        <Typography component={"p"}>Update License file</Typography>
        <FileUpload onChangeHandler={handleFile1} file=".dat" />
        {fileName1 ? (
          <Box sx={{ color: "green" }}>{fileName1}</Box>
        ) : (
          "No file Chosen"
        )}
      </Box>
      <Box sx={{ width: "49%" }}>
        <Typography component={"p"}>Update Software Version file</Typography>
        <FileUpload onChangeHandler={handleFile2} file=".zip" />
        {fileName2 ? (
          <Box sx={{ color: "green" }}>{fileName2}</Box>
        ) : (
          "No file Chosen"
        )}
      </Box>
    </Box>
  );
}
