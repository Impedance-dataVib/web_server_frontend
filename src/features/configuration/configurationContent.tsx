import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../app/components/tab-panel";
import TabContent from "./engineTabContent";
import formSchema from "./formSchema";
function tabProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const getKeysFromSchema = (schema: any) => {
  console.log(Object.keys(schema));
  return Object.keys(schema);
};
const ConfigurationContent = (props: any) => {
  const [tab, setTab] = useState(0);
  const [tabs, setTabs] = useState<string[] | undefined>();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    setTabs(getKeysFromSchema(formSchema));
  }, []);

  return (
    <Box>
      <div>
        <Box>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ marginLeft: "45px" }}
          >
            {tabs?.map((tab: string, index: number) => (
              <Tab label={tab} {...tabProps(index)} />
            ))}
          </Tabs>
        </Box>
        {tabs?.map((item: any, index: number) => (
          <TabPanel key={item} value={tab} index={index}>
            <TabContent module={item}></TabContent>
          </TabPanel>
        ))}
        {/* <TabPanel value={tab} index={0}>
          <EngineTabContent></EngineTabContent>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          Motor
        </TabPanel>
        <TabPanel value={tab} index={2}>
          Gear Box
        </TabPanel>
        <TabPanel value={tab} index={3}>
          Bearing
        </TabPanel> */}
      </div>
    </Box>
  );
};

export default ConfigurationContent;
