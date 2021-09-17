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

const AddingServiceForm = (props) => {
  const classes = useStyles();
  const {
    isAddingServiceOpen,
    onCloseForm,
    valuesService,
    onValuesServiceChange,
    onAddingServiceSubmit,
    onSuccess,
    onError,
  } = props;
  const [details, setDetails] = React.useState(valuesService.details);
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddingServiceSubmit({ ...valuesService, details });
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

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isAddingServiceOpen}
        onClose={onCloseForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isAddingServiceOpen}>
          <div className={classes.paper}>
            <Container size="sm">
              <Typography variant="h5" style={{ marginBottom: "1rem" }}>
                Thêm mới dịch vụ
              </Typography>

              <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  className={classes.field}
                  label="Tên dịch vụ"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  type="text"
                  onChange={onValuesServiceChange}
                  required={true}
                  name="title"
                />
                <TextField
                  className={classes.field}
                  label="Giá"
                  placeholder="VNĐ"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  type="number"
                  onChange={onValuesServiceChange}
                  required={true}
                  name="price"
                />
                <TextField
                  className={classes.field}
                  label="Số lượt tra cứu VIP"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  type="number"
                  onChange={onValuesServiceChange}
                  required={true}
                  name="quantity"
                />
                {details
                  ? details.map((item, index) => {
                      return (
                        <div>
                          <Grid container justifyContent="space-between">
                            <Grid item md={9}>
                              <TextField
                                className={classes.field}
                                label="Chi tiết dịch vụ"
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                value={item}
                                onChange={(e) => handleChangeDetail(index)(e)}
                                required={true}
                                name="quantity"
                              />
                            </Grid>
                            <Grid
                              item
                              md={2}
                              style={{ width: "100%", marginTop: "5px" }}
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
                    {details.length < 5 ? (
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
                            Thêm mô tả
                          </Button>
                        </Grid>
                      </Grid>
                    ) : (
                      ""
                    )}
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
                  Thêm mới dịch vụ thành công
                </Alert>
              )}
              {onError && (
                <Alert
                  variant="filled"
                  severity="error"
                  style={{ marginTop: "1rem", justifyContent: "center" }}
                >
                  Thêm mới dịch vụ thất bại
                </Alert>
              )}
            </Container>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default AddingServiceForm;
