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
    width: "60vw",
  },
  field: {
    marginBottom: "1rem",
  },
}));

const EditingBenefitForm = (props) => {
  const classes = useStyles();
  const {
    isOpen,
    onCloseForm,
    idBenefit,
    valuesBenefit,
    onEditingBenefitSubmit,
    onValuesBenefitChange,
    onSuccess,
    onError,
  } = props;
  const [details, setDetails] = React.useState(valuesBenefit.details);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditingBenefitSubmit(idBenefit, { ...valuesBenefit, details });
  };
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
  React.useEffect(() => {
    setDetails(valuesBenefit.details);
  }, [valuesBenefit.details]);
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
            <Container maxWidth="md">
              <Typography variant="h5" style={{ marginBottom: "1rem" }}>
                Chỉnh sửa lợi ich: <b>{valuesBenefit.title}</b>
              </Typography>

              <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  className={classes.field}
                  label="Tiêu đề của lợi ích"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  type="text"
                  defaultValue={"value"}
                  value={valuesBenefit.title}
                  onChange={onValuesBenefitChange}
                  required={true}
                  name="title"
                />

                {details
                  ? details.map((item, index) => {
                      return (
                        <div>
                          <Grid container justifyContent="space-between">
                            <Grid item md={9} sm={9} xs={9}>
                              <TextField
                                className={classes.field}
                                label="Chi tiết lợi ich"
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                value={item}
                                onChange={(e) => handleChangeDetail(index)(e)}
                                required={true}
                                name="details"
                                multiline={2}
                              />
                            </Grid>
                            <Grid
                              item
                              md={2}
                              xs={2}
                              sm={2}
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
                        <Grid item md={5}>
                          <Button
                            style={{ float: "right" }}
                            color="primary"
                            variant="contained"
                            onClick={addDetailsItem}
                            style={{ marginRight: "20px" }}
                          >
                            Thêm lợi ích
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
                  Sửa lợi ich thành công
                </Alert>
              )}
              {onError && (
                <Alert
                  variant="filled"
                  severity="error"
                  style={{ marginTop: "1rem", justifyContent: "center" }}
                >
                  Sửa lợi ich thất bại
                </Alert>
              )}
            </Container>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default EditingBenefitForm;
