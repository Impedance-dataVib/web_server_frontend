import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";

export interface IAddModuleModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const MODULES = ["Engine", "Motor", "Turbine", "Torque", "Bearing"];

const AddModuleModal = ({ open, onClose, onSubmit }: IAddModuleModalProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [moduleType, setModuleType] = useState<string>("None");

  const onSubmitInternal = () => {
    if (onSubmit) {
      onSubmit({ name, description, module_type: moduleType });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Module</DialogTitle>
      <DialogContent>
        <Box sx={{ minWidth: "500px" }}>
          <TextField
            autoFocus
            id="name"
            name="name"
            label="Name"
            type="text"
            variant="standard"
            fullWidth
            value={name}
            onChange={(e) => setName(e?.target?.value)}
          ></TextField>
        </Box>
        <Box sx={{ mt: 1 }}>
          <TextField
            id="description"
            name="description"
            label="Description"
            type="text"
            variant="standard"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e?.target?.value)}
          ></TextField>
        </Box>
        <Box sx={{ mt: 1 }}>
          <TextField
            select
            id="module_type"
            name="module_type"
            label="Module Type"
            type="text"
            variant="standard"
            fullWidth
            value={moduleType}
            onChange={(e) => setModuleType(e?.target?.value)}
          >
            <MenuItem value={"None"}>{"None"}</MenuItem>
            {MODULES.map((module: string) => (
              <MenuItem key={module} value={module}>
                {module}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="secondary" variant="contained" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={moduleType === "None" ? true : false}
          onClick={onSubmitInternal}
          variant="contained"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddModuleModal;
