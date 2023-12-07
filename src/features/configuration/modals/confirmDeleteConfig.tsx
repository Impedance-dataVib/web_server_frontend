import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export interface IConfirmDeleteConfigurationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedRow: any;
}

const ConfirmDeleteConfigurationModal = ({
  open,
  onClose,
  onConfirm,
  selectedRow,
}: IConfirmDeleteConfigurationModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Configuration</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this configuration?
        </Typography>
        <Typography sx={{ mt: 1 }} variant="body2">
          Name : {selectedRow?.name}, Id: {selectedRow?.id}, Status:{" "}
          {selectedRow?.status}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="contained"
        // onClick={onConfirm}
        >
          Yes
        </Button>
        <Button color="primary" variant="contained" onClick={onClose}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDeleteConfigurationModal;
