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
import api from "../../app/api";
import { useNavigate } from "react-router-dom";
import {
  deleteConfig,
  activeConfig,
  exportConfiguration,
} from "../../app/services";
import ConfirmDeleteConfigurationModal from "./modals/confirmDeleteConfig";
import { useSnackbar } from "notistack";
import { eventBus } from "src/EventBus";

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

export interface IConfigurationTableProps {
  data: any;
  refetchOnDelete: any;
  setIsLoading: any;
}

const ConfigurationTable = ({
  data,
  refetchOnDelete,
  setIsLoading,
}: IConfigurationTableProps) => {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = React.useState<any>(undefined);
  const [showDeleteDialog, setShowDeleteDialog] =
    React.useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  const onDeleteConfiguration = (row: any) => {
    setSelectedRow(row);
    setShowDeleteDialog(true);
  };

  const onCloseConfirmDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const onConfirmDelete = async () => {
    setShowDeleteDialog(false);
    setIsLoading(true);
    try {
      await deleteConfig(selectedRow?.id);
      await refetchOnDelete();
      setIsLoading(false);
      eventBus.dispatch("ConfigDelete", {});
      enqueueSnackbar({
        message: `Configuration with name ${selectedRow?.name}-${selectedRow?.id} successfully deleted`,
        variant: "success",
      });
    } catch (e) {
      enqueueSnackbar({
        message: "Error occurred while deleting configuration",
        variant: "error",
      });
      setIsLoading(false);
    }
  };

  const onExportConfiguartion = async (id: string) => {
    // TODO
    setIsLoading(true);
    api
      .get("/configuration/export-configuration.php/" + id, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "export-configuration.csv");
        document.body.appendChild(link);
        link.click();
        setIsLoading(false);
      })
      .catch((error) => {
        enqueueSnackbar({
          message: "Error occurred while exporting configuration",
          variant: "error",
        });
        setIsLoading(false);
      });

    //   setIsLoading(true);
    //   try {
    //   const res:any = await exportConfiguration(id);

    //   setIsLoading(false);
    // } catch (e) {
    // enqueueSnackbar({
    //   message: "Error occurred while exporting configuration",
    //   variant: "error",
    // });
    //   setIsLoading(false);
    // }
  };

  const onActiveConfig = async (row: any) => {
    try {
      if (row.status === "Active") {
        return;
      }
      const data = {
        records_id: row?.id,
      };
      setIsLoading(true);
      await activeConfig(data);
      await refetchOnDelete();
      enqueueSnackbar({
        message: `Configuration '${row?.name}' activated successfully`,
        variant: "success",
      });
      setTimeout(() => {
        eventBus.dispatch("ConfigActive", {});
      }, 500);
      setIsLoading(false);
    } catch (error) {
      enqueueSnackbar({
        message: "Error occurred while activating configuration",
        variant: "error",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Configuration Name</StyledTableCell>
              <StyledTableCell>Active Date</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.status === "Active" ? row.active_date : null}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <IconButton
                    onClick={() => onExportConfiguartion(row.id)}
                    aria-label="Export"
                    color="primary"
                    title="Export Configuration"
                  >
                    <FileDownloadIcon></FileDownloadIcon>
                  </IconButton>
                  <IconButton
                    onClick={() => onDeleteConfiguration(row)}
                    aria-label="delete"
                    color="primary"
                    title="Delete Configuration"
                  >
                    <DeleteOutlineIcon></DeleteOutlineIcon>
                  </IconButton>
                  <IconButton
                    onClick={() => navigate(`${row.id}`)}
                    aria-label="edit"
                    color="primary"
                    title="Edit Configuration"
                  >
                    <EditIcon></EditIcon>
                  </IconButton>

                  <Button
                    color={row.status === "Active" ? "success" : "warning"}
                    sx={{ ml: 1 }}
                    variant="contained"
                    onClick={() => onActiveConfig(row)}
                    title="Click here to activate"
                  >
                    {row.status === "Active" ? "Active" : "In Active"}
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showDeleteDialog && (
        <ConfirmDeleteConfigurationModal
          open={showDeleteDialog}
          onClose={onCloseConfirmDeleteDialog}
          onConfirm={onConfirmDelete}
          selectedRow={selectedRow}
        />
      )}
    </>
  );
};

export default ConfigurationTable;
