import React, { useState } from "react";
import {
  Typography,
  Box,
  Switch,
  Divider,
  Button,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import ToggleSwitch from "../../app/components/toggle-switch";
import { Language, radioData } from "./schema";

const SettingsPage = () => {
  const [showGeneralSettings, setShowGeneralSetting] = useState(true);
  const [showNetworkSettings, setNetworkSettings] = useState(true);
  const [language, setLanguage] = useState("");
  const [networkType, setNetworkType] = useState("");

  const languageHandler = (e: SelectChangeEvent) => {
    setLanguage(e.target.value);
  };

  const NetworkTypeHandler = (e: SelectChangeEvent) => {
    setNetworkType(e.target.value);
  };

  return (
    <Box>
      <Typography variant="h5">Settings</Typography>
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
        <Box sx={{ width: "50%", color: "#1D4580" }}>
          <Box sx={{ bgcolor: "#D5D5D5", p: 2 }}>
            {" "}
            <div onClick={() => setShowGeneralSetting(!showGeneralSettings)} style={{fontSize:'20px'}}>
              <strong>General Settings</strong>
            </div>
          </Box>
          {showGeneralSettings && (
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
                  Display dates in UTC
                </Typography>
                <Box sx={{ mx: 1 }}>
                  <ToggleSwitch />
                </Box>
              </Box>
              <Box sx={{ display: "flex", mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ width: "32%", textAlign: "end" }}
                >
                  Automatically set date with NTP
                </Typography>
                <Box sx={{ mx: 1 }}>
                  <ToggleSwitch />
                </Box>
              </Box>
              <Box sx={{ display: "flex", mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ width: "32%", textAlign: "end" }}
                >
                  Date in UTC
                </Typography>
                <Box sx={{ mx: 1 }}>
                  <TextField variant="outlined" placeholder="DD.MM.YYYY" />
                </Box>
              </Box>
              <Box sx={{ display: "flex", mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ width: "32%", textAlign: "end" }}
                >
                  Time in UTC
                </Typography>
                <Box sx={{ mx: 1 }}>
                  <input
                    type="text"
                    placeholder="Hh:Mm:Ss"
                    style={{
                      borderRadius: "4px",
                      borderColor: "grey",
                      borderWidth: "1px",
                      color: "grey",
                      width: "100px",
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex", mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ width: "32%", textAlign: "end" }}
                >
                  Language
                </Typography>
                <Box sx={{ mx: 1 }}>
                  <FormControl sx={{ py: 0, width: "110px" }}>
                    <Select
                      value={language}
                      sx={{
                        height: "1.5rem",
                        color: "grey",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "grey",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "grey",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "grey",
                          borderWidth: "0.1rem",
                        },
                      }}
                      name="language"
                      onChange={languageHandler}
                      autoWidth
                      size="small"
                    >
                      {Language.map((val) => (
                        <MenuItem value={val.value}>
                          <Typography variant="body2" color="#1D4580">
                            {val.label}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box sx={{ display: "flex", mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ width: "32%", textAlign: "end" }}
                >
                  Display warning on time difference{" "}
                </Typography>
                <Box sx={{ mx: 1 }}>
                  <ToggleSwitch />
                </Box>
              </Box>
              <Box sx={{ display: "flex", mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ width: "32%", textAlign: "end" }}
                >
                  Significant time difference (seconds){" "}
                </Typography>
                <Box sx={{ mx: 1 }}>
                  <input
                    type="text"
                    placeholder="English"
                    style={{
                      borderRadius: "4px",
                      borderColor: "grey",
                      borderWidth: "1px",
                      color: "grey",
                      width: "100px",
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
                  <ToggleSwitch />
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
                  <ToggleSwitch />
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
                  <input
                    type="text"
                    placeholder="00:00"
                    style={{
                      borderRadius: "4px",
                      borderColor: "grey",
                      borderWidth: "1px",
                      color: "grey",
                      width: "100px",
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
                  <ToggleSwitch />
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
                  <input
                    type="text"
                    placeholder="00:00"
                    style={{
                      borderRadius: "4px",
                      borderColor: "grey",
                      borderWidth: "1px",
                      color: "grey",
                      width: "100px",
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex", mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ width: "32%", textAlign: "end" }}
                >
                  Significant time difference (seconds){" "}
                </Typography>
                <Box sx={{ mx: 1 }}>
                  <input type="radio" />
                  <span>Circular</span>
                </Box>
              </Box>
              <Box sx={{ display: "flex", mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ width: "32%", textAlign: "end" }}
                >
                  Description
                </Typography>
                <Box sx={{ mx: 1 }}>
                  <input
                    type="textArea"
                    placeholder="English"
                    style={{
                      borderRadius: "4px",
                      borderColor: "#B6B5BC",
                      borderWidth: "1px",
                      color: "grey",
                      width: "400px",
                      height: "70px",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          )}
          <Box sx={{ bgcolor: "#D5D5D5", p: 2, mt: 2}}>
            {" "}
            <div onClick={() => setNetworkSettings(!showNetworkSettings)} style={{fontSize:'20px'}}>
              <strong>Network Settings</strong>
            </div>
          </Box>
          {showNetworkSettings && (
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
                      value={networkType}
                      onChange={NetworkTypeHandler}
                      row
                    >
                      {radioData.map((val) => (
                        <FormControlLabel
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
                  <input type="tex" placeholder="  .  .  .  " />
                </Box>
              </Box>
              <Box sx={{ display: "flex", mb: 2 }}>
                <Typography variant="body2" sx={{ width: "15%" }}>
                  Netmask
                </Typography>
                <Box>
                  <input type="tex" placeholder="  .  .  .  " />
                </Box>
              </Box>
              <Box sx={{ display: "flex", mb: 2 }}>
                <Typography variant="body2" sx={{ width: "15%" }}>
                  Gateway
                </Typography>
                <Box>
                  <input type="tex" placeholder="  .  .  .  " />
                </Box>
              </Box>
              <Box sx={{ display: "flex", mb: 2 }}>
                <Typography variant="body2" sx={{ width: "15%" }}>
                  DNS Server
                </Typography>
                <Box>
                  <input type="tex" placeholder="  .  .  .  " />
                </Box>
              </Box>
            </Box>
          )}
          <Divider sx={{ m: 2 }} />
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
            >
              SAVE
            </Button>
            <Button
              size="small"
              variant="contained"
              color="inherit"
              sx={{
                backgroundColor: "#B6B5BC",
                color: "white",
                m: 1,
                my: 3,
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default SettingsPage;
