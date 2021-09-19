import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useState, Suspense } from "react";
import Avatar from "@material-ui/core/Avatar";
import Alert from "@material-ui/lab/Alert";

import spinner from "../../../../assets/images/Iphone-spinner-2.gif";
import storiesApi from "../../../../api/storiesApi";
const AddingStoriesForm = React.lazy(() =>
  import("../../components/AddingStoriesForm")
);
const EditingStoriesForm = React.lazy(() =>
  import("../../components/EditingStoriesForm")
);
const ConfirmDeleteStories = React.lazy(() =>
  import("../../components/ConfirmDeleteStories")
);

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

const SuccessStories = () => {
  const classes = useStyles();
  var FormData = require("form-data");
  const [openAddingStoriesForm, setOpenAddingStoriesForm] = useState(false);
  const [openEditingStoriesForm, setOpenEditingStoriesForm] = useState(true);
  const [valuesStories, setValuesStories] = useState({
    title: "",
    content: "",
    name: "",
    career: "",
    avatar: "",
  });
  const [storiesList, setStoriesList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clickedDeleteId, setClickedDeleteId] = useState("");

  const [clickedEditingId, setClickedEditingId] = useState("");

  const handleOpenAddingStoriesForm = () => {
    setOpenAddingStoriesForm(true);
  };
  const handleCloseAddingStoriesForm = () => {
    setOpenAddingStoriesForm(false);
  };
  const handleAddingSubmit = (value) => {
    let dataPost = new FormData();
    if (value) {
      dataPost.append("title", value.title);
      dataPost.append("content", value.content);
      dataPost.append("name", value.name);
      dataPost.append("career", value.career);
      dataPost.append("avatar", value.avatar);

      const fetchAddNewStories = () => {
        storiesApi
          .postStories(dataPost)
          .then(function (response) {
            setSuccess(true);

            setTimeout(() => {
              setIsDataChanged(!isDataChanged);
              setOpenAddingStoriesForm(false);
              setSuccess(false);
            }, 1500);
          })
          .catch(function (error) {
            setError(true);
            setTimeout(() => {
              setError(false);
            }, 1500);
          });
      };

      fetchAddNewStories();
    }
  };

  // handle editing existing Stories
  const handleEditingSubmit = (id, value) => {
    let dataPut = new FormData();
    dataPut.append("title", value.title);
    dataPut.append("content", value.content);
    dataPut.append("name", value.name);
    dataPut.append("career", value.career);
    if (value?.avatar) {
      dataPut.append("avatar", value.avatar);
    }

    const fetchEditStories = () => {
      storiesApi
        .putStories(id, dataPut)
        .then(function (response) {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setOpenEditingStoriesForm(false);
            setIsDataChanged(!isDataChanged);
          }, 1500);
        })
        .catch(function (error) {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 1500);
        });
    };
    fetchEditStories();
  };
  // handle open editing Stories form
  const handleOpenEditForm = (id) => {
    setOpenEditingStoriesForm(true);
    setClickedEditingId(id);
  };

  const handleCloseEditForm = () => {
    setOpenEditingStoriesForm(false);
  };

  const handleOpenDeleteConfirm = (id) => {
    setClickedDeleteId(id);
    setOpenDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = (id) => {
    setOpenDeleteConfirm(false);
  };

  // handle click confirm delete Stories
  const handleClickDeleteConfirm = (id) => {
    storiesApi
      .deleteStories(id)
      .then(function (response) {
        setSuccess(true);

        setTimeout(() => {
          setIsDataChanged(true);
          setOpenDeleteConfirm(false);
          setSuccess(false);
        }, 1500);
      })
      .catch(function (error) {
        setError(true);
        setTimeout(() => {
          setOpenDeleteConfirm(false);
          setIsDataChanged(true);

          setError(false);
        }, 1500);
      });

    setIsDataChanged(false);
  };

  const setValuesStoriesChange = (event) => {
    setValuesStories({
      ...valuesStories,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const fetchListStories = async () => {
      setLoading(true);
      try {
        const res = await storiesApi.getListStories();
        setStoriesList(res.data);
      } catch (err) {
        console.log("failed to fetch Stories list: ", error);
      }
      setLoading(false);
    };
    fetchListStories();
  }, [isDataChanged]);
  useEffect(() => {
    const fetchStoriesByID = async () => {
      try {
        const res = await storiesApi.getStoriesById(clickedEditingId);
        setValuesStories(res.data);
      } catch (err) {
        console.log("failed to fetch Stories list: ", error);
      }
    };
    fetchStoriesByID();
  }, [clickedEditingId]);
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Grid
        container
        style={{ justifyContent: "space-between", marginBottom: "1rem" }}
      >
        <Grid item>
          <Typography variant="h5">Danh sách câu truyện </Typography>
        </Grid>

        <Grid item>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleOpenAddingStoriesForm}
            startIcon={<AddIcon />}
          >
            Thêm câu truyện
          </Button>
        </Grid>
      </Grid>
      {/* adding Stories component */}
      <AddingStoriesForm
        isAddingStoriesOpen={openAddingStoriesForm}
        onCloseForm={handleCloseAddingStoriesForm}
        onValuesStoriesChange={setValuesStoriesChange}
        valuesStories={valuesStories}
        onAddingStoriesSubmit={handleAddingSubmit}
        onSuccess={success}
        onError={error}
      />
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={spinner} style={{ height: "100px" }} />
        </div>
      ) : (
        <Grid container spacing={3}>
          {storiesList?.length > 0 ? (
            storiesList.map((data) => (
              <Grid item xs={12} md={6} lg={4} key={data._id}>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="Remy Sharp"
                        src={data.avatar}
                        style={{
                          backgroundPosition: "center",
                          boxShadow: ".25rem .5rem 1rem rgba(0,0,0,.3)",
                        }}
                        className={classes.avatar}
                      />
                    }
                    title={
                      <Typography variant="h6" component="h2">
                        Tiêu đề : {data.title}
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      Tên : {data.name}
                    </Typography>
                    <Typography variant="h6" component="h2">
                      Nghề nghiệp : {data.career}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Nội dung : {data.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        handleOpenDeleteConfirm(data._id);
                      }}
                    >
                      Xóa câu truyện
                    </Button>
                    {clickedDeleteId === data._id ? (
                      <ConfirmDeleteStories
                        isOpenDeleteConfirm={openDeleteConfirm}
                        onConfirmDeleteClose={handleCloseDeleteConfirm}
                        onClickConfirmDeleteStories={(e) => {
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
                        handleOpenEditForm(data._id);
                      }}
                    >
                      Chỉnh sửa
                    </Button>
                    {clickedEditingId === data._id ? (
                      <EditingStoriesForm
                        isOpen={openEditingStoriesForm}
                        onCloseForm={handleCloseEditForm}
                        idStories={data._id}
                        valuesStories={valuesStories}
                        onValuesStoriesChange={setValuesStoriesChange}
                        onEditingStoriesSubmit={handleEditingSubmit}
                        onSuccess={success}
                        onError={error}
                      />
                    ) : (
                      ""
                    )}
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
      )}
    </Suspense>
  );
};

export default SuccessStories;
