import {
	Button,
	Container,
	Fade,
	Modal,
	TextField,
	Typography,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
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
	field: {
		marginBottom: "1rem",
	},
}));

const AddingServiceForm = (props) => {
	const classes = useStyles();
	const {
		isAddingServiceOpen,
		onCloseForm,
		valuesService,
		onValuesServiceChange,
		onAddingServiceSubmit,
		onSuccess,
		onError,
	} = props;

	const handleSubmit = (e) => {
		e.preventDefault();
		onAddingServiceSubmit(valuesService);
	};

	return (
		<React.Fragment>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={isAddingServiceOpen}
				onClose={onCloseForm}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={isAddingServiceOpen}>
					<div className={classes.paper}>
						<Container size='sm'>
							<Typography variant='h5' style={{ marginBottom: "1rem" }}>
								Thêm mới dịch vụ
							</Typography>

							<form autoComplete='off' onSubmit={handleSubmit}>
								<TextField
									className={classes.field}
									label='Tên dịch vụ'
									variant='outlined'
									color='secondary'
									fullWidth
									type='text'
									onChange={onValuesServiceChange}
									required={true}
									name='title'
								/>
								<TextField
									className={classes.field}
									label='Giá'
									placeholder='VNĐ'
									variant='outlined'
									color='secondary'
									fullWidth
									type='number'
									onChange={onValuesServiceChange}
									required={true}
									name='price'
								/>
								<TextField
									className={classes.field}
									label='Số lượt tra cứu VIP'
									variant='outlined'
									color='secondary'
									fullWidth
									type='number'
									onChange={onValuesServiceChange}
									required={true}
									name='quantity'
								/>

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
									Thêm mới dịch vụ thành công
								</Alert>
							)}
							{onError && (
								<Alert
									variant='filled'
									severity='error'
									style={{ marginTop: "1rem", justifyContent: "center" }}>
									Thêm mới dịch vụ thất bại
								</Alert>
							)}
						</Container>
					</div>
				</Fade>
			</Modal>
		</React.Fragment>
	);
};

export default AddingServiceForm;
