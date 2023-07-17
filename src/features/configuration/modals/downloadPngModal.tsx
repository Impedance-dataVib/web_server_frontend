import * as React from "react";
import { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
import { SIGNAL_STATUS_QUALITY } from "src/features/dashboard/schema";

const fontStyle = {
  fontSize: "16px",
  fontWeight: 500,
  textAlign: "center",
};

export default function DownloadPngModal({ open, data }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeClass, setActiveClass] = React.useState<any>("Engine");
  const [component, setComponent] = React.useState<any>(null);
  const [status, setStatus] = React.useState<any>(null);

  React.useEffect(() => {
    const newModel = data?.data.data.otherData.module_type;
    const jsondata = open;
    if (jsondata) {
      const indicatorData = buildPngReportData(
        jsondata,
        newModel,
        data?.data.data.formData
      );
      if (newModel === "Engine") {
        setComponent(<Engine indicatorData={indicatorData} />);
        setActiveClass("Engine");
      } else if (newModel === "Torque") {
        setComponent(<Torque indicatorData={indicatorData} />);
        setActiveClass("Torque");
      } else if (newModel === "Bearing") {
        setComponent(<Bearing indicatorData={indicatorData} />);
        setActiveClass("Bearing");
      } else if (newModel === "Motor") {
        setComponent(<Motor indicatorData={indicatorData} />);
        setActiveClass("Motor");
      } else if (newModel === "Turbine") {
        setComponent(<Turbine indicatorData={indicatorData} />);
        setActiveClass("Turbine");
      }
    }
    synchronisation(open?.Status);
  }, [data?.data.data.otherData.module_type, open, data?.data.data.formData]);

  function synchronisation(val: any) {
    SIGNAL_STATUS_QUALITY.map((item) => {
      if (parseInt(item.id) === val) {
        setStatus(item.description);
      }
    });
  }

  return (
    <Container>
      <Box sx={{ minWidth: "1200px" }}>
        <Box
          sx={{ mt: 3, mb: 5, padding: "5px 40px", bgcolor: "white" }}
          ref={ref}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "5px",
            }}
          >
            <img
              style={{ width: "140px", height: "75px" }}
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
            <Button
              disabled={activeClass !== "Engine"}
              sx={{ color: "black", fontSize: "22px", fontWeight: 500 }}
            >
              ENGINE
            </Button>
            <Button
              disabled={activeClass !== "Torque"}
              sx={{ color: "black", fontSize: "22px", fontWeight: 500 }}
            >
              TORQUE
            </Button>
            <Button
              disabled={activeClass !== "Bearing"}
              sx={{ color: "black", fontSize: "22px", fontWeight: 500 }}
            >
              BEARING
            </Button>
            <Button
              disabled={activeClass !== "Motor"}
              sx={{ color: "black", fontSize: "22px", fontWeight: 500 }}
            >
              MOTOR
            </Button>
            <Button
              disabled={activeClass !== "Turbine"}
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
              width: "100%",
              // ml: 5,
            }}
          >
            <TableContainer>
              <Table
                sx={{
                  borderCollapse: "collapse",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ border: "none", padding: "5px", paddingBottom: 0 }}
                    >
                      <Typography sx={{ fontStyle }}>
                        Timestamp (UTC)
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ border: "none", padding: "5px", paddingBottom: 0 }}
                    >
                      <Typography sx={{ fontStyle }}>
                        Asset- Equipment
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ border: "none", padding: "5px", paddingBottom: 0 }}
                    >
                      <Typography sx={{ fontStyle }}>Speed (RPM)</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ border: "none", padding: "5px", paddingBottom: 0 }}
                    >
                      <Typography sx={{ fontStyle }}>SW Version</Typography>
                    </TableCell>
                    {data?.data.data.otherData.module_type === "Engine" && (
                      <TableCell
                        align="center"
                        sx={{
                          border: "none",
                          padding: "5px",
                          paddingBottom: 0,
                        }}
                      >
                        <Typography sx={{ fontStyle }}>Status</Typography>
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ border: "none", padding: "5px" }}
                      component="th"
                      scope="row"
                    >
                      <Typography sx={{ fontStyle }}>
                        {open?.DateAndTime}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ border: "none", padding: "5px" }}
                    >
                      <Typography sx={{ fontStyle }}>
                        {data?.data.data.formData.asset_name}-{" "}
                        {data?.data.data.formData.equipment_name}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ border: "none", padding: "5px" }}
                    >
                      <Typography sx={{ fontStyle }}>
                        {data?.data.data.formData.rated_rpm}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ border: "none", padding: "5px" }}
                    >
                      <Typography sx={{ fontStyle }}>
                        {data?.data.data.otherData.sw_version}
                      </Typography>
                    </TableCell>

                    {data?.data.data.otherData.module_type === "Engine" && (
                      <TableCell
                        align="center"
                        sx={{ border: "none", padding: "5px" }}
                      >
                        <Typography sx={{ fontStyle }}>{status}</Typography>
                      </TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {/* specific components */}
          <Box sx={{ mt: 2 }}>{component}</Box>
          {/* Footer starts */}
          <Divider
            flexItem
            sx={{ width: "100%", mt: 8, mb: 4, borderBottomWidth: 5 }}
          />
          <Box
            sx={{
              width: "100%",
              marginBottom: "30px",
            }}
          >
            <TableContainer sx={{ padding: "0 5%" }}>
              <Table
                sx={{
                  border: "1px solid black",
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
                      {data?.data.data.otherData.client_name}
                    </TableCell>
                    <TableCell sx={{ fontStyle }} align="center">
                      {data?.data.data.formData.make_model ||
                        data?.data.data.formData.name}
                    </TableCell>
                    <TableCell sx={{ fontStyle, color: "blue" }} align="center">
                      {data?.data.data.otherData.module_type === "Engine"
                        ? data?.data.data.formData.no_of_strokes +
                          " " +
                          data?.data.data.formData.fuel
                        : ""}
                      {data?.data.data.otherData.module_type === "Turbine"
                        ? data?.data.data.formData.type + " Turbine"
                        : ""}
                      {data?.data.data.otherData.module_type === "Motor"
                        ? "Alternator / Motor"
                        : ""}
                      {data?.data.data.otherData.module_type === "Torque"
                        ? "Torque"
                        : ""}
                      {data?.data.data.otherData.module_type === "Bearing"
                        ? "Bearing"
                        : ""}
                    </TableCell>
                    <TableCell sx={{ fontStyle }} align="center">
                      {data?.data.data.formData.application}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ my: "10px", mb: 5 }}>
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
    </Container>
  );
}
