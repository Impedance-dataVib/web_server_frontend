import {
  ArticleOutlined,
  DownloadOutlined,
  List,
  TextSnippetOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Link as Matlink,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { convertUTCDateToLocalTime } from "src/app/utils/helper";
import api from "../../../app/api";
import { toPng } from "html-to-image";
import DownloadPngModal from "src/features/configuration/modals/downloadPngModal";

export interface IReportsCardProps {
  liveStatus: any;
  processName: any;
  formData: any;
  moduleId: any;
}

export interface IReportsRowProps {
  disabled: boolean;
  icon: React.ReactNode;
  reportName: string;
  viewUrl?: string;
  downloadUrl?: string;
  processName: any;
  formData: any;
  moduleId: any;
}

const ReportsRow = ({
  moduleId,
  disabled,
  icon,
  reportName,
  processName,
  formData,
}: IReportsRowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const parsedFormData = JSON.parse(formData);
  const handleDownload = (reportName: any) => {
    const fileName = `${parsedFormData?.asset_name} - ${
      parsedFormData?.equipment_name
    } -${convertUTCDateToLocalTime(new Date())}`;
    let type: string = "";
    if (reportName === "Graphical Report") {
      type = "graphical";
    } else if (reportName === "Spreadsheet Report") {
      type = "spredsheet";
    } else if (reportName === "Raw Data") {
      type = "raw";
    } else if (reportName === "JSON Text Report") {
      type = "json";
    }
    api
      .get(
        `/download/current_download.php?process_name=${processName}&type=${type}&module_id=${moduleId}`,
        {
          responseType: "blob",
        }
      )
      .then((res) => {
        console.log("res in graphicalReport", res);
        const url = window.URL.createObjectURL(res.data);
        const link = document.createElement("a");
        link.href = url;
        if (type === "json") {
          link.setAttribute("download", `${fileName}.json`);
          document.body.appendChild(link);
          link.click();
        } else if (type === "raw") {
          link.setAttribute("download", `${fileName}.wav`);
          document.body.appendChild(link);
          link.click();
        } else if (type === "spredsheet") {
          link.setAttribute("download", `${fileName}.csv`);
          document.body.appendChild(link);
          link.click();
        } else if (type === "graphical") {
          link.setAttribute("download", `${fileName}.png`);
          if (ref.current === null) {
            return;
          }
          toPng(ref.current, { quality: 0.5 })
            .then((dataUrl: string) => {
              link.href = dataUrl;

              document.body.appendChild(link);
              link.click();
            })
            .catch((err: any) => {
              console.error(err);
            });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={2}>
          <Box sx={{ textAlign: "center" }}>{icon}</Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            {reportName && (
              <Typography
                variant="subtitle1"
                component={"span"}
                sx={{
                  letterSpacing: "0px",
                  color: "#5A607F",
                }}
              >
                {reportName}
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <IconButton disabled={disabled}>
              <DownloadOutlined
                onClick={() => handleDownload(reportName)}
                sx={{
                  color: disabled ? "lightgrey" : "#1A5DDD",
                }}
              />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <div style={{ opacity: 0, height: 0, overflow: "hidden" }}>
        <div ref={ref}>
          <div style={{ minWidth: "1200px" }}>
            {/* <DownloadPngModal open={offer} data={data} /> */}
          </div>
        </div>
      </div>
    </Box>
  );
};

const ReportsCardContent = ({
  liveStatus,
  processName,
  formData,
  moduleId,
}: IReportsCardProps) => {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid xs={12} item>
          <ReportsRow
            disabled={
              liveStatus?.currentStep === "2" || liveStatus?.currentStep === "3"
            }
            icon={<TrendingUpOutlined />}
            reportName="Graphical Report"
            processName={processName}
            formData={formData}
            moduleId={moduleId}
          />
          <Divider sx={{ mx: 0 }} />
        </Grid>
        <Grid xs={32} item>
          <ReportsRow
            disabled={
              liveStatus?.currentStep === "2" || liveStatus?.currentStep === "3"
            }
            icon={<List />}
            reportName="Spreadsheet Report"
            processName={processName}
            formData={formData}
            moduleId={moduleId}
          />
          <Divider sx={{ mx: 0 }} />
        </Grid>
        <Grid xs={32} item>
          <ReportsRow
            disabled={
              liveStatus?.currentStep === "2" || liveStatus?.currentStep === "3"
            }
            icon={<TextSnippetOutlined />}
            reportName="Raw Data"
            processName={processName}
            formData={formData}
            moduleId={moduleId}
          />
          <Divider sx={{ mx: 0 }} />
        </Grid>
        <Grid xs={12} item>
          <ReportsRow
            disabled={
              liveStatus?.currentStep === "2" || liveStatus?.currentStep === "1"
            }
            icon={<ArticleOutlined />}
            reportName="JSON Text Report"
            processName={processName}
            formData={formData}
            moduleId={moduleId}
          />
          <Divider sx={{ mx: 0 }} />
        </Grid>
      </Grid>
      <Matlink
        component={Link}
        variant="body1"
        color="#002BBC"
        to="/download"
        sx={{ marginTop: "5px", display: "flex", justifyContent: "flex-end" }}
      >
        Download Historic Report
      </Matlink>
    </Box>
  );
};

const ReportsCard = ({
  liveStatus,
  processName,
  formData,
  moduleId,
}: IReportsCardProps) => {
  return (
    <Box>
      <ReportsCardContent
        liveStatus={liveStatus}
        processName={processName}
        formData={formData}
        moduleId={moduleId}
      />
    </Box>
  );
};
export default ReportsCard;
