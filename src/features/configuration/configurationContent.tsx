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
import { useParams } from "react-router-dom";
import { useGetConfigurationModuleByConfigId } from "./hooks";
import AddModuleModal from "./modals/addModule";
import { LinearProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { Add } from "@mui/icons-material";

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
  // console.log("hi", type);
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

const ConfigurationContent = (props: any) => {
  const [tab, setTab] = useState(0);
  const [tabs, setTabs] = useState<string[] | undefined>();
  // const [addModules, setAddModules] = useState<any>([]);
  // const [selectedModule, setSelectedModule] = useState<any>({});
  const { configId } = useParams();
  const [openAddModule, setOpenAddModule] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data, isPending, isError, getAllModulesByConfigId } =
    useGetConfigurationModuleByConfigId(configId);

  const { enqueueSnackbar } = useSnackbar();

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
    } catch (error) {
      enqueueSnackbar({
        message: "Error occurred while adding module",
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
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    setTabs(data);
  }, [formSchema]);

  return (
    <Box>
      {isLoading && (
        <Box sx={{ my: 1 }}>
          <LinearProgress />
        </Box>
      )}
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
        >
          Add Module
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
