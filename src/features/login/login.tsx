import React, { useState } from "react";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { WarningOutlined } from "@mui/icons-material";

const LoginForm = () => {
  const [isError, setIsError] = useState<boolean>(false);

  const onClickLoginButton = () => {
    console.log("on click button called");
    setIsError((e) => !e);
  };

  const onClickSignUpButton = () => {
    console.log("sign up button called");
  };

  const renderAuthError = () => {
    return (
      <Box
        sx={{
          display: "flex",
          border: "1px solid #FF0A002B",
          borderRadius: "8px",
          backgroundColor: '#FEF3F3',
          p: 1,
        }}
      >
        <Box sx={{ p: 2 }}>
          <WarningOutlined sx={{ fontSize: "30px" }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '24px', color: '#5A607F'}}>Authentication error</Typography>
          <Typography sx={{ fontSize: '16px', color: '#5A607F'}}>
            Incorrect Username or Password, Please try again.
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Box sx={{ width: "416px" }}>
        <img alt="logo" src="logo_vib_360.png" />
      </Box>
      <Box sx={{ width: isError ? 'auto': "416px", mt: 4 }}>
        {isError ? (
          <>{renderAuthError()}</>
        ) : (
          <Typography
            sx={{ color: "#5A607F", fontSize: "18px", opacity: "0.5" }}
          >
            Welcome back! Please login to your account.
          </Typography>
        )}
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
          onClick={onClickLoginButton}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          sx={{ width: "167px", height: "45px", textTransform: "none" }}
          onClick={onClickSignUpButton}
        >
          Sign up
        </Button>
      </Box>
      <Box sx={{ mt: 19, mb: -13 }}>
        <Typography>Copyright @dataVib-Impedance</Typography>
      </Box>
    </>
  );
};

const LicenseForm = () => {
  return (
    <>
      <Box sx={{ width: "416px" }}>
        <img alt="logo" src="logo_vib_360.png" />
      </Box>
      <Box sx={{ width: "416px", mt: 4 }}>
        <Typography sx={{ color: "#5A607F", fontSize: "18px", opacity: "0.5" }}>
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
    </>
  );
};

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
            <img
              alt="Engine"
              src="engine_image.png"
              height="100%"
              width="100%"
            ></img>
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
          <LoginForm />
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
