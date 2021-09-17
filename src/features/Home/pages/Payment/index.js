import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import paymentApi from "../../../../api/paymentApi.js";
import EditingPaymentForm from "../../components/EditingPaymentForm";

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
const Payment = () => {
  const classes = useStyles();

  const [openEditingPaymentForm, setOpenEditingPaymentForm] = useState(false);
  const [valuesPayment, setValuesPayment] = useState({
    bank: "",
    number: "",
    name: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [isDataChanged, setIsDataChanged] = useState(false);

  // get list Payment

  // get info Payment byID
  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await paymentApi.getPaymentInfo();
        setValuesPayment(response.data[0]);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };

    fetchPaymentInfo();
  }, []);

  // handle editing existing Payment
  const handleEditingSubmit = (id, value) => {
    const data = {
      bank: value.bank,
      number: value.number,
      name: value.name,
    };
    console.log(data);
    const fetchEditNewPayment = () => {
      paymentApi
        .putPaymentInfo(id, data)
        .then(function (response) {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setOpenEditingPaymentForm(false);
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
    fetchEditNewPayment();
  };

  // handle open editing Payment form
  const handleOpenEditForm = () => {
    setOpenEditingPaymentForm(true);
  };

  const handleCloseEditForm = () => {
    setOpenEditingPaymentForm(false);
  };
  const setValuesPaymentChange = (event) => {
    setValuesPayment({
      ...valuesPayment,
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
      </Grid>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4} key={valuesPayment._id}>
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Ngân hàng: {valuesPayment.bank}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Số tài khoản :{valuesPayment.number}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Chủ tài khoản :{valuesPayment.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    handleOpenEditForm();
                  }}
                >
                  Chỉnh sửa
                </Button>

                <EditingPaymentForm
                  isOpen={openEditingPaymentForm}
                  onCloseForm={handleCloseEditForm}
                  idPayment={valuesPayment._id}
                  valuesPayment={valuesPayment}
                  onValuesPaymentChange={setValuesPaymentChange}
                  onEditingPaymentSubmit={handleEditingSubmit}
                  onSuccess={success}
                  onError={error}
                />
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Payment;
