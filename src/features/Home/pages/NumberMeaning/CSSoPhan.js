import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState, Suspense } from "react";
import numberValueApi from "../../../../api/numberValueApi";

const EditingNumberValueForm = React.lazy(() =>
  import("../../components/EditingNumberValueForm")
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
}));

const CSSoPhan = () => {
  const classes = useStyles();

  const [openEditingNumberForm, setOpenEditingNumberForm] = useState(true);
  const [valuesNumber, setValuesNumber] = useState({
    number: "",
    chars: [],
  });
  const [numberList, setNumberList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);

  const [clickedEditingId, setClickedEditingId] = useState("");

  // handle editing existing number
  const handleEditingSubmit = (id, value) => {
    const data = {
      number: value.number,
      chars: value.chars,
    };

    const fetchEditNumber = () => {
      numberValueApi
        .putNumberSP(id, data)
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

  useEffect(() => {
    const fetchListNumber = async () => {
      try {
        const res = await numberValueApi.getListNumberSP();
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
        const res = await numberValueApi.getNumberSPByID(clickedEditingId);
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
          style={{
            justifyContent: "space-between",
            marginBottom: "1rem",
            marginTop: 50,
          }}
        >
          <Grid item>
            <Typography variant="h5">Danh sách chỉ số full</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {numberList.map((data) => (
            <Grid item xs={12} md={6} lg={4} key={data._id}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    Con số : {data.number}
                  </Typography>

                  <Typography variant="body2" component="p">
                    Chữ cái: {data?.chars?.join(",")}
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
                    <EditingNumberValueForm
                      isOpen={openEditingNumberForm}
                      onCloseForm={handleCloseEditForm}
                      idNumber={data._id}
                      valuesNumber={valuesNumber}
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
    </Suspense>
  );
};

export default CSSoPhan;
