import {
  Button,
  Container,
  Fade,
  Modal,
  TextField,
  Grid,
  Typography,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  field: {
    marginBottom: "1rem",
  },
}));

const EditingPaymentForm = (props) => {
  const classes = useStyles();
  const {
    isOpen,
    onCloseForm,
    idPayment,
    valuesPayment,
    onEditingPaymentSubmit,
    onValuesPaymentChange,
    onSuccess,
    onError,
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditingPaymentSubmit(idPayment, valuesPayment);
  };

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={onCloseForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <Container size="sm">
              <Typography variant="h5" style={{ marginBottom: "1rem" }}>
                Chỉnh sửa con số: <b>{valuesPayment.title}</b>
              </Typography>

              <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  className={classes.field}
                  label="Ngân hàng"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  type="text"
                  onChange={onValuesPaymentChange}
                  required={true}
                  name="bank"
                  value={valuesPayment.bank}
                />
                <TextField
                  className={classes.field}
                  label="Số tài khoản"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  type="number"
                  multiline={2}
                  onChange={onValuesPaymentChange}
                  required={true}
                  name="number"
                  value={valuesPayment.number}
                />
                <TextField
                  className={classes.field}
                  label="Chủ tài khoản"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  type="text"
                  multiline={2}
                  onChange={onValuesPaymentChange}
                  required={true}
                  name="name"
                  value={valuesPayment.name}
                />
                <div>
                  <Grid container>
                    <Grid item container md={12}>
                      <Grid item md={5} sm={5} xs={5}>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={onCloseForm}
                        >
                          Hủy bỏ
                        </Button>
                      </Grid>
                      <Grid item md={5} sm={5} xs={5}>
                        <Button
                          style={{ float: "right" }}
                          type="submit"
                          color="primary"
                          variant="contained"
                        >
                          Xác nhận
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </form>
              {onSuccess && (
                <Alert
                  variant="filled"
                  severity="success"
                  style={{ marginTop: "1rem", justifyContent: "center" }}
                >
                  Sửa thông tin thanh toán thành công
                </Alert>
              )}
              {onError && (
                <Alert
                  variant="filled"
                  severity="error"
                  style={{ marginTop: "1rem", justifyContent: "center" }}
                >
                  Sửa thông tin thanh toán thất bại
                </Alert>
              )}
            </Container>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default EditingPaymentForm;
