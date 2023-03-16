import React from "react";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

const LoginPage = () => {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "400px", height: "auto", p: 2 }}>
        <Box>
          <Typography>Login</Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ mt: 1 }}>
                <TextField
                  id="username"
                  data-testid="username"
                  label="username"
                  fullWidth
                ></TextField>
              </Box>
              <Box sx={{ mt: 1 }}>
                <TextField
                  id="password"
                  data-testid="password"
                  label="password"
                  fullWidth
                ></TextField>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Button variant="contained" color="primary">
                  Login
                </Button>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Link href="#">Reset Password</Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
export default LoginPage;
