import { useEffect, useRef, useState } from "react";
import { Grid, LinearProgress, Tab, Tabs } from "@mui/material";
import AlertsAndInstructions from "src/features/common/alertsAndInstructions";
import CardWidget from "src/app/components/card";
import {
  CellTowerOutlined,
  SignpostOutlined,
  TrendingUp,
  DescriptionOutlined,
  VisibilityOutlined,
  SyncDisabled,
  WarningAmber,
} from "@mui/icons-material";
import GlobalIndicatorChart from "../../globalIndicator";
import ReportsCard from "src/features/common/reports";
import LiveStatus from "./live-status";
import useWebSocket from "react-use-websocket";

import Signal from "./signal";
import Trends from "./trends";
import CylinderIndicator from "./cylinder-indicator";
import { SIGNAL_STATUS_QUALITY } from "../../schema";
import {
  buildLiveStatusData,
  convertUTCDateToLocalTime,
} from "src/app/utils/helper";
import DownloadPngModal from "src/features/configuration/modals/downloadPngModal";
import { toPng } from "html-to-image";
const ModuleMonitoringPage = ({
  moduleId,
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
  const [currentMode, setCurrentMode] = useState<any>("");
  const [documents, setDocuments] = useState<any>([]);
  const elementRef = useRef<(HTMLDivElement | null)[]>([]);
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onActiveModuleChange = (event: any, params: any) => {
    setActiveModule(params);
  };
  const { sendMessage, lastMessage } = useWebSocket(
    process.env.REACT_APP_LIVE_WEBSOCKET_URL ||
      `ws:${window.location.hostname}:8082`,
    {
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
        if (parsedData?.Status !== "Failed") {
          parsedData = buildLiveStatusData(parsedData);
          setLiveStatus(parsedData);
        }
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
    const trendsCylinderArr = ["Trends"];
    if (
      trendsData.cylinder_specific_indicators &&
      trendsData.cylinder_specific_indicators.length > 0
    ) {
      trendsCylinderArr.push("Cylinder Specific Indicator");
    }
    setTrendsCylinder(trendsCylinderArr);
  }, [trendsData]);
  const parsedFormData = JSON.parse(formData);

  useEffect(() => {
    const fileName = `${parsedFormData?.asset_name} - ${
      parsedFormData?.equipment_name
    } - ${convertUTCDateToLocalTime(new Date())}`;
    if (documents.length > 0) {
      setTimeout(function () {
        elementRef.current.map((val: any) => {
          if (val) {
            toPng(val, { quality: 0.5 })
              .then((dataUrl: string) => {
                const link = document.createElement("a");
                link.download = `${fileName}.png`;
                link.href = dataUrl;
                setIsLoading(false);
                link.click();
                setDocuments([]);
              })
              .catch((err) => {
                setIsLoading(false);
                setDocuments([]);
              });
          }
        });
      }, 1000);
    }
  }, [documents]);

  return (
    <Grid container spacing={1}>
      <Grid item xl={5} lg={3} md={12} sm={12}>
        <CardWidget
          showDate={trendsData?.alertUpdatedOn}
          headerLabel={
            moduleType !== "Torque"
              ? "Alerts & Instructions"
              : "Status Messages"
          }
          headerIcon={<WarningAmber />}
          content={
            <AlertsAndInstructions
              moduleData={moduleData}
              alertData={trendsData?.alert || []}
            />
          }
          formData={formData}
          moduleType={moduleType}
          moduleId={moduleId}
          initiallyCollapsed={false}
          fullScreenContent={
            <AlertsAndInstructions
              moduleData={moduleData}
              alertData={trendsData?.alert || []}
              isModalOpen={true}
            />
          }
          section="top"
        />
      </Grid>
      <Grid item xs={12} md={12} lg={9} xl={7}>
        <CardWidget
          showDate={trendsData.alertUpdatedOn}
          headerLabel="Global Indicators"
          headerIcon={<SignpostOutlined />}
          content={
            <GlobalIndicatorChart
              globalIndicator={moduleData?.globalIndicator || []}
              fullScreen={false}
              isTorqueModule={moduleType === "Torque"}
            />
          }
          initiallyCollapsed={false}
          fullScreenContent={
            <GlobalIndicatorChart
              showDate={trendsData.alertUpdatedOn}
              globalIndicator={moduleData?.globalIndicator || []}
              fullScreen={true}
              isTorqueModule={moduleType === "Torque"}
            />
          }
          section="top"
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
                variant="scrollable"
                scrollButtons="auto"
              >
                {trendsCylinder?.map((tabElement: any, index: number) => (
                  <Tab
                    key={tabElement}
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
                ))}
              </Tabs>
            </>
          }
          headerLabel={
            activeModule === 0 ? "Trends" : "Cylinder Specific Indicator"
          }
          headerIcon={<></>}
          content={
            activeModule === 0 ? (
              <Trends trends={trendsData?.trends || []} />
            ) : (
              <CylinderIndicator
                cylinderSpecificIndicators={
                  trendsData?.cylinder_specific_indicators
                }
              />
            )
          }
          section="middle"
          initiallyCollapsed={false}
          fullScreenContent={
            activeModule === 0 ? (
              <Trends trends={trendsData?.trends || []} fullScreen={true} />
            ) : (
              <CylinderIndicator
                cylinderSpecificIndicators={
                  trendsData?.cylinder_specific_indicators || []
                }
                fullScreen={true}
              />
            )
          }
        />
      </Grid>
      <Grid item lg={4} md={12} sm={12}>
        <CardWidget
          headerLabel="Live Diagnostic Status"
          headerIcon={<VisibilityOutlined />}
          content={
            <LiveStatus
              liveStatus={liveStatus}
              processName={processName}
              currentMode={currentMode}
              setCurrentMode={setCurrentMode}
            />
          }
          initiallyCollapsed={true}
          setIsLiveStatusOpen={setIsLiveStatusOpen}
          fullScreenContent={
            <LiveStatus
              liveStatus={liveStatus}
              processName={processName}
              currentMode={currentMode}
              setCurrentMode={setCurrentMode}
            />
          }
        />
      </Grid>
      <Grid item lg={4} md={12} sm={12}>
        <CardWidget
          headerLabel={
            moduleType === "Engine"
              ? signalData?.description || ""
              : signalData?.turbineMessage || signalData?.description || ""
          }
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
            <ReportsCard
              liveStatus={liveStatus}
              processName={processName}
              formData={formData}
              moduleId={moduleId}
              setData={setData}
              setDocuments={setDocuments}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          }
          initiallyCollapsed={true}
          fullScreenContent={
            <ReportsCard
              liveStatus={liveStatus}
              processName={processName}
              formData={formData}
              moduleId={moduleId}
              setData={setData}
              setDocuments={setDocuments}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          }
        />
      </Grid>
      <div style={{ opacity: 0, height: 0, overflow: "hidden" }}>
        {documents.map((offer: any, i: number) => (
          <div
            key={`div${i}`}
            ref={(ref) => {
              elementRef.current[i] = ref;
            }}
          >
            <div id={"png" + i} style={{ minWidth: "1200px" }}>
              <DownloadPngModal open={offer} data={data} />
            </div>
          </div>
        ))}
      </div>
    </Grid>
  );
};
export default ModuleMonitoringPage;
