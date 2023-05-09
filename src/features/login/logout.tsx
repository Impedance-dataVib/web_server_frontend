import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../app/auth";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth || !navigate) {
      return;
    }
    auth.signOut();
    navigate('/login');
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
