import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import Draggable from "react-draggable";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ConfirmDeleteNumber(props) {
  const {
    isOpenDeleteConfirm,
    onConfirmDeleteClose,
    onClickConfirmDeleteNumber,
    onSuccess,
    onError,
    id,
  } = props;

  const handleClick = (id) => {
    onClickConfirmDeleteNumber(id);
  };

  return (
    <Dialog
      open={isOpenDeleteConfirm}
      onClose={onConfirmDeleteClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Xác nhận
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Bạn có chắc chắc xóa con số này</DialogContentText>
        {onSuccess && (
          <Alert
            variant="filled"
            severity="success"
            style={{ marginTop: "1rem", justifyContent: "center" }}
          >
            Xóa con số thành công
          </Alert>
        )}
        {onError && (
          <Alert
            variant="filled"
            severity="error"
            style={{ marginTop: "1rem", justifyContent: "center" }}
          >
            Xóa con số không thành công
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={onConfirmDeleteClose}
          color="secondary"
          variant="contained"
        >
          Hủy
        </Button>
        <Button
          onClick={(e) => {
            handleClick(id);
          }}
          color="primary"
          variant="contained"
          type="button"
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}
