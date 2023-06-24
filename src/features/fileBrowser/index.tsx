import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Divider,
  Grid,
  LinearProgress,
  Tabs,
  Tab,
} from "@mui/material";
import GlobalIndicatorChart from "../dashboard/globalIndicator";
import SpeedoMeter from "../common/graph/speedo-meter";
import { webSocketData } from "../dashboard/schema";
import Auxiliarydata_speedometer from "./Auxiliarydata_speedometer";
import { buildAuxData } from "src/app/utils/helper";
import useWebSocket from "react-use-websocket";
import DashboardApi from "../dashboard/dashboardApi";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    trendsTabRoot: {
      minHeight: "auto",
    },
    tabsRoot: {
      height: "34px",
      minHeight: "34px",
    },
    tabRoot: {
      background: "#fff",
      borderRadius: "4px",
      border: "1px solid #f7f7f7",
      height: "34px",
      minHeight: "34px",
      "&.Mui-selected": {
        background: theme.palette.primary.main,
        color: "#fff",
      },
    },
    tabIndicator: {
      display: "none",
    },
    activeTab: {
      background: theme.palette.primary.main,
      color: "#fff",
    },
  };
});

const FileBrowserPage = () => {
  const [isDataAvailable, setIsDataAvailable] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [globalIndicator, setGlobalIndicator] = useState<any>([]);
  const [isWebsocketConnect, setIsWebSocketConnect] = useState(true);
  const [moduleTabs, setModuleTabs] = useState<any[]>([]);
  const [activeModule, setActiveModule] = useState<number>(0);
  const { classes } = useStyles();

  const { sendMessage, lastMessage } = useWebSocket(
    process.env.REACT_APP_WEBSOCKET_URL ||
      `ws:${window.location.hostname}:8081`,
    {
      onMessage: () => {
        if (sendMessage) {
          if (sendMessage) sendMessage(moduleTabs[activeModule].process_name);
        }
      },
      onError: (e) => {
        setIsDataAvailable("Something went wrong!. ");
        setIsLoading(false);
      },
      shouldReconnect: (closeEvent) => true,
    },
    isWebsocketConnect
  );

  useEffect(() => {
    return () => setIsWebSocketConnect(false);
  }, []);

  useEffect(() => {
    if (moduleTabs.length > 0) {
      if (moduleTabs[activeModule].process_name) {
        setIsLoading(true);
        sendMessage(moduleTabs[activeModule].process_name);
      } else {
        setIsLoading(false);
      }
    }
  }, [moduleTabs, activeModule]);

  useEffect(() => {
    if (lastMessage !== undefined) {
      setIsLoading(true);
      const data = lastMessage?.data;
      if (data) {
        try {
          const parsedData = buildAuxData(data);
          setIsLoading(false);
          setGlobalIndicator(parsedData);
          console.log(parsedData);
        } catch (ex) {
          console.error(ex);
          setIsLoading(false);
        }
      }
    } else {
      setIsLoading(false);
      <Box sx={{ textAlign: "center" }}>No Data Available</Box>;
    }
  }, [lastMessage]);
  console.log(moduleTabs);

  useEffect(() => {
    setIsLoading(true);
    DashboardApi.getModules()
      .then((res) => {
        if (res.length) {
          setModuleTabs(res || []);
        } else {
          setIsLoading(false);
        }
      })
      .catch((e) => {
        setModuleTabs([]);
        setIsLoading(false);
      });
  }, []);
  const onActiveModuleChange = (event: any, params: any) => {
    setActiveModule(params);
  };
  return (
    <Box>
      {isLoading && (
        <Box sx={{ my: 1 }}>
          <LinearProgress />
        </Box>
      )}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="h5"
          padding={2}
          sx={{ fontWeight: 600, fontSize: "24px" }}
        >
          Auxiliary Data
        </Typography>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box sx={{ ml: 1 }}>
            <Tabs
              value={activeModule}
              onChange={onActiveModuleChange}
              aria-label="select modules"
              classes={{
                root: classes.tabsRoot,
                indicator: classes.tabIndicator,
              }}
            >
              {moduleTabs?.map((tabElement: any, index: number) => {
                if (tabElement.module_type.includes("Engine")) {
                  return (
                    <Tab
                      key={index}
                      label={tabElement.name}
                      // {...tabProps(index)}
                      classes={{
                        root: classes.tabRoot,
                        selected: classes.activeTab,
                      }}
                    />
                  );
                }
              })}
            </Tabs>
          </Box>
        </Box>
      </Box>
      <Box sx={{ bgcolor: "white", mt: "15px" }}>
        <Divider sx={{ mb: "10px" }} />
        <Grid container spacing={3}>
          {globalIndicator.map((val: any) => (
            <Auxiliarydata_speedometer val={val} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default FileBrowserPage;
