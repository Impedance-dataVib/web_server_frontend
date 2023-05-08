import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export interface IConfigurationEmptyStateProps {
  handleAddConfigDialog: () => void;
}

const ConfigurationEmptyState = ({
  handleAddConfigDialog,
}: IConfigurationEmptyStateProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
      <Box>
        <Typography>
          Looks like you haven't added any configuration yet
        </Typography>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button
            onClick={handleAddConfigDialog}
            variant="contained"
            startIcon={<AddIcon></AddIcon>}
          >
            Add Configuration
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default ConfigurationEmptyState;
