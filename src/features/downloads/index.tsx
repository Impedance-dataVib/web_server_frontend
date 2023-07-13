import React, { useEffect, useMemo, useState } from "react";
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
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { selectOption, selectReportType } from "./schema";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DownloadInfoApi from "./api";
import { enqueueSnackbar } from "notistack";
import DatePickerModal from "../trends/modals/DatePickerModal";
import api from "../../app/api";
import dateFormat from "../../app/utils/dateFormat";
import { convertUTCDateToLocalTime, convertDate } from "src/app/utils/helper";
import TreeView, { flattenTree } from "react-accessible-treeview";
import { FaList, FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import { AiFillFile } from "react-icons/ai";
import DownloadPngModal from "../configuration/modals/downloadPngModal";

const DownloadPage = () => {
  const initial = "";
  const [dataSelection, setDataSelection] = useState(initial);
  const [asset, setAsset] = useState(initial);
  const [reportType, setReportType] = useState(initial);
  const [assetModule, setAssetModule] = useState([]);
  const [assetError, setAssetError] = useState(false);
  const [periodError, setPeriodError] = useState(false);
  const [reportTypeError, setReportTypeError] = useState(false);
  const [toggleDatePicker, setToggleDatePicker] = useState(false);
  const [dateRangeValues, setDateRangeValues] = useState<any>({
    startDate: null,
    endDate: null,
    key: "selection",
  });
  const [showData, setShowData] = useState([]);
  const [showPngGraphical, setShowPngGraphical] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [open, setOpen] = React.useState<any>(null);

  const datePickerText = useMemo(() => {
    const startDate = dateRangeValues?.startDate
      ? dateFormat(dateRangeValues?.startDate)
      : "Start Date";
    const endDate = dateRangeValues?.endDate
      ? dateFormat(dateRangeValues?.endDate)
      : "End Date";
    return `${startDate}-${endDate}`;
  }, [dateRangeValues]);
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
  const reportTypeHandler = (e: SelectChangeEvent) => {
    setReportType(e.target.value);
    setReportTypeError(false);
  };

  const downloadOptionHandler = (e: SelectChangeEvent) => {
    setDataSelection(e.target.value);
    setAsset(initial);
    setDateRangeValues({ startDate: "", endDate: "", key: "selection" });
    setReportType(initial);
    setAssetError(false);
    setPeriodError(false);
    setReportTypeError(false);
  };

  const cancelHandler = () => {
    setDataSelection(initial);
    setAsset(initial);
    setDateRangeValues({ startDate: "", endDate: "", key: "selection" });

    setReportType(initial);
  };

  const postDownloadHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (asset == "") {
      setAssetError(true);
      return;
    } else if (
      dateRangeValues.startDate === "" ||
      dateRangeValues.endDate === ""
    ) {
      setPeriodError(true);
      return;
    } else if (reportType == "" && dataSelection == "data") {
      setReportTypeError(true);
      return;
    }

    if (reportType === "graphical") {
      setIsLoading(true);
    }

    DownloadInfoApi.postDownloadInfo({
      type: dataSelection,
      module_id: asset,
      startDate: convertDate(dateRangeValues.startDate),
      endDate: convertDate(dateRangeValues.endDate),
      report_type: reportType,
    })
      .then((val) => {
        if (reportType === "graphical") {
          setShowPngGraphical(true);
          setData(val);
          setIsLoading(false);
        } else {
          setIsLoading(false);

          enqueueSnackbar({
            message: `Download request is posted, once ready you will get notified`,
            variant: "warning",
          });
          show();
        }
      })
      .catch((error) => {
        setIsLoading(false);

        console.error(error);
        enqueueSnackbar({
          message: error.Message,
          variant: "error",
        });
      });
  };
  //get all the data of table
  const show = () => {
    api
      .get("/download/get-all.php")
      .then((res: any) => {
        if (res.data && res.data.data && res.data.data.length > 0) {
          const result = res.data.data.map((val: any) => {
            return {
              ...val,
              filter_data: JSON.parse(val.filter_data),
            };
          });
          setShowData(result);
        }
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    show();
  }, []);
  //background color of status in the table
  const status = (data: any) => {
    if (data === "Completed") {
      return "green";
    } else if (data === "download-completed") {
      return "grey";
    } else if (data === "Pending") {
      return "orange";
    }
    return "#ff0000";
  };

  const deleteDownloadHistory = () => {
    api
      .delete("/download/delete.php")
      .then((res) => {
        enqueueSnackbar({
          message: "Download Queue is Cleared, You Can Request New ",
          variant: "warning",
        });
        show();
      })
      .catch((error) => {
        enqueueSnackbar({
          message: "Something Went Wrong",
          variant: "error",
        });
      });
  };

  const transformData = () => {
    const jsonDate = data?.data.data.historicalData.map((item: any) => {
      const parsedChildren = JSON.parse(item.children);
      return {
        name: item?.name,
        children: [...parsedChildren],
      };
    });
    const folder = {
      name: "",
      children: [...jsonDate],
    };
    return flattenTree(folder);
  };
  const FolderIcon = ({ isOpen }: any) =>
    isOpen ? (
      <FaRegFolderOpen color="e8a87c" className="icon" />
    ) : (
      <FaRegFolder color="e8a87c" className="icon" />
    );
  const handleOpenModal = (val: any) => {
    setOpen(val.metadata);
    // setJsonData(val.metadata);
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
                          key={`radio${val.label}`}
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
                        <MenuItem value={id} key={`assetModule_${id}`}>
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
                      {datePickerText}
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
                              key={`selectReportType_${val?.value}`}
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
                    startIcon={
                      reportType === "graphical" ? (
                        <VisibilityIcon />
                      ) : (
                        <FileDownloadOutlinedIcon />
                      )
                    }
                    sx={{ backgroundColor: "#1D4580", m: 1, my: 3 }}
                    type="submit"
                  >
                    {reportType === "graphical" ? "View" : "Download"}
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
      <Box>
        {isLoading && (
          <Box
            sx={{
              // mx: "20px",
              position: "absolute",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
            Loading....
          </Box>
        )}
        {showPngGraphical && (
          <Box
            sx={{ maxHeight: "450px", overflowY: "scroll", mb: "15px" }}
            className="directory"
          >
            <Typography
              my={"10px"}
              pl={"10px"}
              fontWeight={"500"}
              fontSize={"16px"}
            >
              Graphical Report
            </Typography>
            <Box sx={{ bgcolor: "white" }}>
              <TreeView
                data={transformData()}
                aria-label="directory tree"
                nodeRenderer={({
                  element,
                  isBranch,
                  isExpanded,
                  getNodeProps,
                  level,
                }) => (
                  <div
                    {...getNodeProps()}
                    style={{ paddingLeft: 20 * (level - 1) }}
                  >
                    {isBranch ? (
                      <div>
                        <FolderIcon isOpen={isExpanded} /> {element.name}
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          handleOpenModal(element);
                        }}
                      >
                        <AiFillFile
                          color="green"
                          size={"20px"}
                          style={{
                            marginRight: "10px",
                          }}
                        />
                        {element.name}
                      </div>
                    )}
                  </div>
                )}
              />
            </Box>
            <DownloadPngModal open={open} setOpen={setOpen} data={data} />
          </Box>
        )}
        <Accordion sx={{ bgcolor: "#EAEAEA" }}>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography fontSize={"16px"} fontWeight={"500"}>
              Download History
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Request ID</TableCell>
                    <TableCell align="center">Request Time</TableCell>
                    <TableCell align="center">Process Complete Time</TableCell>
                    <TableCell align="center"> Start Date</TableCell>
                    <TableCell align="center"> End Date</TableCell>
                    <TableCell align="center"> Report Type</TableCell>
                    <TableCell align="center"> Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {showData.map((row: any) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {row.id}
                      </TableCell>
                      <TableCell align="center">
                        {row.request_time
                          ? convertUTCDateToLocalTime(
                              new Date(row.request_time)
                            )
                          : ""}
                      </TableCell>
                      <TableCell align="center">
                        {row.process_complete_time
                          ? convertUTCDateToLocalTime(
                              new Date(row.process_complete_time)
                            )
                          : ""}
                      </TableCell>
                      <TableCell align="center">
                        {row.filter_data.startDate
                          ? convertUTCDateToLocalTime(
                              new Date(row.filter_data.startDate)
                            )
                          : ""}
                      </TableCell>
                      <TableCell align="center">
                        {row.filter_data.endDate
                          ? convertUTCDateToLocalTime(
                              new Date(row.filter_data.endDate)
                            )
                          : ""}
                      </TableCell>
                      <TableCell align="center">
                        {row.filter_data.type === "historicReports"
                          ? "Health Report(Pdf)"
                          : row.filter_data.report_type}
                      </TableCell>
                      <TableCell
                        sx={{ bgcolor: status(row.status), color: "white" }}
                        align="center"
                      >
                        {row.status === "Completed"
                          ? "Ready to Download"
                          : row.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                mt: "10px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Tooltip title="Only Pending and Completed status will be affected">
                <Button
                  sx={{ bgcolor: "warning.main" }}
                  onClick={deleteDownloadHistory}
                  variant="contained"
                >
                  Clear Download Queue
                </Button>
              </Tooltip>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};
export default DownloadPage;
