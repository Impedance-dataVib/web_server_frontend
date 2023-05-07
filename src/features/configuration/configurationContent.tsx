import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import TabPanel from "../../app/components/tab-panel";
import EngineTabContent from "./engineTabContent";
import BearingTabContent from "./bearingTabContent";
import TurbineTabContent from "./turbineTabConTent";
import TorqueTabContent from "./torqueTabContent";
import MotorTabContent from "./motorTabContent";
import formSchema from "./formSchema";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import { AddModule } from "../../app/services";
import { useParams } from "react-router-dom";
import { useGetConfigurationModuleByConfigId } from "./hooks";

function tabProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const getKeysFromSchema = (schema: any) => {
  return Object.keys(schema);
};

const TabModuleRender = ({ type, moduleId }: any) => {
  console.log("hi", type);
  switch (type) {
    case "Engine":
      return (
        <EngineTabContent moduleId={moduleId} module={type}></EngineTabContent>
      );

    case "Torque":
      return (
        <TorqueTabContent moduleId={moduleId} module={type}></TorqueTabContent>
      );
    case "Turbine":
      return (
        <TurbineTabContent
          moduleId={moduleId}
          module={type}
        ></TurbineTabContent>
      );
    case "Bearing":
      return (
        <BearingTabContent
          moduleId={moduleId}
          module={type}
        ></BearingTabContent>
      );
    case "Motor":
      return (
        <MotorTabContent moduleId={moduleId} module={type}></MotorTabContent>
      );
    default:
      return <div> Invalid type module </div>;
  }
};

const Modules = ["Engine", "Motor", "Turbine", "Torque", "Bearing"];

const ConfigurationContent = (props: any) => {
  const [tab, setTab] = useState(0);
  const [tabs, setTabs] = useState<string[] | undefined>();
  const [addModules, setAddModules] = useState<any>([]);
  const [selectedModule, setSelectedModule] = useState<any>({});
  const { configId } = useParams();
  const [openAddModule, setOpenAddModule] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { data, isPending, isError, getAllModulesByConfigId } =
    useGetConfigurationModuleByConfigId(configId);

  const handleAddModules = async () => {
    const data = {
      ...selectedModule,
      configuration_id: configId,
    };
    try {
      setIsLoading(true);
      await AddModule(data);
      await getAllModulesByConfigId(configId);
      setAlertMessage("Success");
      setOpenAlert(true);
      setIsLoading(false);
      setSelectedModule({});
      handleCloseDialog();
    } catch (error) {
      setAlertMessage("Failed");
      setOpenAlert(true);
      setIsLoading(false);
      setSelectedModule({});
    }
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleOpenDialog = () => {
    setOpenAddModule(true);
  };
  const handleCloseDialog = () => {
    setOpenAddModule(false);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  const handleSelectModule = (event: any) => {
    setSelectedModule((prev: any) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  useEffect(() => {
    setTabs(data);
  }, [formSchema]);

  return (
    <Box>
      <Box
        sx={{
          paddingTop: "10px",
          display: "flex",
          marginBottom: "10px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
      >
        <Button color="primary" variant="contained" onClick={handleOpenDialog}>
          Add Modules
        </Button>
      </Box>
      <div>
        <Box>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ marginLeft: "45px" }}
          >
            {data?.map((tabElement: any, index: number) => (
              <Tab key={index} label={tabElement.name} {...tabProps(index)} />
            ))}
          </Tabs>
        </Box>
        {data?.map((item: any, index: any) => (
          <TabPanel key={item.id} value={tab} index={index}>
            <TabModuleRender
              moduleId={item.id}
              type={item.module_type}
            ></TabModuleRender>
          </TabPanel>
        ))}
      </div>

      <Dialog open={openAddModule} onClose={handleCloseDialog}>
        <DialogTitle>Add Module</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="name"
            name="name"
            label="Name"
            type="text"
            variant="standard"
            fullWidth
            onChange={handleSelectModule}
          ></TextField>
          <TextField
            autoFocus
            id="description"
            name="description"
            label="Description"
            type="text"
            variant="standard"
            fullWidth
            onChange={handleSelectModule}
          ></TextField>
          <TextField
            select
            id="module_type"
            name="module_type"
            label="Module Type"
            type="text"
            variant="standard"
            fullWidth
            onChange={handleSelectModule}
            defaultValue={"None"}
          >
            <MenuItem value={"None"}>{"None"}</MenuItem>
            {Modules.map((module: string) => (
              <MenuItem key={module} value={module}>
                {module}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button color="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            color="primary"
            disabled={selectedModule === "None" ? true : false}
            onClick={handleAddModules}
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

export default ConfigurationContent;
