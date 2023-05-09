import React from "react";
import { WarningAmber, WarningAmberOutlined } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";

import CardWidget from "../../../app/components/card";

const AlertsAndInstructions = () => {
  const renderContent = () => {
    return (
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={6}>
            <Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ mr: 1, color: "#4d4e4e" }}>
                  <WarningAmberOutlined color="error" />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#4d4e4e",
                      letterSpacing: "0.36px",
                    }}
                  >
                    Injection &amp; Combustion
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ color: "#4d4e4e", letterSpacing: "0.07px", pl: 3 }}>
                <Box
                  sx={{
                    "&:before": {
                      content: '"-"',
                      float: "left",
                      mr: 1,
                    },
                    mb: 1,
                  }}
                >
                  <Typography>
                    Check Relevant Fuel Injector’s for indicated cylinders
                  </Typography>
                </Box>
                <Box
                  sx={{
                    "&:before": {
                      content: '"-"',
                      float: "left",
                      mr: 1,
                    },
                    mb: 1,
                  }}
                >
                  <Typography>
                    Check Relevant Fuel Injector’s for indicated cylinders
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ mr: 1, color: "#4d4e4e" }}>
                  <WarningAmberOutlined color="warning" />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#4d4e4e",
                      letterSpacing: "0.36px",
                    }}
                  >
                    Bearing
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ color: "#4d4e4e", letterSpacing: "0.07px", pl: 3 }}>
                <Box
                  sx={{
                    "&:before": {
                      content: '"-"',
                      float: "left",
                      mr: 1,
                    },
                    mb: 1,
                  }}
                >
                  <Typography>
                    Check Relevant Fuel Injector’s for indicated cylinders
                  </Typography>
                </Box>
                <Box
                  sx={{
                    "&:before": {
                      content: '"-"',
                      float: "left",
                      mr: 1,
                    },
                    mb: 1,
                  }}
                >
                  <Typography>
                    Check Relevant Fuel Injector’s for indicated cylinders
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderFooterContent = () => {
    return (
      <Box sx={{ width: "100%", display: "flex" }}>
        <Box sx={{ flex: 1 }}></Box>
        <Box>
          <Button
            disableRipple
            disableFocusRipple
            disableTouchRipple
            disableElevation
            variant="text"
            sx={{
              textTransform: "none",
              color: "#418CFC",
              fontSize: "16px",
              height: "24px",
              letterSpacing: "0.07px",
            }}
          >
            View All
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <div>
      <CardWidget
        headerLabel="Alerts & Instructions"
        headerIcon={<WarningAmber />}
        subHeadingRight={
          <Typography
            sx={{
              fontSize: "12px",
              letterSpacing: "0.28px",
              color: "#4D4E4E",
              height: "20px",
            }}
          >
            Updated on <strong>06.04.2023 - 05:49:53 (UTC)</strong>
          </Typography>
        }
        content={renderContent()}
        footerContent={renderFooterContent()}
        initiallyCollapsed={false}
      />
    </div>
  );
};
export default AlertsAndInstructions;
