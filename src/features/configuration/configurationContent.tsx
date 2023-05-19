import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import TabPanel from "../../app/components/tab-panel";
import EngineTabContent from "./moduleTabs/engine";
import BearingTabContent from "./bearingTabContent";
import TurbineTabContent from "./turbineTabConTent";
import TorqueTabContent from "./torqueTabContent";
import MotorTabContent from "./motorTabContent";
import formSchema from "./formSchema";
import Button from "@mui/material/Button";
import { AddModule } from "../../app/services";
import { useNavigate, useParams } from "react-router-dom";
import { useGetConfigurationModuleByConfigId } from "./hooks";
import AddModuleModal from "./modals/addModule";
import { LinearProgress, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { Add, Delete, Remove } from "@mui/icons-material";
import { makeStyles } from "tss-react/mui";
import { eventBus } from "src/EventBus";
import ConfirmDialogueBox from "./confirmDialog";

function tabProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles()((theme) => {
  return {
    tabRoot: {
      opacity: "0.5",
      "&.Mui-selected": {
        background: "#fff",
        color: theme.palette.primary.main,
        borderBottom: "none",
        borderRadius: "4px 4px 0px 0px",
        opacity: 1,
      },
    },
  };
});

const getKeysFromSchema = (schema: any) => {
  return Object.keys(schema);
};

const TabModuleRender = ({ type, moduleId, isUnsaved, setIsUnsaved }: any) => {
  switch (type) {
    case "Engine":
      return (
        <EngineTabContent moduleId={moduleId} module={type} setIsUnsaved={setIsUnsaved} />
      );

    case "Torque":
      return (
        <TorqueTabContent moduleId={moduleId} module={type} setIsUnsaved={setIsUnsaved} />
      );
    case "Turbine":
      return (
        <TurbineTabContent moduleId={moduleId} module={type} setIsUnsaved={setIsUnsaved} />
      );
    case "Bearing":
      return (
        <BearingTabContent moduleId={moduleId} module={type} setIsUnsaved={setIsUnsaved} />
      );
    case "Motor":
      return (
        <MotorTabContent moduleId={moduleId} module={type} setIsUnsaved={setIsUnsaved} />
      );
    default:
      return <div> Invalid type module </div>;
  }
};

const ConfigurationContent = ({isUnsaved, setIsUnsaved, openConfirmBox, setOpenconfirmmBox, navigatePath}: any) => {
  const [midTab, setMidTab] = useState(0);
  const [tab, setTab] = useState(0);
  const [tabs, setTabs] = useState<string[] | undefined>();
  const navigate = useNavigate();
  // const [addModules, setAddModules] = useState<any>([]);
  // const [selectedModule, setSelectedModule] = useState<any>({});
  const { configId } = useParams();
  const [openAddModule, setOpenAddModule] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data, isPending, isError, getAllModulesByConfigId } =
    useGetConfigurationModuleByConfigId(configId);

  const { enqueueSnackbar } = useSnackbar();
  const { classes } = useStyles();

  const handleAddModules = async (data: any) => {
    const payload = {
      ...data,
      configuration_id: configId,
    };
    try {
      setIsLoading(true);
      await AddModule(payload);
      await getAllModulesByConfigId(configId);

      enqueueSnackbar({
        message: "Module successfully added!",
        variant: "success",
      });
      setIsLoading(false);
      // setSelectedModule({});
      handleCloseDialog();
    } catch (error: any) {
      enqueueSnackbar({
        message: error.response.data.Message,
        variant: "error",
      });

      setIsLoading(false);
      // setSelectedModule({});
    }
  };

  const handleOpenDialog = () => {
    setOpenAddModule(true);
  };
  const handleCloseDialog = () => {
    setOpenAddModule(false);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number, isUnsaved: boolean) => {
    if(isUnsaved ) {
      setMidTab(newValue)
      setOpenconfirmmBox(true)
    }else {
      setTab(newValue);
    }
  };
  useEffect(() => {
    eventBus.on("ModuleDelete", async () => {
      await getAllModulesByConfigId(configId);
    });
  }, []);
  useEffect(() => {
    setTabs(data);
  }, [formSchema]);

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5">Configuration</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            p: 1,
            justifyContent: "flex-start",
          }}
        >
          <Button
            startIcon={<Add />}
            color="primary"
            variant="contained"
            onClick={handleOpenDialog}
            sx={{ mr: 1 }}
          >
            Add Module
          </Button>
        </Box>
      </Box>
      {isLoading && (
        <Box sx={{ my: 1 }}>
          <LinearProgress />
        </Box>
      )}

      <Box
        sx={{
          background: (theme) => theme.palette.background.paper,
        }}
      >
        <Box sx={{ borderBottom: "2px solid #f7f7f7" }}>
          <Tabs
            value={tab}
            onChange={(e, value) =>  handleChange(e, value, isUnsaved)}
            aria-label="basic tabs example"
            variant="scrollable"
          >
            {data?.map((tabElement: any, index: number) => (
              <Tab
                key={index}
                label={tabElement.name}
                {...tabProps(index)}
                classes={{
                  root: classes.tabRoot,
                }}
              />
            ))}
          </Tabs>
        </Box>
        {data?.map((item: any, index: any) => (
          <TabPanel key={item.id} value={tab} index={index}>
            <TabModuleRender
              moduleId={item.id}
              isUnsaved={isUnsaved}
              setIsUnsaved={setIsUnsaved}
              type={item.module_type}
            ></TabModuleRender>
          </TabPanel>
        ))}
      </Box>
      {openConfirmBox && (
        <ConfirmDialogueBox 
          open={openConfirmBox}
          handleCancel={() => {
            setOpenconfirmmBox(false);
          }} 
          handleOk={() => {
            console.log('navigatePath', navigatePath)
            setOpenconfirmmBox(false);
            setIsUnsaved(false);
            if(navigatePath) {
              const path = navigatePath;
              setMidTab(0);
              navigate(path);
            } else {
              setTab(midTab);
              setMidTab(0);
            }
          }}
        />
      )}
      {openAddModule && (
        <AddModuleModal
          open={openAddModule}
          onClose={handleCloseDialog}
          onSubmit={handleAddModules}
        />
      )}
    </Box>
  );
};

export default ConfigurationContent;
