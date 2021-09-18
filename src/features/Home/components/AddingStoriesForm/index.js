import {
  Button,
  Container,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";

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
    maxWidth: 500,
  },
  field: {
    marginBottom: "1rem",
  },
  img: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100px",
    height: "100px",
    objectFit: "cover",
    marginBottom: "1rem",
    borderRadius: "12px",
    boxShadow: ".25rem .25rem 1rem rgba(0,0,0,.3)",
  },
  input: {
    position: "absolute",
    left: "0px",
    cursor: "pointer",
    opacity: 0,
    overFlow: "hidden",
  },
}));

const AddingStoriesForm = (props) => {
  const classes = useStyles();

  const {
    isAddingStoriesOpen,
    onCloseForm,
    valuesStories,
    onAddingStoriesSubmit,
    onValuesStoriesChange,
    onSuccess,
    onError,
  } = props;

  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var dataAdd = valuesStories;
    dataAdd.avatar = picture;
    onAddingStoriesSubmit(valuesStories);
  };

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isAddingStoriesOpen}
        onClose={onCloseForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isAddingStoriesOpen}>
          <div className={classes.paper}>
            <Container size="sm">
              <Typography variant="h5" style={{ marginBottom: "1rem" }}>
                Thêm câu chuyện
              </Typography>

              <form
                autoComplete="off"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ position: "relative", cursor: "pointer" }}
                  className={classes.field}
                >
                  Chọn avatar
                  <input
                    name="avatar"
                    id="profilePic"
                    type="file"
                    className={classes.input}
                    onChange={onChangePicture}
                    // onChange={onValuesStoriesChange}
                  />
                </Button>

                {imgData && (
                  <div className="previewProfilePic">
                    <img
                      className="playerProfilePic_home_tile"
                      src={imgData}
                      className={classes.img}
                    />
                  </div>
                )}

                <TextField
                  className={classes.field}
                  label="Tiêu đề "
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  type="text"
                  name="title"
                  onChange={onValuesStoriesChange}
                />

                <TextField
                  className={classes.field}
                  label="Họ và tên"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  name="name"
                  onChange={onValuesStoriesChange}
                />
                <TextField
                  className={classes.field}
                  label="Nghề nghiệp"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  name="career"
                  onChange={onValuesStoriesChange}
                />
                <TextField
                  className={classes.field}
                  label="Nội dung"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  multiline={2}
                  name="content"
                  onChange={onValuesStoriesChange}
                />

                <Button
                  color="secondary"
                  variant="contained"
                  onClick={onCloseForm}
                >
                  Hủy bỏ
                </Button>
                <Button
                  style={{ float: "right" }}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Xác nhận
                </Button>
              </form>
              {onSuccess && (
                <Alert
                  variant="filled"
                  severity="success"
                  style={{ marginTop: "1rem", justifyContent: "center" }}
                >
                  Thêm câu chuyện thành công
                </Alert>
              )}

              {onError && (
                <Alert
                  variant="filled"
                  severity="error"
                  style={{ marginTop: "1rem", justifyContent: "center" }}
                >
                  Thêm câu chuyện không thành công
                </Alert>
              )}
            </Container>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default AddingStoriesForm;
