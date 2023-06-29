import {
  Api,
  ArticleOutlined,
  DescriptionOutlined,
  DownloadOutlined,
  List,
  RemoveRedEyeOutlined,
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
import React from "react";
import { Link } from "react-router-dom";
import api from "../../../app/api";

export interface IReportsCardProps {
  liveStatus: any;
  processName: any;
}

export interface IReportsRowProps {
  disabled: boolean;
  icon: React.ReactNode;
  reportName: string;
  viewUrl?: string;
  downloadUrl?: string;
  processName: any;
}

const ReportsRow = ({
  disabled,
  icon,
  reportName,
  viewUrl,
  downloadUrl,
  processName,
}: IReportsRowProps) => {
  const handleDownload = (reportName: any) => {
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
        `/download/current_download.php?process_name=${processName}&type=${type}`,
        {
          responseType: "blob",
        }
      )
      .then((res) => {
        const url = window.URL.createObjectURL(res.data);
        const link = document.createElement("a");
        link.href = url;
        if (type === "json") {
          link.setAttribute("download", "data.json");
        } else if (type === "raw") {
          link.setAttribute("download", "raw-data.wav");
        } else if (type === "spredsheet") {
          link.setAttribute("download", "spreadsheet.excel");
        } else if (type === "graphical") {
          link.setAttribute("download", "graphical-report.pdf");
        }
        document.body.appendChild(link);
        link.click();
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
    </Box>
  );
};

const ReportsCardContent = ({ liveStatus, processName }: IReportsCardProps) => {
  console.log('liveStatus?.currentStep', liveStatus?.currentStep);
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

const ReportsCard = ({ liveStatus, processName }: IReportsCardProps) => {
  return (
    <Box>
      <ReportsCardContent liveStatus={liveStatus} processName={processName} />
    </Box>
  );
};
export default ReportsCard;
