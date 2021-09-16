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
import React from "react";
import DatePicker from "../../../../components/controls/DatePicker";

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

const AddingCoachingService = (props) => {
	const classes = useStyles();
	const {
		isOpen,
		onCloseForm,
		onNameChange,
		onEmailChange,
		onTimeChange,
		onPhoneNumberChange,
		onAddressChange,
		listCoacher,
		coacher,
		onCoacherChange,
		onBirthDayChange,
		onAddingCoachingSubmit,
		birthDay,
		time,
		onSuccess,
		onError,
	} = props;

	const handleSubmit = (e) => {
		e.preventDefault();
		onAddingCoachingSubmit();
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
								Thêm lịch đặt coaching
							</Typography>

							<form autoComplete='off' onSubmit={handleSubmit}>
								<TextField
									className={classes.field}
									label='Họ Tên Người Đặt Lịch'
									variant='outlined'
									color='secondary'
									fullWidth
									type='text'
									onChange={onNameChange}
								/>
								{/* <TextField
									className={classes.field}
									label='Ngày sinh'
									variant='outlined'
									color='secondary'
									fullWidth
									type='text'
									onChange={onBirthDayChange}
								/> */}
								<DatePicker
									label='Ngày sinh'
									className={classes.field}
									variant='outlined'
									color='primary'
									name='birthDay'
									fullWidth
									value={birthDay}
									onChange={onBirthDayChange}
								/>

								<TextField
									className={classes.field}
									label='Số Điện Thoại'
									variant='outlined'
									color='secondary'
									fullWidth
									type='number'
									onChange={onPhoneNumberChange}
								/>
								<TextField
									className={classes.field}
									label='Email'
									variant='outlined'
									color='secondary'
									fullWidth
									type='email'
									onChange={onEmailChange}
								/>

								<FormControl
									variant='outlined'
									className={classes.field}
									fullWidth>
									<InputLabel id='demo-simple-select-outlined-label'>
										Coacher
									</InputLabel>
									<Select
										labelId='demo-simple-select-outlined-label'
										id='demo-simple-select-outlined'
										defaultValue=''
										value={coacher}
										onChange={onCoacherChange}
										label='Coacher'>
										{listCoacher.length > 0
											? listCoacher.map((coacher) => (
													<MenuItem key={coacher._id} value={coacher._id}>
														{coacher.name}
													</MenuItem>
											  ))
											: ""}
									</Select>
								</FormControl>

								<DatePicker
									label='Thời gian coaching'
									className={classes.field}
									variant='outlined'
									color='primary'
									fullWidth
									style={{ marginBottom: "1rem" }}
									value={time}
									onChange={onTimeChange}
								/>

								<TextField
									className={classes.field}
									label='Địa Chỉ'
									variant='outlined'
									color='secondary'
									fullWidth
									type='text'
									style={{ marginBottom: "1rem" }}
									onChange={onAddressChange}
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
									Đặt lịch coaching thành công
								</Alert>
							)}

							{onError && (
								<Alert
									variant='filled'
									severity='error'
									style={{ marginTop: "1rem", justifyContent: "center" }}>
									Đặt lịch coaching không thành công
								</Alert>
							)}
						</Container>
					</div>
				</Fade>
			</Modal>
		</React.Fragment>
	);
};

export default AddingCoachingService;
