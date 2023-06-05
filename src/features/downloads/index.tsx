import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Divider,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import {
  assetData,
  selectOption,
  selectPeriod,
  selectReportType,
} from "./schema";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DownloadInfoApi from "./api";
import { enqueueSnackbar } from "notistack";

const DownloadPage = () => {
  const initial = "";
  const [dataSelection, setDataSelection] = useState(initial);
  const [asset, setAsset] = useState(initial);
  const [period, setPeriod] = useState(initial);
  const [reportType, setReportType] = useState(initial);
  const [assetModule, setAssetModule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAssetInfo = async () => {
    const response = await DownloadInfoApi.getModuleInfo();
    setAssetModule(response.data.data);
  };

  useEffect(() => {
    getAssetInfo();
  }, []);

  const assetHandler = (e: SelectChangeEvent) => {
    setAsset(e.target.value);
  };

  const periodHandler = (e: SelectChangeEvent) => {
    setPeriod(e.target.value);
  };

  const reportTypeHandler = (e: SelectChangeEvent) => {
    setReportType(e.target.value);
  };

  const downloadOptionHandler = (e: SelectChangeEvent) => {
    setDataSelection(e.target.value);
    setAsset(initial);
    setPeriod(initial);
    setReportType(initial);
  };

  const cancelHandler = () => {
    setDataSelection(initial);
    setAsset(initial);
    setPeriod(initial);
    setReportType(initial);
  };
  const postDownloadHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    DownloadInfoApi.postDownloadInfo({
      type: dataSelection,
      module_id: asset,
      period: period,
      report_type: reportType,
    })
      .then((val) => {
        setIsLoading(false);
        enqueueSnackbar({
          message: `Download data is posted`,
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        enqueueSnackbar({
          message: error.Message,
          variant: "error",
        });
      });
  };

  return (
    <Box>
      <Typography variant="h5">
        <strong> Download Reports and Data </strong>
      </Typography>
      <form onSubmit={postDownloadHandler}>
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
          <Box sx={{ color: "#1D4580" }}>
            <Box>
              <Typography variant="body2" sx={{ ml: 1 }}>
                What do you want to download?
              </Typography>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    ml: 1,
                    fontSize: "16px",
                  }}
                >
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={dataSelection}
                      onChange={downloadOptionHandler}
                      row
                    >
                      {selectOption.map((val) => (
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
            </Box>
            {dataSelection !== "" && (
              <Box sx={{ ml: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ mr: 1, width: "120px", textAlign: "end" }}
                  >
                    Select Asset :{" "}
                  </Typography>
                  <FormControl sx={{ py: 0, width: "110px" }}>
                    <Select
                      value={asset}
                      sx={{
                        height: "2.5rem",
                        color: "#1D4580",
                        width: "8rem",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#1D4580",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "#1D4580",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#1D4580",
                          borderWidth: "0.15rem",
                        },
                      }}
                      name="asset"
                      onChange={assetHandler}
                      autoWidth
                      size="small"
                    >
                      {assetModule.map(({ id, name }: any) => (
                        <MenuItem value={id}>
                          <Typography variant="body2" color="#1D4580">
                            {name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ mr: 1, width: "120px", textAlign: "end" }}
                  >
                    Select Period :{" "}
                  </Typography>
                  <Box sx={{ mr: 1 }}>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={period}
                        onChange={periodHandler}
                        row
                      >
                        {selectPeriod.map((val) => (
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
                {dataSelection === "downloadData" && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ mr: 1, width: "120px", textAlign: "end" }}
                    >
                      Select Report Type :{" "}
                    </Typography>
                    <Box>
                      <FormControl>
                        <RadioGroup
                          value={reportType}
                          onChange={reportTypeHandler}
                          row
                        >
                          {selectReportType.map((val) => (
                            <FormControlLabel
                              value={val?.value}
                              control={<Radio size="small" />}
                              label={val.label}
                            ></FormControlLabel>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  </Box>
                )}
                <Divider />
                <Box sx={{ m: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<VisibilityTwoToneIcon />}
                    sx={{ backgroundColor: "#1D4580", m: 1, my: 3, ml: 11 }}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<FileDownloadOutlinedIcon />}
                    sx={{ backgroundColor: "#1D4580", m: 1, my: 3 }}
                    type="submit"
                  >
                    Download
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="inherit"
                    onClick={cancelHandler}
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
            )}
          </Box>
        </Box>
      </form>
    </Box>
  );
};
export default DownloadPage;
