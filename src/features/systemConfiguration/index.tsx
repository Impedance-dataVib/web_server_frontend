import { Typography, Box, Link, Divider, Button } from "@mui/material";
import SystemInfoTable from "./systemInfoTable";
import UploadFile from "./uploadFile";
import CachedIcon from "@mui/icons-material/Cached";
// import { apiData } from "./schema";
import { useEffect, useState } from "react";
import SystemInfoApi from "./api";

const SystemConfiguration = () => {
  const [apiData, setApiData] = useState({
    serianNo: "",
    macId: "",
    firmwareVersion: "",
    softwareVersion: "",
    library: "",
    systemInfo: [],
  });

  const getSystemInfo = async () =>   {
    const response = await SystemInfoApi.getSystemInfo();
    setApiData(response?.data);
  };

  useEffect(() => {
    getSystemInfo();
  }, []);

  return (
    <Box>
      <Typography variant="h5">System Configuration</Typography>
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
        <Box sx={{ width: "50%" }}>
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
                  display: "flex",
                  flexDirection: "column",
                  px: 4,
                  py: 2,
                }}
              >
                <Typography variant="h5">Hardware Details</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Serial No : </Typography>
                  <Typography variant="body1" sx={{ mx: 1 }}>
                    {apiData.serianNo}
                  </Typography>
                  <Typography variant="h6">Mac Id : </Typography>
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {apiData.macId}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Firmware Version : </Typography>
                  <Typography variant="body1" sx={{ mx: 1 }}>
                    {apiData.firmwareVersion}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Link variant="body1" color="#002BBC" href="#">
                    Download Hardware User Manual
                  </Link>
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
                <Typography variant="h5">Software Details</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Software Version: </Typography>
                  <Typography variant="body1" sx={{ mx: 1 }}>
                    {apiData.softwareVersion}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Library: </Typography>
                  <Typography variant="body1" sx={{ mx: 1 }}>
                    {apiData.library}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Link variant="body1" color="#002BBC" href="#">
                    Download Software User Manual
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ my: 5 }} />
          <Box>
            <SystemInfoTable systemInfo={apiData.systemInfo} />
          </Box>
          <Divider sx={{ my: 5 }} />
          <Box
            sx={{
              display: "flex",
              // p: 2,
            }}
          >
            <UploadFile />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              pt: 2
            }}
          >
            <Button variant="contained" startIcon={<CachedIcon />}>
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default SystemConfiguration;
