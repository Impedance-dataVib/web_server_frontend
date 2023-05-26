import React, { useEffect, useState } from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import AlertsAndInstructions from "src/features/common/alertsAndInstructions";
import CardWidget from "src/app/components/card";
import {
  CellTowerOutlined,
  SignpostOutlined,
  TrendingUp,
  DescriptionOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import GlobalIndicatorChart from "../../globalIndicator";
import ReportsCard from "src/features/common/reports";
import LiveStatus from "./live-status";
import Signal from "./signal";
import Trends from "./trends";
import { WarningAmber, WarningAmberOutlined } from "@mui/icons-material";
import SunburstAnyChart from "./cylinder-indicator";

const ModuleMonitoringPage = ({ moduleData, classes }: any) => {
  const [activeModule, setActiveModule] = useState<number>(0);

  const onActiveModuleChange = (event: any, params: any) => {
    console.log(params);
    setActiveModule(params);
  };

  useEffect(()=> {
    console.log(moduleData);
  }, [moduleData])
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
                />
              }
              initiallyCollapsed={false}
              fullScreenContent={
                <GlobalIndicatorChart
                  globalIndicator={moduleData?.globalIndicator}
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
                content={(activeModule === 0 ? <Trends trends={moduleData?.trends} />: <SunburstAnyChart />)}
                initiallyCollapsed={false}
                fullScreenContent={(activeModule === 0 ? <Trends trends={moduleData?.trends} />: <SunburstAnyChart />)}
                
              />
          </Grid>
          <Grid item xs={4}>
            <CardWidget
              headerLabel="Live Status"
              headerIcon={<VisibilityOutlined />}
              content={<LiveStatus liveStatus={moduleData?.liveStatus} />}
              initiallyCollapsed={true}
              fullScreenContent={<LiveStatus liveStatus={moduleData?.liveStatus}/>}
            />
          </Grid>
          <Grid item xs={4}>
            <CardWidget
              headerLabel="Signals"
              headerIcon={<CellTowerOutlined />}
              content={<Signal signals={moduleData?.signals}/>}
              initiallyCollapsed={true}
              fullScreenContent={<Signal signals={moduleData?.signals}/>}
            />
          </Grid>
          <Grid item xs={4}>
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
