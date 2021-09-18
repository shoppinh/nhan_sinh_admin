import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useState, Suspense } from "react";
import numberApi from "../../../../api/numberApi";
const AddingNumberForm = React.lazy(() =>
  import("../../components/AddingNumberForm")
);
const EditingNumberForm = React.lazy(() =>
  import("../../components/EditingNumberForm")
);
const ConfirmDeleteNumber = React.lazy(() =>
  import("../../components/ConfirmDeleteNumber")
);
const CSKhatTam = React.lazy(() => import("./CSKhatTam"));
const CSNhanCach = React.lazy(() => import("./CSNhanCach"));
const CSSoPhan = React.lazy(() => import("./CSSoPhan"));

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

const NumberMeaning = () => {
  const classes = useStyles();

  const [openAddingNumberForm, setOpenAddingNumberForm] = useState(false);
  const [openEditingNumberForm, setOpenEditingNumberForm] = useState(true);
  const [valuesNumber, setValuesNumber] = useState({
    number: "",
    meaning: "",
  });
  const [numberList, setNumberList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);

  const [clickedDeleteId, setClickedDeleteId] = useState("");

  const [clickedEditingId, setClickedEditingId] = useState("");

  const handleOpenAddingNumberForm = () => {
    setOpenAddingNumberForm(true);
  };
  const handleCloseAddingNumberForm = () => {
    setOpenAddingNumberForm(false);
  };
  const handleAddingSubmit = (value) => {
    if (value) {
      const data = {
        number: value.number,
        meaning: value.meaning,
      };

      const fetchAddNewNumber = () => {
        numberApi
          .addNumber(data)
          .then(function (response) {
            setSuccess(true);

            setTimeout(() => {
              setIsDataChanged(!isDataChanged);
              setOpenAddingNumberForm(false);
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

      fetchAddNewNumber();
    }
  };

  // handle editing existing number
  const handleEditingSubmit = (id, value) => {
    const data = {
      number: value.number,
      meaning: value.meaning,
    };

    const fetchEditNumber = () => {
      numberApi
        .putNumber(id, data)
        .then(function (response) {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setOpenEditingNumberForm(false);
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
    fetchEditNumber();
  };
  // handle open editing number form
  const handleOpenEditForm = (id) => {
    setOpenEditingNumberForm(true);
    setClickedEditingId(id);
  };

  const handleCloseEditForm = () => {
    setOpenEditingNumberForm(false);
  };

  const handleOpenDeleteConfirm = (id) => {
    setClickedDeleteId(id);
    setOpenDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = (id) => {
    setOpenDeleteConfirm(false);
  };

  // handle click confirm delete Number
  const handleClickDeleteConfirm = (id) => {
    numberApi
      .deleteNumber(id)
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

  const setValuesNumberChange = (event) => {
    setValuesNumber({
      ...valuesNumber,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const fetchListNumber = async () => {
      try {
        const res = await numberApi.getListNumber();
        setNumberList(res.data);
      } catch (err) {
        console.log("failed to fetch number list: ", error);
      }
    };
    fetchListNumber();
  }, [isDataChanged]);
  useEffect(() => {
    const fetchNumberByID = async () => {
      try {
        const res = await numberApi.getNumberByID(clickedEditingId);
        setValuesNumber(res.data);
      } catch (err) {
        console.log("failed to fetch number list: ", error);
      }
    };
    fetchNumberByID();
  }, [clickedEditingId]);
  return (
    <Suspense fallback={<div>Loading</div>}>
      <React.Fragment>
        <Grid
          container
          style={{ justifyContent: "space-between", marginBottom: "1rem" }}
        >
          <Grid item>
            <Typography variant="h5">Danh sách con số</Typography>
          </Grid>
          {numberList.length < 11 && (
            <Grid item>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={handleOpenAddingNumberForm}
                startIcon={<AddIcon />}
              >
                Thêm con số
              </Button>
            </Grid>
          )}
        </Grid>
        {/* adding Number component */}
        <AddingNumberForm
          isAddingNumberOpen={openAddingNumberForm}
          onCloseForm={handleCloseAddingNumberForm}
          onValuesNumberChange={setValuesNumberChange}
          valuesNumber={valuesNumber}
          onAddingNumberSubmit={handleAddingSubmit}
          onSuccess={success}
          onError={error}
        />
        <Grid container spacing={3}>
          {numberList.map((data) => (
            <Grid item xs={12} md={6} lg={4} key={data._id}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    Con số : {data.number}
                  </Typography>

                  <Typography variant="body2" component="p">
                    Nội dung: {data.meaning}
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
                    Xóa con số
                  </Button>
                  {clickedDeleteId === data._id ? (
                    <ConfirmDeleteNumber
                      isOpenDeleteConfirm={openDeleteConfirm}
                      onConfirmDeleteClose={handleCloseDeleteConfirm}
                      onClickConfirmDeleteNumber={(e) => {
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
                    <EditingNumberForm
                      isOpen={openEditingNumberForm}
                      onCloseForm={handleCloseEditForm}
                      idNumber={data._id}
                      valuesNumber={valuesNumber}
                      onValuesNumberChange={setValuesNumberChange}
                      onEditingNumberSubmit={handleEditingSubmit}
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
      </React.Fragment>
      <CSKhatTam />
      <CSSoPhan />
      <CSNhanCach />
    </Suspense>
  );
};

export default NumberMeaning;
