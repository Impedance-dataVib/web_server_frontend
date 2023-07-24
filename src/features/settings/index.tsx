import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  LinearProgress,
} from "@mui/material";

import api from "../../app/api";
import ToggleSwitch from "../../app/components/toggle-switch";
import { radioData } from "./schema";
import AccordionBase from "../../app/components/accordion-base";
import SettingsApi from "./api";
import { enqueueSnackbar } from "notistack";

const defaultApiData = {
  display_date_utc: false,
  webdev_access: false,
  auto_date_ntp: false,
  ftp_access: false,
  rest_api: false,
  display_warming_time: false,
  date_in_utc: "",
  time_in_utc: "",
  significant_time_diff: "",
  webdev_port: "",
  websocket_port: "",
  dns_server: "",
  ip_address: "",
  netmask: "",
  gateway: "",
  description: "",
  network_type: "",
  language: "",
  disk_management: "",
};
const SettingsPage = () => {
  const [apiData, setApiData] = useState(defaultApiData);
  const [expanded, setExpanded] = useState<string | false>("generalSettings");
  const [showNetworkSettings, setNetworkSettings] = useState<string | false>(
    "networkSettings"
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleIpAddress = (key: string, val: string, valueLength: number) => {
    let length = val.length;
    let index = val.lastIndexOf(".") + 1;
    let noOfDots = val.split(".").length - 1;
    let updatedVal = "";
    if (
      length !== index &&
      noOfDots < 3 &&
      valueLength < length &&
      (length - index) % 3 === 0
    ) {
      updatedVal = val + ".";
    } else if (noOfDots > 3 || length - index > 3) {
      let newString = val.substring(0, length - 1);
      updatedVal = newString;
    } else {
      updatedVal = val;
    }
    changeEventHandler(key, updatedVal);
  };

  const handleAccordionChange =
    (value: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? value : false);
    };
  const handleAccordionChangeNetwork =
    (value: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setNetworkSettings(newExpanded ? value : false);
    };

  const changeEventHandler = (key: string, val: any) => {
    setApiData((value) => {
      return {
        ...value,
        [key]: val,
      };
    });
  };

  const getSettingsInfo = () => {
    SettingsApi.getSettingsInfo().then((val) => {
      setApiData(val?.data?.data);
    });
  };

  const saveSettings = (payload: object) => {
    setIsLoading(true);
    SettingsApi.saveSettingsInfo(payload)
      .then((val) => {
        setIsLoading(false);
        enqueueSnackbar({
          message: `Settings is saved`,
          variant: "success",
        });
      })
      .catch((error) => {
        setIsLoading(false);
        enqueueSnackbar({
          message: "Error occurred while saving Settings",
          variant: "error",
        });
      });
  };
  const handleClick = () => {
    const date = new Date();
    const toSendDate =
      date.getUTCFullYear() +
      "-" +
      (date.getUTCMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getUTCDate().toString().padStart(2, "0") +
      " " +
      date.getUTCHours().toString().padStart(2, "0") +
      ":" +
      date.getUTCMinutes().toString().padStart(2, "0") +
      ":" +
      date.getUTCSeconds().toString().padStart(2, "0");
    console.log("date", toSendDate);
    api
      .get(`/vbox/synk_time.php?synk_time=${toSendDate}`)
      .then((res) => {
        enqueueSnackbar({
          message: res?.data?.Message,
          variant: "success",
        });
      })
      .catch((e) => {
        enqueueSnackbar({
          message: e?.response?.data?.Message || "",
          variant: "error",
        });
      });
  };

  useEffect(() => {
    getSettingsInfo();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {isLoading && (
          <Box sx={{ my: 1 }}>
            <LinearProgress />
          </Box>
        )}

        <Typography variant="h5">Settings</Typography>
        <Button
          size="small"
          sx={{ mr: "18px" }}
          variant="outlined"
          onClick={handleClick}
        >
          Synchronise Time Difference
        </Button>
      </Box>
      <form>
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
          <Box sx={{ width: "70%" }}>
            <AccordionBase
              expanded={expanded}
              handleChange={handleAccordionChange}
              value={"generalSettings"}
              title={"General Settings"}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mt: 2,
                }}
              >
                <Box sx={{ display: "flex", mt: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ width: "32%", textAlign: "end" }}
                  >
                    Time in UTC (hh:mm:ss)
                  </Typography>
                  <Box sx={{ mx: 1 }}>
                    <TextField
                      placeholder="hh:mm:ss"
                      value={apiData.time_in_utc}
                      onChange={(e: any) => {
                        changeEventHandler("time_in_utc", e.target.value);
                      }}
                      variant="outlined"
                      sx={{
                        fontSize: "16px",
                        mb: "20px",
                        width: "182px",
                        padding: "1px 1px",
                      }}
                      inputProps={{
                        style: {
                          padding: 1,
                          marginLeft: 10,
                        },
                        step: "1",
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: "flex", mt: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ width: "32%", textAlign: "end" }}
                  >
                    REST API
                  </Typography>
                  <Box sx={{ mx: 1 }}>
                    <ToggleSwitch
                      value={apiData.rest_api}
                      onChange={(e: any) => {
                        changeEventHandler("rest_api", e.target.checked);
                      }}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", mt: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ width: "32%", textAlign: "end" }}
                  >
                    WebDAV Access
                  </Typography>
                  <Box sx={{ mx: 1 }}>
                    <ToggleSwitch
                      value={apiData.webdev_access}
                      onChange={(e: any) => {
                        changeEventHandler("webdev_access", e.target.checked);
                      }}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", mt: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ width: "32%", textAlign: "end" }}
                  >
                    WebDAV Port
                  </Typography>
                  <Box sx={{ mx: 1 }}>
                    <TextField
                      placeholder="00:00"
                      value={apiData.webdev_port}
                      variant="outlined"
                      onChange={(e: any) => {
                        if (e.target.value.length < 5)
                          changeEventHandler("webdev_port", e.target.value);
                      }}
                      sx={{
                        fontSize: "16px",
                        mb: "20px",
                        width: "182px",
                        padding: "1px 1px",
                      }}
                      type="number"
                      inputProps={{
                        style: {
                          padding: 1,
                          marginLeft: 10,
                        },
                        maxLength: "4",
                        pattern: "d{4}",
                      }}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", mt: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ width: "32%", textAlign: "end" }}
                  >
                    FTP Access
                  </Typography>
                  <Box sx={{ mx: 1 }}>
                    <ToggleSwitch
                      value={apiData.ftp_access}
                      onChange={(e: any) => {
                        changeEventHandler("ftp_access", e.target.checked);
                      }}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", mt: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ width: "32%", textAlign: "end" }}
                  >
                    WebSocket Port{" "}
                  </Typography>
                  <Box sx={{ mx: 1 }}>
                    <TextField
                      placeholder="00:00"
                      value={apiData.websocket_port}
                      onChange={(e: any) => {
                        if (e.target.value.length < 5)
                          changeEventHandler("websocket_port", e.target.value);
                      }}
                      variant="outlined"
                      sx={{
                        fontSize: "16px",
                        mb: "20px",
                        width: "182px",
                        padding: "1px 1px",
                      }}
                      type="number"
                      inputProps={{
                        style: {
                          padding: 1,
                          marginLeft: 10,
                        },
                        maxLength: "4",
                        pattern: "d{4}",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </AccordionBase>
            <Box sx={{ m: 5 }} />
            <AccordionBase
              expanded={showNetworkSettings}
              handleChange={handleAccordionChangeNetwork}
              value={"networkSettings"}
              title={"Network Settings"}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  ml: 5,
                  mt: 2,
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Typography variant="body2" sx={{ width: "15%" }}>
                    Network Type
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControl>
                      <RadioGroup
                        value={apiData.network_type}
                        onChange={(e: any) => {
                          changeEventHandler("network_type", e.target.value);
                        }}
                        row
                      >
                        {radioData.map((val) => (
                          <FormControlLabel
                            key={`network${val.value}`}
                            value={val.value}
                            control={<Radio size="small" />}
                            label={val.label}
                          ></FormControlLabel>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <Typography variant="body2" sx={{ width: "15%" }}>
                    IP address
                  </Typography>
                  <Box>
                    <TextField
                      placeholder="_._._._ "
                      value={apiData.ip_address}
                      onChange={(e) =>
                        handleIpAddress(
                          "ip_address",
                          e.target.value,
                          apiData.ip_address.length
                        )
                      }
                      variant="outlined"
                      sx={{
                        fontSize: "16px",
                        mb: "20px",
                        width: "182px",
                        padding: "1px 1px",
                      }}
                      inputProps={{
                        style: {
                          padding: 1,
                          marginLeft: 10,
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <Typography variant="body2" sx={{ width: "15%" }}>
                    Netmask
                  </Typography>
                  <Box>
                    <TextField
                      placeholder="_._._._ "
                      value={apiData.netmask}
                      onChange={(e) =>
                        handleIpAddress(
                          "netmask",
                          e.target.value,
                          apiData.netmask.length
                        )
                      }
                      variant="outlined"
                      sx={{
                        fontSize: "16px",
                        mb: "20px",
                        width: "182px",
                        padding: "1px 1px",
                      }}
                      inputProps={{
                        style: {
                          padding: 1,
                          marginLeft: 10,
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <Typography variant="body2" sx={{ width: "15%" }}>
                    Gateway
                  </Typography>
                  <Box>
                    <TextField
                      placeholder="_._._._ "
                      value={apiData.gateway}
                      onChange={(e) =>
                        handleIpAddress(
                          "gateway",
                          e.target.value,
                          apiData.gateway.length
                        )
                      }
                      variant="outlined"
                      sx={{
                        fontSize: "16px",
                        mb: "20px",
                        width: "182px",
                        padding: "1px 1px",
                      }}
                      inputProps={{
                        style: {
                          padding: 1,
                          marginLeft: 10,
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <Typography variant="body2" sx={{ width: "15%" }}>
                    DNS Server
                  </Typography>
                  <Box>
                    <TextField
                      placeholder="_._._._ "
                      value={apiData.dns_server}
                      variant="outlined"
                      onChange={(e) =>
                        handleIpAddress(
                          "dns_server",
                          e.target.value,
                          apiData.dns_server.length
                        )
                      }
                      sx={{
                        fontSize: "16px",
                        mb: "20px",
                        width: "182px",
                        padding: "1px 1px",
                      }}
                      inputProps={{
                        style: {
                          padding: 1,
                          marginLeft: 10,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </AccordionBase>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: "#1D4580", m: 1, my: 3 }}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  saveSettings(apiData);
                }}
              >
                SAVE
              </Button>
              {/* <Button
                size="small"
                variant="contained"
                color="inherit"
                sx={{
                  backgroundColor: "#B6B5BC",
                  color: "white",
                  m: 1,
                  my: 3,
                }}
                onClick={getSettingsInfo}
              >
                Cancel
              </Button> */}
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};
export default SettingsPage;
