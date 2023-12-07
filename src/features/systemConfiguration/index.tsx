import {
  Typography,
  Box,
  Link,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Modal,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SystemInfoTable from "./systemInfoTable";
import NotActiveLicenseTable from "./notActiveLicenseTable";
import UploadFile from "./uploadFile";
import { useEffect, useState } from "react";
import SystemInfoApi from "./api";
import InfoIcon from "@mui/icons-material/Info";
import api from "../../app/api";
import { enqueueSnackbar } from "notistack";
import { USER_NAME_ROLE } from "src/app/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const SystemConfiguration = () => {
  const [poppup, setPoppup] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [apiData, setApiData] = useState<any>();
  console.log(apiData);
  const getSystemInfo = async () => {
    if (apiData) {
      return;
    }
    const response = await SystemInfoApi.getSystemInfo();
    setApiData((val: any) => {
      return {
        ...val,
        ...response?.data,
      };
    });
  };
  useEffect(() => {
    if (!apiData) {
      getSystemInfo();
    }
  }, [apiData]);
  const handleClick = () => {
    api.get(
      `${window.location.origin}/client-portal-api/app/start_dashboard_socket.php`
    );

    api.get(
      `${window.location.origin}/client-portal-api/app/start_signal_socket.php`
    );

    api.get(
      `${window.location.origin}/client-portal-api/app/start_status_socket.php`
    );
    window.location.reload();
  };

  const revokeLicense = () => {
    api
      .get("/license/delete_license.php")
      .then((res) => {
        setPoppup(false);
        enqueueSnackbar({
          message: "You have Succesfully removed the license",
          variant: "success",
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar({
          message: "Error While Revoking the License",
          variant: "error",
        });
        setPoppup(false);
      });
  };

  const userNameRole = sessionStorage.getItem(USER_NAME_ROLE);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">System Configuration</Typography>
        <Box>
          <Button
            size="small"
            sx={{ mr: "18px" }}
            variant="outlined"
          // onClick={handleClick}
          >
            Restart WebSocket
          </Button>
          {userNameRole === "admin" ? (
            <Button
              size="small"
              sx={{ mr: "18px", color: "red" }}
              variant="outlined"
            // onClick={() => setPoppup(true)}
            >
              Revoke license
            </Button>
          ) : (
            ""
          )}
        </Box>
      </Box>
      <Modal
        open={poppup}
        onClose={() => setPoppup(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you really want to revoke current license. it will cause data
            loss.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button sx={{ mr: 1 }} variant="contained" onClick={revokeLicense}>
              yes
            </Button>
            <Button variant="contained" onClick={() => setPoppup(false)}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box
        sx={{
          m: 2,
          ml: 0,
          py: 3,
          px: 4,
          display: "flex",
          bgcolor: (theme) => {
            return theme.palette.color3.main;
          },
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid #7070704B",
                borderRadius: 5,
                bgcolor: "#E8E8ED",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  px: 4,
                  py: 2,
                }}
              >
                <Typography variant="h5">Hardware information</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography variant="subtitle1">
                      Hardware Serial Number :{" "}
                    </Typography>
                    <Typography variant="body1" sx={{ mx: 1 }}>
                      {apiData?.serialNo}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography variant="subtitle1">Mac ID : </Typography>
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      {apiData?.macId}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography variant="subtitle1">
                      Firmware Number :{" "}
                    </Typography>
                    <Typography variant="body1" sx={{ mx: 1 }}>
                      {apiData?.firmwareVersion}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle1">User Manual : </Typography>
                    <Link
                      variant="body1"
                      color="#002BBC"
                      href="/hardware_manual.pdf"
                      sx={{ mx: 1 }}
                      download
                      target="_blank"
                    >
                      Download Hardware User Manual.pdf
                    </Link>
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ mx: 4 }} />
              <Box sx={{ px: 4, py: 2 }}>
                <Typography variant="h5">
                  Software information
                  <InfoIcon
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}
                  ></InfoIcon>
                </Typography>
                {isShown && (
                  <Box
                    component="p"
                    sx={{
                      bgcolor: "#F5F5F5",
                      position: "absolute",
                      width: "50%",
                      padding: "7px",
                      borderRadius: "10px",
                    }}
                  >
                    {apiData?.softwareNote}
                  </Box>
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography variant="subtitle1">SW Version: </Typography>
                    <Typography variant="body1" sx={{ mx: 1 }}>
                      {apiData?.softwareVersion}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography variant="subtitle1">
                      Software user manual :{" "}
                    </Typography>
                    <Link
                      variant="body1"
                      color="#002BBC"
                      href="/software_manual.pdf"
                      sx={{ mx: 1 }}
                      download
                      target="_blank"
                    >
                      Download Software User Manual.pdf
                    </Link>
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ mx: 4 }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  px: 4,
                  py: 2,
                }}
              >
                <Typography variant="h5">License Details</Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography variant="subtitle1">
                      License Number:{" "}
                    </Typography>
                    <Typography variant="body1" sx={{ mx: 1 }}>
                      {apiData?.licenseInfo?.license_number}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography variant="subtitle1">
                      License Tenure (Months) :{" "}
                    </Typography>
                    <Typography variant="body1" sx={{ mx: 1 }}>
                      {apiData?.licenseInfo?.license_tenure}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography variant="subtitle1">
                      Activation date:{" "}
                    </Typography>
                    <Typography variant="body1" sx={{ mx: 1 }}>
                      {apiData?.licenseInfo?.activation_date}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography variant="subtitle1">Expiry date: </Typography>
                    <Typography variant="body1" sx={{ mx: 1 }}>
                      {apiData?.licenseInfo?.expiry_date}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ my: 5 }} />
          <Box>
            <SystemInfoTable systemInfo={apiData?.licenseInfo} />
          </Box>
          <Divider sx={{ my: 5 }} />
          <Box>
            <Accordion sx={{ bgcolor: "#EAEAEA" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="subtitle2"> License History</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <NotActiveLicenseTable
                  notActiveLicenseInfo={apiData?.notActiveLicenseInfo || []}
                />
              </AccordionDetails>
            </Accordion>
          </Box>
          <Divider sx={{ my: 5 }} />
          <Box
            sx={{
              display: "flex",
              // p: 2,
            }}
          >
            <UploadFile setApiData={setApiData} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default SystemConfiguration;
