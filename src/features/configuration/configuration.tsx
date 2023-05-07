import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ContentBox from "../../app/components/content-box";
import ConfigurationTable from "./configurationTable";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { addConfiguration, AddConfiguration } from "../../app/services";
import { useGetConfiguration } from "./hooks";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import { Grid, LinearProgress } from "@mui/material";
import ConfigurationEmptyState from "./emptyState";

const ConfigurationPageContent = () => {
  const [openAddConfigDialog, setOpenAddConfigDialog] = useState(false);
  const [formData, setFormData] = useState<AddConfiguration>({ name: "" });
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{
    message: string;
    severity: AlertColor;
  }>({
    message: "",
    severity: "info",
  });
  const { isLoading, data, isError, getConfigData } = useGetConfiguration();
  const [loading, setIsLoading] = useState<boolean>(false);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleAddConfigDialog = () => {
    setOpenAddConfigDialog((prev) => !prev);
  };
  const handleAddConfig = async () => {
    try {
      await addConfiguration(formData);
      setOpenAlert(true);
      setAlertMessage({ message: "Success!", severity: "success" });
      getConfigData();
      setFormData({ name: "" });
      handleAddConfigDialog();
    } catch (error) {
      setOpenAlert(true);
      setAlertMessage({ message: "Error!", severity: "error" });
      handleAddConfigDialog();
    }
  };
  const handleFormData = (event: any) => {
    setFormData({ name: event.target.value });
  };

  return (
    <Box
      sx={{
        p: 2,
        // marginLeft: "41px",
        //  paddingTop: "41px"
      }}
    >
      {isLoading ||
        (loading && (
          <Box sx={{ my: 1 }}>
            <LinearProgress />
          </Box>
        ))}
      <Grid container>
        <Grid item xs={12} lg={6}>
          <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
            Manage Configuration
          </Typography>
          <Box sx={{ marginTop: "21px", paddingBottom: "41px" }}>
            {(data === undefined || data?.length === 0) && (
              <ConfigurationEmptyState
                handleAddConfigDialog={handleAddConfigDialog}
              />
            )}
            {data !== undefined && data?.length > 0 && (
              <ConfigurationTable
                data={data}
                refetchOnDelete={getConfigData}
                setAlert={{ setAlertMessage, setOpenAlert }}
                setIsLoading={setIsLoading}
              />
            )}
          </Box>
          {data !== undefined && data?.length > 0 && (
            <Stack
              spacing={1}
              direction="row"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingBottom: "10px",
              }}
            >
              <Button
                onClick={handleAddConfigDialog}
                variant="contained"
                startIcon={<AddIcon></AddIcon>}
              >
                Add Configuration
              </Button>
            </Stack>
          )}

          <Dialog open={openAddConfigDialog} onClose={handleAddConfigDialog}>
            <DialogTitle>Add Configuration</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                id="name"
                name="name"
                label="Configuration Name"
                type="text"
                variant="standard"
                fullWidth
                value={formData.name}
                onChange={handleFormData}
              />
            </DialogContent>

            <DialogActions>
              <Button color="secondary" onClick={handleAddConfigDialog}>
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={handleAddConfig}
                disabled={formData.name.length > 0 ? false : true}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={openAlert}
            autoHideDuration={2000}
            onClose={handleCloseAlert}
          >
            <Alert
              onClose={handleCloseAlert}
              severity={alertMessage?.severity || "info"}
              sx={{ width: "100%" }}
            >
              {alertMessage?.message}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </Box>
  );
};
const ManageConfigurationPage = () => {
  return (
    <ContentBox title={"Configuration"}>
      <ConfigurationPageContent></ConfigurationPageContent>
    </ContentBox>
  );
};

export default ManageConfigurationPage;
