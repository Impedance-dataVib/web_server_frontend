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

export default function NotActiveLicenseTable({ notActiveLicenseInfo }: any) {
  console.log(notActiveLicenseInfo);
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 220, overflow: "scroll" }}
    >
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">License No</TableCell>
            <TableCell align="center">Expiry Date</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notActiveLicenseInfo.map((row: any) => (
            <TableRow
              key={row.activation_date}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.license_number}
              </TableCell>
              <TableCell align="center">{row.expiry_date}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
