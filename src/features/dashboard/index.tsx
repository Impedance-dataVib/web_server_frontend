import React, { useEffect, useState } from "react";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { makeStyles } from "tss-react/mui";

import DashboardContext from "./context";
import { useTranslation } from "react-i18next";
import DashboardApi from "./dashboardApi";

const useStyles = makeStyles()((theme) => {
  return {
    grouped: {
      marginLeft: "8px !important",
      border: "none",
      borderRadius: "4px",
    },
    toggleBtnRoot: {
      background: theme?.palette?.color3?.main,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      borderRadius: "4px !important",
      "&hover": {
        background: theme?.palette?.color3?.main,
      },
      textTransform: "none",
    },
    toggleBtnSelected: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      background: `${theme?.palette?.color37?.main} !important`,
      color: `${theme?.palette?.color3?.main} !important`,
    },
  };
});

export interface IActiveModule {
  name: string;
  index: number;
}

const DashboardPage = () => {
  const [moduleTabs, setModuleTabs] = useState<string[]>([]);
  const [activeModules, setActiveModules] = useState<string[]>([]);

  const { classes } = useStyles();

  const { t, i18n } = useTranslation();

  const changeLanguageToEnglish = () => {
    i18n.changeLanguage("en");
  };

  const changeLanguageToFrench = () => {
    i18n.changeLanguage("fr");
  };

  useEffect(() => {
    DashboardApi.getModules()
      .then((res) => {
        console.log("modules response = ", res.data);
        setModuleTabs(res.data.data || []);
      })
      .catch((e) => {
        console.log("error = ", e);
      });
  }, []);

  const onActiveModuleChange = (event: any, params: any) => {
    setActiveModules(params);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography variant="h5">Dashboard</Typography>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography>Select Module:</Typography>
          <Box>
            <ToggleButtonGroup
              exclusive={false}
              fullWidth
              classes={{
                grouped: classes?.grouped,
              }}
              value={activeModules || []}
              onChange={onActiveModuleChange}
            >
              {moduleTabs &&
                moduleTabs?.map((t: string) => (
                  <ToggleButton
                    disableRipple
                    disableFocusRipple
                    disableTouchRipple
                    size="small"
                    sx={{ ml: 1 }}
                    value={t}
                    classes={{
                      root: classes.toggleBtnRoot,
                      selected: classes.toggleBtnSelected,
                    }}
                  >
                    {t}
                  </ToggleButton>
                ))}
            </ToggleButtonGroup>
          </Box>
        </Box>
      </Box>

      <DashboardContext.Provider
        value={{
          message: "",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Outlet />
        </Box>
      </DashboardContext.Provider>
    </Box>
  );
};
export default DashboardPage;
