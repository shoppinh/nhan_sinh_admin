import React, { useState } from "react";
import {
  Button,
  Container,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import FormData from "form-data";
import useStyle from "./style";
import bannerApi from "../../../../api/bannerApi";
import Alert from "@material-ui/lab/Alert";

const AddingBanner = ({
  openAddBanner,
  closeAddBanner,
  setDataChange,
  dataChange,
}) => {
  const [imgData, setImgData] = useState(null);
  const [bannerText, setBannerText] = useState({
    title: "",
    detail: "",
  });
  const [bannerImage, setBannerImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const classes = useStyle();
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataPost = new FormData();
    dataPost.append("title", bannerText.title);
    dataPost.append("detail", bannerText.detail);
    dataPost.append("linkImage", bannerImage);

    console.log("haha");
    const AddBanner = async () => {
      try {
        const res = await bannerApi.portBanner(dataPost);
        console.log(res);
        setDataChange(!dataChange);
        setImgData(null);
        setSuccess(true);
        setTimeout(() => {
          closeAddBanner();
          setSuccess(false);
        }, 1000);
      } catch (error) {
        setError(true);
        setTimeout(() => {
          closeAddBanner();
          setError(false);
        }, 1000);
      }
    };

    AddBanner();

    const data = { ...bannerText, linkImage: bannerImage };
    console.log(data);
    console.log(dataPost);
  };
  const handleChangeBannerText = (e) => {
    setBannerText({ ...bannerText, [e.target.name]: e.target.value });
  };
  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setBannerImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  console.log(bannerText, bannerImage);
  return (
    <div>
      <Modal
        className={classes.modal}
        open={openAddBanner}
        onClose={closeAddBanner}
        closeAfterTransition
      >
        {/* <Fade in={isAddingCoacherOpen}> */}
        <div className={classes.paper}>
          <Container size="sm">
            <Typography variant="h5">Thêm Banner</Typography>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <Button
                variant="contained"
                color="primary"
                style={{ position: "relative", cursor: "pointer" }}
                className={classes.field}
              >
                Chọn ảnh banner
                <input
                  name="linkImage"
                  type="file"
                  className={classes.input}
                  onChange={handleChangeImage}
                  //   onChange={onCoacherInfoChange}
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
                label="tiêu đề"
                variant="outlined"
                color="secondary"
                fullWidth
                type="text"
                name="title"
                onChange={handleChangeBannerText}
              />

              <TextField
                className={classes.field}
                label="nội dung"
                variant="outlined"
                color="secondary"
                fullWidth
                type="text"
                name="detail"
                multiline
                rows={4}
                onChange={handleChangeBannerText}
              />

              <Button
                color="secondary"
                variant="contained"
                onClick={closeAddBanner}
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
            {success && (
              <Alert
                variant="filled"
                severity="success"
                style={{ marginTop: "1rem", justifyContent: "center" }}
              >
                Thêm Banner thành công
              </Alert>
            )}
            {error && (
              <Alert
                variant="filled"
                severity="error"
                style={{ marginTop: "1rem", justifyContent: "center" }}
              >
                Thêm Banner không thành công
              </Alert>
            )}
          </Container>
        </div>
        {/* </Fade> */}
      </Modal>
    </div>
  );
};

export default AddingBanner;
