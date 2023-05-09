import {
    ArticleOutlined,
  DescriptionOutlined,
  DownloadOutlined,
  List,
  RemoveRedEyeOutlined,
  TextSnippetOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import CardWidget from "../../../app/components/card";

export interface IReportsCardProps {}

export interface IReportsRowProps {
  icon: React.ReactNode;
  reportName: string;
  viewUrl?: string;
  downloadUrl?: string;
}

const ReportsRow = ({
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
                variant="h6"
                sx={{
                  fontSize: "16px",
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
            <IconButton disabled={!viewUrl}>
              <RemoveRedEyeOutlined sx={{ color: "#1A5DDD" }} />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box>
            <IconButton disabled={!downloadUrl}>
              <DownloadOutlined sx={{ color: "#1A5DDD" }}/>
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const ReportsCardContent = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <ReportsRow icon={<TrendingUpOutlined />} reportName="Graphical Report" />
        </Grid>
        <Grid xs={12} item>
          <ReportsRow icon={<List />} reportName="Spreadsheet Report" />
        </Grid>
        <Grid xs={12} item>
          <ReportsRow icon={<TextSnippetOutlined />} reportName="Raw Data" />
        </Grid>
        <Grid xs={12} item>
          <ReportsRow icon={<ArticleOutlined />} reportName="JSON Text Report" />
        </Grid>
      </Grid>
    </Box>
  );
};

const ReportsCard = ({}: IReportsCardProps) => {
  return (
    <Box>
      <CardWidget
        headerLabel="Latest Reports"
        headerIcon={<DescriptionOutlined />}
        content={<ReportsCardContent />}
        initiallyCollapsed={true}
      />
    </Box>
  );
};
export default ReportsCard;
