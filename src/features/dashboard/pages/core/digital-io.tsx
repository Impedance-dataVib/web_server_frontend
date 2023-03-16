import React, { useContext } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import DashboardContext from "../../context";
import OnOffIndicator from "../../../../app/components/onoffindicator";


const CoreDigitalIO = () => {
  const { digitalIOData } = useContext(DashboardContext);

  return (
    <Paper sx={{ p: 2 }}>
      <Box>
        <Typography variant="caption">Digital IO</Typography>
      </Box>
      {digitalIOData &&
        digitalIOData?.inputs !== undefined &&
        Array.isArray(digitalIOData?.inputs) &&
        digitalIOData?.inputs?.length > 0 && (
          <Box>            
            <Box sx={{ borderBottom: "1px solid lightgrey" }}>
              <Typography variant="caption">Input</Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Grid container spacing={1}>
                {digitalIOData?.inputs?.map((item: any, index: number) => (
                  <Grid item xs={6}>
                    <OnOffIndicator label={`${index + 1}`} value={item} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        )}

      {digitalIOData &&
        digitalIOData?.outputs !== undefined &&
        Array.isArray(digitalIOData?.outputs) &&
        digitalIOData?.outputs?.length > 0 && (
          <Box>
            <Box sx={{ borderBottom: "1px solid lightgrey" }}>
              <Typography variant="caption">Output</Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Grid container spacing={1}>
                {digitalIOData?.outputs?.map((item: any, index: number) => (
                  <Grid item xs={6}>
                    <OnOffIndicator label={`${index + 1}`} value={item} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        )}
    </Paper>
  );
};
export default CoreDigitalIO;
