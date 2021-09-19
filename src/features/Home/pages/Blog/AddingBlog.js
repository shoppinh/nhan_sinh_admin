import React, { useEffect, useState, Suspense } from "react";
import {
  Grid,
  Typography,
  Button,
  Container,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import MyEditor from "../../components/Editor";
import { useForm } from "react-hook-form";
import blogApi from "../../../../api/blogApi";
const useStyles = makeStyles((theme) => ({
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
  errorMessage: {
    color: "#bf1650",
    "&:before": {
      display: "inline",
      content: '"⚠ "',
    },
  },
}));
const AddingBlogPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const [imgData, setImgData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errorPost, setErrorPost] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      clearErrors("thumbnail");
      setValue("thumbnail", e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const fetchPostBlog = React.useCallback(async (data) => {
    try {
      await blogApi.postBlog(data);
      setSuccess(true);
      setTimeout(() => {
        history.push("/blog");
      }, 2000);
    } catch (err) {
      console.log(err);
      setErrorPost(true);
      setTimeout(() => {
        setErrorPost(false);
      }, 1500);
    }
  });
  const submit = (data) => {
    if (data?.thumbnail && data?.content !== "") {
      fetchPostBlog(data);
    } else {
      if (!data?.thumbnail) {
        setError("thumbnail", {
          type: "manual",
          message: "Bạn phải chọn ảnh thumbnail",
        });
      }
      if (!data?.content) {
        setError("content", {
          type: "manual",
          message: "Bạn không được để trống nội dung",
        });
      }
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(submit)}>
        <Grid
          container
          style={{ justifyContent: "space-between", marginBottom: "1rem" }}
        >
          <Grid item md={12}>
            <Typography variant="h3" gutterBottom>
              Thêm mới bài viết
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h5" gutterBottom>
              Tiêu đề
            </Typography>
            <TextField
              className={classes.field}
              label="Tiêu đề"
              variant="outlined"
              color="secondary"
              fullWidth
              type="text"
              required={true}
              name="title"
              {...register("title")}
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant="h5" gutterBottom>
              Tóm tắt nội dung
            </Typography>
            <TextField
              className={classes.field}
              label="Tóm tắt"
              variant="outlined"
              color="secondary"
              fullWidth
              type="text"
              required={true}
              name="subTitle"
              {...register("subTitle")}
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant="h5" gutterBottom>
              Thumbnail
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ position: "relative", cursor: "pointer" }}
              className={classes.field}
            >
              Chọn thumbnail
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
            {errors.thumbnail && (
              <Typography variant="subtitle1" className={classes.errorMessage}>
                {errors.thumbnail.message}
              </Typography>
            )}
          </Grid>
          <Grid item md={12}>
            <Typography variant="h5" gutterBottom>
              Nội dung
            </Typography>
            <MyEditor
              handleChange={(data) => {
                clearErrors("content");
                setValue("content", data);
              }}
            />
            {errors.content && (
              <Typography variant="subtitle1" className={classes.errorMessage}>
                {errors.content.message}
              </Typography>
            )}
          </Grid>
          <Grid item container md={12} justifyContent="flex-end">
            <Grid item md={4}>
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
          {success && (
            <Alert
              variant="filled"
              severity="success"
              style={{ marginTop: "1rem", justifyContent: "center" }}
            >
              Thêm bài viết thành công
            </Alert>
          )}

          {errorPost && (
            <Alert
              variant="filled"
              severity="error"
              style={{ marginTop: "1rem", justifyContent: "center" }}
            >
              Thêm bài viết không thành công
            </Alert>
          )}
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default AddingBlogPage;
