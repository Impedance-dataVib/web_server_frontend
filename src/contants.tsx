import Dashboard from "@mui/icons-material/Dashboard";
import Construction from "@mui/icons-material/Construction";
import WebAsset from "@mui/icons-material/WebAsset";
import DvrIcon from "@mui/icons-material/Dvr";
import Settings from "@mui/icons-material/Settings";
import { Download, Logout, TrendingUpSharp } from "@mui/icons-material";

export interface INavMenuItem {
  label: string;
  icon: any;
  path: string;
}

export const APP_NAV_MENU_ITEMS: INavMenuItem[] = [
  {
    label: "Dashboard",
    icon: <Dashboard />,
    path: "/dashboard",
  },
  {
    label: "Trends",
    icon: <TrendingUpSharp />,
    path: "/trends",
  },
  {
    label: "Download",
    icon: <Download />,
    path: "/download",
  },
  {
    label: "Auxiliary data",
    icon: <WebAsset />,
    path: "/file-browser",
  },
  {
    label: "Configuration",
    icon: <Settings />,
    path: "/configuration",
  },
  {
    label: "System Configuration",
    icon: <DvrIcon />,
    path: "/systemconfiguration",
  },

  {
    label: "Settings",
    icon: <Construction />,
    path: "/settings",
  },

  {
    label: "Logout",
    icon: <Logout />,
    path: "/logout",
  },
];
