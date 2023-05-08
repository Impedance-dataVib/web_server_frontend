import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

export interface IAddConfigurationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

const AddConfigurationModal = ({
  open,
  onClose,
  onSubmit,
}: IAddConfigurationModalProps) => {
  const [configName, setConfigName] = useState<string>("");

  const onSubmitInternal = () => {
    if (onSubmit) {
      onSubmit(configName);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Configuration</DialogTitle>
      <DialogContent>
        <Box sx={{ minWidth: "500px" }}>
          <TextField
            autoFocus
            id="name"
            name="name"
            label="Configuration Name"
            type="text"
            variant="standard"
            fullWidth
            value={configName}
            onChange={(e) => setConfigName(e?.target?.value)}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="secondary" onClick={onClose} variant="contained">
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={onSubmitInternal}
          disabled={configName?.length > 0 ? false : true}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddConfigurationModal;
