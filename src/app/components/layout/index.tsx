/* eslint-disable */
import { Box } from "@mui/material";
import React, { useState } from "react";
import DrawerAppBar from "./appBar";
import Content from "./content";
import Sidebar from "./sidebar";

const Layout = ({ children }: any) => {
  const [sidebarView, setSidebarView] = useState("expanded");

  return (
      <Box
        component="div"
        sx={{ display: "flex", flexGrow: 1, height: "100%" }}
      >
        <Box
          component="section"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <DrawerAppBar />
          <Box sx={{ display: "flex", backgroundColor: (theme) => theme.palette.color37.main, }}>
            <Sidebar
              // @ts-ignore
              variant={sidebarView}
              setVariant={setSidebarView}
            />
            <Content>{children}</Content>
          </Box>
        </Box>
      </Box>
  );
};
export default Layout;
