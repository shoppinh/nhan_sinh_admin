import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState, Suspense } from "react";
import informationApi from "../../../../api/informationApi";

const EditingInformationForm = React.lazy(() =>
  import("../../components/EditingInformationForm")
);
import spinner from "../../../../assets/images/Iphone-spinner-2.gif";

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
}));

const Welcome = () => {
  const classes = useStyles();

  const [openEditingInformationForm, setOpenEditingInformationForm] =
    useState(true);
  const [valuesInformation, setValuesInformation] = useState({
    quantity: "",
    content: "",
  });
  const [informationList, setInformationList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clickedEditingId, setClickedEditingId] = useState("");

  // handle editing existing Information
  const handleEditingSubmit = (id, value) => {
    const data = {
      quantity: value.quantity,
      content: value.content,
    };

    const fetchEditInformation = () => {
      informationApi
        .putInfo(id, data)
        .then(function (response) {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setOpenEditingInformationForm(false);
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
    fetchEditInformation();
  };
  // handle open editing Information form
  const handleOpenEditForm = (id) => {
    setOpenEditingInformationForm(true);
    setClickedEditingId(id);
  };

  const handleCloseEditForm = () => {
    setOpenEditingInformationForm(false);
  };

  const setValuesInformationChange = (event) => {
    setValuesInformation({
      ...valuesInformation,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const fetchListInformation = async () => {
      setLoading(true);
      try {
        const res = await informationApi.getListInfo();
        setInformationList(res.data);
      } catch (err) {
        console.log("failed to fetch Information list: ", error);
      }
      setLoading(false);
    };
    fetchListInformation();
  }, [isDataChanged]);
  useEffect(() => {
    const fetchInformationByID = async () => {
      try {
        const res = await informationApi.getInfoByID(clickedEditingId);
        setValuesInformation(res.data);
      } catch (err) {
        console.log("failed to fetch Information list: ", error);
      }
    };
    fetchInformationByID();
  }, [clickedEditingId]);
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Grid
        container
        style={{ justifyContent: "space-between", marginBottom: "1rem" }}
      >
        <Grid item>
          <Typography variant="h5">Số liệu thống kê</Typography>
        </Grid>
      </Grid>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={spinner} style={{ height: "100px" }} />
        </div>
      ) : (
        <Grid container spacing={3}>
          {informationList.map((data) => (
            <Grid item xs={12} md={6} lg={4} key={data._id}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    Danh mục : {data.content}
                  </Typography>

                  <Typography variant="body2" component="p">
                    Giá trị: {data.quantity}
                  </Typography>
                </CardContent>
                <CardActions>
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
                    <EditingInformationForm
                      isOpen={openEditingInformationForm}
                      onCloseForm={handleCloseEditForm}
                      idInformation={data._id}
                      valuesInformation={valuesInformation}
                      onValuesInformationChange={setValuesInformationChange}
                      onEditingInformationSubmit={handleEditingSubmit}
                      onSuccess={success}
                      onError={error}
                    />
                  ) : (
                    ""
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Suspense>
  );
};

export default Welcome;
