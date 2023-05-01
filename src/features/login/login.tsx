import React, { useState } from "react";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { WarningOutlined } from "@mui/icons-material";
import LoginApi from "./loginApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/auth";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const { setAuthToken, setRefreshToken } = useAuth();

  // const authenticator = useAuthenticator();

  const navigate = useNavigate();

  const submitLoginDetails = async () => {
    LoginApi.login({ username, password })
      .then((res) => {
        if (res.status === 200) {
          if (res?.data?.token && res?.data?.refresh_token) {
            setIsError(false);
            setAuthToken(res.data?.token);
            setRefreshToken(res.data?.refresh_token);

            navigate("/dashboard");
          }
        } else {
          setIsError(true);
        }
      })
      .catch(() => {
        setIsError(true);
      });
  };

  const onClickLoginButton = () => {
    submitLoginDetails();
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
          backgroundColor: "#FEF3F3",
          p: 1,
        }}
      >
        <Box sx={{ p: 2 }}>
          <WarningOutlined sx={{ fontSize: "30px" }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: "24px", color: "#5A607F" }}>
            Authentication error
          </Typography>
          <Typography sx={{ fontSize: "16px", color: "#5A607F" }}>
            Incorrect Username or Password, Please try again.
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <form>
      <Box sx={{ width: "416px", mt: 10 }}>
        <img alt="logo" src="logo_vib_360.png" />
      </Box>
      <Box sx={{ width: isError ? "auto" : "416px", mt: 4 }}>
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
                value={username}
                onChange={(e: any) => setUsername(e?.target?.value)}
                autoComplete="username"
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
                value={password}
                onChange={(e: any) => setPassword(e?.target?.value)}
                autoComplete="current-password"
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
      <Box
        sx={{
          position: "absolute",
          bottom: "8px",
          width: "80%",
          textAlign: "center",
        }}
      >
        <Typography>Copyright @dataVib-Impedance</Typography>
      </Box>
    </form>
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
          Welcome back! Please login to your account Licenceseee.
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
  const checkLicense = () => {};

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
      <Grid container>
        <Box
          component="section"
          sx={{
            height: "732px",
            width: "1164px",
            background: "#fff",
            display: "flex",
          }}
        >
          <Grid item md={6} sm={0} xs={0}>
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
                  // display: { md: "block", sm: "none" },
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
          </Grid>
          <Grid item md={6} sm={12}>
            <Box
              component="section"
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <LoginForm />
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};
export default LoginPage;
