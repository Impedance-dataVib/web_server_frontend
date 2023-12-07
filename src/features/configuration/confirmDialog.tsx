import { Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";

export default function ConfirmDialogueBox({open, handleCancel, handleOk}: any) {
    return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogContent>
        <Typography variant="subtitle1" >
            Do you want discard the changes?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
    )
}