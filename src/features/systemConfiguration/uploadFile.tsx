import {
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FileUpload from "../../app/components/file-upload";
import SystemInfoApi from "./api";
import { enqueueSnackbar } from "notistack";

import { useRef, useState } from "react";

type FileType = "License File" | "Software Update File";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e8e8ed",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function UploadFile({ setApiData }: any) {
  const [fileName1, setFileName1] = useState<any>();
  const [fileName2, setFileName2] = useState<any>();
  const [file, setFile] = useState<any>();
  const inputRef = useRef<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [fileInfo, setFileInfo] = useState<any>([]);
  const handleClose = () => {
    setTimeout(() => {
      setFile(null);
      setFileName1(null);
      setFileName2(null);
      inputRef.current.value = null;
      setOpen(false);
    }, 300);
  };

  const handleFileinfo = (type: FileType) => (e: any) => {
    const file = e.target.files[0];
    const fileName = file?.name;
    const data = new FormData();
    console.log("fileName", fileName);
    if (!file) {
      return;
    } else if (type === "License File") {
      setFileName1(fileName);
      setFileName2(null);

      data.append("file", file);
      data.append("type", "license");
      SystemInfoApi.getFirmwareDetails(data)
        .then((res: any) => {
          if (res?.data?.data) {
            enqueueSnackbar({
              message: `You have Successfully fetched the License data`,
              variant: "success",
            });
            setFileInfo([res.data.data]);
            setOpen(true);
          } else {
            enqueueSnackbar({
              message: "Something went wrong!",
              variant: "error",
            });
            setFileName1(null);
          }
        })
        .catch((err: any) => {
          enqueueSnackbar({
            message: err.Message,
            variant: "error",
          });
          setFileName1(null);
        });
      setFile(file);
    } else if (type === "Software Update File") {
      setFileName2(fileName);
      setFileName1(null);

      data.append("file", file);
      data.append("type", "vbox");
      SystemInfoApi.getFirmwareDetails(data)
        .then((res: any) => {
          if (res?.data?.data) {
            setFileInfo([res.data.data]);
            enqueueSnackbar({
              message: `You have Successfully fetched the Software details`,
              variant: "success",
            });
            setOpen(true);
          } else {
            enqueueSnackbar({
              message: "Something went wrong!",
              variant: "error",
            });
            setFileName2(null);
          }
        })
        .catch((err: any) =>
          enqueueSnackbar({
            message: err.Message,
            variant: "error",
          })
        );
      setFile(file);
    }
  };

  const handleFileUpload = () => {
    if (!file) {
      return;
    } else if (fileName1 && !fileName2) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_type", "license_file");
      SystemInfoApi.updateSystemLicenseFile(data)
        .then((val) => {
          enqueueSnackbar({
            message: `You have Successfully updated the License data`,
            variant: "success",
          });
          setApiData((val: any) => {
            return {
              ...val,
            };
          });
        })
        .catch((error) => {
          console.error("update system Liscense error", error);
          setApiData((val: any) => {
            return {
              ...val,
            };
          });

          enqueueSnackbar({
            message: error.Message,
            variant: "error",
          });
        });
    } else if (fileName2 && !fileName1) {
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("upload_type", "software_file");

      SystemInfoApi.updateSystemSoftwareFile(formdata)
        .then((val) => {
          enqueueSnackbar({
            message: `You have Successfully updated the Software data`,
            variant: "success",
          });
          setApiData((val: any) => {
            return {
              ...val,
            };
          });
        })
        .catch((error) => {
          console.error("update system software error ", error);
          setApiData((val: any) => {
            return {
              ...val,
            };
          });
          enqueueSnackbar({
            message: error.Message,
            variant: "error",
          });
        });
    }
  };
  return (
    <>
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
          <FileUpload
            onChangeHandler={handleFileinfo("License File")}
            file=".dat"
            inputRef={inputRef}
          />
          {fileName1 ? (
            <Box sx={{ color: "green" }}>{fileName1}</Box>
          ) : (
            "No file Chosen"
          )}
        </Box>
        <Box sx={{ width: "49%" }}>
          <Typography component={"p"}>Update Software Version file</Typography>
          <FileUpload
            onChangeHandler={handleFileinfo("Software Update File")}
            file=".zip"
            inputRef={inputRef}
          />
          {fileName2 ? (
            <Box sx={{ color: "green" }}>{fileName2}</Box>
          ) : (
            "No file Chosen"
          )}
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Upload File Details</DialogTitle>
        <DialogContent>
          {fileName1 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>License Number</StyledTableCell>
                    <StyledTableCell>License Tenure</StyledTableCell>
                    <StyledTableCell>Engine Quantity</StyledTableCell>
                    <StyledTableCell>Bearing Quantity</StyledTableCell>
                    <StyledTableCell>Motor Quantity</StyledTableCell>
                    <StyledTableCell>Turbine Quantity</StyledTableCell>
                    <StyledTableCell>Torque Quantity</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fileInfo.map((row: any) => (
                    <StyledTableRow key={row?.license_id || ""}>
                      <StyledTableCell component="th" scope="row">
                        {row?.license_number}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row?.license_tenure}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row?.engine_quantity}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row?.bearing_quantity}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row?.motor_quantity}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row?.turbine_quantity}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row?.torque_quantity}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {fileName2 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Version</StyledTableCell>
                    <StyledTableCell>Readme</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fileInfo.map((row: any) => (
                    <StyledTableRow key={row?.license_id}>
                      <StyledTableCell component="th" scope="row">
                        {row?.version}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row?.readme}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleFileUpload}
          >
            Confirm & Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
