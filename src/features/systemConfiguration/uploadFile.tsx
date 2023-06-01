import { Box, Typography } from "@mui/material";
import FileUpload from "../../app/components/file-upload";
export default function UploadFile({ setFile1, setFile2 }: any) {
  const handleFile1 = (e: any) => {
    const fileList = e.target.files;
    console.log(fileList);

    if (!fileList) {
      return;
    }
    // const data = new FormData();
    // data.append("file", fileList);
    const files = fileList ? [...fileList] : [];
    console.log(files);

    const formdata1 = new FormData();
    files.map((file: any, i: any) => {
      formdata1.append(`file1-${i}`, file);
    });
    setFile1(formdata1);
    console.log(formdata1);
  };
  const handleFile2 = (e: any) => {
    const fileList = e.target.files;

    if (!fileList) {
      return;
    }

    // const formdata = new FormData();
    // formdata.append("file", fileList);
    const files = fileList ? [...fileList] : [];
    console.log(files);

    const formdata2 = new FormData();
    files.map((file: any, i: any) => {
      formdata2.append(`file2-${i}`, file);
    });
    setFile2(formdata2);
    console.log(formdata2);
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
