import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { AUTH_STATUS, useAuth } from "../../app/auth";
import LoginForm from "./forms/loginForm";
import LicenseImportForm from "./forms/licenseImportForm";

const LOGIN_PAGE_FORMS = {
  LOGIN_FORM: "login",
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
        height: "100vh",
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
                xs: "100vh",
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
                    overflowX: "hidden",
                    display: { sm: "block", xs: "none" },
                  }}
                >
                  <img
                    alt="Engine"
                    src="Engine_images.png"
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
                  height: "100%",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  p: 2,
                  overflowX: "hidden",
                }}
              >
                {formToRender === LOGIN_PAGE_FORMS.LOGIN_FORM && <LoginForm />}
                {formToRender === LOGIN_PAGE_FORMS.LICENSE_IMPORT && (
                  <LicenseImportForm />
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
