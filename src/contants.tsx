import Home from "@mui/icons-material/Home";
import Dashboard from "@mui/icons-material/Dashboard";
import Construction from "@mui/icons-material/Construction";
import Description from "@mui/icons-material/Description";
import WebAsset from "@mui/icons-material/WebAsset";
import Help from "@mui/icons-material/Help";
import Settings from "@mui/icons-material/Settings";

export interface INavMenuItem {
  label: string;
  icon: any;
  path: string;
}

export const APP_NAV_MENU_ITEMS: INavMenuItem[] = [
  {
    label: "Home",
    icon: <Home />,
    path: "/home",
  },
  {
    label: "Dashboard",
    icon: <Dashboard />,
    path: "/dashboard",
  },
  {
    label: "Configuration",
    icon: <Construction />,
    path: "/configuration",
  },
  {
    label: "Notepad",
    icon: <Description />,
    path: "/notepad",
  },
  {
    label: "File Browser",
    icon: <WebAsset />,
    path: "/file-browser",
  },
  {
    label: "Help",
    icon: <Help />,
    path: "/help",
  },
  {
    label: "Settings",
    icon: <Settings />,
    path: "/settings",
  },
];
