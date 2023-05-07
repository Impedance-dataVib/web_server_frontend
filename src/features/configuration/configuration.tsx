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
import Alert from "@mui/material/Alert";
const ConfigurationPageContent = () => {
  const [openAddConfigDialog, setOpenAddConfigDialog] = useState(false);
  const [formData, setFormData] = useState<AddConfiguration>({ name: "" });
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { isLoading, data, isError, getConfigData } = useGetConfiguration();
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
      setAlertMessage("Success!");
      getConfigData();
      setFormData({ name: "" });
      handleAddConfigDialog();
    } catch (error) {
      setOpenAlert(true);
      setAlertMessage("Error!");
      handleAddConfigDialog();
    }
  };
  const handleFormData = (event: any) => {
    setFormData({ name: event.target.value });
  };

  return (
    <Box sx={{ marginLeft: "41px", paddingTop: "41px", width: "50%" }}>
      <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
        Manage Configuration
      </Typography>
      <Box sx={{ marginTop: "21px", paddingBottom: "41px" }}>
        <ConfigurationTable
          data={data}
          refetchOnDelete={getConfigData}
          setAlert={{ setAlertMessage, setOpenAlert }}
        />
      </Box>
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
          severity={alertMessage.includes("Success") ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
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
