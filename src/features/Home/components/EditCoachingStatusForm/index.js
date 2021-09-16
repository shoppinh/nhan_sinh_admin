import {
	Button,
	Container,
	Fade,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
	Typography,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";

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
		maxWidth: 500,
	},
	field: {
		marginBottom: "1rem",
	},
}));

const EditCoachingStatusForm = (props) => {
	const classes = useStyles();

	const {
		idBookedCoaching,
		isOpen,
		onCloseForm,
		// onValueChange,
		value,
		onSuccess,
		onError,
		onEditStatusSubmit,
	} = props;

	const handleSubmit = (e) => {
		e.preventDefault();
		onEditStatusSubmit(status, idBookedCoaching);
	};

	const [status, setStatusChange] = useState(value);

	const handleChange = (e) => {
		setStatusChange(e.target.value);
		// onValueChange(status);
	};

	return (
		<React.Fragment>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={isOpen}
				onClose={onCloseForm}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={isOpen}>
					<div className={classes.paper}>
						<Container size='sm'>
							<Typography variant='h5' style={{ marginBottom: "1rem" }}>
								Sửa trạng thái coaching
							</Typography>

							<form autoComplete='off' onSubmit={handleSubmit}>
								<FormControl
									variant='outlined'
									className={classes.field}
									fullWidth>
									<InputLabel id='demo-simple-select-outlined-label'>
										Trạng thái
									</InputLabel>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										value={status}
										label='Trạng thái'
										onChange={handleChange}>
										<MenuItem value='Đã đặt lịch'>Đã đặt lịch</MenuItem>
										<MenuItem value='Đã xác nhận'>Đã xác nhận</MenuItem>
										<MenuItem value='Đã gặp'>Đã gặp</MenuItem>
									</Select>
								</FormControl>

								<Button
									color='secondary'
									variant='contained'
									onClick={onCloseForm}>
									Hủy bỏ
								</Button>
								<Button
									style={{ float: "right" }}
									type='submit'
									color='primary'
									variant='contained'>
									Xác nhận
								</Button>
							</form>
							{onSuccess && (
								<Alert
									variant='filled'
									severity='success'
									style={{ marginTop: "1rem", justifyContent: "center" }}>
									Sửa trạng thái thành công
								</Alert>
							)}

							{onError && (
								<Alert
									variant='filled'
									severity='error'
									style={{ marginTop: "1rem", justifyContent: "center" }}>
									Sửa trạng thái thành không công
								</Alert>
							)}
						</Container>
					</div>
				</Fade>
			</Modal>
		</React.Fragment>
	);
};

export default EditCoachingStatusForm;
