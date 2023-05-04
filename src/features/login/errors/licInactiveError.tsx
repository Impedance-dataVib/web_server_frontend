import React from "react";
import { Alert, AlertTitle } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-start",
    border: "1px solid #FF0A002B",
    borderRadius: theme.spacing(1),
    backgroundColor: "#FEF3F3",
    padding: theme.spacing(1),
    textAlign: "left",
  },
}));

const LicenseInActiveError = () => {
  const { classes } = useStyles();

  const { t } = useTranslation();

  return (
    <Alert severity="error" className={classes.root}>
      <AlertTitle>
        {t("login.lic.inactive.error.heading", { ns: "root" })}
      </AlertTitle>
      {t("login.lic.inactive.error.subheading", { ns: "root" })}
    </Alert>
  );
};
export default LicenseInActiveError;
