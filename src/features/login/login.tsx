import React from "react";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
const LoginPage = () => {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "400px",
          height: "400px",
          p: 2,
          border: "1px solid #E9E9EF",
          backgroundColor: "#5A607F",
          opacity: "1",
        }}
      ></Box>
      <Box
        sx={{
          width: "400px",
          height: "400px",
          p: 2,
          border: "1px solid #E9E9EF",
          opacity: "1",
        }}
      >
        <Box>
          <Typography>Welcome back! Please login to your account</Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ mt: 1 }}>
                <TextField
                  id="username"
                  data-testid="username"
                  label="Username"
                  variant="standard"
                  fullWidth
                ></TextField>
              </Box>
              <Box sx={{ mt: 1 }}>
                <TextField
                  id="password"
                  data-testid="password"
                  label="Password"
                  variant="standard"
                  fullWidth
                ></TextField>
              </Box>

              <Box sx={{ mt: 1 }}>
                <Grid container spacing={12}>
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Typography sx={{ mt: 1 }}>
                  Copyright &#169; 2023 Neptune Power | All Rights Reserved
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
export default LoginPage;
