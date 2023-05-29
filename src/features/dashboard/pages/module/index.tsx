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
import Signal from "./signal";
import Trends from "./trends";
import { WarningAmber } from "@mui/icons-material";
import CylinderIndicator from "./cylinder-indicator";
import { SIGNAL_STATUS_QUALITY } from "../../schema";
const ModuleMonitoringPage = ({ moduleData, classes, trendsData }: any) => {
  const [activeModule, setActiveModule] = useState<number>(0);
  const [signalData, setSignalData] = useState<any>({});

  const onActiveModuleChange = (event: any, params: any) => {
    setActiveModule(params);
  };

  useEffect(() => {
    const data = SIGNAL_STATUS_QUALITY.find(val => val.id == moduleData?.currentStatus );
    setSignalData(data || SIGNAL_STATUS_QUALITY[0])
  }, [moduleData?.currentStatus])
  return (
        <Grid container spacing={2}>
          <Grid item lg={5} md={6} sm={12}>
            <CardWidget
              headerLabel={
                moduleData?.isAlert
                  ? "Alerts & Instructions"
                  : "Status Messages"
              }
              headerIcon={<WarningAmber />}
              content={<AlertsAndInstructions moduleData={moduleData} />}
              initiallyCollapsed={false}
              fullScreenContent={
                <AlertsAndInstructions
                  moduleData={moduleData}
                  isModalOpen={true}
                />
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
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
                      sx={{ marginTop: '10px' }}
                    >
                      {["Trends", "Cylinder Specific Indicator"]?.map(
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
                headerLabel={""}
                headerIcon={<></>}
                content={(activeModule === 0 ? <Trends trends={trendsData?.trends} />: <CylinderIndicator cylinderSpecificIndicators={trendsData?.cylinder_specific_indicators} />)}
                initiallyCollapsed={false}
                fullScreenContent={(activeModule === 0 ? <Trends trends={trendsData?.trends} />: <CylinderIndicator cylinderSpecificIndicators={trendsData?.cylinder_specific_indicators} fullScreen={true}/>)}
                
              />
          </Grid>
          <Grid item lg={4} md={12} sm={12}>
            <CardWidget
              headerLabel="Live Status"
              headerIcon={<VisibilityOutlined />}
              content={<LiveStatus liveStatus={moduleData?.liveStatus} />}
              initiallyCollapsed={true}
              fullScreenContent={<LiveStatus liveStatus={moduleData?.liveStatus}/>}
            />
          </Grid>
          <Grid item lg={4} md={12} sm={12}>
            <CardWidget
              headerLabel={signalData?.description || ""}
              headerIcon={signalData?.resultType === "success" ? <CellTowerOutlined color="success"/> : <SyncDisabled color="error"/>}
              content={<Signal signals={moduleData?.signals}/>}
              initiallyCollapsed={true}
              fullScreenContent={<Signal signals={moduleData?.signals}/>}
            />
          </Grid>
          <Grid item lg={4} md={12} sm={12}>
            <CardWidget
              headerLabel="Latest Reports"
              headerIcon={<DescriptionOutlined />}
              content={<ReportsCard liveStatus={moduleData?.liveStatus}/>}
              initiallyCollapsed={true}
              fullScreenContent={<ReportsCard liveStatus={moduleData?.liveStatus}/>}
            />
          </Grid>
        </Grid>
  );
};
export default ModuleMonitoringPage;
