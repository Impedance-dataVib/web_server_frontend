import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { WarningOutlined } from "@mui/icons-material";
import LoginApi from "./loginApi";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AUTH_STATUS, useAuth } from "../../app/auth";
import FileUploadComponent from "../../app/components/fileupload";

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
      <Box sx={{ maxWidth: "416px", mt: { md: 10, sm: 1, xs: 1 } }}>
        <img alt="logo" src="logo_vib_360.png" />
      </Box>
      <Box sx={{ maxWidth: isError ? "auto" : "416px", mt: 1 }}>
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

      <Box sx={{ maxWidth: "416px", mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ maxWidth: "416px" }}>
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
            <Box sx={{ maxWidth: "416px", mt: 1 }}>
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
          maxWidth: "416px",
          mt: 2,
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
          // bottom: "8px",
          mt: 1,
          width: "80%",
          textAlign: "center",
        }}
      >
        <Typography>Copyright @dataVib-Impedance</Typography>
      </Box>
    </form>
  );
};

const LicenseInActiveForm = () => {
  const [isError, setIsError] = useState<boolean>(true);

  const [licenseKey, setLicenseKey] = useState<string>("");

  const renderLicenseError = () => {
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

  const onClickActivateButton = () => {};

  const onClickLicense = () => {
    console.log("on click");
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <Box sx={{ maxWidth: "416px", mt: { md: 10, sm: 1, xs: 1 } }}>
        <img alt="logo" src="logo_vib_360.png" />
      </Box>
      <Box sx={{ maxWidth: isError ? "auto" : "416px", mt: 1 }}>
        <>{isError && renderLicenseError()}</>

        <Typography sx={{ color: "#5A607F", fontSize: "18px", opacity: "0.5" }}>
          Please enter your license key below
        </Typography>
      </Box>
      <Box>       
        <Box>
          <FormLabel>Upload License file</FormLabel>
          <FileUploadComponent
            onChangeHandler={onClickLicense}
          ></FileUploadComponent>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button id="activate-btn" color="primary" variant="contained">
            Activate
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const LicenseExpiredForm = () => {
  return <Box>License expired</Box>;
};

const LOGIN_PAGE_FORMS = {
  LOGIN_FORM: "login",
  LICENSE_EXPIRED: "lic_expired",
  LICENSE_IMPORT: "lic_import",
};

const LoginPage = () => {
  const [searchParams] = useSearchParams();

  const [formToRender, setFormToRender] = useState<string>(
    LOGIN_PAGE_FORMS.LOGIN_FORM
  );

  const licenseInActiveParam = searchParams?.get("inactive");
  let licenseInActiveFlag = false;
  if (
    licenseInActiveParam !== null &&
    String(licenseInActiveParam).trim().toLowerCase() === "true"
  ) {
    licenseInActiveFlag = true;
  }

  const licenseExpiredParam = searchParams.get("expired");
  let licenseExpiredFlag = false;
  if (
    licenseExpiredParam !== null &&
    String(licenseExpiredParam).trim().toLowerCase() === "true"
  ) {
    licenseExpiredFlag = true;
  }

  const authenticator = useAuth();

  useEffect(() => {
    if (authenticator.authStatus === AUTH_STATUS.AUTHENITCATED) {
      if (licenseInActiveFlag) {
        setFormToRender(LOGIN_PAGE_FORMS.LICENSE_IMPORT);
      } else if (licenseExpiredFlag) {
        setFormToRender(LOGIN_PAGE_FORMS.LICENSE_EXPIRED);
      } else {
        setFormToRender(LOGIN_PAGE_FORMS.LOGIN_FORM);
      }
    } else {
      setFormToRender(LOGIN_PAGE_FORMS.LOGIN_FORM);
    }
  }, [authenticator, licenseInActiveFlag, licenseExpiredFlag]);

  console.log("params in active = ", licenseInActiveFlag);
  console.log("params expired ", licenseExpiredFlag);
  console.log("params auth ", authenticator);

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        height: { sm: "100%", md: "100vh", xs: "100%" },
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box>
        <Grid container>
          <Box
            component="section"
            sx={{
              height: {
                sm: "600px",
                // sm: "100%",
                xs: "100%",
              },
              // width: { sm: "1164px",
              //  sm: "auto",
              //  xs: "auto" },
              background: "#fff",
              display: "flex",
            }}
          >
            <Grid item sm={6} xs={0}>
              <Box
                component="section"
                sx={{
                  backgroundColor: "#7d95b4",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  display: {
                    sm: "flex",
                    //  sm: "none",
                    xs: "none",
                  },
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    // height: "448px",
                    // width: "448px",
                    // border: "2px solid #fff",
                    mixBlendMode: "overlay",
                    // borderRadius: "50%",
                    overflow: "hidden",
                    display: { sm: "block", xs: "none" },
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
            <Grid item sm={6} xs={12}>
              <Box
                component="section"
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  p: 2,
                }}
              >
                {formToRender === LOGIN_PAGE_FORMS.LOGIN_FORM && <LoginForm />}
                {formToRender === LOGIN_PAGE_FORMS.LICENSE_IMPORT && (
                  <LicenseInActiveForm />
                )}
                {formToRender === LOGIN_PAGE_FORMS.LICENSE_EXPIRED && (
                  <LicenseExpiredForm />
                )}
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};
export default LoginPage;
