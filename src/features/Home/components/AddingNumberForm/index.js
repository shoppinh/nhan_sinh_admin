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
import React from "react";
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
const AddingNumberForm = (props) => {
  const classes = useStyles();
  const {
    isAddingNumberOpen,
    onCloseForm,
    valuesNumber,
    onValuesNumberChange,
    onAddingNumberSubmit,
    onSuccess,
    onError,
  } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddingNumberSubmit(valuesNumber);
  };
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isAddingNumberOpen}
        onClose={onCloseForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isAddingNumberOpen}>
          <div className={classes.paper}>
            <Container size="sm">
              <Typography variant="h5" style={{ marginBottom: "1rem" }}>
                Thêm mới con số
              </Typography>

              <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  className={classes.field}
                  label="Con số"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  type="number"
                  onChange={onValuesNumberChange}
                  required={true}
                  name="number"
                />
                <TextField
                  className={classes.field}
                  label="Ý nghĩa"
                  placeholder="VNĐ"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  type="text"
                  onChange={onValuesNumberChange}
                  required={true}
                  name="meaning"
                />

                <div>
                  <Grid container>
                    <Grid item container md={12}>
                      <Grid item md={5}>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={onCloseForm}
                        >
                          Hủy bỏ
                        </Button>
                      </Grid>
                      <Grid item md={5}>
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
                  Thêm mới con số thành công
                </Alert>
              )}
              {onError && (
                <Alert
                  variant="filled"
                  severity="error"
                  style={{ marginTop: "1rem", justifyContent: "center" }}
                >
                  Thêm mới con số thất bại
                </Alert>
              )}
            </Container>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default AddingNumberForm;
