import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ContentBox from "@app/components/content-box";
import ConfigurationTable from "./configurationTable";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import axiosInstance from "@app/api";
const ConfigurationPageContent = () => {
  return (
    <Box sx={{ marginLeft: "41px", paddingTop: "41px", width: "50%" }}>
      <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
        Manage Configuration
      </Typography>
      <Box sx={{ marginTop: "21px", paddingBottom: "41px" }}>
        <ConfigurationTable />
      </Box>
      <Stack
        spacing={1}
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: "10px",
        }}
      >
        <Button variant="contained" startIcon={<AddIcon></AddIcon>}>
          Add Configuration
        </Button>
      </Stack>
    </Box>
  );
};
const ManageConfigurationPage = () => {
  return (
    <ContentBox title={"Configuration"}>
      <ConfigurationPageContent></ConfigurationPageContent>
    </ContentBox>
  );
};

export default ManageConfigurationPage;
