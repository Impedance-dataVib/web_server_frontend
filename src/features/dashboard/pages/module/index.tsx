import { useEffect, useState } from "react";
import { Grid, Tab, Tabs } from "@mui/material";
import AlertsAndInstructions from "src/features/common/alertsAndInstructions";
import CardWidget from "src/app/components/card";
import {
  CellTowerOutlined,
  SignpostOutlined,
  TrendingUp,
  DescriptionOutlined,
  VisibilityOutlined,
  SyncDisabled,
} from "@mui/icons-material";
import GlobalIndicatorChart from "../../globalIndicator";
import ReportsCard from "src/features/common/reports";
import LiveStatus from "./live-status";
import useWebSocket from "react-use-websocket";

import Signal from "./signal";
import Trends from "./trends";
import { WarningAmber } from "@mui/icons-material";
import CylinderIndicator from "./cylinder-indicator";
import { SIGNAL_STATUS_QUALITY } from "../../schema";
import { buildLiveStatusData } from "src/app/utils/helper";
const ModuleMonitoringPage = ({
  moduleData,
  classes,
  trendsData,
  processName,
  formData,
  moduleType,
}: any) => {
  const [activeModule, setActiveModule] = useState<number>(0);
  const [signalData, setSignalData] = useState<any>({});
  const [isLiveSocket, setIsliveSocket] = useState<boolean>(false);
  const [isLatestReportOpen, setIsLatestReportOpen] = useState<boolean>(false);
  const [isLiveStatusOpen, setIsLiveStatusOpen] = useState<boolean>(false);
  const [trendsCylinder, setTrendsCylinder] = useState<string[]>([]);
  const [liveStatus, setLiveStatus] = useState<any>({});
  const onActiveModuleChange = (event: any, params: any) => {
    setActiveModule(params);
  };

  const { sendMessage, lastMessage } = useWebSocket(
    process.env.REACT_APP_LIVE_WEBSOCKET_URL ||
      `ws:${window.location.hostname}:8082`,
    {
      onOpen: () => console.log("opened"),
      onMessage: () => {
        if (sendMessage) sendMessage(processName);
      },
      shouldReconnect: (closeEvent) => true,
    },
    isLiveSocket
  );

  useEffect(() => {
    if (lastMessage !== undefined) {
      const data = lastMessage?.data;
      if (data) {
        let parsedData = data;
        if (parsedData?.Status === "Failed") {
          // setLiveStatus(parsedData?.Message)
        } else {
          parsedData = buildLiveStatusData(parsedData);
          setLiveStatus(parsedData);
          // setWebSocketsData(parsedData);
        }
        // setIsLoading(false);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (isLiveSocket) {
      sendMessage(processName);
    }
  }, [isLiveSocket]);

  useEffect(() => {
    const data = SIGNAL_STATUS_QUALITY.find(
      (val) => val.id == moduleData?.currentStatus
    );
    setSignalData(data || SIGNAL_STATUS_QUALITY[0]);
  }, [moduleData?.currentStatus]);

  useEffect(() => {
    setIsliveSocket(isLatestReportOpen || isLiveStatusOpen);
  }, [isLatestReportOpen, isLiveStatusOpen]);

  useEffect(() => {
    const trendsCylinderArr = ['Trends'];
    // if(trendsData.trends.length > 0) {
    //   trendsCylinderArr.push('Trends')
    // }
    if(trendsData.cylinder_specific_indicators.length > 0) {
      trendsCylinderArr.push('Cylinder Specific Indicator')
    }
    setTrendsCylinder(trendsCylinderArr);
  }, [trendsData])
  return (
    <Grid container spacing={1}>
      <Grid item lg={3} md={12} sm={12}>
        <CardWidget
          headerLabel={
            moduleData?.isAlert ? "Alerts & Instructions" : "Status Messages"
          }
          headerIcon={<WarningAmber />}
          content={<AlertsAndInstructions moduleData={moduleData} alertData={trendsData?.alert} />}
          initiallyCollapsed={false}
          fullScreenContent={
            <AlertsAndInstructions moduleData={moduleData} alertData={trendsData?.alert} isModalOpen={true} />
          }
        />
      </Grid>
      <Grid item xs={12} md={12} lg={9}>
        <CardWidget
          headerLabel="Global Indicators"
          headerIcon={<SignpostOutlined />}
          content={
            <GlobalIndicatorChart
              globalIndicator={moduleData?.globalIndicator}
              fullScreen={false}
            />
          }
          initiallyCollapsed={false}
          fullScreenContent={
            <GlobalIndicatorChart
              globalIndicator={moduleData?.globalIndicator}
              fullScreen={true}
            />
          }
        />
      </Grid>
      <Grid item xs={12}>
        <CardWidget
          headerContent={
            <>
              <Tabs
                value={activeModule}
                onChange={onActiveModuleChange}
                aria-label="select modules"
                sx={{ marginTop: "10px" }}
              >
                {trendsCylinder?.map(
                  (tabElement: any, index: number) => (
                    <Tab
                      key={index}
                      label={tabElement}
                      icon={
                        tabElement === "Trends" ? (
                          <TrendingUp sx={{ mr: 1 }} />
                        ) : (
                          <TrendingUp />
                        )
                      }
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                      classes={{
                        root: classes.trendsTabRoot,
                      }}
                    />
                  )
                )}
              </Tabs>
            </>
          }
          headerLabel={
            activeModule === 0 ? "Trends" : "Cylinder Specific Indicator"
          }
          headerIcon={<></>}
          content={
            activeModule === 0 ? (
              <Trends trends={trendsData?.trends} />
            ) : (
              <CylinderIndicator
                cylinderSpecificIndicators={
                  trendsData?.cylinder_specific_indicators
                }
              />
            )
          }
          initiallyCollapsed={false}
          fullScreenContent={
            activeModule === 0 ? (
              <Trends trends={trendsData?.trends} fullScreen={true} />
            ) : (
              <CylinderIndicator
                cylinderSpecificIndicators={
                  trendsData?.cylinder_specific_indicators
                }
                fullScreen={true}
              />
            )
          }
        />
      </Grid>
      <Grid item lg={4} md={12} sm={12}>
        <CardWidget
          headerLabel="Live Status"
          headerIcon={<VisibilityOutlined />}
          content={<LiveStatus liveStatus={liveStatus} />}
          initiallyCollapsed={true}
          setIsLiveStatusOpen={setIsLiveStatusOpen}
          fullScreenContent={<LiveStatus liveStatus={liveStatus} />}
        />
      </Grid>
      <Grid item lg={4} md={12} sm={12}>
        <CardWidget
          headerLabel={moduleType !== "Turbine"? (signalData?.description || "") : (signalData?.turbineMessage || signalData?.description || "")}
          headerIcon={
            signalData?.resultType === "success" ? (
              <CellTowerOutlined color="success" />
            ) : (
              <SyncDisabled color="error" />
            )
          }
          content={
            <Signal
              moduleType={moduleType}
              signals={moduleData?.signals}
              formData={formData}
            />
          }
          initiallyCollapsed={true}
          fullScreenContent={
            <Signal
              moduleType={moduleType}
              signals={moduleData?.signals}
              formData={formData}
            />
          }
        />
      </Grid>
      <Grid item lg={4} md={12} sm={12}>
        <CardWidget
          headerLabel="Latest Reports"
          setIsLatestReportOpen={setIsLatestReportOpen}
          headerIcon={<DescriptionOutlined />}
          content={
            <ReportsCard liveStatus={liveStatus} processName={processName} />
          }
          initiallyCollapsed={true}
          fullScreenContent={
            <ReportsCard liveStatus={liveStatus} processName={processName} />
          }
        />
      </Grid>
    </Grid>
  );
};
export default ModuleMonitoringPage;
