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
import DatePickerModal from "../trends/modals/DatePickerModal";

const DownloadPage = () => {
  const initial = "";
  const [dataSelection, setDataSelection] = useState(initial);
  const [asset, setAsset] = useState(initial);
  const [period, setPeriod] = useState(initial);
  const [reportType, setReportType] = useState(initial);
  const [assetModule, setAssetModule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [assetError, setAssetError] = useState(false);
  const [periodError, setPeriodError] = useState(false);
  const [reportTypeError, setReportTypeError] = useState(false);
  const [toggleDatePicker, setToggleDatePicker] = useState(false);
  const [dateRangeValues, setDateRangeValues] = useState<any>({
    startDate: "",
    endDate: "",
    key: "selection",
  });

  // console.log(dateRangeValues);
  useEffect(() => {
    setPeriodError(false);
  }, [dateRangeValues]);

  const getAssetInfo = async () => {
    const response = await DownloadInfoApi.getModuleInfo();
    setAssetModule(response.data.data);
  };

  useEffect(() => {
    getAssetInfo();
  }, []);

  const assetHandler = (e: SelectChangeEvent) => {
    setAsset(e.target.value);
    setAssetError(false);
  };

  // const periodHandler = (e: SelectChangeEvent) => {
  //   setPeriod(e.target.value);
  //   setPeriodError(false);
  // };

  const reportTypeHandler = (e: SelectChangeEvent) => {
    setReportType(e.target.value);
    setReportTypeError(false);
  };

  const downloadOptionHandler = (e: SelectChangeEvent) => {
    setDataSelection(e.target.value);
    setAsset(initial);
    // setPeriod(initial);
    setDateRangeValues({ startDate: "", endDate: "", key: "selection" });
    setReportType(initial);
    setAssetError(false);
    setPeriodError(false);
    setReportTypeError(false);
  };

  const cancelHandler = () => {
    setDataSelection(initial);
    setAsset(initial);
    // setPeriod(initial);
    setDateRangeValues({ startDate: "", endDate: "", key: "selection" });

    setReportType(initial);
  };
  const postDownloadHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (asset == "") {
      setAssetError(true);
      return;
    } else if (dateRangeValues.startDate === "") {
      setPeriodError(true);
      return;
    } else if (dateRangeValues.endDate === "") {
      setPeriodError(true);
      return;
    } else if (reportType == "" && dataSelection == "data") {
      setReportTypeError(true);
      return;
    }
    console.log({
      type: dataSelection,
      module_id: asset,
      period: dateRangeValues,
      report_type: reportType,
    });

    setIsLoading(true);
    DownloadInfoApi.postDownloadInfo({
      type: dataSelection,
      module_id: asset,
      // period: dateRangeValues,
      startDate: dateRangeValues.startDate,
      endDate: dateRangeValues.endDate,
      report_type: reportType,
    })
      .then((val) => {
        setIsLoading(false);
        enqueueSnackbar({
          message: `Download request is posted, once ready you will get notified`,
          variant: "warning",
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
                  <FormControl sx={{ py: 0, minWidth: "15rem" }}>
                    <Select
                      value={asset}
                      sx={{
                        height: "2.5rem",
                        color: "#1D4580",
                        // width: "25rem",
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
                      {assetModule.map(({ id, name, from_data }: any) => (
                        <MenuItem value={id}>
                          <Typography variant="body2" color="#1D4580">
                            {JSON.parse(from_data).asset_name} -{"  "}
                            {JSON.parse(from_data).equipment_name} ({name})
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {assetError && (
                      <Box sx={{ color: "red" }}>This is required field</Box>
                    )}
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    mt: "5px",
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
                    <Button
                      sx={{ width: "15rem" }}
                      variant="outlined"
                      size="small"
                      color="primary"
                      onClick={() => setToggleDatePicker(true)}
                    >
                      Select Date Range
                    </Button>
                    <DatePickerModal
                      open={toggleDatePicker}
                      onClose={() => setToggleDatePicker(false)}
                      dateRangeValues={dateRangeValues}
                      setDateRangeValues={setDateRangeValues}
                    ></DatePickerModal>
                    {periodError && (
                      <Box sx={{ color: "red" }}>This is required field</Box>
                    )}
                    {/* <FormControl>
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
                      {periodError && (
                        <Box sx={{ color: "red" }}>This is required field</Box>
                      )}
                    </FormControl> */}
                  </Box>
                </Box>
                {dataSelection === "data" && (
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
                        {reportTypeError && (
                          <Box sx={{ color: "red" }}>
                            This is required field
                          </Box>
                        )}
                      </FormControl>
                    </Box>
                  </Box>
                )}
                <Divider sx={{ m: 1 }} />
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
