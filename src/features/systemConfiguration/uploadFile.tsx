import { Box, Typography } from "@mui/material";
import FileUpload from "../../app/components/file-upload";
export default function UploadFile({ setFile1, setFile2 }: any) {
  const handleFile1 = (e: any) => {
    const file1 = e.target.files[0];
    console.log(file1);

    if (!file1) {
      return;
    }
    const data = new FormData();
    data.append("file", file1);
    setFile1(data);
    console.log(data);
  };
  const handleFile2 = (e: any) => {
    const file2 = e.target.files[0];
    console.log(file2);

    if (!file2) {
      return;
    }

    const formdata = new FormData();
    formdata.append("file", file2);
    setFile2(formdata);
    console.log(formdata);
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
        <FileUpload onChangeHandler={handleFile1} />
      </Box>
      <Box sx={{ width: "49%" }}>
        <Typography component={"p"}>Update Software Version file</Typography>
        <FileUpload onChangeHandler={handleFile2} />
      </Box>
    </Box>
  );
}
