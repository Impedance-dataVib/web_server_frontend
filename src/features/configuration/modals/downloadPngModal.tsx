import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Container,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Engine from "src/features/downloads/engine";
import Torque from "src/features/downloads/torque";
import Bearing from "src/features/downloads/bearing";
import Motor from "src/features/downloads/motor";
import Turbine from "src/features/downloads/turbine";
import { buildPngReportData } from "src/app/utils/helper";
import CancelIcon from "@mui/icons-material/Cancel";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  maxHeight: "95vh",

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};
const fontStyle = {
  fontSize: "20px",
  fontWeight: 500,
};

export default function DownloadPngModal({ open, setOpen, data }: any) {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [renderData, setRenderData] = React.useState<any>(false);
  const [activeClass, setActiveClass] = React.useState<any>("Engine");
  const [component, setComponent] = React.useState<any>(null);
  console.log("transfered data to modal page", data);
  const footerData = data?.data.data.otherData;
  const formData = data?.data.data.formData;
  const jsondata = open;
  const modletype = data?.data.data.otherData.module_type;
  console.log("modletype =>", modletype);
  React.useEffect(() => {
    if (jsondata) {
      const indicatorData = buildPngReportData(jsondata, modletype, formData);
      setRenderData(indicatorData);

      if (modletype === "Engine") {
        setComponent(<Engine renderData={renderData} />);
        setActiveClass("Engine");
      } else if (modletype === "Torque") {
        setComponent(<Torque renderData={renderData} />);
        setActiveClass("Torque");
      } else if (modletype === "Bearing") {
        setComponent(<Bearing renderData={renderData} />);
        setActiveClass("Bearing");
      } else if (modletype === "Motor") {
        setComponent(<Motor renderData={renderData} />);
        setActiveClass("Motor");
      } else if (modletype === "Turbine") {
        setComponent(<Turbine renderData={renderData} />);
        setActiveClass("Turbine");
      }
    }
  }, [jsondata, modletype, open]);
  const downloadPngReport = () => {
    console.log("clicked");
  };
  return (
    <Container>
      <Modal
        open={open}
        onClose={() => setOpen(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ position: "absolute", right: 15, top: 15 }}>
            <Button onClick={() => setOpen(null)}>
              <CancelIcon />
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              px: 8,
            }}
          >
            <Button
              onClick={downloadPngReport}
              variant="contained"
              size="small"
            >
              To PNG
              <FileDownloadIcon sx={{ mx: 1 }} />
            </Button>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Box>
              <Divider sx={{ marginLeft: "84%", width: "160px", pb: 1 }} />
              <img
                style={{ marginLeft: "85%", width: "140px", height: "75px" }}
                src="logo_vib_360.png"
                alt="logo"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "90%",
                ml: 8,
              }}
            >
              <Button
                disabled={activeClass === "Engine" ? false : true}
                sx={{ color: "black", fontSize: "22px", fontWeight: 500 }}
              >
                ENGINE
              </Button>
              <Button
                disabled={activeClass === "Torque" ? false : true}
                sx={{ color: "black", fontSize: "22px", fontWeight: 500 }}
              >
                TORQUE
              </Button>
              <Button
                disabled={activeClass === "Bearing" ? false : true}
                sx={{ color: "black", fontSize: "22px", fontWeight: 500 }}
              >
                BEARING
              </Button>
              <Button
                disabled={activeClass === "Motor" ? false : true}
                sx={{ color: "black", fontSize: "22px", fontWeight: 500 }}
              >
                MOTOR
              </Button>
              <Button
                disabled={activeClass === "Turbine" ? false : true}
                sx={{ color: "black", fontSize: "22px", fontWeight: 500 }}
              >
                TURBINE
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "lightgrey",
                p: "10px 10px",
                width: "95%",
                ml: 5,
              }}
            >
              <Box component={"span"}>
                <Typography sx={{ fontStyle }}>Timestamp (UTC)</Typography>
                <Typography sx={{ fontStyle }}>{open?.DateAndTime}</Typography>
              </Box>
              <Box component={"span"}>
                <Typography sx={{ fontStyle }}>Asset- Equipment</Typography>
                <Typography sx={{ fontStyle, ml: 4 }}>
                  {formData?.asset_name}
                </Typography>
              </Box>
              <Box component={"span"}>
                <Typography sx={{ fontStyle }}>Speed (RPM)</Typography>
                <Typography sx={{ fontStyle, ml: 4 }}>
                  {formData?.rated_rpm}
                </Typography>
              </Box>
              <Box component={"span"}>
                <Typography sx={{ fontStyle }}>SW Version</Typography>
                <Typography sx={{ fontStyle, ml: 4 }}>
                  {footerData.sw_version}
                </Typography>
              </Box>
              <Box component={"span"}>
                <Typography sx={{ fontStyle }}>Synchronisation</Typography>
                <Typography sx={{ fontStyle, ml: 5 }}>TDC</Typography>
              </Box>
            </Box>
            {/* specific components */}
            <Box sx={{ mt: 2 }}>{component}</Box>
            {/* Footer starts */}
            <Box
              sx={{
                ml: "10%",
              }}
            >
              <TableContainer>
                <Table
                  sx={{
                    maxWidth: 900,
                    border: "3px solid black",
                    borderCollapse: "collapse",
                  }}
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: "3px solid black",
                        },
                      }}
                    >
                      <TableCell sx={{ fontStyle }} align="center">
                        Customer Name
                      </TableCell>
                      <TableCell sx={{ fontStyle }} align="center">
                        Model & Make
                      </TableCell>
                      <TableCell sx={{ fontStyle }} align="center">
                        Equipment Type
                      </TableCell>
                      <TableCell sx={{ fontStyle }} align="center">
                        Application
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: "3px solid black",
                        },
                      }}
                    >
                      <TableCell
                        sx={{ fontStyle }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {footerData?.client_name}
                      </TableCell>
                      <TableCell sx={{ fontStyle }} align="center">
                        {formData?.make_model}
                      </TableCell>
                      <TableCell
                        sx={{ fontStyle, color: "blue" }}
                        align="center"
                      >
                        {formData?.equipment_name}
                      </TableCell>
                      <TableCell sx={{ fontStyle }} align="center">
                        {formData?.application}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box sx={{ my: "10px" }}>
              <Typography
                sx={{ color: "darkblue" }}
                textAlign={"center"}
                fontWeight={500}
              >
                Impedance DataVib
              </Typography>
              <Typography textAlign={"center"} fontWeight={500}>
                80 Dom. de Montvoisin, 91400 Gometz-la-Ville, France
              </Typography>
              <Typography textAlign={"center"} fontWeight={500}>
                Tel : +33 169351525 | Email: support-vib360@impedance.fr I
                Website: www.vib360world.com
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
