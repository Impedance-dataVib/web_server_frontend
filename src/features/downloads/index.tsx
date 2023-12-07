import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  Modal,
  LinearProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FolderIcon from "@mui/icons-material/Folder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import {
  FaCaretRight,
  FaCheckSquare,
  FaList,
  FaMinusSquare,
  FaRegFolder,
  FaRegFolderOpen,
  FaSquare,
} from "react-icons/fa";
import { AiFillFile } from "react-icons/ai";
import DownloadPngModal from "../configuration/modals/downloadPngModal";
import { toBlob, toPng } from "html-to-image";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import JSZip from "jszip";
import cx from "classnames";
import { Folder, FolderOpen } from "@mui/icons-material";
import FullScreenLoader from "src/app/components/fullscreen-loader";

const DownloadPage = () => {
  const initial = "";
  const elementRef = useRef<(HTMLDivElement | null)[]>([]);
  const [documents, setDocuments] = useState<any>([]);
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
  const [selectedItem, setSelectedItem] = useState<any>(new Set());
  const [selectedIds, setSelectedIds] = useState([]);

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
    // setShowPngGraphical(e.target.value === "graphical" ? true : false);
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

  const downloadPngReport = useCallback(
    async (array: any, dataVal: any) => {
      if (elementRef.current === null) {
        setIsLoading(false);
        return;
      }

      let i = 0;
      const zip = new JSZip();

      await Promise.all(
        elementRef.current.map((val: any) => {
          if (val) {
            const data: any = toBlob(val, { quality: 0.1 });

            const fileData = array[i];
            let time = fileData.DateAndTime;
            time = time.replaceAll(" ", "_");
            time = time.replaceAll(":", "_");
            time = time.replace("/", "_");
            zip.file(time + ".png", data);

            i++;
          }
        })
      );
      zip
        .generateAsync({
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: {
            /* compression level ranges from 1 (best speed) to 9 (best compression) */
            level: 1,
          },
        })
        .then((zipData: any) => {
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(zipData);

          const moduleData = dataVal?.data.data.formData;
          const fileName =
            moduleData?.asset_name +
            " - " +
            moduleData?.equipment_name +
            ".zip";

          link.download = fileName;
          link.click();
          setDocuments([]);
          setIsLoading(false);
        })
        .catch((err: any) => {
          setIsLoading(false);
          console.error(err);
          setDocuments([]);
        });
    },
    [elementRef]
  );

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
        setSelectedItem(new Set());
        if (reportType === "graphical") {
          setShowPngGraphical(true);
          setData(val);
          setIsLoading(false);
          setSelectedIds([]);
          selectedItem.clear();
        } else {
          setIsLoading(false);
          setShowPngGraphical(false);
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
  useEffect(() => {
    console.log("selectedIds", selectedIds);
    console.log("selectedItem", selectedItem);
  }, [selectedIds, selectedItem]);
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

  const exportToZip = (dataVal: any) => {
    setIsLoading(true);

    const array: any[] = [];
    let i = 0;
    for (let item of data?.data.data.historicalData) {
      for (let child of JSON.parse(item.children)) {
        if (selectedItem.has(child.id)) {
          array.push(child.metadata);
        }
      }
    }
    if (array.length > 10) {
      setIsLoading(false);
      enqueueSnackbar({
        message: "Export Limit Exceed, Please Select Maximum 10",
        variant: "error",
      });
      return;
    }
    if (array.length > 0) {
      setDocuments(array);
      setIsLoading(true);
      setTimeout(function () {
        downloadPngReport(array, dataVal);
      }, 4000);
    } else {
      setIsLoading(false);
    }
  };

  const CheckBoxIcon = ({ variant, ...rest }: any) => {
    switch (variant) {
      case "all":
        return <FaCheckSquare {...rest} />;
      case "none":
        return <FaSquare {...rest} />;
      case "some":
        return <FaMinusSquare {...rest} />;
      default:
        return null;
    }
  };

  const getAndSetIds = () => {
    const element: any = document.querySelector("#txtIdsToSelect")!;

    if (element && element.value) {
      setSelectedIds(
        element.value
          .split(",")
          .filter((val: any) => !!val.trim())
          .map((x: any) => {
            if (isNaN(parseInt(x.trim()))) {
              return x;
            }
            return parseInt(x.trim());
          })
      );
    }
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
        {/* {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              bgcolor: "#D3D3D3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              opacity: 0.7,
              height: "100vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CircularProgress sx={{ color: "white" }} />
              <Typography color={"white"} px={2}>
                Loading....
              </Typography>
            </Box>
          </Box>
        )} */}
        {/* {isLoading && (
          <Box sx={{ my: 1, width: "100%" }}>
            <LinearProgress />
          </Box>
        )} */}
        {/* {isLoading && (
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D3D3D3",
            }}
          >
            <Box
              sx={{
                height: "20px",
                color: (theme) => theme.palette.color3.main,
                textAlign: "center",
              }}
            >
              <CircularProgress
                sx={{ color: (theme) => theme.palette.color3.main }}
              />
              <Typography>Loading</Typography>
            </Box>
          </Box>
        )} */}
        {showPngGraphical &&
          reportType === "graphical" &&
          (data?.data.data.historicalData.length > 0 ? (
            <Box className="directory">
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography my={"10px"} fontWeight={"500"} fontSize={"16px"}>
                    Graphical Report
                  </Typography>
                  <Button
                    sx={{ my: "10px" }}
                    onClick={() => exportToZip(data)}
                    variant="contained"
                    disabled={selectedItem.size === 0}
                  >
                    Export zip
                    <FileDownloadIcon sx={{ pl: 1 }} />
                  </Button>
                </Box>
              </Box>

              <Box
                sx={{
                  maxHeight: "450px",
                  overflowY: "scroll",
                  mb: "15px",
                  bgcolor: "white",
                }}
              >
                <TreeView
                  data={transformData()}
                  multiSelect
                  selectedIds={selectedIds}
                  propagateSelect
                  propagateSelectUpwards
                  togglableSelect
                  onSelect={(props) =>
                    setSelectedItem(props.treeState.selectedIds)
                  }
                  nodeRenderer={({
                    element,
                    isBranch,
                    isExpanded,
                    isSelected,
                    isHalfSelected,
                    isDisabled,
                    getNodeProps,
                    level,
                    handleSelect,
                    handleExpand,
                  }) => (
                    <div
                      {...getNodeProps({ onClick: handleExpand })}
                      style={{
                        marginLeft: 40 * (level - 1),
                        opacity: isDisabled ? 0.5 : 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {isBranch && isExpanded && (
                        <FaRegFolderOpen color="e8a87c" className="icon" />
                      )}
                      {isBranch && !isExpanded && (
                        <FaRegFolder color="e8a87c" className="icon" />
                      )}
                      {!isBranch && (
                        <CheckBoxIcon
                          // className="checkbox-icon"
                          onClick={(e: any) => {
                            handleSelect(e);
                            e.stopPropagation();
                          }}
                          variant={
                            isHalfSelected
                              ? "some"
                              : isSelected
                                ? "all"
                                : "none"
                          }
                        />
                      )}
                      <span style={{ marginLeft: "5px" }} className="name">
                        {element.name}
                      </span>
                    </div>
                  )}
                />
              </Box>
            </Box>
          ) : (
            <Typography fontSize={"16px"} sx={{ p: 2, color: "red" }}>
              Graphical Report Data Not Found
            </Typography>
          ))}

        <Accordion sx={{ bgcolor: "#EAEAEA" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
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
      <div style={{ opacity: 0, height: 0, overflow: "hidden" }}>
        {documents.map((offer: any, i: number) => (
          <div
            key={`div${i}`}
            ref={(ref) => {
              elementRef.current[i] = ref;
            }}
          >
            <div id={"png" + i} style={{ minWidth: "1200px" }}>
              <DownloadPngModal open={offer} data={data} />
            </div>
          </div>
        ))}
      </div>
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            bgcolor: "#D3D3D3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            opacity: 0.7,
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ color: "white" }} />
            <Typography color={"white"} px={2}>
              Loading....
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default DownloadPage;
