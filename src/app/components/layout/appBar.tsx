/* eslint-disable */
import React, { useContext, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Toolbar,
  Typography,
  Link as MatLink,
  Theme,
  Menu,
  fabClasses,
} from "@mui/material";

import { Link, useLocation, matchPath } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { KeyboardArrowDown, NotificationsOutlined } from "@mui/icons-material";
import { APP_NAV_MENU_ITEMS, INavMenuItem } from "../../../contants";
import DownloadInfoApi from "src/features/downloads/api";
import CommonApi from "src/commonApi";
const drawerWidth = 240;

const DrawerAppBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationType, setNotificationType] = useState<any>("");
  const [currtime, setCurrTime] = useState<any>();

  const [navMenuItems, setNavMenuItems] =
    useState<INavMenuItem[]>(APP_NAV_MENU_ITEMS);

  const location = useLocation();

  const theme = useTheme();

  const getNotification = () => {
    DownloadInfoApi.getNotification()
      .then((res: any) => {
        setNotificationCount(res.data.count);
        setNotificationType(res.data.report_type);
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    getNotification();
    const interval = setInterval(() => {
      getNotification();
    }, 60 * 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, []);
  console.log(notificationType);

  const getFile = () => {
    DownloadInfoApi.getDownloadFile()
      .then((res) => {
        console.log(res);
        const url = window.URL.createObjectURL(res.data);
        const link = document.createElement("a");
        link.href = url;
        if (notificationType === "json") {
          link.setAttribute("download", "data.json");
        } else if (notificationType === "raw") {
          link.setAttribute("download", "raw-data.wav");
        } else if (notificationType === "spreadsheet") {
          link.setAttribute("download", "spreadsheet.excel");
        } else if (notificationType === "graphical") {
          link.setAttribute("download", "graphical-report.pdf");
        }
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => console.log(err));
  };
  const currentTime = () => {
    return CommonApi.getLicenseInfo()
      .then((res) => setCurrTime(res.data.currant_time))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    currentTime();
  }, []);
  const togglePoppup = () => {
    setNotificationOpen(!notificationOpen);
  };

  const handleToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box
      onClick={handleToggle}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "107px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: {
            xs: "16px",
          },
        }}
      >
        <img
          src="logo_vib_360.png"
          style={{
            width: "107px",
            height: "36px",
          }}
        />
      </Box>

      <Divider />
      <Box
        sx={{
          flex: 1,
          backgroundColor: (theme: Theme) => theme.palette.color37.main,
        }}
      >
        <List>
          {navMenuItems.map((item) => (
            <MatLink
              sx={{
                textDecoration: "none",
                color: matchPath(
                  {
                    path: item.path,
                  },
                  location.pathname
                )
                  ? (theme: Theme) => theme.palette.color7.main
                  : (theme: Theme) => theme.palette.color3.main,
                "&:hover": {
                  color: (theme: Theme) => theme.palette.color7.main,
                },

                backgroundColor: (theme: Theme) => theme.palette.color37.main,
                "& :hover": {
                  backgroundColor: (theme: Theme) => theme.palette.color3.main,
                },
              }}
              key={item.path}
              to={item.path || "#"}
              component={Link}
            >
              <ListItem
                sx={{
                  backgroundColor: matchPath(
                    {
                      path: item.path,
                    },
                    location.pathname
                  )
                    ? (theme) => theme.palette.color1.main
                    : (theme) => theme.palette.color37.main,
                  "& :hover": {
                    backgroundColor: (theme) => theme.palette.color3.main,
                  },
                  borderLeft: matchPath(
                    {
                      path: item.path,
                    },
                    location.pathname
                  )
                    ? (theme) => `8px solid ${theme.palette.color37.main}`
                    : "none",
                }}
                key={item.path}
                disablePadding
              >
                <ListItemButton
                  sx={{
                    textAlign: "left",
                    pl: matchPath(
                      {
                        path: item.path,
                      },
                      location.pathname
                    )
                      ? "17px"
                      : "20px",
                    height: "52px",
                  }}
                >
                  <Box sx={{ width: "24px" }}>{item.icon}</Box>{" "}
                  <ListItemText
                    sx={{
                      textAlign: "left",
                      letterSpacing: "0.1px",
                      opacity: 1,
                      pl: 2,
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      fontWeight: 500,
                      transition: "all .2s ease-in",
                    }}
                    primary={item.label}
                  />
                </ListItemButton>
              </ListItem>
            </MatLink>
          ))}
        </List>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;
  console.log(currtime);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        position="static"
        sx={{
          height: "60px",
          backgroundColor:
            theme.palette.mode === "light"
              ? theme.palette.color3.main
              : theme.palette.color2.main,
          boxShadow: "0px 2px 4px #15223214",
          zIndex: 2,
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleToggle}
              sx={{
                display: {
                  xs: "block",
                  sm: "block",
                  md: "none",
                  color:
                    theme.palette.mode === "light"
                      ? "#000"
                      : theme.palette.grey[400],
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                width: "107px",
                height: "36px",
                marginLeft: {
                  xs: "0px",
                  md: "16px",
                },
              }}
            >
              <img
                src="logo_vib_360.png"
                style={{
                  width: "107px",
                  height: "36px",
                }}
              />
            </Box>
          </Box>
          <Box sx={{ color: "black", mr: 3 }}>
            <Typography>{currtime}</Typography>
          </Box>
          <Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={togglePoppup}
              sx={{
                mr: 2,
                display: {
                  xs: "block",
                  sm: "block",
                  md: "block",
                  color:
                    theme.palette.mode === "light"
                      ? "#000"
                      : theme.palette.grey[400],
                },
              }}
            >
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsOutlined />
              </Badge>
            </IconButton>
            {notificationCount > 0 && (
              <Menu
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={notificationOpen}
                onClose={() => setNotificationOpen(false)}
              >
                <MenuItem onClick={getFile}>
                  <Box sx={{ mr: "5px" }}>Your Download is Ready</Box>
                  <CloudDownloadIcon />
                </MenuItem>
              </Menu>
            )}
          </Box>

          {/* <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ width: "30px", height: "30px", mr: 1 }}></Avatar>
            <Typography
              sx={{ color: "black", fontSize: "14px", fontWeight: 400 }}
            >
              Shailendra
            </Typography>
            <IconButton onClick={handleClick}>
              <KeyboardArrowDown />
            </IconButton>
          </Box> */}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "profile-button",
        }}
        sx={{
          fontFamily: "Poppins",
          fontWeight: 400,
          fontSize: "12px",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "auto",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem
          sx={{
            height: "43px",
            width: "168px",
            letterSpacing: "0px",
            color: "#4D565C",
            py: 0,
            my: 0,
          }}
          onClick={handleClose}
          disableRipple
        >
          Account Setting
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Help</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Signout</MenuItem>
      </Menu>
    </Box>
  );
};
export default DrawerAppBar;
