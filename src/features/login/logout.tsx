import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../app/auth";

const LogoutPage = () => {
  const auth = useAuth();
  // auth.signOut();

  useEffect(() => {
    if (!auth) {
      return;
    }
    auth.signOut();
  }, [auth]);

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography>Session is logged out</Typography>
      </Box>
    </Box>
  );
};
export default LogoutPage;
