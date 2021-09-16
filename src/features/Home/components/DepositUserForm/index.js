import {
	Button,
	Container,
	Fade,
	Modal,
	TextField,
	Typography,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const DepositUserForm = (props) => {
	const classes = useStyles();
	const {
		nameUserChange,
		idUserChange,
		isOpenForm,
		onCloseForm,
		onChangeMoneyFormSubmit,
		onFormChange,
		onSuccess,
		onError,
	} = props;

	const handleFormSubmit = (e) => {
		e.preventDefault();
		onChangeMoneyFormSubmit(idUserChange);
	};

	return (
		<Modal
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
			className={classes.modal}
			open={isOpenForm}
			onClose={onCloseForm}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={isOpenForm}>
				<div className={classes.paper}>
					<Container size='sm'>
						<Typography variant='h5' style={{ marginBottom: "1rem" }}>
							Nạp tiền cho người dùng:
							<span
								style={{
									fontWeight: "bold",
									margin: "0 5px",
									fontStyle: "italic",
								}}
							>
								{nameUserChange}
							</span>
						</Typography>

						<form noValidate autoComplete='off' onSubmit={handleFormSubmit}>
							<TextField
								className={classes.field}
								label='Số tiền nạp thêm'
								variant='outlined'
								color='secondary'
								fullWidth
								type='number'
								style={{ marginBottom: "1rem" }}
								onChange={onFormChange}
							/>
							<Button
								color='secondary'
								variant='contained'
								onClick={onCloseForm}
								float
							>
								Hủy
							</Button>
							<Button
								style={{ float: "right" }}
								type='submit'
								color='primary'
								variant='contained'
							>
								Xác nhận
							</Button>
						</form>
						{onSuccess && (
							<Alert
								variant='filled'
								severity='success'
								style={{ marginTop: "1rem", justifyContent: "center" }}
							>
								Thay đổi tiền người dùng thành công
							</Alert>
						)}
						{onError && (
							<Alert
								variant='filled'
								severity='error'
								style={{ marginTop: "1rem", justifyContent: "center" }}
							>
								Thay đổi tiền người dùng thất bại
							</Alert>
						)}
					</Container>
				</div>
			</Fade>
		</Modal>
	);
};

export default DepositUserForm;
