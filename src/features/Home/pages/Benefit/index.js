import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useState } from "react";
import benefitApi from "../../../../api/benefitApi.js";
import AddingBenefitForm from "../../components/AddingBenefitForm";
import ConfirmDeleteBenefit from "../../components/ConfirmDeleteBenefit";
import EditingBenefitForm from "../../components/EditingBenefitForm";

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
const Benefit = () => {
  const classes = useStyles();

  const [listBenefit, setListBenefit] = useState([]);
  const [openAddingBenefitForm, setOpenAddingBenefitForm] = useState(false);
  const [openEditingBenefitForm, setOpenEditingBenefitForm] = useState(true);

  const [valuesBenefit, setValuesBenefit] = useState({
    title: "",
    details: [],
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const [clickedDeleteId, setClickedDeleteId] = useState("");

  const [clickedEditingId, setClickedEditingId] = useState("");

  const [isDataChanged, setIsDataChanged] = useState(false);

  // get list Benefit
  useEffect(() => {
    const fetchListBenefit = async () => {
      try {
        const response = await benefitApi.getListBenefit();
        setListBenefit(response.data);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };

    fetchListBenefit();
  }, [isDataChanged]);

  // get info Benefit byID
  useEffect(() => {
    const fetchListBenefit = async () => {
      try {
        const response = await benefitApi.getInfoBenefitById(clickedEditingId);
        setValuesBenefit(response.data);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };

    fetchListBenefit();
  }, [clickedEditingId]);

  const handleOpenAddingBenefitForm = () => {
    setOpenAddingBenefitForm(true);
  };

  const handleCloseAddingBenefitForm = () => {
    setOpenAddingBenefitForm(false);
  };

  // handle adding new Benefit
  const handleAddingSubmit = (value) => {
    if (value) {
      const data = {
        title: value.title,
        details: value.details,
      };

      const fetchAddNewBenefit = () => {
        benefitApi
          .addBenefit(data)
          .then(function (response) {
            setSuccess(true);

            setTimeout(() => {
              setIsDataChanged(!isDataChanged);
              setOpenAddingBenefitForm(false);
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

      fetchAddNewBenefit();
    }
  };

  // handle editing existing Benefit
  const handleEditingSubmit = (id, value) => {
    const data = {
      title: value.title,
      details: value.details,
    };

    const fetchEditNewBenefit = () => {
      benefitApi
        .patchBenefit(id, data)
        .then(function (response) {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setOpenEditingBenefitForm(false);
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
    fetchEditNewBenefit();
  };

  // handle open editing Benefit form
  const handleOpenEditForm = (id) => {
    setOpenEditingBenefitForm(true);
    setClickedEditingId(id);
  };

  const handleCloseEditForm = () => {
    setOpenEditingBenefitForm(false);
  };

  const handleOpenDeleteConfirm = (id) => {
    setClickedDeleteId(id);
    setOpenDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = (id) => {
    setOpenDeleteConfirm(false);
  };

  // handle click confirm delete Benefit
  const handleClickDeleteConfirm = (id) => {
    benefitApi
      .deleteBenefit(id)
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

  const setValuesBenefitChange = (event) => {
    setValuesBenefit({
      ...valuesBenefit,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <React.Fragment>
      <Grid
        container
        style={{ justifyContent: "space-between", marginBottom: "1rem" }}
      >
        <Grid item>
          <Typography variant="h5">Danh sách các lợi ích</Typography>
        </Grid>
        {listBenefit.length < 2 && (
          <Grid item>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={handleOpenAddingBenefitForm}
              startIcon={<AddIcon />}
            >
              Thêm lợi ích
            </Button>
          </Grid>
        )}
      </Grid>
      {/* adding Benefit component */}
      <AddingBenefitForm
        isAddingBenefitOpen={openAddingBenefitForm}
        onCloseForm={handleCloseAddingBenefitForm}
        onValuesBenefitChange={setValuesBenefitChange}
        valuesBenefit={valuesBenefit}
        onAddingBenefitSubmit={handleAddingSubmit}
        onSuccess={success}
        onError={error}
      />
      <div>
        <Grid container spacing={3}>
          {listBenefit.map((data) => (
            <Grid item xs={12} md={6} lg={4} key={data._id}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    Tên lợi ích: {data.title}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    Chi tiết lợi ích
                  </Typography>
                  {data.details.map((item, index) => (
                    <Typography variant="body2" component="p">
                      - {item}
                    </Typography>
                  ))}
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
                    Xóa dịch vụ
                  </Button>
                  {clickedDeleteId === data._id ? (
                    <ConfirmDeleteBenefit
                      isOpenDeleteConfirm={openDeleteConfirm}
                      onConfirmDeleteClose={handleCloseDeleteConfirm}
                      onClickConfirmDeleteBenefit={(e) => {
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
                    <EditingBenefitForm
                      isOpen={openEditingBenefitForm}
                      onCloseForm={handleCloseEditForm}
                      idBenefit={data._id}
                      valuesBenefit={valuesBenefit}
                      onValuesBenefitChange={setValuesBenefitChange}
                      onEditingBenefitSubmit={handleEditingSubmit}
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
      </div>
    </React.Fragment>
  );
};

export default Benefit;
