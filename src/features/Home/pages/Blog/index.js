import React, { useEffect, useState, Suspense } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AddIcon from "@material-ui/icons/Add";
const ConfirmDeleteBlog = React.lazy(() =>
  import("../../components/ConfirmDeleteBlog")
);
import blogApi from "../../../../api/blogApi";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

const Blog = () => {
  const history = useHistory();
  const classes = useStyles();
  const [blogList, setBlogList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [clickedDeleteId, setClickedDeleteId] = useState("");

  const handleOpenDeleteConfirm = (id) => {
    setClickedDeleteId(id);
    setOpenDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = (id) => {
    setOpenDeleteConfirm(false);
  };

  const handleClickDeleteConfirm = (id) => {
    blogApi
      .deleteBlog(id)
      .then(function (response) {
        setSuccess(true);

        setTimeout(() => {
          setOpenDeleteConfirm(false);
          setSuccess(false);
        }, 1500);
      })
      .catch(function (error) {
        setError(true);
        setTimeout(() => {
          setOpenDeleteConfirm(false);
          setError(false);
        }, 1500);
      });
  };
  useEffect(() => {
    const fetchListBlog = async () => {
      try {
        const res = await blogApi.getListBlog();
        setBlogList(res.data.data);
      } catch (err) {
        console.log("failed to fetch Blog list: ", error);
      }
    };
    fetchListBlog();
  }, [blogList]);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Grid
        container
        style={{ justifyContent: "space-between", marginBottom: "1rem" }}
      >
        <Grid item>
          <Typography variant="h5">Danh sách bài viết </Typography>
        </Grid>

        <Grid item>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => history.push("/blog/adding-blog")}
            startIcon={<AddIcon />}
          >
            Thêm bài viết
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {blogList?.length > 0 ? (
          blogList.map((data) => (
            <Grid item xs={12} md={12} key={data._id}>
              <Card className={classes.root}>
                <CardContent>
                  <Grid container justifyContent="space-between">
                    <Grid item md={3}>
                      <img
                        alt="Remy Sharp"
                        src={data.thumbnail}
                        style={{
                          backgroundPosition: "center",
                          boxShadow: ".25rem .5rem 1rem rgba(0,0,0,.3)",
                          width: "100%",
                          height: "200px",
                        }}
                        className={classes.avatar}
                      />
                    </Grid>
                    <Grid item md={8}>
                      <Typography variant="h5" gutterBottom component="h2">
                        Tiêu đề : {data.title}
                      </Typography>

                      <Typography variant="subtitle1" component="p">
                        Tóm tắt : {data.subTitle}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions style={{ justifyContent: "flex-end" }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      handleOpenDeleteConfirm(data._id);
                    }}
                  >
                    Xóa bài viết
                  </Button>
                  {clickedDeleteId === data._id ? (
                    <ConfirmDeleteBlog
                      isOpenDeleteConfirm={openDeleteConfirm}
                      onConfirmDeleteClose={handleCloseDeleteConfirm}
                      onClickConfirmDeleteBlog={() => {
                        handleClickDeleteConfirm(data._id);
                      }}
                      onSuccess={success}
                      onError={error}
                      id={data._id}
                    />
                  ) : (
                    ""
                  )}

                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      history.push(`/blog/editing-blog/${data._id}`);
                    }}
                  >
                    Chỉnh sửa
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Alert severity="success" color="info">
            Chưa có dữ liệu
          </Alert>
        )}
      </Grid>
    </Suspense>
  );
};

export default Blog;
