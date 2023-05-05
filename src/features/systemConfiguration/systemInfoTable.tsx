import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

interface SystemIndoProps {
  systemInfo: SystemInfoObject[];
}

interface SystemInfoObject {
    activatedModules: string;
    numberOfLicence: string;
    licenceNumber: string;
    expiryDate: string;
    isLocked: boolean;
}

export default function SystemInfoTable({ systemInfo }: SystemIndoProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{border: 'none'}}>Activated Modules</TableCell>
            <TableCell align="left" sx={{border: 'none'}}>No. Of Licence</TableCell>
            <TableCell align="left" sx={{border: 'none'}}>Licence No.</TableCell>
            <TableCell align="left" sx={{border: 'none'}}>Expiry date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {systemInfo.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:td, &:th": { border: "none" } }}
            >
              <TableCell align="left" sx={{ display:'flex', alignItems: "end", border: 'none', opacity: row.isLocked ? 0.5: 1}}>
                {row.isLocked ? <LockIcon sx={{mr:1}}/>: <LockOpenIcon sx={{mr:1}} /> }{row.activatedModules}
              </TableCell>
              <TableCell align="left" sx={{border: 'none', opacity: row.isLocked ? 0.5: 1}}>{row.numberOfLicence}</TableCell>
              <TableCell align="left" sx={{border: 'none', opacity: row.isLocked ? 0.5: 1}}>{row.licenceNumber}</TableCell>
              <TableCell align="left" sx={{border: 'none', opacity: row.isLocked ? 0.5: 1}}>{row.expiryDate}</TableCell>
            </TableRow>
          ))}
          {systemInfo.length ===0 && (
            <TableRow  sx={{ "&:td, &:th": { border: "none" } }}> 
               <TableCell colSpan={4} align="center">No records found</TableCell> 
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
