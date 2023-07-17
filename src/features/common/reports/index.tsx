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
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { convertUTCDateToLocalTime } from "src/app/utils/helper";
import api from "../../../app/api";
import { enqueueSnackbar } from "notistack";

export interface IReportsCardProps {
  liveStatus: any;
  processName: any;
  formData: any;
  moduleId: any;
  setData: any;
  setDocuments:any;
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
  setData?: any;
  setDocuments?: any;
}

const ReportsRow = ({
  moduleId,
  disabled,
  icon,
  reportName,
  processName,
  formData,
  setData,
  setDocuments
}: IReportsRowProps) => {
  const [responseData, setResponseData] = useState([]);
  const ref = useRef<HTMLDivElement>(null);
  const parsedFormData = JSON.parse(formData);

  const getPngData = (data: any) => {

    const array: any[] = [];
    let i = 0;
    for (let item of data?.data.data.historicalData) {
      array.push(item);
    }

    if (array.length > 10) {
      enqueueSnackbar({
        message: "Export Limit Exceed, Please Select Maximum 10",
        variant: "error",
      });
      return;
    }
    setDocuments(array);
  };

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
          responseType: type === "graphical" ? "json" : "blob",
        }
      )
      .then((res) => {
        if (type === "graphical") {
          setData(res);
          getPngData(res);
        } else {
          const url = window.URL.createObjectURL(res.data);
          const link = document.createElement("a");
          link.href = url;
          if (type === "json") {
            link.setAttribute("download", `${fileName}.json`);
            document.body.appendChild(link);
            link.click();
          }
          if (type === "raw") {
            link.setAttribute("download", `${fileName}.wav`);
            document.body.appendChild(link);
            link.click();
          }
          if (type === "spredsheet") {
            link.setAttribute("download", `${fileName}.csv`);
            document.body.appendChild(link);
            link.click();
          }
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
    </Box>
  );
};

const ReportsCardContent = ({
  liveStatus,
  processName,
  formData,
  moduleId,
  setData,
  setDocuments
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
            setData={setData}
            setDocuments={setDocuments}
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
  setData,
  setDocuments
}: IReportsCardProps) => {
  return (
    <Box>
      <ReportsCardContent
        liveStatus={liveStatus}
        processName={processName}
        formData={formData}
        moduleId={moduleId}
        setData={setData}
        setDocuments={setDocuments}
      />
    </Box>
  );
};
export default ReportsCard;
