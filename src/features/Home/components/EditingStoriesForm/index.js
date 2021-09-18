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

const EditingCoacher = (props) => {
  const classes = useStyles();

  const {
    isOpen,
    onCloseForm,
    idStories,
    valuesStories,
    onValuesStoriesChange,
    onEditingStoriesSubmit,
    onSuccess,
    onError,
  } = props;

  const [picture, setPicture] = useState("");
  const [imgData, setImgData] = useState(valuesStories.avatar);

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

    const { name, title, career, content } = valuesStories;
    const dataAdd = { name, title, career, content };

    if (picture !== "") {
      dataAdd.avatar = picture;
    }
    console.log(dataAdd);
    onEditingStoriesSubmit(idStories, dataAdd);
  };
  React.useEffect(() => {
    setImgData(valuesStories.avatar);
  }, [valuesStories.avatar]);
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
                Sửa thông tin coacher
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
                  label="Họ Tên "
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  type="text"
                  name="name"
                  value={valuesStories.name}
                  onChange={onValuesStoriesChange}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  className={classes.field}
                  label="Tiêu đề"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  name="title"
                  value={valuesStories.title}
                  onChange={onValuesStoriesChange}
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  className={classes.field}
                  label="Nghề nghiệp"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  name="career"
                  value={valuesStories.career}
                  onChange={onValuesStoriesChange}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  className={classes.field}
                  label="Nội dung"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  name="content"
                  multiline={2}
                  value={valuesStories.content}
                  onChange={onValuesStoriesChange}
                  InputLabelProps={{ shrink: true }}
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
                  Sửa thông tin thành công
                </Alert>
              )}

              {onError && (
                <Alert
                  variant="filled"
                  severity="error"
                  style={{ marginTop: "1rem", justifyContent: "center" }}
                >
                  Sửa thông tin không thành công
                </Alert>
              )}
            </Container>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default EditingCoacher;
