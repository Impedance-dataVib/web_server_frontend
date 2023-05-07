import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ContentBox from "../../app/components/content-box";
import ConfigurationTable from "./configurationTable";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { addConfiguration } from "../../app/services";
import { useGetConfiguration } from "./hooks";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import { Grid, LinearProgress } from "@mui/material";
import ConfigurationEmptyState from "./emptyState";
import AddConfigurationModal from "./modals/addConfiguration";

const ConfigurationPageContent = () => {
  const [openAddConfigDialog, setOpenAddConfigDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<{
    message: string;
    severity: AlertColor;
  }>({
    message: "",
    severity: "info",
  });
  const { isLoading, data, getConfigData } = useGetConfiguration();

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleAddConfigDialog = () => {
    setOpenAddConfigDialog((prev) => !prev);
  };

  const handleAddConfig = async (name: string) => {
    if (!name) {
      return;
    }
    setLoading(true);
    try {
      await addConfiguration({ name });
      setOpenAlert(true);
      setAlertMessage({
        message: "Configuration added successfully",
        severity: "success",
      });
      getConfigData();
      handleAddConfigDialog();
      setLoading(false);
    } catch (error) {
      setOpenAlert(true);
      setAlertMessage({
        message: "Error occurred while adding configuration",
        severity: "error",
      });
      handleAddConfigDialog();
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
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
            {!isLoading && (data === undefined || data?.length === 0) && (
              <ConfigurationEmptyState
                handleAddConfigDialog={handleAddConfigDialog}
              />
            )}
            {data !== undefined && data?.length > 0 && (
              <ConfigurationTable
                data={data}
                refetchOnDelete={getConfigData}
                setAlert={{ setAlertMessage, setOpenAlert }}
                setIsLoading={setLoading}
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
          {openAddConfigDialog && (
            <AddConfigurationModal
              open={openAddConfigDialog}
              onClose={handleAddConfigDialog}
              onSubmit={handleAddConfig}
            />
          )}

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
