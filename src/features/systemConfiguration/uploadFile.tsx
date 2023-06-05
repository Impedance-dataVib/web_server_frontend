import { Box, Typography } from "@mui/material";
import FileUpload from "../../app/components/file-upload";
import SystemInfoApi from "./api";
import { enqueueSnackbar } from "notistack";
export default function UploadFile() {
  const handleFile1 = (e: any) => {
    const file1 = e.target.files[0];
    if (!file1) {
      return;
    }
    const data = new FormData();
    data.append("file", file1);
    data.append("upload_type", "license_file");

    console.log(data.get("file"));
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
  };
  const handleFile2 = (e: any) => {
    const file2 = e.target.files[0];
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
        <FileUpload onChangeHandler={handleFile1} file=".zip" />
      </Box>
      <Box sx={{ width: "49%" }}>
        <Typography component={"p"}>Update Software Version file</Typography>
        <FileUpload onChangeHandler={handleFile2} file=".dat" />
      </Box>
    </Box>
  );
}
