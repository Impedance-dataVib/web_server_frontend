import {
  Cancel,
  CropFreeOutlined,
  Download,
  OpenInFull,
  Remove,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Paper,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import React, { useEffect, useState, useMemo } from "react";
import { convertDate, convertDateOnly, convertUTCDateToLocalTime } from "src/app/utils/helper";
import dateFormat from "src/app/utils/dateFormat";
import DateRangePickerModal from "src/features/trends/modals/DatePickerModal";
import { getDownloadStatusLog } from "src/app/services";
import { enqueueSnackbar } from "notistack";

export interface CardWidgetProps {
  headerLabel: string;
  showDate?: string;
  headerIcon?: React.ReactElement;
  content: React.ReactNode;
  subHeadingRight?: React.ReactNode;
  footerContent?: React.ReactNode;
  initiallyCollapsed?: boolean;
  setIsLatestReportOpen?: Function;
  setIsLiveStatusOpen?: Function;
  fullScreenContent?: React.ReactNode;
  headerContent?: React.ReactNode;
  section?: "top" | "middle" | "bottom";
  moduleId?: any;
  moduleType?: string;
  formData?:any;
}

const CardWidget = ({
  headerLabel,
  showDate,
  headerContent,
  headerIcon,
  content,
  subHeadingRight,
  footerContent,
  setIsLatestReportOpen,
  setIsLiveStatusOpen,
  initiallyCollapsed,
  fullScreenContent,
  section,
  moduleId,
  moduleType,
  formData,
}: CardWidgetProps) => {
  const [collapsed, setCollapsed] = useState(initiallyCollapsed || false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [isDownloading, setIsdownloading] = useState(false);
  const [openDownload, setOpenDownload] = useState<boolean>(false);
  const [toggleDatePicker, setToggleDatePicker] = useState(false);
  const [dateRangeValues, setDateRangeValues] = useState<any>({
    endDate: new Date(),
    startDate: new Date(),
    key: "downloadDateRange",
  });

  const isBelow1800Pixel = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(1800)
  );

  useEffect(() => {
    if (setIsLatestReportOpen) {
      setIsLatestReportOpen(!collapsed);
    }
    if (setIsLiveStatusOpen) {
      setIsLiveStatusOpen(!collapsed);
    }
  }, [collapsed]);

  const getSectionSx = useMemo(() => {
    const topSection =
      section === "top" && !collapsed
        ? {
            p: { md: 2, lg: "0px", xl: 2 },
            pt: headerContent ? 0 : 2,
            borderRadius: 3,
            boxShadow: "2px 4px 8px #00000029",
            transition: "all .2s linear",
            minHeight: { xl: "34vh", lg: "40vh", md: "40vh" },
            maxHeight: { xl: "34vh", lg: "40vh", md: "40vh" },
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "0.4em",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.2)",
              borderRadius: "0.2em",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(0,0,0,.3)",
            },
          }
        : {
            p: 2,
            pt: headerContent ? 0 : 2,
            borderRadius: 3,
            boxShadow: "2px 4px 8px #00000029",
            transition: "all .2s linear",
          };
    return section === "middle" && !collapsed
      ? {
          p: 2,
          pt: headerContent ? 0 : 2,
          borderRadius: 3,
          boxShadow: "2px 4px 8px #00000029",
          transition: "all .2s linear",
          minHeight: "30vh",
        }
      : topSection;
  }, [section, collapsed]);

  const calculatedButtonDate = useMemo(() => {
    if (dateRangeValues?.startDate && dateRangeValues?.endDate) {
      return `${dateFormat(dateRangeValues?.startDate)}-${dateFormat(
        dateRangeValues?.endDate
      )}`;
    }
    return "StartDate-EndDate";
  }, [dateRangeValues]);

  const downloadStatusLog = (dateRange: any) => {
    if(dateRange.startDate && dateRange.endDate) {
      const payload = {
        startDate: convertDate(dateRange.startDate),
        endDate: convertDate(dateRange.endDate),
        moduleId,
      }
      setIsdownloading(true);
      getDownloadStatusLog(payload).then((res) => {
        const parsedFormData = JSON.parse(formData);
        const fileName = `${parsedFormData?.asset_name} - ${parsedFormData?.equipment_name}-${convertDateOnly(dateRange.startDate)}-${convertDateOnly(dateRange.endDate)}`;
        setDateRangeValues( (val:any) => {
          return {
            ...val,
            endDate: new Date(),
            startDate: new Date(),
          }
        })
        const url = window.URL.createObjectURL(res.data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${fileName}.log`
        );
        document.body.appendChild(link);
        link.click();

        setOpenDownload(false);
        setIsdownloading(false);
      }).catch(error => {
        console.error(error);
        enqueueSnackbar({
          message:
            error?.response?.data?.Message ||
            error?.Message ||
            "Something went wrong!",
          variant: "error",
        });
      })
    }

  }
  return (
    <Paper sx={getSectionSx}>
      <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
        {!headerContent && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {headerIcon && (
                <Box
                  sx={{
                    mr: 1,
                    color: "#4d4e4e",
                    height: "20px",
                    width: "18px",
                  }}
                >
                  {headerIcon}
                </Box>
              )}

              <Typography
                variant="body1"
                component={"span"}
                noWrap
                title={headerLabel}
                sx={{
                  fontSize: "12px",
                  color: "#4d4e4e",
                  fontWeight: 600,
                  letterSpacing: "0.08px",
                  maxWidth: "350px",
                  cursor: "pointer",
                  // "&:hover": { overflow: 'visible',
                  // whiteSpace: 'normal' }
                }}
              >
                {headerLabel}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "9px",
                  mr: "20px",
                }}
              >
                {showDate ? ` Updated on ${convertUTCDateToLocalTime(showDate)}` : ""}
              </Typography>

              {isBelow1800Pixel && (
                <Box>
                  {subHeadingRight && (
                    <Box sx={{ mr: isBelow1800Pixel ? 0 : 1, ml: 1 }}>
                      {subHeadingRight}
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        )}
        {headerContent != undefined && headerContent}
        <Box
          component="section"
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            color: "#4D4E4E",
            // color: (theme) => theme.palette.color38.main,
          }}
        >
          {!isBelow1800Pixel && subHeadingRight && (
            <Box sx={{ mr: 1 }}>{subHeadingRight}</Box>
          )}

          {fullScreenContent && (
            <>
              {moduleType === "Torque" && (
                <Box component="section" sx={{ mr: "4px", cursor: "pointer" }}>
                  <Download
                    sx={{ fontSize: "16px" }}
                    onClick={() => setOpenDownload(true)}
                  />
                </Box>
              )}
              <Box component="section" sx={{ mr: "4px", cursor: "pointer" }}>
                <OpenInFull
                  sx={{ fontSize: "14px" }}
                  onClick={() => setOpenModal(true)}
                />
              </Box>
            </>
          )}

          <Box>
            {collapsed ? (
              <>
                <CropFreeOutlined
                  onClick={() => setCollapsed((prev) => !prev)}
                  sx={{ fontSize: "14px", cursor: "pointer" }}
                />
              </>
            ) : (
              <>
                <Remove
                  onClick={() => setCollapsed((prev) => !prev)}
                  sx={{ fontSize: "14px", cursor: "pointer" }}
                />
              </>
            )}
          </Box>
        </Box>
      </Box>
      {!collapsed && (
        <Box
          sx={{ transition: "all 0.3s ease-out", opacity: collapsed ? 0 : 1 }}
        >
          <Divider
            sx={{
              mt: headerContent ? 0 : 1,
              mb: 1,
              height: "0px",
              border: "1px solid #E8E8ED",
            }}
          />
          <Box>{content}</Box>
          {footerContent && (
            <Box>
              <Divider
                sx={{
                  mt: 1,
                  mb: 1,
                  height: "0px",
                  border: "1px solid #E8E8ED",
                }}
              />
              <Box>{footerContent}</Box>
            </Box>
          )}
        </Box>
      )}
      {openDownload && (
        <Dialog
          open={openDownload}
          onClose={() => setOpenDownload(false)}
          maxWidth={"xl"}
        >
          <DialogContent sx={{ minWidth: "40vw"}}>
          <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
              <Box component="section">
                <Box sx={{ display: "flex" }}>
                  <Typography
                    variant="body1"
                    component={"span"}
                    sx={{
                      fontSize: "20px",
                      color: "#4d4e4e",
                      fontWeight: 600,
                      letterSpacing: "0.08px",
                    }}
                  >
                    {'Download Logs'}
                  </Typography>
                </Box>
              </Box>

              <Box
                component="section"
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  color: "#4D4E4E",
                }}
              >
                <Box>
                  <>
                    <Cancel
                      onClick={() => setOpenModal(false)}
                      sx={{ fontSize: "16px", cursor: "pointer" }}
                    />
                  </>
                </Box>
              </Box>
            </Box>
            <Grid container spacing={2} sx={{mb: 2, mt: 2, alignItems: "center"}}>
              <Grid item lg={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setToggleDatePicker(true)}
                  sx={{
                    height: "3.32rem",
                    width: "100%",
                  }}
                  startIcon={<DateRangeIcon />}
                >
                  {calculatedButtonDate}
                </Button>
              </Grid>
              
    
            </Grid>
            <Grid container justifyContent={"flex-end"}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => downloadStatusLog(dateRangeValues)}
                  sx={{
                    height: "3.32rem",
                  }}
                  startIcon={<Download />}
                >
                  {"Download"}
                </Button>
              </Grid>
          </DialogContent>
        </Dialog>
      )}
      {openModal && fullScreenContent && (
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          maxWidth={"xl"}
        >
          <DialogContent sx={{ minWidth: "80vw" }}>
            <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
              <Box component="section">
                <Box sx={{ display: "flex" }}>
                  {headerIcon && (
                    <Box
                      sx={{
                        mr: 1,
                        color: "#4d4e4e",
                        height: "20px",
                        width: "18px",
                      }}
                    >
                      {headerIcon}
                    </Box>
                  )}

                  <Typography
                    variant="body1"
                    component={"span"}
                    sx={{
                      fontSize: "20px",
                      color: "#4d4e4e",
                      fontWeight: 600,
                      letterSpacing: "0.08px",
                    }}
                  >
                    {headerLabel}
                  </Typography>
                </Box>

                {isBelow1800Pixel && (
                  <Box>
                    {subHeadingRight && (
                      <Box sx={{ mr: isBelow1800Pixel ? 0 : 1, ml: 1 }}>
                        {subHeadingRight}
                      </Box>
                    )}
                  </Box>
                )}
              </Box>

              <Box
                component="section"
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  color: "#4D4E4E",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "12px",
                    mr: "20px",
                  }}
                >
                  {showDate ? ` Updated on ${showDate} (UTC)` : ""}
                </Typography>
                {!isBelow1800Pixel && subHeadingRight && (
                  <Box sx={{ mr: 1 }}>{subHeadingRight}</Box>
                )}
                <Box>
                  <>
                    <Cancel
                      onClick={() => setOpenModal(false)}
                      sx={{ fontSize: "16px", cursor: "pointer" }}
                    />
                  </>
                </Box>
              </Box>
            </Box>
            <Box>
              <Divider
                sx={{
                  mt: 1,
                  mb: 1,
                  height: "0px",
                  border: "1px solid #E8E8ED",
                }}
              />
              <Box>{fullScreenContent}</Box>
            </Box>
          </DialogContent>
        </Dialog>
      )}
      <DateRangePickerModal
        open={toggleDatePicker}
        onClose={() => setToggleDatePicker(false)}
        dateRangeValues={dateRangeValues}
        setDateRangeValues={setDateRangeValues}
      />
    </Paper>
  );
};
export default CardWidget;
