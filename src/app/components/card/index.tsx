import { Fullscreen, Maximize, Minimize, OpenInFull, Remove, Search } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";

export interface CardWidgetProps {
  headerLabel: string;
  headerIcon?: React.ReactElement;
}

const CardWidget = ({ headerLabel, headerIcon }: CardWidgetProps) => {
  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      <Box component="div" sx={{display: 'flex'}}>
        <Box component="section" >
          <Box sx={{ display: 'flex'}}>
              { headerIcon && <Box sx={{mr: 1}}>{headerIcon}</Box>}
            
            <Typography  sx={{fontSize: '15px', fontWeight: 'bold', }}>{headerLabel}</Typography>
          </Box>
        </Box>
        <Box component="section" sx={{flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
            <Box component="section" sx={{ mr: '4px', cursor: 'pointer'}}>
                <Search sx={{ fontSize: '16px'}} />
            </Box>
            <Box component="section" sx={{ mr: '4px', cursor: 'pointer'}}>
                <OpenInFull sx={{ fontSize: '16px'}} />
            </Box>
            <Box >
                <Remove sx={{ fontSize: '16px', cursor: 'pointer'}} />
                {/* <Fullscreen /> */}
            </Box>
        </Box>
      </Box>

      <Box>Content</Box>

      <Box>Footer</Box>
    </Paper>
  );
};
export default CardWidget;
