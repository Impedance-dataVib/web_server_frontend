import React from "react";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

const LoginPage = () => {
  return (
    <Box
      component="div"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="section"
        sx={{
          height: "732px",
          width: "1164px",
          background: "#fff",
          display: "flex",
        }}
      >
        <Box
          component="section"
          sx={{
            width: "554px",
            backgroundColor: "#7d95b4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box
            sx={{
              height: "448px",
              width: "448px",
              border: "2px solid #fff",
              mixBlendMode: "overlay",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img src="engine_image.png" height="100%" width="100%"></img>
          </Box>
        </Box>
        <Box
          component="section"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "416px" }}>
            <img src="logo_vib_360.png" />
          </Box>
          <Box sx={{ width: "416px", mt: 4 }}>
            <Typography
              sx={{ color: "#5A607F", fontSize: "18px", opacity: "0.5" }}
            >
              Welcome back! Please login to your account.
            </Typography>
          </Box>
          <Box sx={{ width: "416px", mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ width: "416px" }}>
                  <TextField
                    fullWidth
                    label="Username"
                    variant="standard"
                    sx={{ fontSize: "18px" }}
                  ></TextField>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ width: "416px", mt: 1 }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Password"
                    type="password"
                    sx={{ fontSize: "18px" }}
                  ></TextField>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              width: "416px",
              mt: 4,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              sx={{ width: "167px", height: "45px", textTransform: "none" }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              sx={{ width: "167px", height: "45px", textTransform: "none" }}
            >
              Sign up
            </Button>
          </Box>
          <Box sx={{ mt: 19, mb: -13 }}>
            <Typography>Copyright @dataVib-Impedance</Typography>
          </Box>
        </Box>
      </Box>
    </Box>

    // <Box
    //   sx={{
    //     p: 2,
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Box sx={{ width: "400px", height: "auto", p: 2 }}>
    //     <Box>
    //       <Typography>Login</Typography>
    //     </Box>
    //     <Box sx={{ width: "100%" }}>
    //       <Grid container>
    //         <Grid item xs={12}>
    //           <Box sx={{ mt: 1 }}>
    //             <TextField
    //               id="username"
    //               data-testid="username"
    //               label="username"
    //               fullWidth
    //             ></TextField>
    //           </Box>
    //           <Box sx={{ mt: 1 }}>
    //             <TextField
    //               id="password"
    //               data-testid="password"
    //               label="password"
    //               fullWidth
    //             ></TextField>
    //           </Box>
    //           <Box sx={{ mt: 1 }}>
    //             <Button variant="contained" color="primary">
    //               Login
    //             </Button>
    //           </Box>
    //           <Box sx={{ mt: 1 }}>
    //             <Link href="#">Reset Password</Link>
    //           </Box>
    //         </Grid>
    //       </Grid>
    //     </Box>
    //   </Box>
    // </Box>
  );
};
export default LoginPage;
