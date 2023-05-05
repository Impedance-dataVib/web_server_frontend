import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { useNavigate } from "react-router-dom";
import { deleteConfig, activeConfig } from "../../app/services";

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

function createData(name: string, isActive: boolean) {
  return { name, isActive };
}

const rows = [
  createData("Configuartion 1", true),
  createData("Configuartion 2", false),
  createData("Configuartion 3", false),
  createData("Configuartion 4", false),
  createData("Configuartion 5", false),
];

const ConfigurationTable = ({ data, refetchOnDelete, setAlert }: any) => {
  const navigate = useNavigate();
  const onDeleteConfiguration = async (id: string) => {
    try {
      await deleteConfig(id);
      await refetchOnDelete();
      setAlert.setOpenAlert(true);
      setAlert.setAlertMessage("Success");
    } catch (e) {
      setAlert.setOpenAlert(true);
      setAlert.setAlertMessage("Error");
    }
  };
  const onExportConfiguartion = async (id: string) => {};
  const onActiveConfig = async (id: string) => {
    try {
      const data = {
        records_id: id,
      };
      await activeConfig(data);
      await refetchOnDelete();
      setAlert.setOpenAlert(true);
      setAlert.setAlertMessage("Success");
    } catch (error) {
      setAlert.setOpenAlert(true);
      setAlert.setAlertMessage("Error");
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Configuration Name</StyledTableCell>
            <StyledTableCell align="left">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">
                <IconButton
                  onClick={() => onExportConfiguartion(row.id)}
                  aria-label="Export"
                  color="primary"
                >
                  <FileDownloadIcon></FileDownloadIcon>
                </IconButton>
                <IconButton
                  onClick={() => onDeleteConfiguration(row.id)}
                  aria-label="delete"
                  color="primary"
                >
                  <DeleteOutlineIcon></DeleteOutlineIcon>
                </IconButton>
                <IconButton
                  onClick={() => navigate(`${row.id}`)}
                  aria-label="edit"
                  color="primary"
                >
                  <EditIcon></EditIcon>
                </IconButton>

                <Button
                  variant="contained"
                  onClick={() => onActiveConfig(row.id)}
                >
                  {row.status === "Active" ? "Active" : "In Active"}
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ConfigurationTable;
