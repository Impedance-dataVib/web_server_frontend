import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Typography } from "@mui/material";

export default function SystemInfoTable({ systemInfo }: any) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ border: "none" }}>
              <Typography component="p" sx={{ fontSize: "medium" }}>
                {" "}
                Activated Modules
              </Typography>
            </TableCell>
            <TableCell align="center" sx={{ border: "none" }}>
              <Typography component="p" sx={{ fontSize: "medium" }}>
                {" "}
                Quantity
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:td, &:th": { border: "none" } }}>
            <TableCell
              align="center"
              sx={{
                border: "none",
                opacity: false ? 0.5 : 1,
              }}
            >
              <Typography variant="subtitle1">{"Engine"}</Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: "none", opacity: false ? 0.5 : 1 }}
            >
              <Typography variant="subtitle1">
                {systemInfo?.engine_quantity}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow sx={{ "&:td, &:th": { border: "none" } }}>
            <TableCell
              align="center"
              sx={{
                border: "none",
                opacity: false ? 0.5 : 1,
              }}
            >
              <Typography variant="subtitle1">{"Bearing"}</Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: "none", opacity: false ? 0.5 : 1 }}
            >
              <Typography variant="subtitle1">
                {systemInfo?.bearing_quantity}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow sx={{ "&:td, &:th": { border: "none" } }}>
            <TableCell
              align="center"
              sx={{
                border: "none",
                opacity: false ? 0.5 : 1,
              }}
            >
              <Typography variant="subtitle1">{"Motor"}</Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: "none", opacity: false ? 0.5 : 1 }}
            >
              <Typography variant="subtitle1">
                {systemInfo?.motor_quantity}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow sx={{ "&:td, &:th": { border: "none" } }}>
            <TableCell
              align="center"
              sx={{
                border: "none",
                opacity: false ? 0.5 : 1,
              }}
            >
              <Typography variant="subtitle1">{"Turbine"}</Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: "none", opacity: false ? 0.5 : 1 }}
            >
              <Typography variant="subtitle1">
                {systemInfo?.turbine_quantity}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow sx={{ "&:td, &:th": { border: "none" } }}>
            <TableCell
              align="center"
              sx={{
                border: "none",
                opacity: false ? 0.5 : 1,
              }}
            >
              <Typography variant="subtitle1">{"Torque"}</Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: "none", opacity: false ? 0.5 : 1 }}
            >
              <Typography variant="subtitle1">
                {systemInfo?.torque_quantity}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
