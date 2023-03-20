/* eslint-disable */
import React from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Link as MatLink,
} from "@mui/material";
import { Link, matchPath, useLocation } from "react-router-dom";
import { APP_NAV_MENU_ITEMS, INavMenuItem } from "../../../contants";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

interface SidebarItemProps {
  item: INavMenuItem;
}

const SidebarItem = ({ variant, item }: SidebarItemProps & SidebarProps) => {
  const location = useLocation();

  const isMatch = matchPath(
    {
      path: item.path,
      end: false,
    },
    location.pathname
  );

  return (
    <MatLink
      to={item.path || "#"}
      sx={{
        textDecoration: "none",
        color: isMatch
          ? (theme) => theme.palette.color7.main
          : (theme) => theme.palette.color32.main,
        "&:hover": {
          color: (theme) => theme.palette.color7.main,
        },

        backgroundColor: (theme) => theme.palette.color3.main,
        "& :hover": {
          backgroundColor: (theme) => theme.palette.color1.main,
        },
      }}
      component={Link}
    >
      <ListItem
        sx={{
          backgroundColor: isMatch
            ? (theme) => theme.palette.color1.main
            : (theme) => theme.palette.color3.main,
          "& :hover": {
            backgroundColor: (theme) => theme.palette.color1.main,
          },
          borderLeft: isMatch
            ? (theme) => `4px solid ${theme.palette.color7.main}`
            : "none",
        }}
        disablePadding
      >
        <ListItemButton
          sx={{
            pl: isMatch ? "17px" : "20px",
            height: "52px",
            display: "flex",
            alignItems: "center",
          }}
          disableRipple
        >
          <Box
            sx={{
              width: "24px",
            }}
          >
            {item.icon}
          </Box>{" "}
          <Box
            sx={{
              opacity: variant === "expanded" ? "1" : "0",
              height: variant === "expanded" ? "20px" : "0px",
              overflow: "hidden",
              transition: "all .2s ease-in",
            }}
          >
            <Typography
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
              variant="body1"
            >
              {item.label}
            </Typography>
          </Box>
        </ListItemButton>
      </ListItem>
    </MatLink>
  );
};

export interface SidebarProps {
  variant?: "expanded" | "collapsed";
  setVariant?: (str: string) => void;
}

const Sidebar = ({ variant = "collapsed", setVariant }: SidebarProps) => {
  const onClickPinSidebar = () => {
    setVariant?.(variant === "expanded" ? "collapsed" : "expanded");
  };

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        width: variant === "expanded" ? "212px" : "65px",
        transition: "all .2s ease-in",
        height: "52px",
        mt: 1,
      }}
    >
      <Box
        sx={{
          paddingLeft: variant === "collapsed" ? "20px" : "0px",
          display: variant === "collapsed" ? "block" : "flex",
          justifyContent: "end",
          alignItems: "center",
          height: "100%",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onClickPinSidebar}
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            transition: "all .2s ease-in",
          }}
          disableRipple
        >
          {variant === "collapsed" ? (
            <ArrowForward
              sx={{
                fontSize: "24px",
                color: (theme) => theme.palette.color7.main,
                transition: "all .2s ease-in",
              }}
            />
          ) : (
            <ArrowBack
              sx={{
                fontSize: "24px",
                color: (theme) => theme.palette.color7.main,
                transition: "all .2s ease-in",
              }}
            />
          )}
        </IconButton>
      </Box>

      <Box
        component="div"
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Box component="div" sx={{ flex: 1, flexGrow: 1 }}>
          <List sx={{ textAlign: "left" }}>
            {APP_NAV_MENU_ITEMS.map((item) => (
              <SidebarItem
                key={`${item?.label}-${item?.path}`}
                variant={variant}
                item={item}
              ></SidebarItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};
export default Sidebar;
