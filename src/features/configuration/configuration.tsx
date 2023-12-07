import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ContentBox from "../../app/components/content-box";
import ConfigurationTable from "./configurationTable";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Alert, AlertTitle, Grid, LinearProgress } from "@mui/material";
import { useSnackbar } from "notistack";

import { useGetConfiguration, useGetActiveConfig } from "./hooks";
import ConfigurationEmptyState from "./emptyState";
import AddConfigurationModal from "./modals/addConfiguration";
import { addConfiguration, importConfiguration } from "../../app/services";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { eventBus } from "src/EventBus";

const ConfigurationPageContent = () => {
  const [openAddConfigDialog, setOpenAddConfigDialog] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(true);

  const { isLoading, data, getConfigData } = useGetConfiguration();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddConfigDialog = () => {
    setOpenAddConfigDialog((prev) => !prev);
  };
  const { data: activeConfigCount, getActiveConfig } = useGetActiveConfig();
  const handleAddConfig = async (value: any) => {
    if (!value) {
      return;
    }
    setLoading(true);
    try {
      await addConfiguration({ ...value });
      enqueueSnackbar({
        message: "Configuration added successfully",
        variant: "success",
      });
      getConfigData();
      handleAddConfigDialog();
      setLoading(false);
    } catch (error) {
      enqueueSnackbar({
        message: "Error occurred while adding configuration",
        variant: "error",
      });
      handleAddConfigDialog();
      setLoading(false);
    }
  };

  const onChangeHandler = async (e: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    try {
      const res: any = await importConfiguration(formData);
      getConfigData();
      setLoading(false);
      enqueueSnackbar({
        message: res?.data?.Message,
        variant: "success",
      });
      e.target.value = null;
    } catch (ex: any) {
      enqueueSnackbar({
        message: ex?.response?.data?.Message,
        variant: "error",
      });
      setLoading(false);

      e.target.value = null;
    }
  };

  useEffect(() => {
    eventBus.on("ConfigDelete", async () => {
      await getActiveConfig();
    });
    eventBus.on("ConfigActive", async () => {
      await getActiveConfig();
    });
  }, []);
  useEffect(() => {
    if (activeConfigCount === 0) {
      setShowErrorAlert(true);
    } else {
      setShowErrorAlert(false);
    }
  }, [activeConfigCount]);

  return (
    <Box sx={{ p: 2 }}>
      {isLoading ||
        (loading && (
          <Box sx={{ my: 1 }}>
            <LinearProgress />
          </Box>
        ))}
      {showErrorAlert && (
        <Box sx={{ my: 1 }}>
          <Alert severity="warning" onClose={() => { }}>
            <AlertTitle>Active Configuration Not Found !</AlertTitle>
            <Typography variant="caption">
              No Modules found with active configuartion! Please add a new
              configuration or activate the existing
            </Typography>
          </Alert>
        </Box>
      )}
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
              Manage Configuration
            </Typography>
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
                  variant="contained"
                  component="label"
                  startIcon={<AttachFileIcon />}
                >
                  Import
                  <input
                    disabled={true}
                    accept=".csv"
                    type="file"
                    hidden
                    style={{ opacity: 0, width: "100%", height: "100%" }}
                    onChange={onChangeHandler}
                  />
                </Button>
                <Button
                  onClick={handleAddConfigDialog}
                  variant="contained"
                  startIcon={<AddIcon></AddIcon>}
                >
                  Add Configuration
                </Button>
              </Stack>
            )}
          </Box>
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
                setIsLoading={setLoading}
              />
            )}
          </Box>

          {openAddConfigDialog && (
            <AddConfigurationModal
              open={openAddConfigDialog}
              onClose={handleAddConfigDialog}
              onSubmit={handleAddConfig}
            />
          )}
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
