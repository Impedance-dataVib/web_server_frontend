import React, { useContext, useEffect, useState } from "react";
import { Cancel, Key } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  IconButton,
  Typography,
} from "@mui/material";
import CommonApi from "../../../commonApi";
import * as dateFns from "date-fns";
import FileUploadComponent from "../../../app/components/fileUpload";
import { LICENSE_STATUS } from "../../../App";
import appContext from "../../../app/context";
import LicenseInActiveError from "../errors/licInactiveError";
import LicenseExpiredError from "../errors/licExpiredError";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";

const LicenseImportForm = () => {
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isInactive, setInactive] = useState<boolean>(false);

  const [expiryDate, setExpiryDate] = useState<any>();
  const [selectedFile, setSelectedFile] = useState<any>();
  const [tNcAccepted, setTnCAccepted] = useState<boolean>(false);

  const { licenseStatus, licenseInfo } = useContext(appContext);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

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

  const onClickActivateButton = () => {
    CommonApi.importLicense({ selectedFile })
      .then((res) => {
        enqueueSnackbar({
          message: res?.data?.Message + " , Please refresh the page",
          variant: "success",
        });
        window.open(`/`, '_self');
      })
      .catch((e) => {
        enqueueSnackbar({
          message: e?.response?.data?.Message || '',
          variant: "error",
        });
      });
  };

  const onChangeLicenseFile = (licFile: any) => {
    setSelectedFile(licFile);
  };

  const onChangeTnc = (e: any, checked: boolean) => {
    setTnCAccepted(checked);
  };

  return (
    <Box sx={{ textAlign: "left", maxWidth: "416px" }}>
      <Box
        sx={{
          maxWidth: "416px",
          mt: { md: 4, sm: 4, xs: 4 },
          textAlign: "center",
        }}
      >
        <img alt="logo" src="logo_vib_360.png" />
      </Box>

      {isExpired && (
        <Box sx={{ maxWidth: isExpired ? "auto" : "416px", mt: 1 }}>
          <LicenseExpiredError />
          <>
            <Box sx={{ mt: 1 }}>
              <Typography>
                {" "}
                {t("login.lic.expired.msg.part1", { ns: "root" })}{" "}
                <b> {`${dateFns.format(expiryDate, "dd MMM yyyy, H:mm a")}`}</b>
                , {t("login.lic.expired.msg.part2", { ns: "root" })}{" "}
                <a
                  href={`${process.env.REACT_APP_LIC_PORTAL_URL}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("login.lic.expired.msg.part3", { ns: "root" })}
                </a>{" "}
                {t("login.lic.expired.msg.part4", { ns: "root" })}
              </Typography>
            </Box>
          </>
        </Box>
      )}
      {isInactive && (
        <Box sx={{ maxWidth: isInactive ? "auto" : "416px", mt: 1 }}>
          <LicenseInActiveError />
        </Box>
      )}
      <Box sx={{ mt: 1 }}>
        <Box>
          <FormLabel>{t("login.lic.upload.file", { ns: "root" })}</FormLabel>
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
          {t("login.lic.agree.part1", { ns: "root" })}{" "}
          <a
            href={
              process.env.PUBLIC_URL +
              `/Annex VIII_VIB 360 End user license contract_Distrib agreement [FR].pdf`
            }
            target="_blank"
            rel="noreferrer"
          >
            {t("login.lic.agree.part2", { ns: "root" })}
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
            {t("login.lic.btn.activate", { ns: "root" })}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default LicenseImportForm;
