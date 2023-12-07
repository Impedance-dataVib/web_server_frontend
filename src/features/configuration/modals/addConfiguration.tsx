import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

export interface IAddConfigurationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: IAddConfigurationState | undefined) => void;
}

interface IAddConfigurationState {
  name: string;
  sampling_rate: string;
  customerName: string;
}

const AddConfigurationModal = ({
  open,
  onClose,
  onSubmit,
}: IAddConfigurationModalProps) => {
  const [configName, setConfigName] = useState<
    IAddConfigurationState | undefined
  >();

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
            value={configName?.name}
            sx={{
              marginBottom: "10px",
            }}
            onChange={(e) =>
              setConfigName((prev: any) => {
                return { ...prev, [e.target.name]: e?.target?.value };
              })
            }
          />
          <TextField
            id="customerName"
            name="customerName"
            label="Client Name"
            type="text"
            variant="standard"
            fullWidth
            value={configName?.customerName}
            sx={{
              marginBottom: "10px",
            }}
            onChange={(e) =>
              setConfigName((prev: any) => {
                return { ...prev, [e.target.name]: e?.target?.value };
              })
            }
          />
          <FormControl fullWidth>
            <InputLabel id={`sampling_rate-label`}>Sampling Rate</InputLabel>
            <Select
              fullWidth
              labelId={`sampling_rate-label`}
              name={"sampling_rate"}
              variant="standard"
              onChange={(e) =>
                setConfigName((prev: any) => {
                  return { ...prev, [e.target.name]: e?.target?.value };
                })
              }
              value={configName?.sampling_rate}
              label={"Sampling Rate"}
            >
              {["64K", "128K", "256K"].map((option: string) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="secondary" onClick={onClose} variant="contained">
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          // onClick={onSubmitInternal}
          disabled={
            configName &&
            configName?.name?.length > 0 &&
            configName?.customerName?.length > 0 &&
            configName?.sampling_rate?.length > 0
              ? false
              : true
          }
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddConfigurationModal;
