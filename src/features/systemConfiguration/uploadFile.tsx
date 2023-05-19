import { Box, Typography } from "@mui/material";
import FileUpload from "../../app/components/file-upload";
export default function UploadFile() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        mx:0
      }}
    >
      <Box sx={{width: '49%'}}>
        <Typography component={"p"}>Update License file</Typography>
        <FileUpload onChangeHandler={e=> console.log(e)}/>
      </Box>
      <Box sx={{width: '49%'}}>
        <Typography component={"p"}>Update Software Version file</Typography>
        <FileUpload onChangeHandler={e=> console.log(e)}/>
      </Box>
    </Box>
  );
}
