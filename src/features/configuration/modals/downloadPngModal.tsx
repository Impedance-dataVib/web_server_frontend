import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Container,
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
// import { buildPngReportData } from "src/app/utils/helper";

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

export default function DownloadPngModal({ open, setOpen, data }: any) {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [renderData, setRenderData] = React.useState<any>(false);
  const [activeClass, setActiveClass] = React.useState<any>("Engine");
  const [component, setComponent] = React.useState<any>(null);
  console.log(data);
  const footerData = data?.data.data.otherData;
  const formData = data?.data.data.formData;
  const jsondata = open;
  const modletype = data?.data.data.formData.module_type;
  React.useEffect(() => {
    if (jsondata) {
      // const indicatorData = buildPngReportData(jsondata, modletype, formData);
      // setRenderData(indicatorData);

      if (modletype === "Engine") {
        setComponent(<Engine renderData={renderData} />);
        setActiveClass("Engine");
      } else if (modletype === "Torque") {
        setComponent(<Torque socketData={renderData} />);
        setActiveClass("Torque");
      } else if (modletype === "Bearing") {
        setComponent(<Bearing socketData={renderData} />);
        setActiveClass("Bearing");
      } else if (modletype === "Motor") {
        setComponent(<Motor socketData={renderData} />);
        setActiveClass("Motor");
      } else if (modletype === "Turbine") {
        setComponent(<Turbine socketData={renderData} />);
        setActiveClass("Turbine");
      }
    }
  }, []);
  return (
    <Container>
      <Modal
        open={open}
        onClose={() => setOpen(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <img
              style={{ marginLeft: "90%", width: "90px", height: "45px" }}
              src="logo_vib_360.png"
              alt="logo"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button disabled={activeClass !== "Engine"} sx={{ color: "black" }}>
              ENGINE
            </Button>
            <Button
              disabled={activeClass !== " TORQUE"}
              sx={{ color: "black" }}
            >
              TORQUE
            </Button>
            <Button
              disabled={activeClass !== "BEARING"}
              sx={{ color: "black" }}
            >
              BEARING
            </Button>
            <Button disabled={activeClass !== "MOTOR"} sx={{ color: "black" }}>
              MOTOR
            </Button>
            <Button
              disabled={activeClass !== "TURBINE"}
              sx={{ color: "black" }}
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
              p: "5px 10px",
            }}
          >
            <Box component={"span"}>
              <Typography>Timestamp (UTC)</Typography>
              <Typography>{open?.DateAndTime}</Typography>
            </Box>
            <Box component={"span"}>
              <Typography>Asset- Equipment</Typography>
              <Typography>{formData?.asset_name}</Typography>
            </Box>
            <Box component={"span"}>
              <Typography>Speed (RPM)</Typography>
              <Typography>{formData?.rated_rpm}</Typography>
            </Box>
            <Box component={"span"}>
              <Typography>SW Version</Typography>
              <Typography>{footerData.sw_version}</Typography>
            </Box>
            <Box component={"span"}>
              <Typography>Synchronisation</Typography>
              <Typography>TDC</Typography>
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
                    <TableCell
                      sx={{ fontWeight: 500, fontSize: "16px" }}
                      align="center"
                    >
                      Customer Name
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 500, fontSize: "16px" }}
                      align="center"
                    >
                      Model & Make
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 500, fontSize: "16px" }}
                      align="center"
                    >
                      Equipment Type
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 500, fontSize: "16px" }}
                      align="center"
                    >
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
                      sx={{ fontWeight: 500, fontSize: "16px" }}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {footerData?.client_name}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 500, fontSize: "16px" }}
                      align="center"
                    >
                      {formData?.make_model}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 500, fontSize: "16px" }}
                      align="center"
                    >
                      {formData?.equipment_name}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 500, fontSize: "16px" }}
                      align="center"
                    >
                      {formData?.application}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ my: "10px" }}>
            <Typography textAlign={"center"} fontWeight={"500"}>
              Impedance DataVib
            </Typography>
            <Typography textAlign={"center"}>
              80 Dom. de Montvoisin, 91400 Gometz-la-Ville, France
            </Typography>
            <Typography textAlign={"center"}>
              Tel : +33 169351525 | Email:{" "}
              <a href="support-vib360@impedance.fr">
                support-vib360@impedance.fr
              </a>{" "}
              I Website: <a href="www.vib360world.com">www.vib360world.com</a>
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
