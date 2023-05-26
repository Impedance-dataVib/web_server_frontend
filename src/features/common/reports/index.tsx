import {
    ArticleOutlined,
  DescriptionOutlined,
  DownloadOutlined,
  List,
  RemoveRedEyeOutlined,
  TextSnippetOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { Box, Divider, Grid, IconButton, Link as Matlink, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export interface IReportsCardProps {
  liveStatus: any
}

export interface IReportsRowProps {
  disabled: boolean;
  icon: React.ReactNode;
  reportName: string;
  viewUrl?: string;
  downloadUrl?: string;
}

const ReportsRow = ({
  disabled,
  icon,
  reportName,
  viewUrl,
  downloadUrl,
}: IReportsRowProps) => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={2}>
          <Box sx={{ textAlign: 'center'}}>{icon}</Box>
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
        <Grid item xs={2}>
          <Box>
            <IconButton disabled={disabled || !viewUrl}>
              <RemoveRedEyeOutlined sx={{ color: (disabled || !viewUrl) ? "lightgrey" : "#1A5DDD" }} />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box>
            <IconButton disabled={disabled || !downloadUrl}>
              <DownloadOutlined sx={{ color:  (disabled || !downloadUrl) ? "lightgrey" : "#1A5DDD" }}/>
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const ReportsCardContent = ({liveStatus}: IReportsCardProps) => {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid xs={12} item>
          <ReportsRow disabled={liveStatus?.currentStep === "2" || liveStatus?.currentStep === "4"} icon={<TrendingUpOutlined />} reportName="Graphical Report" />
          <Divider sx={{ mx: 0 }} />
        </Grid>
        <Grid xs={12} item>
          <ReportsRow disabled={liveStatus?.currentStep === "2" || liveStatus?.currentStep === "4"} icon={<List />} reportName="Spreadsheet Report" />
          <Divider sx={{ mx: 0 }} />
        </Grid>
        <Grid xs={12} item>
          <ReportsRow disabled={liveStatus?.currentStep === "2" || liveStatus?.currentStep === "4"} icon={<TextSnippetOutlined />} reportName="Raw Data" />
          <Divider sx={{ mx: 0 }} />
        </Grid>
        <Grid xs={12} item>
          <ReportsRow disabled={liveStatus?.currentStep === "2" || liveStatus?.currentStep === "4"} icon={<ArticleOutlined />} reportName="JSON Text Report" />
          <Divider sx={{ mx: 0 }} />
        </Grid>
      </Grid>
      <Matlink
        component={Link}
        variant="body1"
        color="#002BBC"
        to="/download"
        sx={{ marginTop: '5px', display: 'flex', justifyContent: 'flex-end' }}
      >
        Download Historic Report
      </Matlink>
    </Box>
  );
};

const ReportsCard = ({liveStatus}: IReportsCardProps) => {
  return (
    <Box>
      <ReportsCardContent liveStatus={liveStatus}/>
    </Box>
  );
};
export default ReportsCard;
