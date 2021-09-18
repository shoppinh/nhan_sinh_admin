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

const EditingNumberValueForm = (props) => {
  const classes = useStyles();
  const {
    isOpen,
    onCloseForm,
    idNumber,
    valuesNumber,
    onEditingNumberSubmit,
    onSuccess,
    onError,
  } = props;
  const [details, setDetails] = React.useState(valuesNumber.chars);
  const addDetailsItem = () => {
    const newDetails = [...details];
    newDetails.push("");
    setDetails(newDetails);
  };
  const removeDetailsItem = (index) => {
    const newDetails = details.filter((item, s_index) => index !== s_index);
    setDetails(newDetails);
  };
  const handleChangeDetail = (index) => (e) => {
    const newDetails = details.map((item, s_index) => {
      if (index !== s_index) return item;
      return e.target.value;
    });
    setDetails(newDetails);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onEditingNumberSubmit(idNumber, { ...valuesNumber, chars: details });
  };
  React.useEffect(() => {
    setDetails(valuesNumber.chars);
  }, [valuesNumber.chars]);
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
                Chỉnh sửa con số: <b>{valuesNumber.number}</b>
              </Typography>

              <form autoComplete="off" onSubmit={handleSubmit}>
                {details
                  ? details.map((item, index) => {
                      return (
                        <div>
                          <Grid container justifyContent="space-between">
                            <Grid item md={9}>
                              <TextField
                                className={classes.field}
                                label="Chi tiết con số"
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                value={item}
                                onChange={(e) => handleChangeDetail(index)(e)}
                                required={true}
                                inputProps={{ maxLength: 1 }}
                              />
                            </Grid>
                            <Grid
                              item
                              md={2}
                              style={{ width: "100%", marginTop: "2px" }}
                            >
                              <Button
                                color="secondary"
                                variant="contained"
                                onClick={() => removeDetailsItem(index)}
                              >
                                Xóa
                              </Button>
                            </Grid>
                          </Grid>
                        </div>
                      );
                    })
                  : ""}

                <div>
                  <Grid container>
                    {details?.length < 5 ? (
                      <Grid
                        item
                        container
                        md={12}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item md={7}>
                          <Button
                            style={{ float: "right" }}
                            color="primary"
                            variant="contained"
                            onClick={addDetailsItem}
                            style={{ marginRight: "20px" }}
                          >
                            Thêm chữ cái
                          </Button>
                        </Grid>
                      </Grid>
                    ) : (
                      ""
                    )}
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
                  Sửa con số thành công
                </Alert>
              )}
              {onError && (
                <Alert
                  variant="filled"
                  severity="error"
                  style={{ marginTop: "1rem", justifyContent: "center" }}
                >
                  Sửa con số thất bại
                </Alert>
              )}
            </Container>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default EditingNumberValueForm;
