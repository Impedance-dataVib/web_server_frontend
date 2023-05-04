import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Cancel, Key, WarningOutlined } from "@mui/icons-material";
import LoginApi from "./loginApi";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AUTH_STATUS, useAuth } from "../../app/auth";
import FileUploadComponent from "../../app/components/fileupload";
import appContext from "../../app/context";
import { LICENSE_STATUS } from "../../App";
import * as dateFns from "date-fns";
import CommonApi from "../../commonApi";

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
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isInactive, setInactive] = useState<boolean>(false);

  const [expiryDate, setExpiryDate] = useState<any>();
  const [selectedFile, setSelectedFile] = useState<any>();
  const [tNcAccepted, setTnCAccepted] = useState<boolean>(false);

  const { licenseStatus, licenseInfo } = useContext(appContext);
  const navigate = useNavigate();

  useEffect(() => {
    setInactive(false);
    setIsExpired(false);

    if (licenseStatus === LICENSE_STATUS.INACTIVE) {
      if (
        licenseInfo !== undefined &&
        licenseInfo.expiryDate &&
        String(licenseInfo.expiryDate)?.trim()?.length > 0
      ) {
        const parsedExpiryDate = dateFns.parse(
          licenseInfo.expiryDate,
          "yyyy-MM-dd HH:mm:ss",
          new Date()
        );

        const currentDate = new Date();
        if (dateFns.isBefore(parsedExpiryDate, currentDate)) {
          setIsExpired(true);
          setExpiryDate(parsedExpiryDate);
          return;
        } else {
          setInactive(true);
        }
      }
      setInactive(true);
    } else if (licenseStatus === LICENSE_STATUS.ACTIVE) {
      setInactive(false);
      setIsExpired(false);
    }
  }, [licenseStatus, licenseInfo]);

  const renderLicenseExpiredError = () => {
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
            Expired Licence
          </Typography>
          <Typography sx={{ fontSize: "16px", color: "#5A607F" }}>
            Your Licence key has Expired, To continue to use this application,
            please renew your licence
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderLicenseInactiveError = () => {
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
            Activate Licence
          </Typography>
          <Typography sx={{ fontSize: "16px", color: "#5A607F" }}>
            You have not yet Activated your Licence, to continue to use this
            application, please activate your licence
          </Typography>
        </Box>
      </Box>
    );
  };

  const onClickActivateButton = () => {
    CommonApi.importLicense({ selectedFile })
      .then((res) => {
        alert(res?.data?.Message);
        navigate("/dashboard");
      })
      .catch((e) => {
        alert(e?.response?.data?.Message);
      });
  };

  const onChangeLicenseFile = (licFile: any) => {
    setSelectedFile(licFile);
  };

  const onChangeTnc = (e: any, checked: boolean) => {
    setTnCAccepted(checked);
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <Box sx={{ maxWidth: "416px", mt: { md: 10, sm: 1, xs: 1 } }}>
        <img alt="logo" src="logo_vib_360.png" />
      </Box>

      {isExpired && (
        <Box sx={{ maxWidth: isExpired ? "auto" : "416px", mt: 1 }}>
          <>{renderLicenseExpiredError()}</>
          <>
            <Box sx={{ mt: 1 }}>
              <Typography>
                Your Licence Expired on{" "}
                <b> {`${dateFns.format(expiryDate, "dd MMM yyyy, H:mm a")}`}</b>
                , If you have a Licence key please enter below or{" "}
                <a
                  href={`${process.env.REACT_APP_LIC_PORTAL_URL}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Click here
                </a>{" "}
                to Renew Licence
              </Typography>
            </Box>
          </>
        </Box>
      )}
      {isInactive && (
        <Box sx={{ maxWidth: isInactive ? "auto" : "416px", mt: 1 }}>
          <>{renderLicenseInactiveError()}</>
        </Box>
      )}
      <Box sx={{ mt: 1 }}>
        <Box>
          <FormLabel>Upload License file</FormLabel>
          {selectedFile ? (
            <Box
              sx={{
                border: "1px solid #1D4580",
                borderRadius: "8px",
                height: "100px",
                display: "flex",
                mt: 1,
                alignItems: "center",
                position: "relative",
              }}
            >
              <Box display="flex" sx={{ flex: 1 }}>
                <Box sx={{ mr: 2, p: 1 }}>
                  <Key sx={{ fontSize: "36px" }} />
                </Box>
                <Box sx={{ pr: 2 }}>
                  <Typography variant="body1" sx={{ fontSize: "16px" }}>
                    {selectedFile.name}
                  </Typography>
                  <Typography variant="caption">
                    {selectedFile.size} bytes
                  </Typography>
                </Box>

                <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
                  <IconButton onClick={() => setSelectedFile(undefined)}>
                    <Cancel />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ) : (
            <FileUploadComponent
              onChangeHandler={onChangeLicenseFile}
              accept=".dat"
            ></FileUploadComponent>
          )}
        </Box>
        <Box>
          <Checkbox
            id="termsAndConditionsAccept"
            value={tNcAccepted}
            onChange={onChangeTnc}
          ></Checkbox>{" "}
          I agree to the{" "}
          <a
            href={
              process.env.PUBLIC_URL +
              `/Annex VIII_VIB 360 End user license contract_Distrib agreement [FR].pdf`
            }
            target="_blank"
            rel="noreferrer"
          >
            End user license agreement
          </a>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            id="activate-btn"
            color="primary"
            variant="contained"
            disabled={!(tNcAccepted && selectedFile !== undefined)}
            onClick={onClickActivateButton}
          >
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

  const authenticator = useAuth();

  useEffect(() => {
    if (authenticator.authStatus === AUTH_STATUS.AUTHENITCATED) {
      if (licenseInActiveFlag) {
        setFormToRender(LOGIN_PAGE_FORMS.LICENSE_IMPORT);
      } else {
        setFormToRender(LOGIN_PAGE_FORMS.LOGIN_FORM);
      }
    } else {
      setFormToRender(LOGIN_PAGE_FORMS.LOGIN_FORM);
    }
  }, [authenticator, licenseInActiveFlag]);

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
                xs: "100%",
              },
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
                    xs: "none",
                  },
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    mixBlendMode: "overlay",
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
