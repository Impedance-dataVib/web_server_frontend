import Home from "@mui/icons-material/Home";
import Dashboard from "@mui/icons-material/Dashboard";
import Construction from "@mui/icons-material/Construction";
import Description from "@mui/icons-material/Description";
import WebAsset from "@mui/icons-material/WebAsset";
import Help from "@mui/icons-material/Help";
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
    label: "Configuration",
    icon: <Settings />,
    path: "/configuration",
  },

  {
    label: "Download",
    icon: <Download />,
    path: "/notepad",
  },
  {
    label: "Settings",
    
    icon: <Construction />,
    path: "/settings",
  },
  {
    label: "Auxilay Data",
    icon: <WebAsset />,
    path: "/file-browser",
  },
  {
    label: "Logout",
    icon: <Logout />,
    path: "/logout",
  },
  
];
