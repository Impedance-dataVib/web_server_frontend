import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  CircularProgress,
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
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useCallback, useRef } from "react";
import { toJpeg, toPng } from "html-to-image";
import { SIGNAL_STATUS_QUALITY } from "src/features/dashboard/schema";
// import JSZip from "jszip";

const style = {
  // position: "absolute" as "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  // width: "70%",
  // maxHeight: "95vh",

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
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
      <Box sx={style}>
        <Box sx={{ mt: 3, mb: 5, bgcolor: "white" }} ref={ref}>
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
                {data?.data.data.formData.asset_name}
              </Typography>
            </Box>
            <Box component={"span"}>
              <Typography sx={{ fontStyle }}>Speed (RPM)</Typography>
              <Typography sx={{ fontStyle, ml: 4 }}>
                {data?.data.data.formData.rated_rpm}
              </Typography>
            </Box>
            <Box component={"span"}>
              <Typography sx={{ fontStyle }}>SW Version</Typography>
              <Typography sx={{ fontStyle, ml: 4 }}>
                {data?.data.data.otherData.sw_version}
              </Typography>
            </Box>
            {data?.data.data.otherData.module_type === "Engine" && (
              <Box component={"span"}>
                <Typography sx={{ fontStyle }}>Synchronisation</Typography>
                <Typography sx={{ fontWeight: 500 }}>{status}</Typography>
              </Box>
            )}
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
                      {data?.data.data.otherData.client_name}
                    </TableCell>
                    <TableCell sx={{ fontStyle }} align="center">
                      {data?.data.data.formData.make_model}
                    </TableCell>
                    <TableCell sx={{ fontStyle, color: "blue" }} align="center">
                      {data?.data.data.formData.equipment_name}
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
