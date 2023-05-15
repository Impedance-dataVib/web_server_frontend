import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';



export default function SystemInfoTable({ systemInfo }: any) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{border: 'none'}}>Activated Modules</TableCell>
            <TableCell align="left" sx={{border: 'none'}}>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow
              sx={{ "&:td, &:th": { border: "none" } }}
            >
              <TableCell align="left" sx={{ display:'flex', alignItems: "end", border: 'none', opacity: false ? 0.5: 1}}>
                {false ? <LockIcon sx={{mr:1}}/>: <LockOpenIcon sx={{mr:1}} /> }{'Engine'}
              </TableCell>
              <TableCell align="left" sx={{border: 'none', opacity: false ? 0.5: 1}}>{systemInfo?.engine_quantity}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:td, &:th": { border: "none" } }}
            >
              <TableCell align="left" sx={{ display:'flex', alignItems: "end", border: 'none', opacity: false ? 0.5: 1}}>
                {false ? <LockIcon sx={{mr:1}}/>: <LockOpenIcon sx={{mr:1}} /> }{'Bearing'}
              </TableCell>
              <TableCell align="left" sx={{border: 'none', opacity: false ? 0.5: 1}}>{systemInfo?.bearing_quantity}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:td, &:th": { border: "none" } }}
            >
              <TableCell align="left" sx={{ display:'flex', alignItems: "end", border: 'none', opacity: false ? 0.5: 1}}>
                {false ? <LockIcon sx={{mr:1}}/>: <LockOpenIcon sx={{mr:1}} /> }{'Motor'}
              </TableCell>
              <TableCell align="left" sx={{border: 'none', opacity: false ? 0.5: 1}}>{systemInfo?.motor_quantity}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:td, &:th": { border: "none" } }}
            >
              <TableCell align="left" sx={{ display:'flex', alignItems: "end", border: 'none', opacity: false ? 0.5: 1}}>
                {false ? <LockIcon sx={{mr:1}}/>: <LockOpenIcon sx={{mr:1}} /> }{'Turbine'}
              </TableCell>
              <TableCell align="left" sx={{border: 'none', opacity: false ? 0.5: 1}}>{systemInfo?.turbine_quantity}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:td, &:th": { border: "none" } }}
            >
              <TableCell align="left" sx={{ display:'flex', alignItems: "end", border: 'none', opacity: false ? 0.5: 1}}>
                {false ? <LockIcon sx={{mr:1}}/>: <LockOpenIcon sx={{mr:1}} /> }{'Torque'}
              </TableCell>
              <TableCell align="left" sx={{border: 'none', opacity: false ? 0.5: 1}}>{systemInfo?.torque_quantity}</TableCell>
            </TableRow>
        
        </TableBody>
      </Table>
    </TableContainer>
  );
}
