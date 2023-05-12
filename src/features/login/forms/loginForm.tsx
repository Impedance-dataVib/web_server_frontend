import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/auth";
import AuthenticationError from "../errors/authError";
import LoginApi from "../loginApi";
import { makeStyles } from "tss-react/mui";
import appContext from "src/app/context";
import { LICENSE_STATUS } from "src/App";
import * as dateFns from "date-fns";
import LicenseExpiredError from "../errors/licExpiredError";
import LicenseInActiveError from "../errors/licInactiveError";

const useStyles = makeStyles()((theme) => ({
  buttons: {
    maxWidth: "350px",
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(3),
    marginLeft: "auto",
    marginRight: "auto",
  },
  btn: {
    width: "167px",
    height: "45px",
    textTransform: "none",
  },
  copyright: {
    position: "absolute",
    marginTop: theme.spacing(3),
    width: "80%",
    textAlign: "center",
  },
}));

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isInactive, setInactive] = useState<boolean>(false);
  const { licenseStatus, licenseInfo, onLoadCheckLicense } = useContext(appContext);

  const { setAuthToken, setRefreshToken } = useAuth();

  const navigate = useNavigate();
  const { t } = useTranslation();

  const { classes } = useStyles();

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

  const submitLoginDetails = async () => {
    LoginApi.login({ username, password })
      .then((res) => {
        if (res.status === 200) {
          if (res?.data?.token && res?.data?.refresh_token) {
            setIsError(false);
            setAuthToken(res.data?.token);
            setRefreshToken(res.data?.refresh_token);

            // navigate("/dashboard");
            onLoadCheckLicense?.();
          }
        } else {
          setIsError(true);
        }
      })
      .catch(() => {
        setIsError(true);
      });
  };

  const validateForm = () => {
    let allGood = true;
    if (
      username === undefined ||
      (username !== undefined && String(username)?.trim().length === 0)
    ) {
      setUsernameError("username is required");
      allGood = false;
    } else {
      setUsernameError("");
    }
    if (
      password === undefined ||
      (password !== undefined && String(password)?.trim().length === 0)
    ) {
      setPasswordError("password is required");
      allGood = false;
    } else {
      setPasswordError("");
    }
    return allGood;
  };

  const onClickLoginButton = () => {
    const allGood = validateForm();
    if (allGood) {
      submitLoginDetails();
    }
  };

  const onClickSignUpButton = () => {
    console.log("sign up button called");
  };

  return (
    <form style={{ maxWidth: "416px" }}>
      <Box sx={{ maxWidth: "416px", mt: { md: 4, sm: 4, xs: 4 } }}>
        <img alt="logo" src="logo_vib_360.png" />
      </Box>
      {isExpired && (
        <Box sx={{ maxWidth: isExpired ? "auto" : "416px", mt: 1 }}>
          <LicenseExpiredError />
        </Box>
      )}
      {isInactive && (
        <Box sx={{ maxWidth: isInactive ? "auto" : "416px", mt: 1 }}>
          <LicenseInActiveError />
        </Box>
      )}
      <Box sx={{ maxWidth: isError ? "auto" : "416px", mt: 3, mb: 2 }}>
        {isError ? (
          <AuthenticationError />
        ) : (
          <Typography
            sx={{ color: "#5A607F", fontSize: "18px", opacity: "0.5" }}
          >
            {t("login.screen.welcome.message", { ns: "root" })}
          </Typography>
        )}
      </Box>

      <Box sx={{ maxWidth: "350px", margin: "0px auto" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label={t("login.screen.label.username", { ns: "root" })}
                variant="standard"
                sx={{ fontSize: "18px" }}
                value={username}
                onChange={(e: any) => {
                  setUsername(e?.target?.value);
                  setUsernameError("");
                }}
                autoComplete="username"
                helperText={usernameError}
                error={usernameError !== undefined && usernameError?.length > 0}
                required
              ></TextField>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ maxWidth: "416px", mt: 1 }}>
              <TextField
                fullWidth
                variant="standard"
                label={t("login.screen.label.password", { ns: "root" })}
                type="password"
                sx={{ fontSize: "18px" }}
                value={password}
                onChange={(e: any) => {
                  setPassword(e?.target?.value);
                  setPasswordError("");
                }}
                autoComplete="current-password"
                helperText={passwordError}
                error={passwordError !== undefined && passwordError?.length > 0}
                required
              ></TextField>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.buttons}>
        <Button
          color="primary"
          variant="contained"
          className={classes.btn}
          onClick={onClickLoginButton}
        >
          {t("login.screen.button.login", { ns: "root" })}
        </Button>
        <Button
          variant="outlined"
          className={classes.btn}
          onClick={onClickSignUpButton}
        >
          {t("login.screen.button.signup", { ns: "root" })}
        </Button>
      </Box>
      <Box className={classes.copyright}>
        <Typography>
          {t("login.screen.copyright.text", { ns: "root" })}
        </Typography>
      </Box>
    </form>
  );
};
export default LoginForm;
