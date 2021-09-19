import React, { useEffect, useState, Suspense } from "react";
import {
  Grid,
  Typography,
  Button,
  Container,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
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
const EditingBlog = () => {
  const { blogID } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [blog, setBlog] = useState({
    title: "",
    subTitle: "",
    content: "",
    thumbnail: "",
  });
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
        setBlog({ ...blog, thumbnail: reader.result });
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const fetchPutBlog = React.useCallback(async (blogID, data) => {
    try {
      await blogApi.putBlog(blogID, data);
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
  const fetchBlogById = React.useCallback(async (id) => {
    try {
      const res = await blogApi.getBlogById(id);
      setBlog(res.data);
    } catch (err) {
      console.log("failed to fetch blog by id", err);
    }
  });
  const submit = (data) => {
    data.title = blog.title;
    data.subTitle = blog.subTitle;
    if (data.content !== "") {
      fetchPutBlog(blogID, data);
    } else {
      setError("content", {
        type: "manual",
        message: "Bạn không được để trống nội dung",
      });
    }
  };

  React.useEffect(() => {
    fetchBlogById(blogID);
  }, [blogID]);
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(submit)}>
        <Grid
          container
          style={{ justifyContent: "space-between", marginBottom: "1rem" }}
        >
          <Grid item md={12}>
            <Typography variant="h3" gutterBottom>
              Chỉnh sửa bài viết
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
              value={blog.title}
              onChange={(e) =>
                setBlog({ ...blog, [e.target.name]: e.target.value })
              }
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
              value={blog.subTitle}
              onChange={(e) =>
                setBlog({ ...blog, [e.target.name]: e.target.value })
              }
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
            {blog.thumbnail && (
              <div className="previewProfilePic">
                <img
                  className="playerProfilePic_home_tile"
                  src={blog.thumbnail}
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
              data={blog.content}
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
              Chỉnh sửa bài viết thành công
            </Alert>
          )}

          {errorPost && (
            <Alert
              variant="filled"
              severity="error"
              style={{ marginTop: "1rem", justifyContent: "center" }}
            >
              Chỉnh sửa bài viết không thành công
            </Alert>
          )}
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default EditingBlog;
